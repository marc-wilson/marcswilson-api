interface IChadwickFieldingStats {
  playerID: string;
  yearID: number;
  stint: number;
  teamID: string;
  lgID: string;
  POS: string;
  G: number;
  GS: number;
  InnOuts: number;
  PO: number;
  A: number;
  E: number;
  DP: number;
  PB: number;
  WP: number;
  SB: number;
  CS: number;
  ZR: number;
}

export class ChadwickFieldingStats implements IChadwickFieldingStats {
  public playerID: string;
  public yearID: number;
  public stint: number;
  public teamID: string;
  public lgID: string;
  public POS: string;
  public G: number;
  public GS: number;
  public InnOuts: number;
  public PO: number;
  public A: number;
  public E: number;
  public DP: number;
  public PB: number;
  public WP: number;
  public SB: number;
  public CS: number;
  public ZR: number;
  constructor(
    _playerID: string,
    _yearID: number,
    _stint: number,
    _teamID: string,
    _lgID: string,
    _POS: string,
    _G: number,
    _GS: number,
    _InnOuts: number,
    _PO: number,
    _A: number,
    _E: number,
    _DP: number,
    _PB: number,
    _WP: number,
    _SB: number,
    _CS: number,
    _ZR: number
  ) {
    this.playerID = _playerID;
    this.yearID = _yearID;
    this.stint = _stint;
    this.teamID = _teamID;
    this.lgID = _lgID;
    this.POS = _POS;
    this.G = _G;
    this.GS = _GS;
    this.InnOuts = _InnOuts;
    this.PO = _PO;
    this.A = _A;
    this.E = _E;
    this.DP = _DP;
    this.PB = _PB;
    this.WP = _WP;
    this.SB = _SB;
    this.CS = _CS;
    this.ZR = _ZR;
  }
}
