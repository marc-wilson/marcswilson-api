interface IChadwickPlayerSearchResult {
    name: string;
    playerID: string,
    teams: string[];
    debut: Date;
    finalGame: Date;
    birthState: string;
    birthCountry: string;
}

export class ChadwickPlayerSearchResult implements IChadwickPlayerSearchResult {
    public name: string;
    public playerID: string;
    public teams: string[];
    public debut: Date;
    public finalGame: Date;
    public birthState: string;
    public birthCountry: string;
    constructor(result: IChadwickPlayerSearchResult) {
        this.name = result.name;
        this.playerID = result.playerID;
        this.teams = this.getUniqueTeams(result.teams);
        this.debut = new Date(result.debut);
        this.finalGame = new Date(result.finalGame);
        this.birthState = result.birthState;
        this.birthCountry = result.birthCountry;
    }
    getUniqueTeams(teams: string[]): string[] {
        const ret = [];
        teams.forEach( t => {
            if (!ret.find( _t => t === _t )) {
                ret.push(t);
            }
        });
        return ret;
    }
}