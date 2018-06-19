"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var boxscores_1 = require("./models/boxscores");
var BoxscoresApi = /** @class */ (function () {
    function BoxscoresApi() {
        var _this = this;
        this.BOXSCORES_URL = 'http://gd2.mlb.com/components/game/mlb';
        this._express = require('express');
        this._request = require('request-promise-native');
        this._router = this._express.Router();
        this._router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var scores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTodaysBoxscores()];
                    case 1:
                        scores = _a.sent();
                        res.status(200).json(scores);
                        return [2 /*return*/];
                }
            });
        }); });
        module.exports = this._router;
    }
    BoxscoresApi.prototype.getTodaysBoxscores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boxscores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBoxscoresByDate(new Date())];
                    case 1:
                        boxscores = _a.sent();
                        return [2 /*return*/, boxscores];
                }
            });
        });
    };
    BoxscoresApi.prototype.getBoxscoresByDate = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var year, _month, month, day, url, res, json, boxscores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        year = date.getFullYear();
                        _month = date.getMonth() + 1;
                        month = _month < 10 ? "0" + _month : _month;
                        day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                        url = this.BOXSCORES_URL + "/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
                        return [4 /*yield*/, this._request.get(url)];
                    case 1:
                        res = _a.sent();
                        json = JSON.parse(res);
                        boxscores = new boxscores_1.Boxscores(json.data);
                        return [2 /*return*/, boxscores];
                }
            });
        });
    };
    return BoxscoresApi;
}());
exports.BoxscoresApi = BoxscoresApi;
new BoxscoresApi();
//# sourceMappingURL=boxscores-api.js.map