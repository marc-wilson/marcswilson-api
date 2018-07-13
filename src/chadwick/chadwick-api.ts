import { MongoClient } from 'mongodb';
import { ChadwickCounts } from './models/chadwick-counts';
import { ChadwickTopHitter } from './models/chadwick-top-hitter';
import { ChadwickOldFranchise } from './models/chadwick-old-franchise';

export class ChadwickApi {
    private _express: any;
    private _request: any;
    private _router: any;
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
        this._router.get('/players/region', async (req, res) => {
            const result: { country: string, count: number }[] = await this.getPlayerRegionData();
            res.status(200).json(result);
        });
        this._router.get('/players/top-hitters', async (req, res) => {
            const result = await this.getTopHitters();
            res.status(200).json(result);
        });
        this._router.get('/franchise/oldest', async (req, res) => {
            const result = await this.getOldestFranchises();
            res.status(200).json(result);
        });
        this._router.get('/worldseries/wins', async (req, res) => {
            const result = await this.getTopWorldSeriesWinners();
            res.status(200).json(result);
        });
        this._router.get('/homegames/attendance', async (req, res) => {
           const result = await this.getAttentanceTrend();
           res.status(200).json(result);
        });
        this._router.get('/players/search/', async (req, res) => {
            const results = await this.getPlayerAutocompleteList();
            res.status(200).json(results);
        });
        this._router.get('/players/search/:term', async (req, res) => {
            const term = req.params.term;
            const results = await this.getPlayerAutocompleteList(term);
            res.status(200).json(results);
        });
        this._router.get('/players/compare/:player1ID/:player2ID', async (req, res) => {
            const player1ID = req.params.player1ID;
            const player2ID = req.params.player2ID;
            const data = await Promise.all([this.getPlayerStats(player1ID), this.getPlayerStats(player2ID)]);
            res.status(200).json(data);
        });

        module.exports = this._router;
    }

    async connect(): Promise<MongoClient> {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        return client;
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
    async getTopHitters(): Promise<ChadwickTopHitter[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('batting');
        const docs: any[] = await collection.aggregate([
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
                    playerID: '$_id'
                }
            },
            {
                $sort: {
                    homeRuns: -1
                }
            }
        ]).limit(20).toArray();
        await client.close();
        return docs.map( d => new ChadwickTopHitter(
            d.atBats,
            d.battingAverage,
            d.hits,
            d.homeRuns,
            d.name,
            d.playerID
        ));
    }
    async getOldestFranchises(): Promise<ChadwickOldFranchise[]> {
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
                    name: { $last: '$name' }
                }
            },
            {
                $project: {
                    count: 1,
                    wins: '$wins',
                    games: '$games',
                    winPercentage: { $multiply: [{ $divide: ['$wins', '$games'] }, 100] },
                    name: 1,
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
                    name: { $last: '$name' }
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
    async getAttentanceTrend(): Promise<{ yearID: number, count: number }[]> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('homegames');
        const docs = await collection.aggregate([
            {
                $group: {
                    _id: '$year.key',
                    count: { $sum: '$attendance' }
                }
            },
            {
                $project: {
                    yearID: { $convert: { input: '$_id', to: 'int' } },
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    'yearID': 1
                }
            }
        ]).toArray();
        await client.close();
        return docs;
    }
    async getPlayerAutocompleteList(term?: string) {
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
                      name: { $concat: [ '$nameFirst', ' ', '$nameLast'] },
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
        } else {
            docs = await collection.aggregate([
                {
                    $project: {
                        playerID: 1,
                        name: { $concat: [ '$nameFirst', ' ', '$nameLast'] }
                    }
                },
                {
                    $sort: {
                        name: 1
                    }
                }
            ]).limit(25).toArray();
        }
        await client.close();
        return docs;
    }
    async getPlayerStats(playerID: string) {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('people');
        const data = await collection.aggregate([
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
            }
        ]).toArray();
        await client.close();
        if (data.length === 1) {
            return { playerID: playerID, data: data[ 0 ] };
        } else {
            console.error('SCENARIO NOT COVERED');
            debugger;
        }
    }

}

new ChadwickApi();