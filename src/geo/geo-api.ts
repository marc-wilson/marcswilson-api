
export class GeoApi {
    private _express: any;
    private _request: any;
    private _router: any;
    constructor() {
        this._express = require('express');
        this._request = require('request-promise-native');
        this._router = this._express.Router();

        this._router.get('/', async (req, res) => {
            const topo = await this.getUSTopoJson();
            res.status(200).json(topo);
        });

        module.exports = this._router;
    }
    async getUSTopoJson(): Promise<any> {
        const topo = await this._request.get('https://bl.ocks.org/mbostock/raw/4090846/us.json');
        return JSON.parse(topo);
    }
}

new GeoApi();