"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiTest = /** @class */ (function () {
    function ApiTest() {
        this._express = require('express');
        this._request = require('request');
        this._router = this._express.Router();
        this._router.get('/test', function (req, res) {
            res.json({ test: 'ing 123' });
        });
        module.exports = this._router;
    }
    return ApiTest;
}());
exports.ApiTest = ApiTest;
new ApiTest();
//# sourceMappingURL=app.js.map