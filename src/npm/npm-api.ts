import { environment } from '../environments/environment';
import { NpmPackage } from '../mlb/models/NpmPackage';

export class NpmApi {
    private readonly _express: any;
    private readonly _request: any;
    private readonly _router: any;
    constructor() {
        this._express = require('express');
        this._request = require('request-promise-native');
        this._router = this._express.Router();

        this._router.get('/:packageName', async (req, res) => {
            const packageName = req.params.packageName;
            const pkg = await this.getNpmPackageMeta(packageName);
            res.json(pkg);
        });

        module.exports = this._router;
    }
    async getNpmPackageMeta(packageName: string): Promise<NpmPackage> {
        const response = await this._request.get(`${environment.npm.api}/${packageName}`);
        return new NpmPackage(JSON.parse(response));
    }
}
new NpmApi();