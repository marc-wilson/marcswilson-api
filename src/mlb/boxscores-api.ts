import { Boxscores } from './models/boxscores';

export class BoxscoresApi {
    private _express: any;
    private _request: any;
    private _router: any;
    private readonly BOXSCORES_URL: string;
    constructor() {
        this.BOXSCORES_URL = 'http://gd2.mlb.com/components/game/mlb';
        this._express = require('express');
        this._request = require('request-promise-native');
        this._router = this._express.Router();

        this._router.get('/', async (req, res) => {
            const scores = await this.getTodaysBoxscores();
            res.status(200).json(scores);
        });

        module.exports = this._router;
    }

    async getTodaysBoxscores(): Promise<Boxscores> {
        const boxscores = await this.getBoxscoresByDate(new Date());
        return boxscores;
    }
    async getBoxscoresByDate(date: Date): Promise<Boxscores> {
        const year = date.getFullYear();
        const _month = date.getMonth() + 1;
        const month = _month < 10 ? `0${_month}` : _month;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const url = `${this.BOXSCORES_URL}/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;
        const res = await this._request.get(url);
        const json = JSON.parse(res);
        const boxscores = new Boxscores(json.data);
        return boxscores.sort();
    }
}

new BoxscoresApi();