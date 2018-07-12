interface IChadwickTopHitter {
    atBats: number;
    battingAverage: number;
    hits: number;
    homeRuns: number;
    name: string;
    playerID: string;
}

export class ChadwickTopHitter implements IChadwickTopHitter {
    public atBats: number;
    public battingAverage: number;
    public hits: number;
    public homeRuns: number;
    public name: string;
    public playerID: string;
    constructor(_ab?: number, _ba?: number, _h?: number, _hr?: number, _name?: string, _id?: string) {
        this.atBats = _ab;
        this.battingAverage = _ba;
        this.hits = _h;
        this.homeRuns = _hr;
        this.name = _name;
        this.playerID = _id;
    }
}
