import * as ApiTest from './app';
import * as BoxscoresApi from './mlb/boxscores-api';
import * as GeoApi from './geo/geo-api';
import * as ChadwickApi from './chadwick/chadwick-api';

class Server {
    private _express: any;
    private _app: any;
    private _bodyParser: any;
    private _path: any;
    private _server: any;
    private _cors: any;
    constructor() {
        this._cors = require('cors');
        this._express = require('express');
        this._app = this._express();
        this._bodyParser = require('body-parser');
        this._path = require('path');
        this._server = require('http').createServer(this._app);
        this._server.listen(process.env.PORT || 3000);
        this._app.use(this._bodyParser.urlencoded({ extended: true }));
        this._app.use(this._bodyParser.json());
        this._app.use(this._express.static(this._path.join(__dirname + './')));
        this._app.use(this._cors());
        this._app.use('/api', ApiTest);
        this._app.use('/api/mlb/boxscores', BoxscoresApi);
        this._app.use('/api/geo', GeoApi);
        this._app.use('/api/mlb/chadwick', ChadwickApi);
    }
}

new Server();