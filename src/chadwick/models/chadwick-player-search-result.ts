interface IChadwickPlayerSearchResult {
    name: string;
    playerID: string,
    teams: string[];
}

export class ChadwickPlayerSearchResult implements IChadwickPlayerSearchResult {
    public name: string;
    public playerID: string;
    public teams: string[];
    constructor(_name: string, _playerID: string, _teams: string[]) {
        this.name = _name;
        this.playerID = _playerID;
        this.teams = _teams;
    }
}