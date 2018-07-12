interface IChadwickCounts {
    attendance: number;
    ballparks: number;
    people: number;
    teams: number;
}

export class ChadwickCounts implements IChadwickCounts {
    public attendance: number;
    public ballparks: number;
    public people: number;
    public teams: number;
    constructor(_counts: { collection: string, count: number }[]) {
        if (_counts) {
            this.attendance = _counts.find( c => c.collection === 'homegames' ).count;
            this.ballparks = _counts.find( c => c.collection === 'parks' ).count;
            this.people = _counts.find( c => c.collection === 'people' ).count;
            this.teams = _counts.find( c => c.collection === 'teams' ).count;
        }
    }
}