
export class ApiTest {
    private _express: any;
    private _request: any;
    private _router: any;
    constructor() {
        this._express = require('express');
        this._request = require('request');
        this._router = this._express.Router();

        this._router.get('/test', (req, res) => {
            res.json({test: 'ing 123'});
        });

        module.exports = this._router;
    }
}

new ApiTest();