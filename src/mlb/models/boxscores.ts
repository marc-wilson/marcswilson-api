
export class Boxscores {
    public games: Game[];
    constructor(boxscores?) {
        if (boxscores) {
            this.games = boxscores.games.game.map( g => new Game(g) );
        }
    }
    sort(): Boxscores {
        this.games.sort( (g1, g2) => {
            if (g1.status.status > g2.status.status) {
                return 1;
            }
            if (g1.status.status < g2.status.status) {
                return -1;
            }
            return 0;
        } );
        return this;
    }
}

export class Game {
    public away_name_abbrev: string;
    public away_team_name: string;
    public home_name_abbrev: string;
    public home_team_name: string;
    public linescore: LineScore;
    public status: Status;
    public runners_on_base: RunnersOnBase;
    public time: string;
    public time_zone: string;
    constructor(game?) {
        if (game) {
            this.away_name_abbrev = game.away_name_abbrev;
            this.away_team_name = game.away_team_name;
            this.home_name_abbrev = game.home_name_abbrev;
            this.home_team_name = game.home_team_name;
            this.linescore = new LineScore(game.linescore);
            this.status = new Status(game.status);
            this.runners_on_base = new RunnersOnBase(game.runners_on_base);
            this.time = game.time;
            this.time_zone = game.time_zone;
        }
    }
}

export class Status {
    public status: string;
    public b: string;
    public inning: string;
    public o: string;
    public s: string;
    public inning_state: string;
    constructor(status?) {
        if (status) {
            this.status = status.status;
            this.b = status.b;
            this.inning = status.inning;
            this.o = status.o;
            this.s = status.s;
            this.inning_state = status.inning_state;
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

export class RunnersOnBase {
    public status: string;
    public runner_on_1b: Runner;
    public runner_on_2b: Runner;
    public runner_on_3b: Runner;
    constructor(runnersOnBase?) {
        if (runnersOnBase) {
            this.status = runnersOnBase.status;
            this.runner_on_1b = runnersOnBase.runner_on_1b ? new Runner(runnersOnBase.runner_on_1b) : null;
            this.runner_on_2b = runnersOnBase.runner_on_2b ? new Runner(runnersOnBase.runner_on_2b) : null;
            this.runner_on_3b = runnersOnBase.runner_on_3b ? new Runner(runnersOnBase.runner_on_3b) : null;
        }
    }
}

export class Runner {
    public first: string;
    public id: string;
    public last: string;
    public name_display_roster: string;
    public number: string;
    constructor(runner?) {
        if (runner) {
            this.first = runner.first;
            this.id = runner.id;
            this.last = runner.last;
            this.name_display_roster = runner.name_display_roster;
            this.number = runner.number;
        }
    }
}