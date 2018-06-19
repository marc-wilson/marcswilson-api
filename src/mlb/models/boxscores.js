"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Boxscores = /** @class */ (function () {
    function Boxscores(boxscores) {
        if (boxscores) {
            this.games = boxscores.games.game.map(function (g) { return new Game(g); });
        }
    }
    return Boxscores;
}());
exports.Boxscores = Boxscores;
var Game = /** @class */ (function () {
    function Game(game) {
        if (game) {
            this.away_name_abbrev = game.away_name_abbrev;
            this.away_team_name = game.away_team_name;
            this.home_name_abbrev = game.home_name_abbrev;
            this.home_team_name = game.home_team_name;
            this.linescore = new LineScore(game.linescore);
            this.status = new Status(game.status);
        }
    }
    return Game;
}());
exports.Game = Game;
var Status = /** @class */ (function () {
    function Status(status) {
        if (status) {
            this.status = status.status;
        }
    }
    return Status;
}());
exports.Status = Status;
var LineScore = /** @class */ (function () {
    function LineScore(linescore) {
        if (linescore) {
            this.r = linescore.r;
            this.h = linescore.h;
            this.e = linescore.e;
        }
    }
    return LineScore;
}());
exports.LineScore = LineScore;
//# sourceMappingURL=boxscores.js.map