import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import { TabView, SceneMap } from 'react-native-tab-view';
import PD_Tab_Carrer from './PD_Tab_Carrer';
import PD_Tab_GameLogs from './PD_Tab_GameLogs';
import PD_Tab_LastGames from './PD_Tab_LastGames';
import PD_Tab_ADV from './PD_Tab_ADV';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import moment from 'moment';

class PlayerDetailStats extends React.Component {
  constructor(prpos) {
    super(prpos);

    this.state = {
      inClick: false,
      enableScroll: true,
      process: true,
      processHeader: true,
      index: 0,
      routes: [
        { key: 'first', title: 'CAREER' },
        { key: 'second', title: 'GAME LOGS' },
        { key: 'third', title: 'LAST GAMES' },
        { key: 'fourth', title: 'ADV SPLITS' },
      ],
      drafted: '',
      teamId: '',
      playerLink: '',
      playerData: {},
      carrerData: {},
      carrerDataPlayOffs: {},
      sumCarrerData: {},
      sumPlaysOffData: {},
      gameLogsData: {},
      gameLogsDataPlayOffs: {},
      gameLogsSelectedYear: '',
      lastGameData: {},
      lastGameDataPlayOffs: {},
      ADVSelectedYear: '',
      ADVData: {},
      ADVDataPlayOffs: {},
      remainingGames: [],
    };

    this.service = new Service();
    this.appService = new AppService();
  }

  async componentWillMount() {
    this.setState({ process: true, processHeader: true });
    await this.getCarrerData();
    // await this.getCarrerData("yearByYearPlayoffs")
    // this.getRemainingGames("SHAM")
    // var thisYear = moment().format('YYYY')
    // var lastYear = thisYear - 1;
    // var selectedYear = lastYear + "" + thisYear
    // await this.getGameLogsData(undefined, selectedYear)
    // await this.getGameLogsData("yearByYearPlayoffs", selectedYear)
    // await this.getLastGameData(5, undefined, selectedYear)
    // await this.getLastGameData(5, "yearByYearPlayoffs", selectedYear)
    // await this._getADVData("Regular", selectedYear)
    // await this._getADVData("Playoffs", selectedYear)
    // this.setState({ process: false })
  }

  _renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          var width = '25%';
          if (i == 0) width = '25%';
          else if (i == 1) width = '25%';
          else if (i == 2) width = '25%';
          else if (i == 3) width = '25%';

          if (i === props.navigationState.index) {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabStyle,
                  { borderBottomColor: '#8AABFF', borderBottomWidth: 2 },
                  { width },
                ]}
                onPress={() => this.setState({ index: i })}>
                <Text
                  style={[
                    styles.transparentButtonText,
                    { color: '#404040', textAlign: 'center' },
                  ]}>
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.tabStyle, { width }]}
                onPress={() => this.setState({ index: i })}>
                <Text
                  style={[
                    styles.transparentButtonText,
                    { color: '#18295544', textAlign: 'center' },
                  ]}>
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  bannerError = (e) => {
    //////
  };

  onHandleTimeFormat = (value) => {
    const subStringData = value.substring(0, value.length - 3);
    return subStringData;
  };

  onHandleCarrerData = (res, drafted, playerLink, isSum) => {
    var carrerData = {};
    if (res != null && res.data != null) {
      var playerDetails = res.data.people[0];
      if (!isSum) {
        var name,
          nationality,
          teamName,
          postion,
          height,
          weight,
          age,
          shoots,
          birthData,
          birthCity,
          drafted,
          jursyNumber = '';
        name = playerDetails.fullName;
        teamName = playerDetails.currentTeam
          ? playerDetails.currentTeam.name
          : '';
        var teamId = this.appService.getTeamCode(teamName);
        var teamlabel = this.appService.getTeamLabel(teamName);

        this.setState({ teamId });
        postion = playerDetails.primaryPosition.code;
        height = playerDetails.height;
        weight = playerDetails.weight;
        nationality = playerDetails.nationality;
        age = playerDetails.currentAge;
        shoots = playerDetails.shootsCatches;
        birthData = playerDetails.birthDate;
        birthCity = playerDetails.birthCity;
        drafted = drafted;
        jursyNumber = playerDetails.primaryNumber;
        id = playerDetails.id;
        var playerData = {
          id,
          name,
          nationality,
          teamlabel,
          teamName,
          postion,
          height,
          weight,
          age,
          shoots,
          birthData,
          birthCity,
          drafted,
          jursyNumber,
          playerLink,
        };
        this.setState({ playerData, processHeader: false });
      }
      var splits = playerDetails.stats[0].splits.reverse();
      var seasons = [];
      var team = [];
      var GP = [];
      var GS = [];
      var G = [];
      var A = [];
      var P = [];
      var PlusMinus = [];
      var S = [];
      var SPtage = [];
      var PIM = [];
      var Hits = [];
      var BS = [];
      var SV = [];
      var leagues = [];
      var PointsPerGame = [];
      var PowerplayGoals = [];
      var PowerplayPoints = [];
      var ShortHandedGoals = [];
      var ShortHandedPoints = [];
      var GameWinningGoals = [];
      var OvertimeGoals = [];
      var TimeOnIcePerGame = [];
      var ShiftsPerGame = [];
      var FaceoffWinPercentage = [];
      var PowerplayTimeOnIce = [];
      var ShortHandedTimeOnIce = [];
      var PowerplayTimeOnIcePerGame = [];
      var ShortHandedTimeOnIcePerGame = [];
      var evenTimeOnIce = [];
      var Wins = [];
      var Losses = [];
      var Ties = [];
      var OvertimeLosses = [];
      var ShotsAgainst = [];
      var Saves = [];
      var GoalsAgainst = [];
      var GoalsAgainstAverage = [];
      var TimeOnIce = [];
      var Shutouts = [];
      var PenaltyMinutes = [];
      var PowerplayShots = [];
      var PowerplaySaves = [];
      var PowerPlaySavePtage = [];
      var ShortHandedShots = [];
      var ShortHandedSaves = [];
      var ShortHandedSavePercentage = [];
      var EventStrengthShots = [];
      var EventStrengthSaves = [];
      var EventStrengthSavePtage = [];

      splits.forEach((element, index) => {
        if (!isSum) {
          var teamCode = this.appService.getTeamLabel(element.team.name);
          leagues[index] = element.league.name;
          team[index] = {
            key: index,
            value: teamCode,
            length: splits.length,
            type: 'Team',
            league: element.league.name,
          };
          seasons[index] = {
            key: index,
            value:
              element.season.substring(0, 4) +
              '-' +
              element.season.substring(4, 8),
            length: splits.length,
            league: element.league.name,
          };
        }

        if (isSum) {
          seasons[index] = {
            key: index,
            value: 'Career',
            length: 1,
            league: element.league ? element.league.name : '',
          };
        }

        GP[index] = {
          key: index,
          value: element.stat.games ? element.stat.games : 0,
          length: splits.length,
          type: 'GP',
          league: element.league ? element.league.name : '',
        };
        GS[index] = {
          key: index,
          value: element.stat.gamesStarted ? element.stat.gamesStarted : 0,
          length: splits.length,
          type: 'GS',
          league: element.league ? element.league.name : '',
        };
        G[index] = {
          key: index,
          value: element.stat.goals ? element.stat.goals : 0,
          length: splits.length,
          type: 'G',
          league: element.league ? element.league.name : '',
        };
        A[index] = {
          key: index,
          value: element.stat.assists ? element.stat.assists : 0,
          length: splits.length,
          type: 'A',
          league: element.league ? element.league.name : '',
        };
        P[index] = {
          key: index,
          value: element.stat.points ? element.stat.points : 0,
          length: splits.length,
          type: 'P',
          league: element.league ? element.league.name : '',
        };
        PlusMinus[index] = {
          key: index,
          value: element.stat.plusMinus ? element.stat.plusMinus : 0,
          length: splits.length,
          type: 'PlusMinus',
          league: element.league ? element.league.name : '',
        };
        S[index] = {
          key: index,
          value: element.stat.shots ? element.stat.shots : 0,
          length: splits.length,
          type: 'S',
          league: element.league ? element.league.name : '',
        };
        SPtage[index] = {
          key: index,
          value: element.stat.shotPct ? element.stat.shotPct : 0,
          length: splits.length,
          type: 'SPtage',
          league: element.league ? element.league.name : '',
        };
        PIM[index] = {
          key: index,
          value: element.stat.pim ? element.stat.pim : 0,
          length: splits.length,
          type: 'PIM',
          league: element.league ? element.league.name : '',
        };
        Hits[index] = {
          key: index,
          value: element.stat.hits ? element.stat.hits : 0,
          length: splits.length,
          type: 'Hits',
          league: element.league ? element.league.name : '',
        };
        BS[index] = {
          key: index,
          value: element.stat.blocked ? element.stat.blocked : 0,
          length: splits.length,
          type: 'BS',
          league: element.league ? element.league.name : '',
        };
        SV[index] = {
          key: index,
          value: element.stat.savePercentage ? element.stat.savePercentage : 0,
          length: splits.length,
          type: 'SV',
          league: element.league ? element.league.name : '',
        };
        PointsPerGame[index] = {
          key: index,
          value: element.stat.points
            ? element.stat.points / element.stat.games
            : 0,
          length: splits.length,
          type: 'PointsPerGame',
          league: element.league ? element.league.name : '',
        };
        PowerplayGoals[index] = {
          key: index,
          value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0,
          length: splits.length,
          type: 'PowerplayGoals',
          league: element.league ? element.league.name : '',
        };
        PowerplayPoints[index] = {
          key: index,
          value: element.stat.powerPlayPoints
            ? element.stat.powerPlayPoints
            : 0,
          length: splits.length,
          type: 'PowerplayPoints',
          league: element.league ? element.league.name : '',
        };
        ShortHandedGoals[index] = {
          key: index,
          value: element.stat.shortHandedGoals
            ? element.stat.shortHandedGoals
            : 0,
          length: splits.length,
          type: 'ShortHandedGoals',
          league: element.league ? element.league.name : '',
        };
        ShortHandedPoints[index] = {
          key: index,
          value: element.stat.shortHandedPoints
            ? element.stat.shortHandedPoints
            : 0,
          length: splits.length,
          type: 'ShortHandedPoints',
          league: element.league ? element.league.name : '',
        };
        GameWinningGoals[index] = {
          key: index,
          value: element.stat.gameWinningGoals
            ? element.stat.gameWinningGoals
            : 0,
          length: splits.length,
          type: 'GameWinningGoals',
          league: element.league ? element.league.name : '',
        };
        OvertimeGoals[index] = {
          key: index,
          value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0,
          length: splits.length,
          type: 'OvertimeGoals',
          league: element.league ? element.league.name : '',
        };
        TimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.timeOnIce
            ? this.onHandleTimeFormat(element.stat.timeOnIce)
            : 0,
          length: splits.length,
          type: 'TimeOnIcePerGame',
          league: element.league ? element.league.name : '',
        };
        ShiftsPerGame[index] = {
          key: index,
          value: element.stat.shifts ? element.stat.shifts : 0,
          length: splits.length,
          type: 'ShiftsPerGame',
          league: element.league ? element.league.name : '',
        };
        FaceoffWinPercentage[index] = {
          key: index,
          value: element.stat.faceOffPct ? element.stat.faceOffPct : 0,
          length: splits.length,
          type: 'FaceoffWinPercentage',
          league: element.league ? element.league.name : '',
        };
        PowerplayTimeOnIce[index] = {
          key: index,
          value: element.stat.powerPlayTimeOnIce
            ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce)
            : 0,
          length: splits.length,
          type: 'PowerplayTimeOnIce',
          league: element.league ? element.league.name : '',
        };
        ShortHandedTimeOnIce[index] = {
          key: index,
          value: element.stat.shortHandedTimeOnIce
            ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce)
            : 0,
          length: splits.length,
          type: 'ShortHandedTimeOnIce',
          league: element.league ? element.league.name : '',
        };
        PowerplayTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.powerPlayTimeOnIcePerGame
            ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame)
            : 0,
          length: splits.length,
          type: 'PowerplayTimeOnIcePerGame',
          league: element.league ? element.league.name : '',
        };
        ShortHandedTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.shortHandedTimeOnIcePerGame
            ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame)
            : 0,
          length: splits.length,
          type: 'ShortHandedTimeOnIcePerGame',
          league: element.league ? element.league.name : '',
        };
        evenTimeOnIce[index] = {
          key: index,
          value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0,
          length: splits.length,
          type: 'evenTimeOnIce',
          league: element.league ? element.league.name : '',
        };
        Wins[index] = {
          key: index,
          value: element.stat.wins ? element.stat.wins : 0,
          length: splits.length,
          type: 'Wins',
          league: element.league ? element.league.name : '',
        };
        Losses[index] = {
          key: index,
          value: element.stat.losses ? element.stat.losses : 0,
          length: splits.length,
          type: 'Losses',
          league: element.league ? element.league.name : '',
        };
        Ties[index] = {
          key: index,
          value: element.stat.ties ? element.stat.ties : 0,
          length: splits.length,
          type: 'Ties',
          league: element.league ? element.league.name : '',
        };
        OvertimeLosses[index] = {
          key: index,
          value: element.stat.ot ? element.stat.ot : 0,
          length: splits.length,
          type: 'OvertimeLosses',
          league: element.league ? element.league.name : '',
        };
        ShotsAgainst[index] = {
          key: index,
          value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0,
          length: splits.length,
          type: 'ShotsAgainst',
          league: element.league ? element.league.name : '',
        };
        Saves[index] = {
          key: index,
          value: element.stat.saves ? element.stat.saves : 0,
          length: splits.length,
          type: 'Saves',
          league: element.league ? element.league.name : '',
        };
        GoalsAgainst[index] = {
          key: index,
          value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0,
          length: splits.length,
          type: 'GoalsAgainst',
          league: element.league ? element.league.name : '',
        };
        GoalsAgainstAverage[index] = {
          key: index,
          value: element.stat.goalAgainstAverage
            ? element.stat.goalAgainstAverage
            : 0,
          length: splits.length,
          type: 'GoalsAgainstAverage',
          league: element.league ? element.league.name : '',
        };
        TimeOnIce[index] = {
          key: index,
          value: element.stat.timeOnIce
            ? this.onHandleTimeFormat(element.stat.timeOnIce)
            : 0,
          length: splits.length,
          type: 'TimeOnIce',
          league: element.league ? element.league.name : '',
        };
        Shutouts[index] = {
          key: index,
          value: element.stat.shutouts ? element.stat.shutouts : 0,
          length: splits.length,
          type: 'Shutouts',
          league: element.league ? element.league.name : '',
        };
        PenaltyMinutes[index] = {
          key: index,
          value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0,
          length: splits.length,
          type: 'PenaltyMinutesS',
          league: element.league ? element.league.name : '',
        };
        PowerplayShots[index] = {
          key: index,
          value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0,
          length: splits.length,
          type: 'PowerplayShots',
          league: element.league ? element.league.name : '',
        };
        PowerplaySaves[index] = {
          key: index,
          value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0,
          length: splits.length,
          type: 'PowerplaySaves',
          league: element.league ? element.league.name : '',
        };
        PowerPlaySavePtage[index] = {
          key: index,
          value: element.stat.powerPlaySavePercentage
            ? element.stat.powerPlaySavePercentage
            : 0,
          length: splits.length,
          type: 'PowerPlaySavePtage',
          league: element.league ? element.league.name : '',
        };
        ShortHandedShots[index] = {
          key: index,
          value: element.stat.shortHandedShots
            ? element.stat.shortHandedShots
            : 0,
          length: splits.length,
          type: 'ShortHandedShots',
          league: element.league ? element.league.name : '',
        };
        ShortHandedSaves[index] = {
          key: index,
          value: element.stat.shortHandedSaves
            ? element.stat.shortHandedSaves
            : 0,
          length: splits.length,
          type: 'ShortHandedSaves',
          league: element.league ? element.league.name : '',
        };
        ShortHandedSavePercentage[index] = {
          key: index,
          value: element.stat.shortHandedSavePercentage
            ? element.stat.shortHandedSavePercentage.toFixed(2)
            : 0,
          length: splits.length,
          type: 'ShortHandedSavePercentage',
          league: element.league ? element.league.name : '',
        };
        EventStrengthShots[index] = {
          key: index,
          value: element.stat.evenShots ? element.stat.evenShots : 0,
          length: splits.length,
          type: 'EventStrengthShots',
          league: element.league ? element.league.name : '',
        };
        EventStrengthSaves[index] = {
          key: index,
          value: element.stat.evenSaves ? element.stat.evenSaves : 0,
          length: splits.length,
          type: 'EventStrengthSaves',
          league: element.league ? element.league.name : '',
        };
        EventStrengthSavePtage[index] = {
          key: index,
          value: element.stat.evenStrengthSavePercentage
            ? element.stat.evenStrengthSavePercentage
            : 0,
          length: splits.length,
          type: 'EventStrengthSavePtage',
          league: element.league ? element.league.name : '',
        };
      });

      var carrerData = {};
      carrerData = {
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
        leagues,
        SV,
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
      };
    }
    return carrerData;
  };

  getCarrerData = async () => {
    var player = this.props.item;
    var playerLink = '';
    if (player.playerLink != '' && player.playerLink != undefined) {
      playerLink = player.playerLink;
    } else if (player.player_id != '' && player.player_id != undefined) {
      playerLink = `/api/v1/people/${player.player_id}`;
    }
    console.log('playerLink>>>>1', playerLink);
    if (playerLink != '' && playerLink != undefined) {
      var playerId = playerLink.match(/\d/g).join('');
      playerId = playerId.substring(1, playerId.length);

      var res2 = await this.service.getDrafted(playerId);
      var drafted = 'Not Set';
      if (
        res2 != undefined &&
        res2.data != undefined &&
        res2.data.data.length > 0
      ) {
        var overallDraft = res2.data.data[0].draftOverall
          ? res2.data.data[0].draftOverall
          : '';
        var draftRound = res2.data.data[0].draftRound
          ? res2.data.data[0].draftRound
          : '';
        var draftYear = res2.data.data[0].draftYear
          ? res2.data.data[0].draftYear
          : '';

        drafted = overallDraft + ' overall, ' + draftYear;
      }

      // api for regular and playsoff
      var res = await this.service.getPlayerDetails(playerLink, null);
      var resPlaysOff = await this.service.getPlayerDetails(
        playerLink,
        'yearByYearPlayoffs',
      );
      var resSum = await this.service.getPlayerDetails(
        playerLink,
        'careerRegularSeason',
      );
      var resSumPlaysOff = await this.service.getPlayerDetails(
        playerLink,
        'careerPlayoffs',
      );

      // res function return on api
      var regularData = this.onHandleCarrerData(res, drafted, playerLink);
      var playsOffData = this.onHandleCarrerData(
        resPlaysOff,
        drafted,
        playerLink,
      );
      var sumRegularData = this.onHandleCarrerData(
        resSum,
        drafted,
        playerLink,
        true,
      );
      var sumPlaysOffData = this.onHandleCarrerData(
        resSumPlaysOff,
        drafted,
        playerLink,
        true,
      );

      var remainingGames = [];
      var startDate = moment().format('YYYY-MM-DD');
      var endDates = [];

      endDates[0] = moment().day(7).format('YYYY-MM-DD'); // This Week
      endDates[1] = moment().day(14).format('YYYY-MM-DD'); // Next Week
      endDates[2] = moment().endOf('month').format('YYYY-MM-DD'); // This Month
      endDates[3] = moment(endDates[2]).add(1, 'months').format('YYYY-MM-DD'); // Next Month

      for (var i = 0; i < 4; i++) {
        var res = await this.service.getRemainingGames(
          startDate,
          endDates[i],
          this.state.teamId,
        );

        if (res != undefined && res.data != undefined) {
          remainingGames[i] = res.data.totalGames;
        }
      }

      this.setState({
        carrerDataPlayOffs: playsOffData,
        carrerData: regularData,
        sumCarrerData: sumRegularData,
        sumPlaysOffData: sumPlaysOffData,
        remainingGames,
        process: false,
        drafted,
      });
    }
  };

  // getGameLogsData = async (filter, year) => {
  //     var player = this.props.item
  //     var playerLink = player.playerLink;
  //     if (playerLink != '' && playerLink != undefined) {
  //         var res = await this.service.getGameLogs(playerLink, filter, year)
  //         if (res != null && res.data != null) {
  //             var splits = [];
  //             if (filter == undefined)
  //                 splits = res.data.stats[0].splits.reverse()
  //             else
  //                 splits = res.data.stats[0].splits;

  //             var seasons = []
  //             var team = []
  //             var GP = []
  //             var G = []
  //             var A = []
  //             var P = []
  //             var PlusMinus = []
  //             var S = []
  //             var SPtage = []
  //             var PIM = []
  //             var Hits = []
  //             var BS = []
  //             var leagues = []

  //             splits.forEach((element, index) => {
  //                 // if (element.league.name == 'National Hockey League') {
  //                 seasons[index] = { key: index, value: moment(element.date).format('DD-MMM') }
  //                 var teamCode = this.appService.getTeamLabel(element.team.name)
  //                 team[index] = { key: index, value: teamCode }
  //                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
  //                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
  //                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
  //                 P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
  //                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
  //                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
  //                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct : 0 }
  //                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
  //                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
  //                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }
  //                 // }
  //             });

  //             var gameLogsData = { seasons, team, GP, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS, leagues };
  //             if (filter == undefined)
  //                 this.setState({ gameLogsData });
  //             else
  //                 this.setState({ gameLogsDataPlayOffs: gameLogsData });

  //         }
  //     }
  //     // else
  //     //     Actions.pop()
  // }

  // _getGameLogsByYear = async (year) => {
  //     this.setState({ process: true, ADVSelectedYear: year })
  //     var selectedYear = year.substring(0, 4) + year.substring(5, 9)
  //     await this.getGameLogsData(undefined, selectedYear)
  //     await this.getGameLogsData("yearByYearPlayoffs", selectedYear)
  //     this.setState({ process: false, ADVSelectedYear: year })
  // }

  // _getADVByYear = async (year) => {
  //     this.setState({ process: true, ADVSelectedYear: year })
  //     var selectedYear = year.substring(0, 4) + year.substring(5, 9)
  //     await this._getADVData("Regular", selectedYear)
  //     await this._getADVData("Playoffs", selectedYear)
  //     this.setState({ process: false, ADVSelectedYear: year })
  // }

  // getLastGameData = async (num, filter, year) => {

  //     var selectedGames = 0;
  //     var player = this.props.item
  //     var playerLink = player.playerLink;
  //     if (playerLink != '' && playerLink != undefined) {
  //         while (num > selectedGames) {
  //             var res = await this.service.getGameLogs(playerLink, filter, year)
  //             if (res != null && res.data != null) {
  //                 var splits = [];
  //                 if (filter == undefined)
  //                     splits = res.data.stats[0].splits.reverse()
  //                 else
  //                     splits = res.data.stats[0].splits;

  //                 var seasons = []
  //                 var team = []
  //                 var GP = []
  //                 var G = []
  //                 var A = []
  //                 var P = []
  //                 var PlusMinus = []
  //                 var S = []
  //                 var SPtage = []
  //                 var PIM = []
  //                 var Hits = []
  //                 var BS = []
  //                 var leagues = []

  //                 splits.forEach((element, index) => {
  //                     // if (element.league.name == 'National Hockey League') {
  //                     seasons[index] = { key: index, value: moment(element.date).format('DD-MMM') }
  //                     var teamCode = this.appService.getTeamLabel(element.team.name)
  //                     team[index] = { key: index, value: teamCode }
  //                     GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                     G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                     A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                     P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                     PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                     S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                     SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct : '-' }
  //                     PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                     Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                     BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                     // }
  //                     selectedGames += 1;
  //                 });

  //                 var lastGameData = { seasons, team, GP, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS, leagues };
  //                 if (filter == undefined)
  //                     this.setState({ lastGameData });
  //                 else
  //                     this.setState({ lastGameDataPlayOffs: lastGameData });

  //             }
  //         }
  //     }

  // }

  // _getADVData = async (season, year) => {
  //     var player = this.props.item
  //     var playerLink = player.playerLink;
  //     if (playerLink != '' && playerLink != undefined) {
  //         var res = null
  //         if (season == "Regular")
  //             res = await this.service.getADVSplitsRegular(playerLink, year)
  //         else if (season == "Playoffs")
  //             res = await this.service.getADVSplitsPlayOffs(playerLink, year)

  //         if (res != null && res.data != null) {
  //             var parentSplits = res.data.stats;

  //             var seasons = []
  //             var GP = []
  //             var G = []
  //             var A = []
  //             var P = []
  //             var PlusMinus = []
  //             var S = []
  //             var SPtage = []
  //             var PIM = []
  //             var Hits = []
  //             var BS = []

  //             if (parentSplits != undefined) {
  //                 parentSplits.forEach((pSplit, index) => {
  //                     var splits = pSplit.splits;
  //                     var splitType = pSplit.type.displayName;
  //                     if (splits != undefined) {
  //                         splits.forEach((element, index) => {
  //                             if (splitType == "vsTeam") {
  //                                 var teamCode = this.appService.getTeamLabel(element.opponent.name)
  //                                 seasons[index] = { key: index, value: "vs " + teamCode }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }

  //                             }
  //                             else if (splitType == "vsDivision") {
  //                                 seasons[index] = { key: index, value: "vs " + element.opponentDivision.name.substring(0, 3) }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                             }
  //                             else if (splitType == "vsConference") {
  //                                 seasons[index] = { key: index, value: "vs " + element.opponentConference.name.substring(0, 3) }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                             }
  //                             else if (splitType == "byMonth") {
  //                                 var Month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  //                                 seasons[index] = { key: index, value: Month[element.month] }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                             }
  //                             else if (splitType == "byDayOfWeek") {
  //                                 var Days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  //                                 seasons[index] = { key: index, value: Days[element.dayOfWeek] }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                             }
  //                             else if (splitType == "homeAndAway") {
  //                                 seasons[index] = { key: index, value: element.isHome == true ? "Home" : "Away" }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                             }
  //                             else if (splitType == "onPaceRegularSeason") {
  //                                 seasons[index] = { key: index, value: "PRS" }
  //                                 GP[index] = { key: index, value: element.stat.games ? element.stat.games : '-' }
  //                                 G[index] = { key: index, value: element.stat.goals ? element.stat.goals : '-' }
  //                                 A[index] = { key: index, value: element.stat.assists ? element.stat.assists : '-' }
  //                                 P[index] = { key: index, value: element.stat.points ? element.stat.points : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : '-' }
  //                                 S[index] = { key: index, value: element.stat.shots ? element.stat.shots : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : '-' }
  //                                 BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : '-' }
  //                             }
  //                             else if (splitType == "yearByYearRank") {
  //                                 seasons[index] = { key: index, value: element.season.substring(0, 4) + "-" + element.season.substring(4, 8) }
  //                                 GP[index] = { key: index, value: element.stat.rankGamesPlayed ? element.stat.rankGamesPlayed.substring(0, 3) : '-' }
  //                                 G[index] = { key: index, value: element.stat.rankGoals ? element.stat.rankGoals.substring(0, 3) : '-' }
  //                                 A[index] = { key: index, value: element.stat.rankAssists ? element.stat.rankAssists.substring(0, 3) : '-' }
  //                                 P[index] = { key: index, value: element.stat.rankPoints ? element.stat.rankPoints.substring(0, 3) : '-' }
  //                                 PlusMinus[index] = { key: index, value: element.stat.rankPlusMinus ? element.stat.rankPlusMinus.substring(0, 3) : '-' }
  //                                 S[index] = { key: index, value: element.stat.rankShots ? element.stat.rankShots.substring(0, 3) : '-' }
  //                                 SPtage[index] = { key: index, value: element.stat.rankShotPct ? element.stat.rankShotPct.substring(0, 3) : '-' }
  //                                 PIM[index] = { key: index, value: element.stat.rankPim ? element.stat.rankPim.substring(0, 3) : '-' }
  //                                 Hits[index] = { key: index, value: element.stat.rankHits ? element.stat.rankHits.substring(0, 3) : '-' }
  //                                 BS[index] = { key: index, value: element.stat.rankBlockedShots ? element.stat.rankBlockedShots.substring(0, 3) : '-' }
  //                             }

  //                         })

  //                         var ADVData = { seasons, GP, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS };
  //                         if (season == "Regular")
  //                             this.setState({ ADVData });
  //                         else
  //                             this.setState({ ADVDataPlayOff: ADVData });

  //                     }
  //                 })
  //             }
  //         }
  //     }

  // }

  // getRemainingGames = async (option) => {
  //     var remainingGames = [];
  //     var startDate = moment().format('YYYY-MM-DD')
  //     var endDates = [];
  //
  //     endDates[0] = moment().day(7).format('YYYY-MM-DD') // This Week
  //     endDates[1] = moment().day(14).format('YYYY-MM-DD') // Next Week
  //     endDates[2] = moment().endOf("month").format("YYYY-MM-DD") // This Month
  //     endDates[3] = moment(endDates[2]).add(1, 'months').format('YYYY-MM-DD') // Next Month
  //
  //
  //     for (var i = 0; i < 4; i++) {
  //         var res = await this.service.getRemainingGames(startDate, endDates[i], this.state.teamId)
  //
  //         if (res != undefined && res.data != undefined) {
  //             remainingGames[i] = res.data.totalGames
  //
  //         }
  //     }
  //     this.setState({ remainingGames })
  // }

  moveToMyFantasyTeam = async () => {
    // var storage = new AppService();
    // var v = await storage.isUserLogin();
    // console.log(".log",v)
    // if(v)
    // {

    // await this.appService.setPlayerDataStats(this.state.playerData);
    Actions.MyFantasyTeam();
    // }
    // else{
    //     Actions.Login({ fromScreen: "PlayerDetail" })
    // }
  };
  async isLogin() {}
  moveToPlayerComparaison = async () => {
    await this.appService.setPlayerDataStats(this.state.playerData);
    Actions.PlayerComparison();
  };

  handleTabItem = () => {
    let info = { ...this.props.item };
    var playerLink = '';
    if (info.playerLink != '' && info.playerLink != undefined) {
      playerLink = info.playerLink;
    } else if (info.player_id != '' && info.player_id != undefined) {
      playerLink = `/api/v1/people/${info.player_id}`;
    }
    info = {
      ...this.props.item,
      playerLink,
    };
    return info;
  };

  render() {
    return (
      <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
        {/* <NavBarSecondary title="Player Stats" search />
                                <PlayerStatsHeader dress={DressARIImage} playerData={this.state.playerData} /> */}
        {/* <View style={{ flex: 1, width: "100%", flexDirection: "row", }}> */}

        <TabView
          style={{ textAlign: 'center' }}
          navigationState={this.state}
          swipeEnabled={false}
          renderScene={SceneMap({
            first: () =>
              this.state.index == 0 && (
                <PD_Tab_Carrer
                  carrerData={this.state.carrerData}
                  carrerDataPlayOffs={this.state.carrerDataPlayOffs}
                  sumCarrerData={this.state.sumCarrerData}
                  sumPlaysOffData={this.state.sumPlaysOffData}
                  position={this.state.playerData.postion}
                  remainingGames={this.state.remainingGames}
                  moveToMyFantasyTeam={this.moveToMyFantasyTeam}
                  moveToPlayerComparaison={this.moveToPlayerComparaison}
                  process={this.state.process}
                />
              ),
            second: () =>
              this.state.index == 1 && (
                <PD_Tab_GameLogs
                  gameLogsData={this.state.gameLogsData}
                  gameLogsDataPlayOffs={this.state.gameLogsDataPlayOffs}
                  _getGameLogsByYear={this._getGameLogsByYear}
                  selectedYear={this.state.gameLogsSelectedYear}
                  allYears={this.state.carrerData}
                  position={this.state.playerData.postion}
                  remainingGames={this.state.remainingGames}
                  moveToMyFantasyTeam={this.moveToMyFantasyTeam}
                  moveToPlayerComparaison={this.moveToPlayerComparaison}
                  item={this.handleTabItem()}
                />
              ),
            third: () =>
              this.state.index == 2 && (
                <PD_Tab_LastGames
                  lastGamesData={this.state.carrerData}
                  lastGamesDataPlayOffs={this.state.carrerDataPlayOffs}
                  remainingGames={this.state.remainingGames}
                  position={this.state.playerData.postion}
                  moveToMyFantasyTeam={this.moveToMyFantasyTeam}
                  moveToPlayerComparaison={this.moveToPlayerComparaison}
                  item={this.handleTabItem()}
                />
              ),
            fourth: () =>
              this.state.index == 3 && (
                <PD_Tab_ADV
                  ADVData={this.state.ADVData}
                  ADVDataPlayOffs={this.state.ADVDataPlayOffs}
                  _getADVByYear={this._getADVByYear}
                  selectedYear={this.state.ADVSelectedYear}
                  position={this.state.playerData.postion}
                  allYears={this.state.carrerData}
                  remainingGames={this.state.remainingGames}
                  moveToMyFantasyTeam={this.moveToMyFantasyTeam}
                  moveToPlayerComparaison={this.moveToPlayerComparaison}
                  item={this.handleTabItem()}
                />
              ),
          })}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          renderTabBar={this._renderTabBar}
          lazy
        />
      </View>
    );
  }
}

export default PlayerDetailStats;
