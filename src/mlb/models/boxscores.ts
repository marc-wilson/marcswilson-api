
export class Boxscores {
    public games: Game[];
    constructor(boxscores?) {
        if (boxscores) {
            this.games = boxscores.games.game.map( g => new Game(g) );
        }
    }
}

export class Game {
    public away_name_abbrev: string;
    public away_team_name: string;
    public home_name_abbrev: string;
    public home_team_name: string;
    public linescore: LineScore;
    public status: Status;
    constructor(game?) {
        if (game) {
            this.away_name_abbrev = game.away_name_abbrev;
            this.away_team_name = game.away_team_name;
            this.home_name_abbrev = game.home_name_abbrev;
            this.home_team_name = game.home_team_name;
            this.linescore = new LineScore(game.linescore);
            this.status = new Status(game.status);
        }
    }
}

export class Status {
    public status: string;
    constructor(status?) {
        if (status) {
            this.status = status.status;
        }
    }
}

export class LineScore {
    public r: { away: string, diff: string, home: string };
    public h: { away : string, home: string };
    public e: { away : string, home: string };
    constructor(linescore?) {
        if (linescore) {
            this.r = linescore.r;
            this.h = linescore.h;
            this.e = linescore.e;
        }
    }
}