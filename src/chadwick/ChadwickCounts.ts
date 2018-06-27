export class ChadwickCounts {
    public people: number;
    public teams: number;
    public ballparks: number;
    public attendance: number
    constructor(_counts: { collection: string, count: number }[]) {
        if (_counts) {
            this.people = _counts.find( c => c.collection === 'people' ).count;
            this.teams = _counts.find( c => c.collection === 'teams' ).count;
            this.ballparks = _counts.find( c => c.collection === 'parks' ).count;
            this.attendance = _counts.find( c => c.collection === 'homegames' ).count;
        }
    }
}