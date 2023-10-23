import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import styles from '../assets/css/styles';
import arrowDownImage from '../assets/img/arrowDownDark.png';
import arrowUpImage from '../assets/img/arrowUpDark.png';

class PD_Tab_Carrer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemno: 0,
      enableScroll: true,
      showDroupDown1: false,
      process: true,
      carrerAdded: false,
      droupDown1Selected: 'NHL',
      droupDown1Options: [],
      showDroupDown2: false,
      droupDown2Selected: 'Season',
      droupDown2Options: [
        { key: 1, droupDown: 2, name: 'Regular', selected: true },
        { key: 2, droupDown: 2, name: 'Playoffs' },
      ],
      showDroupDown3: false,
      droupDown3Selected: 'Time',
      droupDown3Options: [
        { key: 1, droupDown: 3, name: 'This Week', selected: true },
        { key: 2, droupDown: 3, name: 'Next Week' },
        { key: 3, droupDown: 3, name: 'This Month' },
        { key: 4, droupDown: 3, name: 'Next Month' },
      ],
      remainingGames: [],
      remainingGame: '',
      headings: [
        { key: 1, title: 'SEASON' },
        { key: 2, title: 'TEAM' },
        { key: 3, title: 'GP' },
        { key: 4, title: 'G' },
        { key: 5, title: 'A' },
        { key: 6, title: 'P' },
        { key: 7, title: '+/-' },
        { key: 8, title: 'S' },
        { key: 9, title: 'S%' },
        { key: 10, title: 'P/G' },
        { key: 11, title: 'PPG' },
        { key: 12, title: 'PPP' },
        { key: 13, title: 'SHG' },
        { key: 14, title: 'SHP' },
        { key: 15, title: 'GWG' },
        { key: 16, title: 'OTG' },
        { key: 17, title: 'MIN' },
        { key: 18, title: 'SPG' },
        { key: 19, title: 'FOW%' },
        { key: 20, title: 'PPT' },
        { key: 21, title: 'SHT' },
        { key: 22, title: 'PIM' },
        { key: 23, title: 'HITS' },
        { key: 24, title: 'BS' },
      ],
      headingsGoalies: [
        { key: 1, title: 'SEASON' },
        { key: 2, title: 'TEAM' },
        { key: 3, title: 'GP' },
        { key: 4, title: 'GS' },
        { key: 5, title: 'WINS' },
        { key: 6, title: 'LOSS' },
        { key: 7, title: 'OTL' },
        { key: 8, title: 'SA' },
        { key: 9, title: 'SV' },
        { key: 10, title: 'GA' },
        { key: 11, title: 'SV%' },
        { key: 12, title: 'GAA' },
        { key: 13, title: 'MIN' },
        { key: 14, title: 'SO' },
      ],
      leagues: [],
      leaguesPlayOffs: [],
      carrerData: {},
      carrerDataPlayOffs: {},
    };
    this._getSeasons = this._getSeasons.bind(this);
    this._getScore = this._getScore.bind(this);
    this._getHeadings = this._getHeadings.bind(this);
  }

  async componentWillMount() {
    var leagues = this.props.carrerData.leagues;
    var leaguesPlayOffs = this.props.carrerDataPlayOffs.leagues;
    var remainingGames = this.props.remainingGames;
    await this.setState({
      leagues,
      leaguesPlayOffs,
      remainingGames,
      remainingGame: remainingGames[0],
    });
    this.setLeagueOPtion(leagues);
    await this.manageRegular();
    await this.managePlayOffs();
  }

  managePlayOffs = async () => {
    var carrerDataPlayOffs = this.props.carrerDataPlayOffs;
    var playOffLeagues = this.props.carrerDataPlayOffs.leagues;
    var sumPlaysOffData = this.props.sumPlaysOffData;

    if (playOffLeagues !== undefined && sumPlaysOffData !== undefined) {
      this.setState({ leaguesPlayOffs: playOffLeagues });
      playOffLeagues = playOffLeagues.filter(this.onlyUnique);
      if (carrerDataPlayOffs !== undefined) {
        for (var i = 0; i < playOffLeagues.length; i++) {
          var SV = carrerDataPlayOffs.SV;
          var A = carrerDataPlayOffs.A;
          var GP = carrerDataPlayOffs.GP;
          var GS = carrerDataPlayOffs.GS;
          var G = carrerDataPlayOffs.G;
          var P = carrerDataPlayOffs.P;
          var PlusMinus = carrerDataPlayOffs.PlusMinus;
          var SPtage = carrerDataPlayOffs.SPtage;
          var S = carrerDataPlayOffs.S;
          var PIM = carrerDataPlayOffs.PIM;
          var Hits = carrerDataPlayOffs.Hits;
          var BS = carrerDataPlayOffs.BS;
          var PointsPerGame = carrerDataPlayOffs.PointsPerGame;
          var PowerplayGoals = carrerDataPlayOffs.PowerplayGoals;
          var PowerplayPoints = carrerDataPlayOffs.PowerplayPoints;
          var ShortHandedGoals = carrerDataPlayOffs.ShortHandedGoals;
          var ShortHandedPoints = carrerDataPlayOffs.ShortHandedPoints;
          var GameWinningGoals = carrerDataPlayOffs.GameWinningGoals;
          var OvertimeGoals = carrerDataPlayOffs.OvertimeGoals;
          var TimeOnIcePerGame = carrerDataPlayOffs.TimeOnIcePerGame;
          var ShiftsPerGame = carrerDataPlayOffs.ShiftsPerGame;
          var FaceoffWinPercentage = carrerDataPlayOffs.FaceoffWinPercentage;
          var PowerplayTimeOnIce = carrerDataPlayOffs.PowerplayTimeOnIce;
          var ShortHandedTimeOnIce = carrerDataPlayOffs.ShortHandedTimeOnIce;
          var PowerplayTimeOnIcePerGame =
            carrerDataPlayOffs.PowerplayTimeOnIcePerGame;
          var ShortHandedTimeOnIcePerGame =
            carrerDataPlayOffs.ShortHandedTimeOnIcePerGame;

          var evenTimeOnIce = carrerDataPlayOffs.evenTimeOnIce;
          var Wins = carrerDataPlayOffs.Wins;
          var Losses = carrerDataPlayOffs.Losses;
          var Ties = carrerDataPlayOffs.Ties;
          var OvertimeLosses = carrerDataPlayOffs.OvertimeLosses;
          var ShotsAgainst = carrerDataPlayOffs.ShotsAgainst;
          var Saves = carrerDataPlayOffs.Saves;
          var GoalsAgainst = carrerDataPlayOffs.GoalsAgainst;
          var GoalsAgainstAverage = carrerDataPlayOffs.GoalsAgainstAverage;
          var TimeOnIce = carrerDataPlayOffs.TimeOnIce;
          var Shutouts = carrerDataPlayOffs.Shutouts;
          var PenaltyMinutes = carrerDataPlayOffs.PenaltyMinutes;
          var PowerplayShots = carrerDataPlayOffs.PowerplayShots;
          var PowerplaySaves = carrerDataPlayOffs.PowerplaySaves;
          var PowerPlaySavePtage = carrerDataPlayOffs.PowerPlaySavePtage;
          var ShortHandedShots = carrerDataPlayOffs.ShortHandedShots;
          var ShortHandedSaves = carrerDataPlayOffs.ShortHandedSaves;
          var ShortHandedSavePercentage =
            carrerDataPlayOffs.ShortHandedSavePercentage;
        }

        if (this.state.carrerDataPlayOffs.seasons === undefined) {
          seasons = this.props.carrerDataPlayOffs.seasons.slice();

          seasons.push({
            key: seasons.length,
            length: seasons.length,
            value: 'CAREER',
            carrerDataPlayOffs: true,
          });

          team = this.props.carrerDataPlayOffs.team.slice();
          team.push({
            key: team.length,
            length: team.length,
            value: '-',
            carrerDataPlayOffs: true,
          });

          GP = this.props.carrerDataPlayOffs.GP.slice();
          this.addSumCareerPlaysOff(GP, sumPlaysOffData.GP[0]);

          GS = this.props.carrerDataPlayOffs.GS.slice();
          this.addSumCareer(GS, sumPlaysOffData.GS[0]);

          G = this.props.carrerDataPlayOffs.G.slice();
          this.addSumCareer(G, sumPlaysOffData.G[0]);

          A = this.props.carrerDataPlayOffs.A.slice();
          this.addSumCareer(A, sumPlaysOffData.A[0]);

          P = this.props.carrerDataPlayOffs.P.slice();
          this.addSumCareer(P, sumPlaysOffData.P[0]);

          S = this.props.carrerDataPlayOffs.S.slice();
          this.addSumCareer(S, sumPlaysOffData.S[0]);

          PlusMinus = this.props.carrerDataPlayOffs.PlusMinus.slice();
          this.addSumCareer(PlusMinus, sumPlaysOffData.PlusMinus[0]);

          SPtage = this.props.carrerDataPlayOffs.SPtage.slice();
          this.addSumCareer(SPtage, sumPlaysOffData.SPtage[0]);

          PIM = this.props.carrerDataPlayOffs.PIM.slice();
          this.addSumCareer(PIM, sumPlaysOffData.PIM[0]);

          Hits = this.props.carrerDataPlayOffs.Hits.slice();
          this.addSumCareer(Hits, sumPlaysOffData.Hits[0]);

          BS = this.props.carrerDataPlayOffs.BS.slice();
          this.addSumCareer(BS, sumPlaysOffData.BS[0]);

          PointsPerGame = this.props.carrerDataPlayOffs.PointsPerGame.slice();
          this.addSumCareer(PointsPerGame, sumPlaysOffData.PointsPerGame[0]);

          PowerplayGoals = this.props.carrerDataPlayOffs.PowerplayGoals.slice();
          this.addSumCareer(PowerplayGoals, sumPlaysOffData.PowerplayGoals[0]);

          PowerplayPoints = this.props.carrerDataPlayOffs.PowerplayPoints.slice();
          this.addSumCareer(
            PowerplayPoints,
            sumPlaysOffData.PowerplayPoints[0],
          );

          ShortHandedGoals = this.props.carrerDataPlayOffs.ShortHandedGoals.slice();
          this.addSumCareer(
            ShortHandedGoals,
            sumPlaysOffData.ShortHandedGoals[0],
          );

          ShortHandedPoints = this.props.carrerDataPlayOffs.ShortHandedPoints.slice();
          this.addSumCareer(
            ShortHandedPoints,
            sumPlaysOffData.ShortHandedPoints[0],
          );

          GameWinningGoals = this.props.carrerDataPlayOffs.GameWinningGoals.slice();
          this.addSumCareer(
            GameWinningGoals,
            sumPlaysOffData.GameWinningGoals[0],
          );

          OvertimeGoals = this.props.carrerDataPlayOffs.OvertimeGoals.slice();
          this.addSumCareer(OvertimeGoals, sumPlaysOffData.OvertimeGoals[0]);

          TimeOnIcePerGame = this.props.carrerDataPlayOffs.TimeOnIcePerGame.slice();
          this.addSumCareer(
            TimeOnIcePerGame,
            sumPlaysOffData.TimeOnIcePerGame[0],
          );

          ShiftsPerGame = this.props.carrerDataPlayOffs.ShiftsPerGame.slice();
          this.addSumCareer(ShiftsPerGame, sumPlaysOffData.ShiftsPerGame[0]);

          FaceoffWinPercentage = this.props.carrerDataPlayOffs.FaceoffWinPercentage.slice();
          this.addSumCareer(
            FaceoffWinPercentage,
            sumPlaysOffData.FaceoffWinPercentage[0],
          );

          PowerplayTimeOnIce = this.props.carrerDataPlayOffs.PowerplayTimeOnIce.slice();
          this.addSumCareer(
            PowerplayTimeOnIce,
            sumPlaysOffData.PowerplayTimeOnIce[0],
          );

          ShortHandedTimeOnIce = this.props.carrerDataPlayOffs.ShortHandedTimeOnIce.slice();
          this.addSumCareer(
            ShortHandedTimeOnIce,
            sumPlaysOffData.ShortHandedTimeOnIce[0],
          );

          PowerplayTimeOnIcePerGame = this.props.carrerDataPlayOffs.PowerplayTimeOnIcePerGame.slice();
          this.addSumCareer(
            PowerplayTimeOnIcePerGame,
            sumPlaysOffData.PowerplayTimeOnIcePerGame[0],
          );

          ShortHandedTimeOnIcePerGame = this.props.carrerDataPlayOffs.ShortHandedTimeOnIcePerGame.slice();
          this.addSumCareer(
            ShortHandedTimeOnIcePerGame,
            sumPlaysOffData.ShortHandedTimeOnIcePerGame[0],
          );

          evenTimeOnIce = this.props.carrerDataPlayOffs.evenTimeOnIce.slice();
          this.addSumCareer(evenTimeOnIce, sumPlaysOffData.evenTimeOnIce[0]);

          Wins = this.props.carrerDataPlayOffs.Wins.slice();
          this.addSumCareer(Wins, sumPlaysOffData.Wins[0]);

          Losses = this.props.carrerDataPlayOffs.Losses.slice();
          this.addSumCareer(Losses, sumPlaysOffData.Losses[0]);

          Ties = this.props.carrerDataPlayOffs.Ties.slice();
          this.addSumCareer(Ties, sumPlaysOffData.Ties[0]);

          OvertimeLosses = this.props.carrerDataPlayOffs.OvertimeLosses.slice();
          this.addSumCareer(OvertimeLosses, sumPlaysOffData.OvertimeLosses[0]);

          ShotsAgainst = this.props.carrerDataPlayOffs.ShotsAgainst.slice();
          this.addSumCareer(ShotsAgainst, sumPlaysOffData.ShotsAgainst[0]);

          Saves = this.props.carrerDataPlayOffs.Saves.slice();
          this.addSumCareer(Saves, sumPlaysOffData.Saves[0]);

          GoalsAgainst = this.props.carrerDataPlayOffs.GoalsAgainst.slice();
          this.addSumCareer(GoalsAgainst, sumPlaysOffData.GoalsAgainst[0]);

          GoalsAgainstAverage = this.props.carrerDataPlayOffs.GoalsAgainstAverage.slice();
          this.addSumCareer(
            GoalsAgainstAverage,
            sumPlaysOffData.GoalsAgainstAverage[0],
          );

          SV = this.props.carrerDataPlayOffs.SV.slice();
          this.addSumCareer(SV, sumPlaysOffData.SV[0]);

          TimeOnIce = this.props.carrerDataPlayOffs.TimeOnIce.slice();
          this.addSumCareer(TimeOnIce, sumPlaysOffData.TimeOnIce[0]);

          Shutouts = this.props.carrerDataPlayOffs.Shutouts.slice();
          this.addSumCareer(Shutouts, sumPlaysOffData.Shutouts[0]);

          PenaltyMinutes = this.props.carrerDataPlayOffs.PenaltyMinutes.slice();
          this.addSumCareer(PenaltyMinutes, sumPlaysOffData.PenaltyMinutes[0]);

          PowerplayShots = this.props.carrerDataPlayOffs.PowerplayShots.slice();
          this.addSumCareer(PowerplayShots, sumPlaysOffData.PowerplayShots[0]);

          PowerplaySaves = this.props.carrerDataPlayOffs.PowerplaySaves.slice();
          this.addSumCareer(PowerplaySaves, sumPlaysOffData.PowerplaySaves[0]);

          PowerPlaySavePtage = this.props.carrerDataPlayOffs.PowerPlaySavePtage.slice();
          this.addSumCareer(
            PowerPlaySavePtage,
            sumPlaysOffData.PowerPlaySavePtage[0],
          );

          ShortHandedShots = this.props.carrerDataPlayOffs.ShortHandedShots.slice();
          this.addSumCareer(
            ShortHandedShots,
            sumPlaysOffData.ShortHandedShots[0],
          );

          ShortHandedSaves = this.props.carrerDataPlayOffs.ShortHandedSaves.slice();
          this.addSumCareer(
            ShortHandedSaves,
            sumPlaysOffData.ShortHandedSaves[0],
          );

          ShortHandedSavePercentage = this.props.carrerDataPlayOffs.ShortHandedSavePercentage.slice();
          this.addSumCareer(
            ShortHandedSavePercentage,
            sumPlaysOffData.ShortHandedSavePercentage[0],
          );

          EventStrengthShots = this.props.carrerDataPlayOffs.EventStrengthShots.slice();
          this.addSumCareer(
            EventStrengthShots,
            sumPlaysOffData.EventStrengthShots[0],
          );

          EventStrengthSaves = this.props.carrerDataPlayOffs.EventStrengthSaves.slice();
          this.addSumCareer(
            EventStrengthSaves,
            sumPlaysOffData.EventStrengthSaves[0],
          );

          EventStrengthSavePtage = this.props.carrerDataPlayOffs.EventStrengthSavePtage.slice();
          this.addSumCareer(
            EventStrengthSavePtage,
            sumPlaysOffData.EventStrengthSavePtage[0],
          );

          await this.setState({
            carrerDataPlayOffs: {
              seasons,
              team,
              GP,
              GS,
              G,
              A,
              P,
              PlusMinus,
              S,
              SPtage,
              PIM,
              Hits,
              BS,
              PointsPerGame,
              PowerplayGoals,
              PowerplayPoints,
              ShortHandedGoals,
              ShortHandedPoints,
              GameWinningGoals,
              OvertimeGoals,
              TimeOnIcePerGame,
              ShiftsPerGame,
              FaceoffWinPercentage,
              PowerplayTimeOnIce,
              ShortHandedTimeOnIce,
              PowerplayTimeOnIcePerGame,
              ShortHandedTimeOnIcePerGame,
              evenTimeOnIce,
              Wins,
              Losses,
              Ties,
              OvertimeLosses,
              ShotsAgainst,
              Saves,
              GoalsAgainst,
              GoalsAgainstAverage,
              TimeOnIce,
              Shutouts,
              PenaltyMinutes,
              PowerplayShots,
              PowerplaySaves,
              PowerPlaySavePtage,
              ShortHandedShots,
              ShortHandedSaves,
              ShortHandedSavePercentage,
              EventStrengthShots,
              EventStrengthSaves,
              EventStrengthSavePtage,
              SV,
            },
            carrerAdded: true,
            process: false,
          });
        }
      }
    }
  };

  manageRegular = async () => {
    var carrerData = this.props.carrerData;
    var regularLeagues = this.props.carrerData.leagues;
    var sumCarrerData = this.props.sumCarrerData;

    if (regularLeagues !== undefined) {
      this.setState({ leagues: regularLeagues });
      regularLeagues = regularLeagues.filter(this.onlyUnique);

      if (carrerData !== undefined && sumCarrerData !== undefined) {
        for (var i = 0; i < regularLeagues.length; i++) {
          var SV = carrerData.SV;
          var A = carrerData.A;
          var GP = carrerData.GP;
          var GS = carrerData.GS;
          var G = carrerData.G;
          var P = carrerData.P;
          var PlusMinus = carrerData.PlusMinus;
          var SPtage = carrerData.SPtage;
          var S = carrerData.S;
          var PIM = carrerData.PIM;
          var Hits = carrerData.Hits;
          var BS = carrerData.BS;
          var PointsPerGame = carrerData.PointsPerGame;
          var PowerplayGoals = carrerData.PowerplayGoals;
          var PowerplayPoints = carrerData.PowerplayPoints;
          var ShortHandedGoals = carrerData.ShortHandedGoals;
          var ShortHandedPoints = carrerData.ShortHandedPoints;
          var GameWinningGoals = carrerData.GameWinningGoals;
          var OvertimeGoals = carrerData.OvertimeGoals;
          var TimeOnIcePerGame = carrerData.TimeOnIcePerGame;
          var ShiftsPerGame = carrerData.ShiftsPerGame;
          var FaceoffWinPercentage = carrerData.FaceoffWinPercentage;
          var PowerplayTimeOnIce = carrerData.PowerplayTimeOnIce;
          var ShortHandedTimeOnIce = carrerData.ShortHandedTimeOnIce;
          var PowerplayTimeOnIcePerGame = carrerData.PowerplayTimeOnIcePerGame;
          var ShortHandedTimeOnIcePerGame =
            carrerData.ShortHandedTimeOnIcePerGame;

          var evenTimeOnIce = carrerData.evenTimeOnIce;
          var Wins = carrerData.Wins;
          var Losses = carrerData.Losses;
          var Ties = carrerData.Ties;
          var OvertimeLosses = carrerData.OvertimeLosses;
          var ShotsAgainst = carrerData.ShotsAgainst;
          var Saves = carrerData.Saves;
          var GoalsAgainst = carrerData.GoalsAgainst;
          var GoalsAgainstAverage = carrerData.GoalsAgainstAverage;
          var TimeOnIce = carrerData.TimeOnIce;
          var Shutouts = carrerData.Shutouts;
          var PenaltyMinutes = carrerData.PenaltyMinutes;
          var PowerplayShots = carrerData.PowerplayShots;
          var PowerplaySaves = carrerData.PowerplaySaves;
          var PowerPlaySavePtage = carrerData.PowerPlaySavePtage;
          var ShortHandedShots = carrerData.ShortHandedShots;
          var ShortHandedSaves = carrerData.ShortHandedSaves;
          var ShortHandedSavePercentage = carrerData.ShortHandedSavePercentage;
        }
        if (this.state.carrerData.seasons === undefined) {
          seasons = this.props.carrerData.seasons.slice();
          seasons.push({
            key: seasons.length,
            length: seasons.length,
            value: 'CAREER',
            carrerData: true,
          });
          team = this.props.carrerData.team.slice();
          team.push({
            key: team.length,
            length: team.length,
            value: '-',
            carrerData: true,
          });
          GP = this.props.carrerData.GP.slice();
          this.addSumCareer(GP, sumCarrerData.GP[0]);

          GS = this.props.carrerData.GS.slice();
          this.addSumCareer(GS, sumCarrerData.GS[0]);

          G = this.props.carrerData.G.slice();
          this.addSumCareer(G, sumCarrerData.G[0]);

          A = this.props.carrerData.A.slice();
          this.addSumCareer(A, sumCarrerData.A[0]);

          P = this.props.carrerData.P.slice();
          this.addSumCareer(P, sumCarrerData.P[0]);

          S = this.props.carrerData.S.slice();
          this.addSumCareer(S, sumCarrerData.S[0]);

          PlusMinus = this.props.carrerData.PlusMinus.slice();
          this.addSumCareer(PlusMinus, sumCarrerData.PlusMinus[0]);

          SPtage = this.props.carrerData.SPtage.slice();
          this.addSumCareer(SPtage, sumCarrerData.SPtage[0]);

          PIM = this.props.carrerData.PIM.slice();
          this.addSumCareer(PIM, sumCarrerData.PIM[0]);

          Hits = this.props.carrerData.Hits.slice();
          this.addSumCareer(Hits, sumCarrerData.Hits[0]);

          BS = this.props.carrerData.BS.slice();
          this.addSumCareer(BS, sumCarrerData.BS[0]);

          PointsPerGame = this.props.carrerData.PointsPerGame.slice();
          this.addSumCareer(PointsPerGame, sumCarrerData.PointsPerGame[0]);

          PowerplayGoals = this.props.carrerData.PowerplayGoals.slice();
          this.addSumCareer(PowerplayGoals, sumCarrerData.PowerplayGoals[0]);

          PowerplayPoints = this.props.carrerData.PowerplayPoints.slice();
          this.addSumCareer(PowerplayPoints, sumCarrerData.PowerplayPoints[0]);

          ShortHandedGoals = this.props.carrerData.ShortHandedGoals.slice();
          this.addSumCareer(
            ShortHandedGoals,
            sumCarrerData.ShortHandedGoals[0],
          );

          ShortHandedPoints = this.props.carrerData.ShortHandedPoints.slice();
          this.addSumCareer(
            ShortHandedPoints,
            sumCarrerData.ShortHandedPoints[0],
          );

          GameWinningGoals = this.props.carrerData.GameWinningGoals.slice();
          this.addSumCareer(
            GameWinningGoals,
            sumCarrerData.GameWinningGoals[0],
          );

          OvertimeGoals = this.props.carrerData.OvertimeGoals.slice();
          this.addSumCareer(OvertimeGoals, sumCarrerData.OvertimeGoals[0]);

          TimeOnIcePerGame = this.props.carrerData.TimeOnIcePerGame.slice();
          this.addSumCareer(
            TimeOnIcePerGame,
            sumCarrerData.TimeOnIcePerGame[0],
          );

          ShiftsPerGame = this.props.carrerData.ShiftsPerGame.slice();
          this.addSumCareer(ShiftsPerGame, sumCarrerData.ShiftsPerGame[0]);

          FaceoffWinPercentage = this.props.carrerData.FaceoffWinPercentage.slice();
          this.addSumCareer(
            FaceoffWinPercentage,
            sumCarrerData.FaceoffWinPercentage[0],
          );

          PowerplayTimeOnIce = this.props.carrerData.PowerplayTimeOnIce.slice();
          this.addSumCareer(
            PowerplayTimeOnIce,
            sumCarrerData.PowerplayTimeOnIce[0],
          );

          ShortHandedTimeOnIce = this.props.carrerData.ShortHandedTimeOnIce.slice();
          this.addSumCareer(
            ShortHandedTimeOnIce,
            sumCarrerData.ShortHandedTimeOnIce[0],
          );

          PowerplayTimeOnIcePerGame = this.props.carrerData.PowerplayTimeOnIcePerGame.slice();
          this.addSumCareer(
            PowerplayTimeOnIcePerGame,
            sumCarrerData.PowerplayTimeOnIcePerGame[0],
          );

          ShortHandedTimeOnIcePerGame = this.props.carrerData.ShortHandedTimeOnIcePerGame.slice();
          this.addSumCareer(
            ShortHandedTimeOnIcePerGame,
            sumCarrerData.ShortHandedTimeOnIcePerGame[0],
          );

          evenTimeOnIce = this.props.carrerData.evenTimeOnIce.slice();
          this.addSumCareer(evenTimeOnIce, sumCarrerData.evenTimeOnIce[0]);

          Wins = this.props.carrerData.Wins.slice();
          this.addSumCareer(Wins, sumCarrerData.Wins[0]);

          Losses = this.props.carrerData.Losses.slice();
          this.addSumCareer(Losses, sumCarrerData.Losses[0]);

          Ties = this.props.carrerData.Ties.slice();
          this.addSumCareer(Ties, sumCarrerData.Ties[0]);

          OvertimeLosses = this.props.carrerData.OvertimeLosses.slice();
          this.addSumCareer(OvertimeLosses, sumCarrerData.OvertimeLosses[0]);

          ShotsAgainst = this.props.carrerData.ShotsAgainst.slice();
          this.addSumCareer(ShotsAgainst, sumCarrerData.ShotsAgainst[0]);

          Saves = this.props.carrerData.Saves.slice();
          this.addSumCareer(Saves, sumCarrerData.Saves[0]);

          GoalsAgainst = this.props.carrerData.GoalsAgainst.slice();
          this.addSumCareer(GoalsAgainst, sumCarrerData.GoalsAgainst[0]);

          GoalsAgainstAverage = this.props.carrerData.GoalsAgainstAverage.slice();
          this.addSumCareer(
            GoalsAgainstAverage,
            sumCarrerData.GoalsAgainstAverage[0],
          );

          SV = this.props.carrerData.SV.slice();
          this.addSumCareer(SV, sumCarrerData.SV[0]);

          TimeOnIce = this.props.carrerData.TimeOnIce.slice();
          this.addSumCareer(TimeOnIce, sumCarrerData.TimeOnIce[0]);

          Shutouts = this.props.carrerData.Shutouts.slice();
          this.addSumCareer(Shutouts, sumCarrerData.Shutouts[0]);

          PenaltyMinutes = this.props.carrerData.PenaltyMinutes.slice();
          this.addSumCareer(PenaltyMinutes, sumCarrerData.PenaltyMinutes[0]);

          PowerplayShots = this.props.carrerData.PowerplayShots.slice();
          this.addSumCareer(PowerplayShots, sumCarrerData.PowerplayShots[0]);

          PowerplaySaves = this.props.carrerData.PowerplaySaves.slice();
          this.addSumCareer(PowerplaySaves, sumCarrerData.PowerplaySaves[0]);

          PowerPlaySavePtage = this.props.carrerData.PowerPlaySavePtage.slice();
          this.addSumCareer(
            PowerPlaySavePtage,
            sumCarrerData.PowerPlaySavePtage[0],
          );

          ShortHandedShots = this.props.carrerData.ShortHandedShots.slice();
          this.addSumCareer(
            ShortHandedShots,
            sumCarrerData.ShortHandedShots[0],
          );

          ShortHandedSaves = this.props.carrerData.ShortHandedSaves.slice();
          this.addSumCareer(
            ShortHandedSaves,
            sumCarrerData.ShortHandedSaves[0],
          );

          ShortHandedSavePercentage = this.props.carrerData.ShortHandedSavePercentage.slice();
          this.addSumCareer(
            ShortHandedSavePercentage,
            sumCarrerData.ShortHandedSavePercentage[0],
          );

          EventStrengthShots = this.props.carrerData.EventStrengthShots.slice();
          this.addSumCareer(
            EventStrengthShots,
            sumCarrerData.EventStrengthShots[0],
          );

          EventStrengthSaves = this.props.carrerData.EventStrengthSaves.slice();
          this.addSumCareer(
            EventStrengthSaves,
            sumCarrerData.EventStrengthSaves[0],
          );

          EventStrengthSavePtage = this.props.carrerData.EventStrengthSavePtage.slice();
          this.addSumCareer(
            EventStrengthSavePtage,
            sumCarrerData.EventStrengthSavePtage[0],
          );

          await this.setState({
            carrerData: {
              seasons,
              team,
              GP,
              GS,
              G,
              A,
              P,
              PlusMinus,
              S,
              SPtage,
              PIM,
              Hits,
              BS,
              PointsPerGame,
              PowerplayGoals,
              PowerplayPoints,
              ShortHandedGoals,
              ShortHandedPoints,
              GameWinningGoals,
              OvertimeGoals,
              TimeOnIcePerGame,
              ShiftsPerGame,
              FaceoffWinPercentage,
              PowerplayTimeOnIce,
              ShortHandedTimeOnIce,
              PowerplayTimeOnIcePerGame,
              ShortHandedTimeOnIcePerGame,
              evenTimeOnIce,
              Wins,
              Losses,
              Ties,
              OvertimeLosses,
              ShotsAgainst,
              Saves,
              GoalsAgainst,
              GoalsAgainstAverage,
              TimeOnIce,
              Shutouts,
              PenaltyMinutes,
              PowerplayShots,
              PowerplaySaves,
              PowerPlaySavePtage,
              ShortHandedShots,
              ShortHandedSaves,
              ShortHandedSavePercentage,
              EventStrengthShots,
              EventStrengthSaves,
              EventStrengthSavePtage,
              SV,
            },
            carrerAdded: true,
            process: false,
          });
        }
      }
    }
  };
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  addSumCareer = (data, sumData) => {
    data.push({
      ...sumData,
      carrerData: true,
    });
  };

  addSumCareerPlaysOff = (data, sumData) => {
    data.push({
      ...sumData,
      carrerDataPlayOffs: true,
    });
  };

  addSumValueToLeague = (data, sumData, league) => {
    league = league.filter(this.onlyUnique);
    var type = data[0].type;
    var length = data[0].length;
    for (var i = 0; i < league.length; i++) {
      var leagueTemp = league[i];
      var value = sumData[leagueTemp][type];
      // if (type == "ShortHandedTimeOnIce" || value == undefined) {
      //     value = 0
      // }
      // if (type == "TimeOnIcePerGame" || value == undefined) {
      //     value = 0
      // }
      // if (type == "ShortHandedSavePercentage" || value == undefined) {
      //     value = 0
      // }
      data.push({
        key: i,
        league: league[i],
        length: length,
        type: type,
        value,
      });
    }
  };
  setLeagueOPtion = (leagues) => {
    var droupDown1Options = [];
    var addedOptions = [];

    if (leagues !== undefined) {
      leagues.forEach((element, index) => {
        if (element === 'National Hockey League') {
          if (addedOptions.indexOf('NHL') === -1) {
            droupDown1Options.push({
              key: index,
              droupDown: 1,
              name: 'NHL',
              selected: true,
            });
            addedOptions.push('NHL');
          }
        } else {
          if (addedOptions.indexOf(element) == -1) {
            droupDown1Options.push({ key: index, droupDown: 1, name: element });
            addedOptions.push(element);
          }
        }
      });
    }

    this.setState({ droupDown1Options });
  };
  _selecetOption = (item) => {
    if (item.droupDown === 1) {
      this.setState({
        droupDown1Selected: item.name,
        showDroupDown1: false,
        enableScroll: true,
      });
    } else if (item.droupDown === 2) {
      {
        this.setState({ droupDown2Selected: item.name, showDroupDown2: false });
      }
    } else if (item.droupDown === 3) {
      this.setState({
        droupDown3Selected: item.name,
        showDroupDown3: false,
        enableScroll: true,
        remainingGame: this.state.remainingGames[item.key - 1],
      });
    }
  };
  _handleClick = (item) => {
    if (item.droupDown === 1) {
      this.setState({ droupDown1Selected: item.name });
    } else if (item.droupDown === 2) {
      this.setState({ droupDown2Selected: item.name });
    } else if (item.droupDown === 3) {
      this.setState({ droupDown3Selected: item.name });
    }
  };
  _getDroupDownCSS(item) {
    if (item.droupDown === 1) {
      return item.name === this.state.droupDown1Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    } else if (item.droupDown === 2) {
      return item.name === this.state.droupDown2Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    } else if (item.droupDown === 3) {
      return item.name === this.state.droupDown3Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    }
  }
  _getDroupDownOptions(item) {
    return (
      <View key={item.key}>
        <TouchableOpacity
          onPress={() => this._selecetOption(item)}
          onPressIn={() => this._handleClick(item)}
          style={[
            { width: '100%', height: 40, justifyContent: 'center' },
            this._getDroupDownCSS(item),
          ]}>
          <Text
            style={[
              styles.droupDownLabelText,
              {
                textAlign: 'left',
                marginLeft: 15,
                fontSize: 11,
                lineHeight: 13,
              },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  _getSeasons = (item) => {
    var showFlag = false;
    var league = item.league;
    var droupDown1Selected = this.state.droupDown1Selected;
    if (droupDown1Selected === 'NHL') {
      droupDown1Selected = 'National Hockey League';
    }

    if (droupDown1Selected === league) {
      showFlag = true;
    }
    if (item.carrerData || item.carrerDataPlayOffs) {
      showFlag = true;
    }

    if (showFlag) {
      return (
        <View key={item.key}>
          <Text
            style={[
              styles.yellowLabelText,
              {
                color: '#404040',
                marginTop: 10,
                fontWeight: 'normal',
                lineHeight: 14,
              },
            ]}>
            {item.value}
          </Text>
        </View>
      );
    }
  };
  _getSeasonsEmpty = (item) => {
    var showFlag = false;
    // if ((this.state.droupDown1Selected == "NHL" && this.state.leagues[item.key] == "National Hockey League") || (this.state.droupDown1Selected == this.state.leagues[item.key])) {
    //     showFlag = true
    // }
    var league = item.league;
    var droupDown1Selected = this.state.droupDown1Selected;
    if (droupDown1Selected === 'NHL') {
      droupDown1Selected = 'National Hockey League';
    }

    if (droupDown1Selected === league) {
      showFlag = true;
    }
    if (item.carrerData || item.carrerDataPlayOffs) {
      showFlag = true;
    }

    if (showFlag) {
      return (
        <View>
          <Text
            style={[
              styles.yellowLabelText,
              {
                color: '#404040',
                marginTop: 10,
                fontWeight: 'normal',
                lineHeight: 14,
              },
            ]}>
            {' '}
          </Text>
        </View>
      );
    }
  };
  _getScore = (item) => {
    var new_value = '';
    var typee = typeof item.value;

    if (typee === 'number' && item.value % 1 !== 0) {
      let setDecimal = 1;
      if (item.type === 'GoalsAgainstAverage') {
        setDecimal = 2;
      }
      if (item.type === 'SV') {
        setDecimal = 3;
      }
      new_value = item.value.toFixed(setDecimal);
    } else {
      new_value = item.value;
    }
    var showFlag = false;
    var league = item.league;
    var droupDown1Selected = this.state.droupDown1Selected;
    if (droupDown1Selected === 'NHL') {
      droupDown1Selected = 'National Hockey League';
    }
    if (droupDown1Selected === league) {
      showFlag = true;
    }
    // if ((this.state.droupDown1Selected == "NHL" && item.league == "National Hockey League") || (this.state.droupDown1Selected == item.league)) {
    //     showFlag = true
    // }
    if (item.carrerData || item.carrerDataPlayOffs) {
      showFlag = true;
    }

    if (showFlag) {
      return (
        <View key={item.key}>
          <Text
            style={[
              styles.roundEditTextWhiteLabel,
              {
                color: '#404040',
                marginTop: 10,
                textAlign: 'center',
                lineHeight: 14,
              },
            ]}>
            {new_value}
          </Text>
        </View>
      );
    }
  };
  _getHeadings = (item) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={[
            styles.yellowLabelText,
            { color: '#8AABFF', marginTop: 10, fontWeight: 'normal' },
          ]}>
          {item.title}
        </Text>
      </View>
    );
  };
  updateScroll = (id) => {
    var flag = false;
    if (id === 1) {
      flag = !this.state.showDroupDown1;
      this.setState({ showDroupDown1: flag, enableScroll: !flag });
    } else if (id === 3) {
      flag = !this.state.showDroupDown3;
      this.setState({ showDroupDown3: flag, enableScroll: !flag });
    }
  };

  addData = (data) => {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      if (
        (this.state.droupDown1Selected === 'NHL' &&
          data[i].league === 'National Hockey League') ||
        this.state.droupDown1Selected === data[i].league
      ) {
        sum += data[i].value;
      }
    }
    return sum;
  };
  pagination_season = (season) => {
    var n_season = [];
    if (season !== undefined) {
      var listcount = season.length;
      var n = this.state.itemno;
      for (n; n <= 10 && n <= listcount; n++) {
        n_season.push(season[n]);
      }
      return n_season;
    } else {
      return season;
    }
  };
  render() {
    var {
      seasons,
      team,
      GP,
      GS,
      G,
      A,
      P,
      PlusMinus,
      S,
      SPtage,
      PIM,
      Hits,
      BS,
      PointsPerGame,
      PowerplayGoals,
      PowerplayPoints,
      ShortHandedGoals,
      ShortHandedPoints,
      GameWinningGoals,
      OvertimeGoals,
      TimeOnIcePerGame,
      ShiftsPerGame,
      FaceoffWinPercentage,
      PowerplayTimeOnIce,
      ShortHandedTimeOnIce,
      Wins,
      Losses,
      OvertimeLosses,
      ShotsAgainst,
      Saves,
      GoalsAgainst,
      GoalsAgainstAverage,
      TimeOnIce,
      Shutouts,
      SV,
    } = {};

    if (this.state.droupDown2Selected === 'Playoffs') {
      seasons = this.state.carrerDataPlayOffs.seasons;
      team = this.state.carrerDataPlayOffs.team;
      GP = this.state.carrerDataPlayOffs.GP;
      GS = this.state.carrerDataPlayOffs.GS;
      G = this.state.carrerDataPlayOffs.G;
      A = this.state.carrerDataPlayOffs.A;
      P = this.state.carrerDataPlayOffs.P;
      S = this.state.carrerDataPlayOffs.S;
      PlusMinus = this.state.carrerDataPlayOffs.PlusMinus;
      SPtage = this.state.carrerDataPlayOffs.SPtage;
      PIM = this.state.carrerDataPlayOffs.PIM;
      Hits = this.state.carrerDataPlayOffs.Hits;
      BS = this.state.carrerDataPlayOffs.BS;
      SV = this.state.carrerDataPlayOffs.SV;

      PointsPerGame = this.state.carrerDataPlayOffs.PointsPerGame;
      PowerplayGoals = this.state.carrerDataPlayOffs.PowerplayGoals;
      PowerplayPoints = this.state.carrerDataPlayOffs.PowerplayPoints;
      ShortHandedGoals = this.state.carrerDataPlayOffs.ShortHandedGoals;
      ShortHandedPoints = this.state.carrerDataPlayOffs.ShortHandedPoints;
      GameWinningGoals = this.state.carrerDataPlayOffs.GameWinningGoals;
      OvertimeGoals = this.state.carrerDataPlayOffs.OvertimeGoals;
      TimeOnIcePerGame = this.state.carrerDataPlayOffs.TimeOnIcePerGame;
      ShiftsPerGame = this.state.carrerDataPlayOffs.ShiftsPerGame;
      FaceoffWinPercentage = this.state.carrerDataPlayOffs.FaceoffWinPercentage;
      PowerplayTimeOnIce = this.state.carrerDataPlayOffs.PowerplayTimeOnIce;
      ShortHandedTimeOnIce = this.state.carrerDataPlayOffs.ShortHandedTimeOnIce;
      Wins = this.state.carrerDataPlayOffs.Wins;
      Losses = this.state.carrerDataPlayOffs.Losses;
      OvertimeLosses = this.state.carrerDataPlayOffs.OvertimeLosses;
      ShotsAgainst = this.state.carrerDataPlayOffs.ShotsAgainst;
      Saves = this.state.carrerDataPlayOffs.Saves;
      GoalsAgainst = this.state.carrerDataPlayOffs.GoalsAgainst;
      GoalsAgainstAverage = this.state.carrerDataPlayOffs.GoalsAgainstAverage;
      TimeOnIce = this.state.carrerDataPlayOffs.TimeOnIce;
      Shutouts = this.state.carrerDataPlayOffs.Shutouts;

      // this.checkSeason(seasons, team, GP, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS)
    } else {
      seasons = this.state.carrerData.seasons;
      team = this.state.carrerData.team;
      GP = this.state.carrerData.GP;
      GS = this.state.carrerData.GS;
      G = this.state.carrerData.G;
      A = this.state.carrerData.A;
      P = this.state.carrerData.P;
      S = this.state.carrerData.S;
      PlusMinus = this.state.carrerData.PlusMinus;
      SPtage = this.state.carrerData.SPtage;
      PIM = this.state.carrerData.PIM;
      Hits = this.state.carrerData.Hits;
      BS = this.state.carrerData.BS;
      SV = this.state.carrerData.SV;

      PointsPerGame = this.state.carrerData.PointsPerGame;
      PowerplayGoals = this.state.carrerData.PowerplayGoals;
      PowerplayPoints = this.state.carrerData.PowerplayPoints;
      ShortHandedGoals = this.state.carrerData.ShortHandedGoals;
      ShortHandedPoints = this.state.carrerData.ShortHandedPoints;
      GameWinningGoals = this.state.carrerData.GameWinningGoals;
      OvertimeGoals = this.state.carrerData.OvertimeGoals;
      TimeOnIcePerGame = this.state.carrerData.TimeOnIcePerGame;
      ShiftsPerGame = this.state.carrerData.ShiftsPerGame;
      FaceoffWinPercentage = this.state.carrerData.FaceoffWinPercentage;
      PowerplayTimeOnIce = this.state.carrerData.PowerplayTimeOnIce;
      ShortHandedTimeOnIce = this.state.carrerData.ShortHandedTimeOnIce;
      Wins = this.state.carrerData.Wins;
      Losses = this.state.carrerData.Losses;
      OvertimeLosses = this.state.carrerData.OvertimeLosses;
      ShotsAgainst = this.state.carrerData.ShotsAgainst;
      Saves = this.state.carrerData.Saves;
      GoalsAgainst = this.state.carrerData.GoalsAgainst;
      GoalsAgainstAverage = this.state.carrerData.GoalsAgainstAverage;
      TimeOnIce = this.state.carrerData.TimeOnIce;
      Shutouts = this.state.carrerData.Shutouts;
    }

    var headings = this.state.headings;
    if (this.props.position === 'G') {
      headings = this.state.headingsGoalies;
    }

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={this.state.enableScroll}>
        <View>
          <View
            style={[
              styles.containerRowCenter,
              Platform.OS === 'ios' ? styles.zindex20 : {},
              { marginVertical: '5%' },
            ]}>
            <View style={[{ width: '40%', marginLeft: 5 }]}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, { height: 30 }]}
                onPress={() => this.updateScroll(1)}>
                <Text
                  style={[
                    styles.droupDownLabelText,
                    { fontSize: 11, lineHeight: 13 },
                  ]}>
                  {this.state.droupDown1Selected}
                </Text>
                <View style={{ marginRight: 20, marginBottom: 2 }}>
                  <Image
                    source={
                      this.state.showDroupDown1 ? arrowUpImage : arrowDownImage
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.showDroupDown1 && (
                <View>
                  <View style={[styles.droupDownFlatListContainer]}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{ height: 100 }}
                      data={this.state.droupDown1Options}
                      renderItem={({ item }) => this._getDroupDownOptions(item)}
                      numColumns={1}
                    />
                  </View>
                </View>
              )}
            </View>

            <View style={{ width: '40%', marginHorizontal: 5 }}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, { height: 30 }]}
                onPress={() =>
                  this.setState({ showDroupDown2: !this.state.showDroupDown2 })
                }>
                <Text
                  style={[
                    styles.droupDownLabelText,
                    { fontSize: 11, lineHeight: 13 },
                  ]}>
                  {this.state.droupDown2Selected}
                </Text>
                <View style={{ marginRight: 20, marginBottom: 2 }}>
                  <Image
                    source={
                      this.state.showDroupDown2 ? arrowUpImage : arrowDownImage
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.showDroupDown2 && (
                <View>
                  <View style={[styles.droupDownFlatListContainer, {}]}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{}}
                      data={this.state.droupDown2Options}
                      renderItem={({ item }) => this._getDroupDownOptions(item)}
                      numColumns={1}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              scrollEnabled={false}
              style={{ zIndex: 1, position: 'absolute' }}
              horizontal>
              <View
                style={[
                  {
                    backgroundColor: '#FFF',
                    marginHorizontal: 10,
                    borderRadius: 15,
                    paddingBottom: 0,
                  },
                ]}>
                <View
                  style={[
                    styles.containerRowStart,
                    {
                      borderBottomColor: '#dedede',
                      borderBottomWidth: 1,
                      padding: 0,
                    },
                  ]}>
                  <View style={styles.headingStyleStats}>
                    {this._getHeadings(headings[0])}
                  </View>
                </View>

                <View style={[styles.containerRowStart]}>
                  <View style={styles.headingStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        paddingHorizontal: 9,
                        paddingBottom: 15,
                      }}
                      data={seasons}
                      // data={this.pagination_season(seasons)}
                      renderItem={({ item }) => this._getSeasons(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{}}
              horizontal>
              <View
                style={[
                  {
                    backgroundColor: '#FFF',
                    marginHorizontal: 10,
                    borderRadius: 15,
                    paddingBottom: 0,
                  },
                ]}>
                <View
                  style={[
                    styles.containerRowStart,
                    {
                      borderBottomColor: '#dedede',
                      borderBottomWidth: 1,
                      padding: 0,
                    },
                  ]}>
                  <View style={styles.headingStyleStats}>{}</View>
                  <View style={styles.teamStyleStats}>
                    {this._getHeadings(headings[1])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[2])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[3])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[4])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[5])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[6])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[7])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[8])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[9])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[10])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[11])}
                  </View>

                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[12])}
                  </View>
                  <View style={styles.scoreStyleStats}>
                    {this._getHeadings(headings[13])}
                  </View>
                  {this.props.position != 'G' && (
                    <React.Fragment>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[14])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[15])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[16])}
                      </View>

                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[17])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[18])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[19])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[20])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[21])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[22])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[23])}
                      </View>
                    </React.Fragment>
                  )}
                </View>

                <View style={[styles.containerRowStart]}>
                  <View style={styles.headingStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        paddingHorizontal: 9,
                        paddingBottom: 15,
                      }}
                      data={seasons}
                      // data={this.pagination_season(seasons)}
                      renderItem={({ item }) => this._getSeasonsEmpty(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.teamStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={team}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={GP}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position != 'G' ? G : GS}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>
                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position != 'G' ? A : Wins}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position != 'G' ? P : Losses}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position != 'G' ? PlusMinus : OvertimeLosses
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position != 'G' ? S : ShotsAgainst}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position != 'G' ? SPtage : Saves}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position != 'G'
                          ? PointsPerGame
                          : GoalsAgainst
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position != 'G' ? PowerplayGoals : SV}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position != 'G'
                          ? PowerplayPoints
                          : GoalsAgainstAverage
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position != 'G'
                          ? ShortHandedGoals
                          : TimeOnIce
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position != 'G'
                          ? ShortHandedPoints
                          : Shutouts
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  {this.props.position != 'G' && (
                    <React.Fragment>
                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={GameWinningGoals}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>
                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={OvertimeGoals}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>
                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={TimeOnIcePerGame}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={ShiftsPerGame}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={FaceoffWinPercentage}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={PowerplayTimeOnIce}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={ShortHandedTimeOnIce}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={PIM}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        {/* SV% */}
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={Hits}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>

                      <View style={styles.scoreStyleStats}>
                        <FlatList
                          keyExtractor={(item, index) => String(index)}
                          style={{
                            borderRightWidth: 1,
                            borderRightColor: '#dedede88',
                            marginHorizontal: 0,
                          }}
                          data={BS}
                          renderItem={({ item }) => this._getScore(item)}
                          numColumns={1}
                          scrollEnabled={false}
                        />
                      </View>
                    </React.Fragment>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={[
              styles.containerRowCenter,
              Platform.OS === 'ios' ? styles.zindex20 : {},
              { marginTop: 25 },
            ]}>
            <Text
              style={[
                styles.yellowButtonSmallText,
                { fontWeight: 'normal', marginRight: 10 },
              ]}>
              Games Remaining:
              <Text style={[styles.yellowButtonSmallText]}>
                {' '}
                {this.state.remainingGame}
              </Text>{' '}
            </Text>

            <View style={{ width: '40%', marginLeft: 5 }}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, { height: 30 }]}
                onPress={() => this.updateScroll(3)}>
                <Text
                  style={[
                    styles.droupDownLabelText,
                    { fontSize: 11, lineHeight: 13 },
                  ]}>
                  {this.state.droupDown3Selected}
                </Text>
                <View style={{ marginRight: 20, marginBottom: 2 }}>
                  <Image
                    source={
                      this.state.showDroupDown3 ? arrowUpImage : arrowDownImage
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.showDroupDown3 && (
                <View>
                  <View style={[styles.droupDownFlatListContainer]}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{ height: 100 }}
                      data={this.state.droupDown3Options}
                      renderItem={({ item }) => this._getDroupDownOptions(item)}
                      numColumns={1}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>

          <View
            style={[
              styles.containerRowCenter,
              { marginTop: 30, marginBottom: 30 },
            ]}>
            <TouchableOpacity
              style={[
                styles.yellowButtonSmall,
                { width: '43%', marginTop: 5, marginRight: 5, height: 40 },
              ]}
              onPress={() => this.props.moveToMyFantasyTeam()}>
              <Text
                style={[styles.yellowButtonSmallText, { color: '#0F1A38' }]}>
                Add to Fantasy Team
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.yellowButtonSmall,
                {
                  width: '43%',
                  backgroundColor: '#DEDEDE',
                  borderWidth: 0,
                  marginTop: 5,
                  marginLeft: 5,
                  height: 40,
                },
              ]}
              onPress={() => this.props.moveToPlayerComparaison()}>
              <Text
                style={[styles.yellowButtonSmallText, { color: '#0F1A38' }]}>
                Compare Player
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.process == true && (
          <View
            style={{
              position: 'absolute',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff90',
            }}>
            <ActivityIndicator size="large" color="#2233aa" />
            <Text> Fetching data please wait ...</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default PD_Tab_Carrer;
