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
import { element } from 'prop-types';
import moment from 'moment';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import { SeasonContext } from '../utils/seasonUtils';

class PD_Tab_GameLogs extends React.Component {
  static contextType = SeasonContext;
  constructor(props) {
    super(props);

    this.state = {
      process: true,
      enableScroll: true,
      showDroupDown1: false,
      droupDown1Selected: 'Year',
      droupDown1Options: [
        { key: 1, droupDown: 1, name: '2019-2020', selected: true },
        { key: 2, droupDown: 1, name: '2018-2019' },
        { key: 3, droupDown: 1, name: '2017-2018' },
      ],
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
        { key: 1, title: 'DATE' },
        { key: 2, title: 'TEAM' },
        { key: 3, title: 'G' },
        { key: 4, title: 'A' },
        { key: 5, title: 'P' },
        { key: 6, title: '+/-' },
        { key: 7, title: 'S' },
        { key: 8, title: 'S%' },
        { key: 9, title: 'PPG' },
        { key: 10, title: 'PPP' },
        { key: 11, title: 'SHG' },
        { key: 12, title: 'SHP' },
        { key: 13, title: 'GWG' },
        { key: 14, title: 'OTG' },
        { key: 15, title: 'MIN' },
        { key: 16, title: 'SPG' },
        { key: 17, title: 'FOW%' },
        { key: 18, title: 'PPT' },
        { key: 19, title: 'SHT' },
        { key: 20, title: 'PIM' },
        { key: 21, title: 'HITS' },
        { key: 22, title: 'BS' },
      ],
      headingsGoalies: [
        { key: 1, title: 'SEASON' },
        { key: 2, title: 'TEAM' },
        { key: 3, title: 'GS' },
        { key: 4, title: 'WINS' },
        { key: 5, title: 'LOSS' },
        { key: 6, title: 'OTL' },
        { key: 7, title: 'SA' },
        { key: 8, title: 'SV' },
        { key: 9, title: 'GA' },
        { key: 10, title: 'SV%' },
        // { key: 11, title: "GAA", },
        { key: 11, title: 'MIN' },
        { key: 12, title: 'SO' },
      ],
      gameLogsData: {},
      gameLogsDataPlayOffs: {},
    };

    this._getSeasons = this._getSeasons.bind(this);
    this._getScore = this._getScore.bind(this);
    this._getHeadings = this._getHeadings.bind(this);

    this.service = new Service();
    this.appService = new AppService();
  }

  async componentWillMount() {
    this.setState({ process: true });
    await this.getGameLogsData();
    // await this.getGameLogsData("yearByYearPlayoffs", selectedYear)
  }

  onHandleTimeFormat = (value) => {
    const subStringData = value.substring(0, value.length - 3);
    return subStringData;
  };

  _onHandleFormat(value) {
    // let sptValue;
    // const substringData = value.toString();
    // if (substringData.length === 0) {
    //   sptValue = `${substringData}0.0`;
    // }
    // if (substringData.length === 1) {
    //   sptValue = `${substringData}0.0`;
    // }
    // if (substringData.length === 2 ) {
    //   sptValue = `${value}`;
    // }
    // if (substringData.length > 2 &&  substringData.charAt(0) !== '0') {
    //
    //   sptValue = `${substringData.charAt(0)}${substringData.charAt(1)}.${substringData.charAt(2)}`;
    // }
    // if (substringData.charAt(0) === '0') {
    //   sptValue = `${substringData.charAt(1)}.${substringData.charAt(2)}`;
    // }
    return parseInt(value).toFixed(1);
  }

  getPlayerData = (res) => {
    var gameLogsData = {};
    var player = this.props.item;
    var playerLink = player.playerLink;
    if (playerLink != '' && playerLink != undefined) {
      if (res != null && res.data != null) {
        var splits = [];

        splits = res.data.stats[0].splits;

        var seasons = [];
        var team = [];
        // var GP = []
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

        if (splits.length > 0) {
          splits.forEach((element, index) => {
            // if (element.league.name == 'National Hockey League') {
            seasons[index] = {
              key: index,
              value: moment(element.date).format('DD-MMM').toUpperCase(),
            };
            var teamCode = this.appService.getTeamLabel(element.opponent.name);
            team[index] = { key: index, value: teamCode };
            // GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
            GS[index] = {
              key: index,
              value: element.stat.gamesStarted ? element.stat.gamesStarted : 0,
              type: 'GS',
            };
            G[index] = {
              key: index,
              value: element.stat.goals ? element.stat.goals : 0,
            };
            A[index] = {
              key: index,
              value: element.stat.assists ? element.stat.assists : 0,
            };
            P[index] = {
              key: index,
              value: element.stat.points ? element.stat.points : 0,
            };
            PlusMinus[index] = {
              key: index,
              value: element.stat.plusMinus ? element.stat.plusMinus : 0,
            };
            S[index] = {
              key: index,
              value: element.stat.shots ? element.stat.shots : 0,
            };
            SPtage[index] = {
              key: index,
              value: element.stat.shotPct
                ? this._onHandleFormat(element.stat.shotPct)
                : 0,
              type: 'SPtage',
            };
            PIM[index] = {
              key: index,
              value: element.stat.pim ? element.stat.pim : 0,
            };
            Hits[index] = {
              key: index,
              value: element.stat.hits ? element.stat.hits : 0,
            };
            BS[index] = {
              key: index,
              value: element.stat.blocked ? element.stat.blocked : 0,
            };

            PointsPerGame[index] = {
              key: index,
              value: element.stat.points
                ? element.stat.points / element.stat.games
                : 0,
              length: splits.length,
              type: 'PointsPerGame',
            };
            PowerplayGoals[index] = {
              key: index,
              value: element.stat.powerPlayGoals
                ? element.stat.powerPlayGoals
                : 0,
              length: splits.length,
              type: 'PowerplayGoals',
            };
            PowerplayPoints[index] = {
              key: index,
              value: element.stat.powerPlayPoints
                ? element.stat.powerPlayPoints
                : 0,
              length: splits.length,
              type: 'powerPlayPoints',
            };
            ShortHandedGoals[index] = {
              key: index,
              value: element.stat.shortHandedGoals
                ? element.stat.shortHandedGoals
                : 0,
              length: splits.length,
              type: 'shortHandedGoals',
            };
            ShortHandedPoints[index] = {
              key: index,
              value: element.stat.shortHandedPoints
                ? element.stat.shortHandedPoints
                : 0,
              length: splits.length,
              type: 'shortHandedPoints',
            };
            GameWinningGoals[index] = {
              key: index,
              value: element.stat.gameWinningGoals
                ? element.stat.gameWinningGoals
                : 0,
              length: splits.length,
              type: 'gameWinningGoals',
            };
            OvertimeGoals[index] = {
              key: index,
              value: element.stat.overTimeGoals
                ? element.stat.overTimeGoals
                : 0,
              length: splits.length,
              type: 'overTimeGoals',
            };
            // TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame : 0, length: splits.length, type: "timeOnIcePerGame", }
            TimeOnIcePerGame[index] = {
              key: index,
              value: element.stat.timeOnIce
                ? this.onHandleTimeFormat(element.stat.timeOnIce)
                : 0,
              length: splits.length,
              type: 'timeOnIcePerGame',
            };

            ShiftsPerGame[index] = {
              key: index,
              value: element.stat.shifts ? element.stat.shifts : 0,
              length: splits.length,
              type: 'shifts',
            };
            FaceoffWinPercentage[index] = {
              key: index,
              value: element.stat.faceOffPct ? element.stat.faceOffPct : 0,
              length: splits.length,
              type: 'faceOffPct',
            };
            PowerplayTimeOnIce[index] = {
              key: index,
              value: element.stat.powerPlayTimeOnIce
                ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce)
                : 0,
              length: splits.length,
              type: 'powerPlayTimeOnIce',
            };
            ShortHandedTimeOnIce[index] = {
              key: index,
              value: element.stat.shortHandedTimeOnIce
                ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce)
                : 0,
              length: splits.length,
              type: 'shortHandedTimeOnIce',
            };
            PowerplayTimeOnIcePerGame[index] = {
              key: index,
              value: element.stat.powerPlayTimeOnIcePerGame
                ? this.onHandleTimeFormat(
                    element.stat.powerPlayTimeOnIcePerGame,
                  )
                : 0,
              length: splits.length,
              type: 'powerPlayTimeOnIcePerGame',
            };
            ShortHandedTimeOnIcePerGame[index] = {
              key: index,
              value: element.stat.shortHandedTimeOnIcePerGame
                ? this.onHandleTimeFormat(
                    element.stat.shortHandedTimeOnIcePerGame,
                  )
                : 0,
              length: splits.length,
              type: 'shortHandedTimeOnIcePerGame',
            };
            evenTimeOnIce[index] = {
              key: index,
              value: element.stat.evenTimeOnIce
                ? element.stat.evenTimeOnIce
                : 0,
              length: splits.length,
              type: 'evenTimeOnIce',
            };
            Wins[index] = {
              key: index,
              value: element.stat.decision === 'W' ? 1 : 0,
              length: splits.length,
              type: 'wins',
            };
            Losses[index] = {
              key: index,
              value: element.stat.decision === 'L' ? 1 : 0,
              length: splits.length,
              type: 'losses',
            };
            Ties[index] = {
              key: index,
              value: element.stat.decision === '0' ? 1 : 0,
              length: splits.length,
              type: 'ties',
            };
            OvertimeLosses[index] = {
              key: index,
              value: element.stat.ot ? element.stat.ot : 0,
              length: splits.length,
              type: 'overTimeLosses',
            };
            ShotsAgainst[index] = {
              key: index,
              value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0,
              length: splits.length,
              type: 'shotsAgainst',
            };
            Saves[index] = {
              key: index,
              value: element.stat.saves ? element.stat.saves : 0,
              length: splits.length,
              type: 'saves',
            };
            GoalsAgainst[index] = {
              key: index,
              value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0,
              length: splits.length,
              type: 'goalsAgainst',
            };
            GoalsAgainstAverage[index] = {
              key: index,
              value: element.stat.goalsAgainstAverage
                ? element.stat.goalsAgainstAverage
                : 0,
              length: splits.length,
              type: 'goalsAgainstAverage',
            };
            TimeOnIce[index] = {
              key: index,
              value: element.stat.timeOnIce
                ? this.onHandleTimeFormat(element.stat.timeOnIce)
                : 0,
              length: splits.length,
              type: 'timeOnIce',
            };
            Shutouts[index] = {
              key: index,
              value: element.stat.shutouts ? element.stat.shutouts : 0,
              length: splits.length,
              type: 'shutouts',
            };
            PenaltyMinutes[index] = {
              key: index,
              value: element.stat.penaltyMinutes
                ? element.stat.penaltyMinutes
                : 0,
              length: splits.length,
              type: 'BpenaltyMinutesS',
            };
            PowerplayShots[index] = {
              key: index,
              value: element.stat.powerPlayShots
                ? element.stat.powerPlayShots
                : 0,
              length: splits.length,
              type: 'powerPlayShots',
            };
            PowerplaySaves[index] = {
              key: index,
              value: element.stat.powerPlaySaves
                ? element.stat.powerPlaySaves
                : 0,
              length: splits.length,
              type: 'powerPlaySaves',
            };
            PowerPlaySavePtage[index] = {
              key: index,
              value: element.stat.powerPlaySavePercentage
                ? element.stat.powerPlaySavePercentage
                : 0,
              length: splits.length,
              type: 'powerPlaySavePercentage',
            };
            ShortHandedShots[index] = {
              key: index,
              value: element.stat.shortHandedShots
                ? element.stat.shortHandedShots
                : 0,
              length: splits.length,
              type: 'shortHandedShots',
            };
            ShortHandedSaves[index] = {
              key: index,
              value: element.stat.shortHandedSaves
                ? element.stat.shortHandedSaves
                : 0,
              length: splits.length,
              type: 'shortHandedSaves',
            };
            ShortHandedSavePercentage[index] = {
              key: index,
              value: element.stat.shortHandedSavePercentage
                ? element.stat.shortHandedSavePercentage
                : 0,
              length: splits.length,
              type: 'shortHandedSavePercentage',
            };
            EventStrengthShots[index] = {
              key: index,
              value: element.stat.evenShots ? element.stat.evenShots : 0,
              length: splits.length,
              type: 'evenShots',
            };
            EventStrengthSaves[index] = {
              key: index,
              value: element.stat.evenSaves ? element.stat.evenSaves : 0,
              length: splits.length,
              type: 'evenSaves',
            };
            EventStrengthSavePtage[index] = {
              key: index,
              value: element.stat.eventStrengthSavePtage
                ? element.stat.eventStrengthSavePtage
                : 0,
              length: splits.length,
              type: 'eventStrengthSavePtage',
            };

            // }
          });
        } else {
          var index = 0;
          seasons[index] = {
            key: index,
            value: moment(element.date).format('DD-MMM').toUpperCase(),
          };
          team[index] = { key: index, value: '-' };
          // GP[index] = { key: index, value: 0 }
          GS[index] = { key: index, value: 0 };
          G[index] = { key: index, value: 0 };
          A[index] = { key: index, value: 0 };
          P[index] = { key: index, value: 0 };
          PlusMinus[index] = { key: index, value: 0 };
          S[index] = { key: index, value: 0 };
          SPtage[index] = { key: index, value: 0 };
          PIM[index] = { key: index, value: 0 };
          Hits[index] = { key: index, value: 0 };
          BS[index] = { key: index, value: 0 };
          PointsPerGame[index] = { key: index, value: 0 };
          PowerplayGoals[index] = { key: index, value: 0 };
          PowerplayPoints[index] = { key: index, value: 0 };
          ShortHandedGoals[index] = { key: index, value: 0 };
          ShortHandedPoints[index] = { key: index, value: 0 };
          GameWinningGoals[index] = { key: index, value: 0 };
          OvertimeGoals[index] = { key: index, value: 0 };
          TimeOnIcePerGame[index] = { key: index, value: 0 };
          ShiftsPerGame[index] = { key: index, value: 0 };
          FaceoffWinPercentage[index] = { key: index, value: 0 };
          PowerplayTimeOnIce[index] = { key: index, value: 0 };
          ShortHandedTimeOnIce[index] = { key: index, value: 0 };
          PowerplayTimeOnIcePerGame[index] = { key: index, value: 0 };
          ShortHandedTimeOnIcePerGame[index] = { key: index, value: 0 };
          evenTimeOnIce[index] = { key: index, value: 0 };
          Wins[index] = { key: index, value: 0 };
          Losses[index] = { key: index, value: 0 };
          Ties[index] = { key: index, value: 0 };
          OvertimeLosses[index] = { key: index, value: 0 };
          ShotsAgainst[index] = { key: index, value: 0 };
          Saves[index] = { key: index, value: 0 };
          GoalsAgainst[index] = { key: index, value: 0 };
          GoalsAgainstAverage[index] = { key: index, value: 0 };
          TimeOnIce[index] = { key: index, value: 0 };
          Shutouts[index] = { key: index, value: 0 };
          PenaltyMinutes[index] = { key: index, value: 0 };
          PowerplayShots[index] = { key: index, value: 0 };
          PowerplaySaves[index] = { key: index, value: 0 };
          PowerPlaySavePtage[index] = { key: index, value: 0 };
          ShortHandedShots[index] = { key: index, value: 0 };
          ShortHandedSaves[index] = { key: index, value: 0 };
          ShortHandedSavePercentage[index] = { key: index, value: 0 };
          EventStrengthShots[index] = { key: index, value: 0 };
          EventStrengthSaves[index] = { key: index, value: 0 };
          EventStrengthSavePtage[index] = { key: index, value: 0 };
        }
        gameLogsData = {
          seasons,
          team,
          // GP,
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
    }
    return gameLogsData;
  };

  getGameLogsData = async (newYear) => {
    // function and variabl for the filter
    var tempDroupDown1Options = [];
    var selectedYear = this.props.selectedYear;
    var remainingGames = this.props.remainingGames;
    var years = this.props.allYears.seasons;
    if (years !== undefined) {
      var inDroupDown = [];
      years.forEach((element, index) => {
        if (inDroupDown.indexOf(element.value) === -1) {
          tempDroupDown1Options.push({
            key: index,
            droupDown: 1,
            name: element.value,
          });
          inDroupDown.push(element.value);
        }
      });
    }

    var thisYear = moment().format('YYYY');
    // var nextYear = moment().add(1, 'Y').format('YYYY')
    var selectedYear = this.context;
    // var thisYear = moment().format('YYYY')
    // var lastYear = thisYear - 1;
    // var selectedYear = lastYear + "" + thisYear

    var player = this.props.item;
    var playerLink = player.playerLink;

    const payloadYear = newYear ? newYear : selectedYear;

    var res = await this.service.getGameLogs(
      playerLink,
      'gameLog',
      payloadYear,
    );
    var res2 = await this.service.getGameLogs(
      playerLink,
      'playoffGameLog',
      payloadYear,
    );
    var resData = this.getPlayerData(res);
    var resPlaysOffData = this.getPlayerData(res2);

    this.setState({
      gameLogsData: resData,
      process: false,
      gameLogsDataPlayOffs: resPlaysOffData,
      droupDown1Options: tempDroupDown1Options,
      remainingGames,
      remainingGame: remainingGames[0],
      droupDown1Selected: thisYear != '' ? 'Year' : payloadYear,
    });
  };

  _selecetOption = (item) => {
    if (item.droupDown == 1) {
      this.setState({ droupDown1Selected: item.name, showDroupDown1: false });
      this._getGameLogsByYear(item.name);
    } else if (item.droupDown == 2)
      this.setState({ droupDown2Selected: item.name, showDroupDown2: false });
    else if (item.droupDown == 3) {
      this.setState({
        droupDown3Selected: item.name,
        showDroupDown3: false,
        enableScroll: true,
        remainingGame: this.state.remainingGames[item.key - 1],
      });
    }
  };

  _handleClick = (item) => {
    if (item.droupDown == 1) this.setState({ droupDown1Selected: item.name });
    else if (item.droupDown == 2)
      this.setState({ droupDown2Selected: item.name });
    else if (item.droupDown == 3)
      this.setState({ droupDown3Selected: item.name });
  };

  _getDroupDownCSS(item) {
    if (item.droupDown == 1) {
      return item.name == this.state.droupDown1Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    } else if (item.droupDown == 2) {
      return item.name == this.state.droupDown2Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    } else if (item.droupDown == 3) {
      return item.name == this.state.droupDown3Selected
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

  _getSeasons(item) {
    return (
      <View style={{ marginHorizontal: 5 }} key={item.key}>
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
  _getSeasonsEmpty(item) {
    return (
      <View style={{ marginHorizontal: 5 }} key={item.key}>
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

  _getScore(item) {
    var new_value = '';
    var typee = typeof item.value;
    if (typee == 'number' && item.value % 1 !== 0) {
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

  _getHeadings(item) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={[
            styles.yellowLabelText,
            {
              color: '#8AABFF',
              marginTop: 10,
              fontWeight: 'normal',
              lineHeight: 14,
            },
          ]}>
          {item.title}
        </Text>
      </View>
    );
  }

  updateScroll = (id) => {
    var flag = false;
    if (id == 1) {
      flag = !this.state.showDroupDown1;
      this.setState({ showDroupDown1: flag, enableScroll: !flag });
    } else if (id == 3) {
      flag = !this.state.showDroupDown3;
      this.setState({ showDroupDown3: flag, enableScroll: !flag });
    }
  };

  _getGameLogsByYear = async (year) => {
    this.setState({
      process: true,
      droupDown1Selected: year,
      showDroupDown1: false,
      enableScroll: true,
    });
    var selectedYear = year.substring(0, 4) + year.substring(5, 9);
    await this.getGameLogsData(selectedYear);
    this.setState({ process: false, droupDown1Selected: year });
  };

  render() {
    var {
      seasons,
      team,
      // GP,
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
    } = {};

    if (this.state.droupDown2Selected === 'Playoffs') {
      seasons = this.state.gameLogsDataPlayOffs.seasons;
      team = this.state.gameLogsDataPlayOffs.team;
      // GP = this.state.gameLogsDataPlayOffs.GP;
      GS = this.state.gameLogsDataPlayOffs.GS;
      G = this.state.gameLogsDataPlayOffs.G;
      A = this.state.gameLogsDataPlayOffs.A;
      P = this.state.gameLogsDataPlayOffs.P;
      S = this.state.gameLogsDataPlayOffs.S;
      PlusMinus = this.state.gameLogsDataPlayOffs.PlusMinus;
      SPtage = this.state.gameLogsDataPlayOffs.SPtage;
      PIM = this.state.gameLogsDataPlayOffs.PIM;
      Hits = this.state.gameLogsDataPlayOffs.Hits;
      BS = this.state.gameLogsDataPlayOffs.BS;

      PointsPerGame = this.state.gameLogsDataPlayOffs.PointsPerGame;
      PowerplayGoals = this.state.gameLogsDataPlayOffs.PowerplayGoals;
      PowerplayPoints = this.state.gameLogsDataPlayOffs.PowerplayPoints;
      ShortHandedGoals = this.state.gameLogsDataPlayOffs.ShortHandedGoals;
      ShortHandedPoints = this.state.gameLogsDataPlayOffs.ShortHandedPoints;
      GameWinningGoals = this.state.gameLogsDataPlayOffs.GameWinningGoals;
      OvertimeGoals = this.state.gameLogsDataPlayOffs.OvertimeGoals;
      TimeOnIcePerGame = this.state.gameLogsDataPlayOffs.TimeOnIcePerGame;
      ShiftsPerGame = this.state.gameLogsDataPlayOffs.ShiftsPerGame;
      FaceoffWinPercentage = this.state.gameLogsDataPlayOffs
        .FaceoffWinPercentage;
      PowerplayTimeOnIce = this.state.gameLogsDataPlayOffs.PowerplayTimeOnIce;
      ShortHandedTimeOnIce = this.state.gameLogsDataPlayOffs
        .ShortHandedTimeOnIce;
      PowerplayTimeOnIcePerGame = this.state.gameLogsDataPlayOffs
        .PowerplayTimeOnIcePerGame;
      ShortHandedTimeOnIcePerGame = this.state.gameLogsDataPlayOffs
        .ShortHandedTimeOnIcePerGame;
      evenTimeOnIce = this.state.gameLogsDataPlayOffs.evenTimeOnIce;
      Wins = this.state.gameLogsDataPlayOffs.Wins;
      Losses = this.state.gameLogsDataPlayOffs.Losses;
      Ties = this.state.gameLogsDataPlayOffs.Ties;
      OvertimeLosses = this.state.gameLogsDataPlayOffs.OvertimeLosses;
      ShotsAgainst = this.state.gameLogsDataPlayOffs.ShotsAgainst;
      Saves = this.state.gameLogsDataPlayOffs.Saves;
      GoalsAgainst = this.state.gameLogsDataPlayOffs.GoalsAgainst;
      GoalsAgainstAverage = this.state.gameLogsDataPlayOffs.GoalsAgainstAverage;
      TimeOnIce = this.state.gameLogsDataPlayOffs.TimeOnIce;
      Shutouts = this.state.gameLogsDataPlayOffs.Shutouts;
      PenaltyMinutes = this.state.gameLogsDataPlayOffs.PenaltyMinutes;
      PowerplayShots = this.state.gameLogsDataPlayOffs.PowerplayShots;
      PowerplaySaves = this.state.gameLogsDataPlayOffs.PowerplaySaves;
      PowerPlaySavePtage = this.state.gameLogsDataPlayOffs.PowerPlaySavePtage;
      ShortHandedShots = this.state.gameLogsDataPlayOffs.ShortHandedShots;
      ShortHandedSaves = this.state.gameLogsDataPlayOffs.ShortHandedSaves;
      ShortHandedSavePercentage = this.state.gameLogsDataPlayOffs
        .ShortHandedSavePercentage;
      EventStrengthShots = this.state.gameLogsDataPlayOffs.EventStrengthShots;
      EventStrengthSaves = this.state.gameLogsDataPlayOffs.EventStrengthSaves;
      EventStrengthSavePtage = this.state.gameLogsDataPlayOffs
        .EventStrengthSavePtage;
    } else {
      seasons = this.state.gameLogsData.seasons;
      team = this.state.gameLogsData.team;
      // GP = this.state.gameLogsData.GP;
      GS = this.state.gameLogsData.GS;
      G = this.state.gameLogsData.G;
      A = this.state.gameLogsData.A;
      P = this.state.gameLogsData.P;
      S = this.state.gameLogsData.S;
      PlusMinus = this.state.gameLogsData.PlusMinus;
      SPtage = this.state.gameLogsData.SPtage;
      PIM = this.state.gameLogsData.PIM;
      Hits = this.state.gameLogsData.Hits;
      BS = this.state.gameLogsData.BS;

      PowerplayGoals = this.state.gameLogsData.PowerplayGoals;
      PowerplayPoints = this.state.gameLogsData.PowerplayPoints;
      ShortHandedGoals = this.state.gameLogsData.ShortHandedGoals;
      ShortHandedPoints = this.state.gameLogsData.ShortHandedPoints;
      GameWinningGoals = this.state.gameLogsData.GameWinningGoals;
      OvertimeGoals = this.state.gameLogsData.OvertimeGoals;
      TimeOnIcePerGame = this.state.gameLogsData.TimeOnIcePerGame;
      ShiftsPerGame = this.state.gameLogsData.ShiftsPerGame;
      FaceoffWinPercentage = this.state.gameLogsData.FaceoffWinPercentage;
      PowerplayTimeOnIce = this.state.gameLogsData.PowerplayTimeOnIce;
      ShortHandedTimeOnIce = this.state.gameLogsData.ShortHandedTimeOnIce;
      Wins = this.state.gameLogsData.Wins;
      Losses = this.state.gameLogsData.Losses;
      OvertimeLosses = this.state.gameLogsData.OvertimeLosses;
      ShotsAgainst = this.state.gameLogsData.ShotsAgainst;
      Saves = this.state.gameLogsData.Saves;
      GoalsAgainst = this.state.gameLogsData.GoalsAgainst;
      TimeOnIce = this.state.gameLogsData.TimeOnIce;
      Shutouts = this.state.gameLogsData.Shutouts;
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
            <View style={{ width: '40%', marginLeft: 5 }}>
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
                  <View style={[styles.droupDownFlatListContainer, {}]}>
                    <FlatList
                      style={{ height: 100 }}
                      data={this.state.droupDown1Options}
                      renderItem={({ item }) => this._getDroupDownOptions(item)}
                      numColumns={1}
                    />
                  </View>
                </View>
              )}
            </View>

            <View
              style={[
                Platform.OS === 'ios' ? styles.zindex20 : {},
                { width: '40%', marginHorizontal: 5 },
              ]}>
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
                  <View style={styles.headingStyleStats}>
                    {
                      // this._getHeadings(headings[0])
                    }
                  </View>
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
                  {this.props.position != 'G' && (
                    <React.Fragment>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[12])}
                      </View>
                      <View style={styles.scoreStyleStats}>
                        {this._getHeadings(headings[13])}
                      </View>
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
                      renderItem={({ item }) => this._getSeasonsEmpty(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.teamStyleStats}>
                    <FlatList
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

                  {/* <View style={{ width: 30, }}>
//     <FlatList
//         style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
//         data={GP}
//         renderItem={({ item }) => this._getScore(item)}
//         numColumns={1}
//    scrollEnabled={false}
// />
// </View> */}

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      keyExtractor={(item, index) => String(index)}
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position !== 'G' ? G : GS}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position !== 'G' ? A : Wins}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position !== 'G' ? P : Losses}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position !== 'G' ? PlusMinus : OvertimeLosses
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position !== 'G' ? S : ShotsAgainst}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={this.props.position !== 'G' ? SPtage : Saves}
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position !== 'G'
                          ? PowerplayGoals
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
                      data={
                        this.props.position !== 'G' ? PowerplayPoints : SPtage
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.scoreStyleStats}>
                    <FlatList
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position !== 'G'
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
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#dedede88',
                        marginHorizontal: 0,
                      }}
                      data={
                        this.props.position !== 'G'
                          ? ShortHandedPoints
                          : Shutouts
                      }
                      renderItem={({ item }) => this._getScore(item)}
                      numColumns={1}
                      scrollEnabled={false}
                    />
                  </View>

                  {this.props.position !== 'G' && (
                    <React.Fragment>
                      <View style={styles.scoreStyleStats}>
                        <FlatList
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

                  {/* <View style={styles.scoreStyleStats}>
    <FlatList
        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
        data={this.props.position != 'G' ? PowerplayTimeOnIcePerGame : EventStrengthShots}
        renderItem={({ item }) => this._getScore(item)}
        numColumns={1}
   scrollEnabled={false}
/>
</View>


<View style={styles.scoreStyleStats}>
    <FlatList
        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
        data={this.props.position != 'G' ? ShortHandedTimeOnIcePerGame : EventStrengthSaves}
        renderItem={({ item }) => this._getScore(item)}
        numColumns={1}
   scrollEnabled={false}
/>
</View> */}

                  {/* <View style={styles.scoreStyleStats}>
    <FlatList
        style={{ borderRightWidth: 0, borderRightColor: "#dedede88", marginHorizontal: 0 }}
        data={this.props.position != 'G' ? evenTimeOnIce : EventStrengthSavePtage}
        renderItem={({ item }) => this._getScore(item)}
        numColumns={1}
   scrollEnabled={false}
/>
</View> */}
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

export default PD_Tab_GameLogs;
