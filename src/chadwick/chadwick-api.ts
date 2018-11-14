import { MongoClient } from 'mongodb';
import { ChadwickCounts } from './models/chadwick-counts';
import { ChadwickTopHitter } from './models/chadwick-top-hitter';
import { ChadwickOldFranchise } from './models/chadwick-old-franchise';
import { ChadwickPlayerSearchResult } from './models/chadwick-player-search-result';
import { PlayerDetail } from './models/player-detail';
import { environment } from '../environments/environment';

export class ChadwickApi {
    private readonly _express: any;
    private readonly _request: any;
    private readonly _router: any;
    private readonly databaseName: string;
    private _mongodb: MongoClient;
    constructor() {
        this._express = require('express');
        this._request = require('request-promise-native');
        this._router = this._express.Router();
        this._mongodb = require('mongodb').MongoClient;
        this.databaseName = 'chadwick';

        this._router.get('/counts', async (req, res) => {
            const promises = [
                this.getCollectionCount('people'),
                this.getCollectionCount('teams'),
                this.getCollectionCount('parks'),
                this.getCollectionCount('homegames')
            ];
            const counts = await Promise.all(promises);
            const chadwickCounts = new ChadwickCounts(counts);
            res.status(200).json(chadwickCounts);
        });
        this._router.get('/collections', async (req, res) => {
           const collections = await this.getCollections();
           res.status(200).json(collections);
        });
        this._router.get('/collections/:collection', async (req, res) => {
            const collectionName = req.params.collection;
            const data = await this.getCollectionData(collectionName);
            res.status(200).json(data);
        });
        this._router.get('/years', async (req, res) => {
           const years = await this.getDistinctYears();
           res.status(200).json(years);
        });
        this._router.get('/years/:yearID/teams', async (req, res) => {
            const yearId = req.params.yearID;
            const teams = await this.getDistinctTeamsByYear(yearId);
            res.status(200).json(teams);
        });
        this._router.get('/players/region', async (req, res) => {
            const result: { country: string, count: number }[] = await this.getPlayerRegionData();
            res.status(200).json(result);
        });
        this._router.get('/players/top-hitters', async (req, res) => {
            const filter = Object.keys(req.query).length > 0 ? req.query : null;
            const result = await this.getTopHitters(filter);
            res.status(200).json(result);
        });
        this._router.get('/franchise/oldest', async (req, res) => {
            const filter = Object.keys(req.query).length > 0 ? req.query : null;
            const result = await this.getOldestFranchises(filter);
            res.status(200).json(result);
        });
        this._router.get('/worldseries/wins', async (req, res) => {
            const result = await this.getTopWorldSeriesWinners();
            res.status(200).json(result);
        });
        this._router.get('/homegames/attendance', async (req, res) => {
            const filter = Object.keys(req.query).length > 0 ? req.query : null;
            const result = await this.getAttendanceTrend(filter);
            res.status(200).json(result);
        });
        this._router.get('/players/search/:term', async (req, res) => {
            const term = req.params.term;
            const results = await this.getPlayerAutocompleteList(term);
            res.status(200).json(results);
        });
        this._router.get('/players/compare/:player1ID/:player2ID', async (req, res) => {
            const player1ID = req.params.player1ID;
            const player2ID = req.params.player2ID;
            const data: PlayerDetail[] = await Promise.all([this.getPlayerStats(player1ID), this.getPlayerStats(player2ID)]);
            res.status(200).json(data);
        });
        this._router.get('/players/:playerID', async (req, res) => {
            const playerID = req.params.playerID;
            const data: PlayerDetail = await this.getPlayerStats(playerID);
            res.status(200).json(data);
        });

        module.exports = this._router;
    }
    async connect(): Promise<MongoClient> {
        const client = await MongoClient.connect(environment.mongo_connection_string, { useNewUrlParser: true });
        return client;
    }
    async getCollections(): Promise<any[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        return await db.listCollections().toArray();

    }
    async getCollectionData(collectionName: string): Promise<any[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection(collectionName);
        return await collection.find({}).limit(25).toArray();
    }
    async getDistinctYears(): Promise<number[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('teams');
        return await collection.distinct('yearID', {});

    }
    async getDistinctTeamsByYear(yearId: number): Promise<any[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('teams');
        return await collection.find({yearID: +yearId }).toArray();
    }
    async getAttendanceTrend(filter?: { name: string, value: string }): Promise<{ yearID: number, count: number }[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('homegames');
        const pipeline = [];
        if (filter) {
            pipeline.push({
                $match: {
                    'team.key': filter.value
                }
            })
        }
        pipeline.push(
            {
                $group: {
                    _id: '$year.key',
                    count: { $sum: '$attendance' }
                }
            }
        );
        pipeline.push(
            {
                $project: {
                    yearID: { $convert: { input: '$_id', to: 'int' } },
                    teamID: 'team.key',
                    count: 1,
                    _id: 0
                }
            }
        );
        pipeline.push(
            {
                $sort: {
                    'yearID': 1
                }
            }
        );
        const docs = await collection.aggregate(pipeline).toArray();
        await client.close();
        return docs;
    }
    async getCollectionCount(name: string): Promise<{ collection: string, count: number }> {
        // TODO: This is probably inaccurate without some type of distinct query
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection(name);
        const count = await collection.find().count();
        await client.close();
        return { collection: name, count: count };
    }
    async getPlayerRegionData(): Promise<{ country: string, count: number}[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('people');
        const docs = await collection.aggregate([
            {
                $group: {
                    _id: '$birthCountry',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    country: '$_id',
                    count: '$count',
                    _id: 0
                }
            }
        ]).toArray();
        await client.close();
        return docs;
    }
    async getTopHitters(filter?: { name: string, value: string }): Promise<ChadwickTopHitter[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('batting');
        const sort =  { $sort: { homeRuns: -1 } };
        const pipeline: any[] = [
            {
                $match: {
                    AB: { $gt: 0 }
                }
            },
            {
                $group: {
                    atBats: { $sum: '$AB' },
                    hits: { $sum: '$H' },
                    homeRuns: { $sum: '$HR' },
                    _id: '$playerID',
                }
            },
            {
                $lookup: {
                    from: 'people',
                    foreignField: 'playerID',
                    localField: '_id',
                    as: 'player'
                }
            },
            {
                $unwind: '$player'
            },
            {
                $project: {
                    atBats: '$atBats',
                    battingAverage: { $divide: ['$hits', '$atBats'] },
                    hits: '$hits',
                    homeRuns: '$homeRuns',
                    _id: 0,
                    name: { $concat: ['$player.nameFirst', ' ', '$player.nameLast'] },
                    birthCountry: '$player.birthCountry',
                    playerID: '$_id'
                }
            }
        ];
        if (filter) {
            pipeline.push({ $match: { birthCountry: filter.value } });
        }
        pipeline.push(sort);
        const docs: any[] = await collection.aggregate(pipeline).limit(20).toArray();
        await client.close();
        return docs.map( d => new ChadwickTopHitter(
            d.atBats,
            d.battingAverage,
            d.birthCountry,
            d.hits,
            d.homeRuns,
            d.name,
            d.playerID
        ));
    }
    async getOldestFranchises(filter?: { name: string, value: string }): Promise<ChadwickOldFranchise[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('teams');
        const docs = await collection.aggregate([
            {
              $match: {
                  $and: [
                      { W: { $gt: 0 } },
                      { G: { $gt: 0 } }
                  ]
              }
            },
            {
                $group: {
                    _id: '$franchID',
                    count: { $sum: 1 },
                    wins: { $sum: '$W' },
                    games: { $sum: '$G' },
                    name: { $last: '$name' },
                    park: { $last: '$park' }
                }
            },
            {
                $lookup: {
                    from: 'parks',
                    localField: 'park',
                    foreignField: 'park.name',
                    as: 'ballpark'
                }
            },
            {
                $project: {
                    count: 1,
                    wins: '$wins',
                    games: '$games',
                    winPercentage: { $multiply: [{ $divide: ['$wins', '$games'] }, 100] },
                    name: 1,
                    park: 1,
                    ballpark: '$ballpark',
                    _id: 0
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]).limit(10).toArray();
        await client.close();
        return docs.map( d => new ChadwickOldFranchise(
            d.count,
            d.games,
            d.name,
            d.park,
            d.winPercentage,
            d.wins
        ));
    }
    async getTopWorldSeriesWinners(): Promise<{ count: number, name: string }[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('teams');
        const docs = await collection.aggregate([
            {
                $match: {
                    WSWin: 'Y'
                }
            },
            {
                $group: {
                    _id: '$teamID',
                    count: { $sum: 1 },
                    name: { $last: '$name' },
                    franchID: { $last: '$teamID' }
                }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]).limit(10).toArray();
        await client.close();
        return docs;
    }
    async getPlayerAutocompleteList(term: string): Promise<ChadwickPlayerSearchResult[]> {
        let docs = [];
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('people');
        if (term) {
            docs = await collection.aggregate([
                {
                    $match: {
                        $text: {
                            $search: term,
                            $caseSensitive: false
                        }
                    }
                },
                {
                  $lookup: {
                      from: 'appearances',
                      localField: 'playerID',
                      foreignField: 'playerID',
                      as: 'appearances'
                  }
                },
                {
                  $project: {
                      playerID: 1,
                      name: { $concat: ['$nameFirst', ' ', '$nameLast'] },
                      birthState: '$birthState',
                      birthCountry: 1,
                      debut: 1,
                      finalGame: 1,
                      teams: '$appearances.teamID',
                      _id: 0
                  }
                },
                {
                    $sort: {
                        score: { $meta: 'textScore' }
                    }
                }
            ]).limit( 25 ).toArray();
        }
        await client.close();
        return docs.map( d => new ChadwickPlayerSearchResult(d));
    }
    async getPlayerStats(playerID: string): Promise<PlayerDetail> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('people');
        const docs = await collection.aggregate([
            {
                $match: {
                    playerID: playerID
                }
            },
            {
                $lookup: {
                    from: 'batting',
                    localField: 'playerID',
                    foreignField: 'playerID',
                    as: 'batting'
                }
            },
            {
                $lookup: {
                    from: 'fielding',
                    localField: 'playerID',
                    foreignField: 'playerID',
                    as: 'fielding'
                }
            },
            {
                $lookup: {
                    from: 'pitching',
                    localField: 'playerID',
                    foreignField: 'playerID',
                    as: 'pitching'
                }
            },
            {
                $lookup: {
                    from: 'salaries',
                    localField: 'playerID',
                    foreignField: 'playerID',
                    as: 'salaries'
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).toArray();
        await client.close();
        const doc = docs[0];
        return new PlayerDetail(
            doc.playerID,
            doc.birthYear,
            doc.birthMonth,
            doc.birthDay,
            doc.birthCountry,
            doc.birthState,
            doc.birthCity,
            doc.deathYear,
            doc.deathMonth,
            doc.deathDay,
            doc.deathCountry,
            doc.deathState,
            doc.deathCity,
            doc.nameFirst,
            doc.nameLast,
            doc.nameGiven,
            doc.weight,
            doc.height,
            doc.bats,
            doc.throws,
            doc.debut,
            doc.finalGame,
            doc.retroID,
            doc.bbrefID,
            doc.batting,
            doc.pitching,
            doc.fielding,
            doc.salaries
        );
    }
}

new ChadwickApi();