interface IChadwickOldFranchise {
    count: number;
    games: number;
    name: string;
    park: string;
    winPercentage: number;
    wins: number;
}

export class ChadwickOldFranchise implements IChadwickOldFranchise {
    public count: number;
    public games: number;
    public name: string;
    public park: string;
    public winPercentage: number;
    public wins: number;
    constructor(_count?: number, _games?: number, _name?: string, _park?: string, _winPercentage?: number, _wins?: number) {
        this.count = _count;
        this.games = _games;
        this.name = _name;
        this.park = _park;
        this.winPercentage = _winPercentage;
        this.wins = _wins;
    }
}