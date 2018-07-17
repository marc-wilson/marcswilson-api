interface IChadwickBattingStats {
  playerID: string;
  yearID: number;
  stint: number;
  teamID: string;
  lgID: string;
  G: number;
  AB: number;
  R: number;
  H: number;
  '2B': number;
  '3B': number;
  HR: number;
  RBI: number;
  SB: number;
  CS: number;
  BB: number;
  SO: number;
  IBB: number;
  HBP: number;
  SH: number;
  SF: number;
  GIDP: number;
}

export class ChadwickBattingStats implements IChadwickBattingStats {
  public playerID: string;
  public yearID: number;
  public stint: number;
  public teamID: string;
  public lgID: string;
  public G: number;
  public AB: number;
  public R: number;
  public H: number;
  public '2B': number;
  public '3B': number;
  public HR: number;
  public RBI: number;
  public SB: number;
  public CS: number;
  public BB: number;
  public SO: number;
  public IBB: number;
  public HBP: number;
  public SH: number;
  public SF: number;
  public GIDP: number;
  constructor(
    _playerID: string,
    _yearID: number,
    _stint: number,
    _teamID: string,
    _lgID: string,
    _G: number,
    _AB: number,
    _R: number,
    _H: number,
    _2B: number,
    _3B: number,
    _HR: number,
    _RBI: number,
    _SB: number,
    _CS: number,
    _BB: number,
    _SO: number,
    _IBB: number,
    _HBP: number,
    _SH: number,
    _SF: number,
    _GIDP: number
  ) {
  this.playerID = _playerID;
  this.yearID = _yearID;
  this.stint = _stint;
  this.teamID = _teamID;
  this.lgID = _lgID;
  this.G = _G;
  this.AB = _AB;
  this.R = _R;
  this.H = _H;
  this['2B'] = _2B;
  this['3B'] = _3B;
  this.HR = _HR;
  this.RBI = _RBI;
  this.SB = _SB;
  this.CS = _CS;
  this.BB = _BB;
  this.SO = _SO;
  this.IBB = _IBB;
  this.HBP = _HBP;
  this.SH = _SH;
  this.SF = _SF;
  this.GIDP = _GIDP;
  }
}
