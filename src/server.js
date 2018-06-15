"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiTest = require("./app");
var Server = /** @class */ (function () {
    function Server() {
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
    }
    return Server;
}());
new Server();
//# sourceMappingURL=server.js.map