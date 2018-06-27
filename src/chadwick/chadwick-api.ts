import { MongoClient } from 'mongodb';
import { ChadwickCounts } from './ChadwickCounts';

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
            const result = await this.getPlayerRegionData();
            res.status(200).json(result);
        });
        this._router.get('/players/top-hitters', async (req, res) => {
            const result = await this.getTopHomerunHitters();
            res.status(200).json(result);
        });

        module.exports = this._router;
    }

    async connect(): Promise<MongoClient> {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        return client;
    }
    async getCollectionCount(name: string): Promise<{ collection: string, count: number }> {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection(name);
        const count = await collection.find().count();
        await client.close();
        return { collection: name, count: count };
    }
    async getPlayerRegionData() {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('people');
        const docs = await collection.aggregate([
            {
                $group: {
                    _id: '$birthCountry',
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
        await client.close();
        return docs;
    }
    async getTopHomerunHitters() {
        const client = await this.connect();
        const db = client.db(this.databaseName);
        const collection = db.collection('batting');
        const docs = collection.aggregate([
            {
              $match: {
                  AB: { $gt: 0 }
              }
            },
            {
                $group: {
                    _id: '$playerID',
                    H: { $sum: '$H' },
                    AB: { $sum: '$AB' },
                    HR: { $sum: '$HR' }
                }
            },
            {
                $project: {
                    H: 1,
                    AB: 1,
                    HR: 1,
                    BA: { $divide: ['$H', '$AB'] }
                }
            },
            {
                $sort: {
                    HR: -1
                }
            }
        ]).limit(10).toArray();
        return docs;
    }

}

new ChadwickApi();