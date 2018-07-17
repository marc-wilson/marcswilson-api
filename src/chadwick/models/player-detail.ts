import { ChadwickBattingStats } from './chadwick-batting-stats';
import { ChadwickFieldingStats } from './chadwick-fielding-stats';
import { ChadwickPitchingStats } from './chadwick-pitching-stats';
import { ChadwickPlayerSalary } from './chadwick-player-salary';


interface IPlayerDetail {
  playerID: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthCountry: string;
  birthState: string;
  birthCity: string;
  deathYear: number;
  deathMonth: number;
  deathDay: string;
  deathCountry: string;
  deathState: string;
  deathCity: string;
  nameFirst: string;
  nameLast: string;
  nameGiven: string;
  fullName: string;
  weight: number;
  height: number;
  bats: string;
  throws: string;
  debut: Date;
  finalGame: Date;
  retroID: string;
  bbrefID: string;
  batting: ChadwickBattingStats[];
  pitching: ChadwickPitchingStats[];
  fielding: ChadwickFieldingStats[];
  salaries: ChadwickPlayerSalary[];
}

export class PlayerDetail implements IPlayerDetail {
  public playerID: string;
  public birthYear: number;
  public birthMonth: number;
  public birthDay: number;
  public birthCountry: string;
  public birthState: string;
  public birthCity: string;
  public deathYear: number;
  public deathMonth: number;
  public deathDay: string;
  public deathCountry: string;
  public deathState: string;
  public deathCity: string;
  public nameFirst: string;
  public nameLast: string;
  public nameGiven: string;
  public fullName: string;
  public weight: number;
  public height: number;
  public bats: string;
  public throws: string;
  public debut: Date;
  public finalGame: Date;
  public retroID: string;
  public bbrefID: string;
  public batting: any[];
  public pitching: any[];
  public fielding: any[];
  public salaries: any[];
  constructor(
    _playerID: string,
    _birthYear: number,
    _birthMonth: number,
    _birthDay: number,
    _birthCountry: string,
    _birthState: string,
    _birthCity: string,
    _deathYear: number,
    _deathMonth: number,
    _deathDay: string,
    _deathCountry: string,
    _deathState: string,
    _deathCity: string,
    _nameFirst: string,
    _nameLast: string,
    _nameGiven: string,
    _weight: number,
    _height: number,
    _bats: string,
    _throws: string,
    _debut: Date,
    _finalGame: Date,
    _retroID: string,
    _bbrefID: string,
    _batting: ChadwickBattingStats[],
    _pitching: ChadwickPitchingStats[],
    _fielding: ChadwickFieldingStats[],
    _salaries: ChadwickPlayerSalary[]
  ) {
    this.playerID = _playerID;
    this.birthYear = _birthYear;
    this.birthMonth = _birthMonth;
    this.birthDay = _birthDay;
    this.birthCountry = _birthCountry;
    this.birthState = _birthState;
    this.birthCity = _birthCity;
    this.deathYear = _deathYear;
    this.deathMonth = _deathMonth;
    this.deathDay = _deathDay;
    this.deathCountry = _deathCountry;
    this.deathState = _deathState;
    this.deathCity = _deathCity;
    this.nameFirst = _nameFirst;
    this.nameLast = _nameLast;
    this.nameGiven = _nameGiven;
    this.fullName = `${this.nameFirst} ${this.nameLast}`;
    this.weight = _weight;
    this.height = _height;
    this.bats = _bats;
    this.throws = _throws;
    this.debut = _debut;
    this.finalGame = _finalGame;
    this.retroID = _retroID;
    this.bbrefID = _bbrefID;
    this.batting = _batting.map( b => new ChadwickBattingStats(
      b.playerID,
      b.yearID,
      b.stint,
      b.teamID,
      b.lgID,
      b.G,
      b.AB,
      b.R,
      b.H,
      b['2B'],
      b['3B'],
      b.HR,
      b.RBI,
      b.SB,
      b.CS,
      b.BB,
      b.SO,
      b.IBB,
      b.HBP,
      b.SH,
      b.SF,
      b.GIDP
    ));
    this.fielding = _fielding.map( f => new ChadwickFieldingStats(
      f.playerID,
      f.yearID,
      f.stint,
      f.teamID,
      f.lgID,
      f.POS,
      f.G,
      f.GS,
      f.InnOuts,
      f.PO,
      f.A,
      f.E,
      f.DP,
      f.PB,
      f.WP,
      f.SB,
      f.CS,
      f.ZR
    ));
    this.pitching = _pitching.map( p => new ChadwickPitchingStats(
      p.playerID,
      p.yearID,
      p.stint,
      p.teamID,
      p.lgID,
      p.W,
      p.L,
      p.G,
      p.GS,
      p.CG,
      p.SHO,
      p.SV,
      p.IPouts,
      p.H,
      p.ER,
      p.HR,
      p.BB,
      p.SO,
      p.BAOpp,
      p.ERA,
      p.IBB,
      p.WP,
      p.HBP,
      p.BK,
      p.BFP,
      p.GF,
      p.R,
      p.SH,
      p.SF,
      p.GIDP
    ));
    this.salaries = _salaries.map( s => new ChadwickPlayerSalary(
      s.yearID,
      s.teamID,
      s.lgID,
      s.playerID,
      s.salary
    ));
  }
}
