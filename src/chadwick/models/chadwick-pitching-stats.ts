interface IChadwickPitchingStats {
  playerID: string;
  yearID: number;
  stint: number;
  teamID: string;
  lgID: string;
  W: number;
  L: number;
  G: number;
  GS: number;
  CG: number;
  SHO: number;
  SV: number;
  IPouts: number;
  H: number;
  ER: number;
  HR: number;
  BB: number;
  SO: number;
  BAOpp: string;
  ERA: string;
  IBB: number;
  WP: number;
  HBP: number;
  BK: number;
  BFP: number;
  GF: number;
  R: number;
  SH: number;
  SF: number;
  GIDP: number;
}

export class ChadwickPitchingStats implements IChadwickPitchingStats {
  public playerID: string;
  public yearID: number;
  public stint: number;
  public teamID: string;
  public lgID: string;
  public W: number;
  public L: number;
  public G: number;
  public GS: number;
  public CG: number;
  public SHO: number;
  public SV: number;
  public IPouts: number;
  public H: number;
  public ER: number;
  public HR: number;
  public BB: number;
  public SO: number;
  public BAOpp: string;
  public ERA: string;
  public IBB: number;
  public WP: number;
  public HBP: number;
  public BK: number;
  public BFP: number;
  public GF: number;
  public R: number;
  public SH: number;
  public SF: number;
  public GIDP: number;
  constructor (
    _playerID: string,
    _yearID: number,
    _stint: number,
    _teamID: string,
    _lgID: string,
    _W: number,
    _L: number,
    _G: number,
    _GS: number,
    _CG: number,
    _SHO: number,
    _SV: number,
    _IPouts: number,
    _H: number,
    _ER: number,
    _HR: number,
    _BB: number,
    _SO: number,
    _BAOpp: string,
    _ERA: string,
    _IBB: number,
    _WP: number,
    _HBP: number,
    _BK: number,
    _BFP: number,
    _GF: number,
    _R: number,
    _SH: number,
    _SF: number,
    _GIDP: number
  ) {
    this.playerID = _playerID;
    this.yearID = _yearID;
    this.stint = _stint;
    this.teamID = _teamID;
    this.lgID = _lgID;
    this.W = _W;
    this.L = _L;
    this.G = _G;
    this.GS = _GS;
    this.CG = _CG;
    this.SHO = _SHO;
    this.SV = _SV;
    this.IPouts = _IPouts;
    this.H = _H;
    this.ER = _ER;
    this.HR = _HR;
    this.BB = _BB;
    this.SO = _SO;
    this.BAOpp = _BAOpp;
    this.ERA = _ERA;
    this.IBB = _IBB;
    this.WP = _WP;
    this.HBP = _HBP;
    this.BK = _BK;
    this.BFP = _BFP;
    this.GF = _GF;
    this.R = _R;
    this.SH = _SH;
    this.SF = _SF;
    this.GIDP = _GIDP;
  }
}
