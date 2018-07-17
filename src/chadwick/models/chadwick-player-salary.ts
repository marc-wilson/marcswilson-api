interface IChadiwckPlayerSalary {
  yearID: number;
  teamID: string;
  lgID: string;
  playerID: string;
  salary: number;
}

export class ChadwickPlayerSalary implements IChadiwckPlayerSalary {
  public yearID: number;
  public teamID: string;
  public lgID: string;
  public playerID: string;
  public salary: number;
  constructor(
    _yearID: number,
    _teamID: string,
    _lgID: string,
    _playerID: string,
    _salary: number
  ) {
    this.yearID = _yearID;
    this.teamID = _teamID;
    this.lgID = _lgID;
    this.playerID = _playerID;
    this.salary = _salary;
  }
}
