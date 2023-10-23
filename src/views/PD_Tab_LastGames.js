import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from '../assets/css/styles';
import arrowDownImage from '../assets/img/arrowDownDark.png';
import arrowUpImage from '../assets/img/arrowUpDark.png';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import { SeasonContext } from '../utils/seasonUtils';

class PD_Tab_LastGames extends React.Component {
  static contextType = SeasonContext;
  constructor(props) {
    super(props);

    this.state = {
      process: true,
      enableScroll: true,
      totalGames: 2,
      seasons_played: '',
      showDroupDown1: false,
      droupDown1Selected: 'Last Game',
      gamelengths: [0, 2, 5, 10, 25, 50, 100, 200, 500, 1000, 2000],

      droupDown1Options: [
        { key: 1, droupDown: 1, name: 'Last 2 Games', selected: true },
        { key: 2, droupDown: 1, name: 'Last 5 Games' },
        { key: 3, droupDown: 1, name: 'Last 10 Games' },
        { key: 4, droupDown: 1, name: 'Last 25 Games' },
        { key: 5, droupDown: 1, name: 'Last 50 Games' },
        { key: 6, droupDown: 1, name: 'Last 100 Games' },
        { key: 7, droupDown: 1, name: 'Last 200 Games' },
        { key: 8, droupDown: 1, name: 'Last 500 Games' },
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
        { key: 1, title: 'GP' },
        { key: 2, title: 'G' },
        { key: 3, title: 'A' },
        { key: 4, title: 'P' },
        { key: 5, title: '+/-' },
        { key: 6, title: 'S' },
        { key: 7, title: 'S%' },
        { key: 8, title: 'P/G' },
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
        { key: 1, title: 'GP' },
        { key: 2, title: 'GS' },
        { key: 3, title: 'WINS' },
        { key: 4, title: 'LOSS' },
        { key: 5, title: 'OTL' },
        { key: 6, title: 'SA' },
        { key: 7, title: 'SV' },
        { key: 8, title: 'GA' },
        { key: 9, title: 'SV%' },
        { key: 10, title: 'GAA' },
        { key: 11, title: 'MIN' },
        { key: 12, title: 'SO' },
      ],
      lastGameDataTemp: {},
      lastGameDataPlayOffsTemp: {},
      lastGameData: {},
      lastGameDataPlayOffs: {},
      arr: {},
    };

    this._getSeasons = this._getSeasons.bind(this);
    this._getScore = this._getScore.bind(this);
    this._getHeadings = this._getHeadings.bind(this);

    this.service = new Service();
    this.appService = new AppService();
  }

  async componentWillMount() {
    var remainingGames = this.props.remainingGames;
    await this.setState({ remainingGames, remainingGame: remainingGames[0] });

    // var thisYear = moment().format('YYYY')
    // var nextYear = moment().add(1, 'Y').format('YYYY')
    var selectedYear = this.context;

    await this.getLastGameData(2, 'gameLog', selectedYear);
    // await this.getLastGameData(10, 'playoffGameLog', selectedYear)
    await this.addGameLogs(10);

    this.setState({ process: false });
  }

  _selecetOption = (item) => {
    if (item.droupDown == 1) {
      this.setState({
        droupDown1Selected: item.name,
        showDroupDown1: false,
        enableScroll: true,
      });
      if (item.key === 1) {
        this.setState({ totalGames: 2 });
        this.addGameLogs(2);
      } else if (item.key === 2) {
        this.setState({ totalGames: 5 });
        this.addGameLogs(5);
      } else if (item.key === 3) {
        this.setState({ totalGames: 10 });
        this.addGameLogs(10);
      } else if (item.key === 4) {
        this.setState({ totalGames: 25 });
        this.addGameLogs(25);
      } else if (item.key === 5) {
        this.setState({ totalGames: 50 });
        this.addGameLogs(50);
      } else if (item.key === 6) {
        this.setState({ totalGames: 100 });
        this.addGameLogs(100);
      } else if (item.key === 7) {
        this.setState({ totalGames: 200 });
        this.addGameLogs(200);
      } else if (item.key === 8) {
        this.setState({ totalGames: 500 });
        this.addGameLogs(500);
      }
    } else if (item.droupDown === 2) {
      this.setState({ droupDown2Selected: item.name, showDroupDown2: false });
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

  _getSeasons(item) {
    return (
      <View style={{}} key={item.key}>
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

  _getScore(item) {
    var new_value = '';
    var typee = typeof item.value;
    if (typee === 'number' && item.value % 1 !== 0) {
      let setDecimal = 1;
      if (item.type === 'goalsAgainstAverage') {
        setDecimal = 2;
      }
      if (item.type === 'SavePercentage') {
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
            { color: '#8AABFF', marginTop: 10, fontWeight: 'normal' },
          ]}>
          {item.title}
        </Text>
      </View>
    );
  }

  getLastGameData = async (num, filter, year) => {
    var selectedGames = 0;
    var player = this.props.item;
    var playerLink = player.playerLink;
    if (playerLink !== '' && playerLink !== undefined) {
      // while (num > selectedGames) {
      //    var res = await this.service.getGameLogs(playerLink, filter, year)

      var res = '';
      var seasonsdata = [];
      const seasonsdata_prop = this.props.lastGamesData.seasons;
      seasonsdata_prop.forEach(function (item1) {
        var a = item1.value.split('-');
        var b = a[0] + a[1];
        seasonsdata.push(b);
      });

      var uniqueseason = seasonsdata.filter(
        (val, id, seasonsdata) => seasonsdata.indexOf(val) === id,
      );
      var items = [];
      for (var ii = 0; ii < uniqueseason.length; ii++) {
        res = await this.service.getGameLogs(
          playerLink,
          filter,
          uniqueseason[ii],
        );
        items.push(res.data.stats[0].splits);
      }
      var splits = [].concat.apply([], items);

      this.setState({ totalGames: splits.length });

      if (res != null && res.data != null) {
        // var splits = [];
        // if (filter == undefined)
        //     splits =splits.reverse()
        // else
        //     splits = splits;

        var lastGameData = this.make_array(splits, 'splits');

        if (filter !== undefined) {
          this.setState({ lastGameDataTemp: lastGameData });
        } else {
          this.setState({ lastGameDataPlayOffsTemp: lastGameData });
        }
      }
      // }
    }
  };

  onHandleTimeFormat = (value) => {
    const subStringData = value.toString().substring(0, value.length - 3);
    return subStringData;
  };

  format_SPtage = (value) => {
    let sptValue;
    const substringData = value.toString().substring(2);
    if (substringData.length === 0) {
      sptValue = `${substringData}0.0`;
    }
    if (substringData.length === 1) {
      sptValue = `${substringData}0.0`;
    }
    if (substringData.length === 2) {
      sptValue = `${substringData}.0`;
    }
    if (substringData.length > 2 && substringData.charAt(0) !== '0') {
      sptValue = `${substringData.charAt(0)}${substringData.charAt(
        1,
      )}.${substringData.charAt(2)}`;
    }
    if (substringData.charAt(0) === '0') {
      sptValue = `${substringData.charAt(1)}.${substringData.charAt(2)}`;
    }
    return sptValue;
  };

  formala_GAA = (defaultV, goals, gp) => {
    let result;
    if (defaultV === 0) {
      result = goals / gp;
    } else {
      result = defaultV;
    }
    return result;
  };

  formola_SV_GAA = (savesV, shotAgainstV) => {
    let result;
    result = savesV / shotAgainstV;
    return result;
  };

  make_array = (split_data, from) => {
    var splits = split_data;
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
    // var evenTimeOnIce = []
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
    var SavePercentage = [];
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
    var SavePercentage = [];
    if (from === 'splits') {
      splits.forEach((element, index) => {
        GP[index] = {
          key: index,
          value: element.stat.games ? element.stat.games : 0,
        };
        GS[index] = {
          key: index,
          value: element.stat.gamesStarted ? element.stat.gamesStarted : 0,
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
          value: element.stat.shotPct ? element.stat.shotPct : 0,
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
            ? (element.stat.points / element.stat.games).toFixed(2)
            : 0,
          length: splits.length,
          type: 'PointsPerGame',
        };
        PowerplayGoals[index] = {
          key: index,
          value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0,
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
          value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0,
          length: splits.length,
          type: 'overTimeGoals',
        };
        // TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame : 0, length: splits.length, type: "timeOnIcePerGame", }
        TimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.timeOnIce ? element.stat.timeOnIce : 0,
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
            ? element.stat.powerPlayTimeOnIce
            : 0,
          length: splits.length,
          type: 'powerPlayTimeOnIce',
        };
        ShortHandedTimeOnIce[index] = {
          key: index,
          value: element.stat.shortHandedTimeOnIce
            ? element.stat.shortHandedTimeOnIce
            : 0,
          length: splits.length,
          type: 'shortHandedTimeOnIce',
        };
        PowerplayTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.powerPlayTimeOnIcePerGame
            ? element.stat.powerPlayTimeOnIcePerGame
            : 0,
          length: splits.length,
          type: 'powerPlayTimeOnIcePerGame',
        };
        ShortHandedTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.shortHandedTimeOnIcePerGame
            ? element.stat.shortHandedTimeOnIcePerGame
            : 0,
          length: splits.length,
          type: 'shortHandedTimeOnIcePerGame',
        };
        // evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
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
          value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0,
          length: splits.length,
          type: 'BpenaltyMinutesS',
        };
        PowerplayShots[index] = {
          key: index,
          value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0,
          length: splits.length,
          type: 'powerPlayShots',
        };
        PowerplaySaves[index] = {
          key: index,
          value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0,
          length: splits.length,
          type: 'powerPlaySaves',
        };
        PowerPlaySavePtage[index] = {
          key: index,
          value: element.stat.powerPlaySavePtage
            ? element.stat.powerPlaySavePtage
            : 0,
          length: splits.length,
          type: 'powerPlaySavePtage',
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
          value: element.stat.eventStrengthShots
            ? element.stat.eventStrengthShots
            : 0,
          length: splits.length,
          type: 'eventStrengthShots',
        };
        EventStrengthSaves[index] = {
          key: index,
          value: element.stat.eventStrengthSaves
            ? element.stat.eventStrengthSaves
            : 0,
          length: splits.length,
          type: 'eventStrengthSaves',
        };
        EventStrengthSavePtage[index] = {
          key: index,
          value: element.stat.eventStrengthSavePtage
            ? element.stat.eventStrengthSavePtage
            : 0,
          length: splits.length,
          type: 'eventStrengthSavePtage',
        };
        SavePercentage[index] = {
          key: index,
          value: element.stat.savePercentage ? element.stat.savePercentage : 0,
          type: 'SavePercentage',
        };
      });
    } else if (from === 'last') {
      splits.forEach((element, index) => {
        GP[index] = {
          key: index,
          value: element.stat.GP ? element.stat.GP[0].value : 0,
        };
        GS[index] = {
          key: index,
          value: element.stat.GS ? element.stat.GS[0].value : 0,
        };
        G[index] = {
          key: index,
          value: element.stat.G ? element.stat.G[0].value : 0,
        };
        A[index] = {
          key: index,
          value: element.stat.A ? element.stat.A[0].value : 0,
        };
        P[index] = {
          key: index,
          value: element.stat.P ? element.stat.P[0].value : 0,
        };
        PlusMinus[index] = {
          key: index,
          value: element.stat.PlusMinus ? element.stat.PlusMinus[0].value : 0,
        };
        S[index] = {
          key: index,
          value: element.stat.S ? element.stat.S[0].value : 0,
        };
        SPtage[index] = {
          key: index,
          value: element.stat.SPtage
            ? this.format_SPtage(
                element.stat.G[0].value / element.stat.S[0].value,
              )
            : 0,
        };
        PIM[index] = {
          key: index,
          value: element.stat.PIM ? element.stat.PIM[0].value : 0,
        };
        Hits[index] = {
          key: index,
          value: element.stat.Hits ? element.stat.Hits[0].value : 0,
        };
        BS[index] = {
          key: index,
          value: element.stat.BS ? element.stat.BS[0].value : 0,
        };
        PointsPerGame[index] = {
          key: index,
          value: element.stat.PointsPerGame
            ? (
                element.stat.PointsPerGame[0].value / element.stat.GP[0].value
              ).toFixed(2)
            : 0,
          length: splits.length,
          type: 'PointsPerGamePerGame',
        };
        PowerplayGoals[index] = {
          key: index,
          value: element.stat.PowerplayGoals
            ? element.stat.PowerplayGoals[0].value
            : 0,
          length: splits.length,
          type: 'PowerplayGoals',
        };
        PowerplayPoints[index] = {
          key: index,
          value: element.stat.PowerplayPoints
            ? element.stat.PowerplayPoints[0].value
            : 0,
          length: splits.length,
          type: 'PowerplayPointsPerGame',
        };
        ShortHandedGoals[index] = {
          key: index,
          value: element.stat.ShortHandedGoals
            ? element.stat.ShortHandedGoals[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedGoals',
        };
        ShortHandedPoints[index] = {
          key: index,
          value: element.stat.ShortHandedPoints
            ? element.stat.ShortHandedPoints[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedPointsPerGame',
        };
        GameWinningGoals[index] = {
          key: index,
          value: element.stat.GameWinningGoals
            ? element.stat.GameWinningGoals[0].value
            : 0,
          length: splits.length,
          type: 'GameWinningGoals',
        };
        OvertimeGoals[index] = {
          key: index,
          value: element.stat.OvertimeGoals
            ? element.stat.OvertimeGoals[0].value
            : 0,
          length: splits.length,
          type: 'OvertimeGoals',
        };
        // TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame [0].value : 0, length: splits.length, type: "timeOnIcePerGame", }
        TimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.TimeOnIcePerGame
            ? this.onHandleTimeFormat(element.stat.TimeOnIcePerGame[0].value)
            : 0,
          length: splits.length,
          type: 'timeOnIcePerGame',
        };
        ShiftsPerGame[index] = {
          key: index,
          value: element.stat.ShiftsPerGame
            ? element.stat.ShiftsPerGame[0].value
            : 0,
          length: splits.length,
          type: 'shifts',
        };

        FaceoffWinPercentage[index] = {
          key: index,
          value: element.stat.FaceoffWinPercentage
            ? element.stat.FaceoffWinPercentage[0].value /
              element.stat.GP[0].value
            : 0,
          length: splits.length,
          type: 'faceOffPct',
        };
        PowerplayTimeOnIce[index] = {
          key: index,
          value: element.stat.PowerplayTimeOnIce
            ? this.onHandleTimeFormat(element.stat.PowerplayTimeOnIce[0].value)
            : 0,
          length: splits.length,
          type: 'powerPlayTimeOnIce',
        };
        ShortHandedTimeOnIce[index] = {
          key: index,
          value: element.stat.ShortHandedTimeOnIce
            ? element.stat.ShortHandedTimeOnIce[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedTimeOnIce',
        };
        PowerplayTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.PowerplayTimeOnIcePerGame
            ? this.onHandleTimeFormat(
                element.stat.PowerplayTimeOnIcePerGame[0].value,
              )
            : 0,
          length: splits.length,
          type: 'PowerplayTimeOnIcePerGame',
        };
        ShortHandedTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.ShortHandedTimeOnIcePerGame
            ? this.onHandleTimeFormat(
                element.stat.ShortHandedTimeOnIcePerGame[0].value,
              )
            : 0,
          length: splits.length,
          type: 'ShortHandedTimeOnIcePerGame',
        };
        // evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce [0].value : 0, length: splits.length, type: "evenTimeOnIce", }
        Wins[index] = {
          key: index,
          value: element.stat.Wins ? element.stat.Wins[0].value : 0,
          length: splits.length,
          type: 'wins',
        };
        Losses[index] = {
          key: index,
          value: element.stat.Losses ? element.stat.Losses[0].value : 0,
          length: splits.length,
          type: 'losses',
        };
        Ties[index] = {
          key: index,
          value: element.stat.Ties ? element.stat.Ties[0].value : 0,
          length: splits.length,
          type: 'ties',
        };
        OvertimeLosses[index] = {
          key: index,
          value: element.stat.OvertimeLosses
            ? element.stat.OvertimeLosses[0].value
            : 0,
          length: splits.length,
          type: 'overTimeLosses',
        };
        ShotsAgainst[index] = {
          key: index,
          value: element.stat.ShotsAgainst
            ? element.stat.ShotsAgainst[0].value
            : 0,
          length: splits.length,
          type: 'shotsAgainst',
        };
        Saves[index] = {
          key: index,
          value: element.stat.Saves ? element.stat.Saves[0].value : 0,
          length: splits.length,
          type: 'saves',
        };
        GoalsAgainst[index] = {
          key: index,
          value: element.stat.GoalsAgainst
            ? element.stat.GoalsAgainst[0].value
            : 0,
          length: splits.length,
          type: 'goalsAgainst',
        };
        GoalsAgainstAverage[index] = {
          key: index,
          value: element.stat.GoalsAgainstAverage
            ? this.formala_GAA(
                element.stat.GoalsAgainstAverage[0].value,
                element.stat.GoalsAgainst[0].value,
                element.stat.GP[0].value,
              )
            : 0,
          length: splits.length,
          type: 'goalsAgainstAverage',
        };
        TimeOnIce[index] = {
          key: index,
          value: element.stat.TimeOnIce ? element.stat.TimeOnIce[0].value : 0,
          length: splits.length,
          type: 'timeOnIce',
        };
        Shutouts[index] = {
          key: index,
          value: element.stat.Shutouts ? element.stat.Shutouts[0].value : 0,
          length: splits.length,
          type: 'shutouts',
        };
        PenaltyMinutes[index] = {
          key: index,
          value: element.stat.PenaltyMinutes
            ? element.stat.PenaltyMinutes[0].value
            : 0,
          length: splits.length,
          type: 'BpenaltyMinutesS',
        };
        PowerplayShots[index] = {
          key: index,
          value: element.stat.PowerplayShots
            ? element.stat.PowerplayShots[0].value
            : 0,
          length: splits.length,
          type: 'powerPlayShots',
        };
        PowerplaySaves[index] = {
          key: index,
          value: element.stat.PowerplaySaves
            ? element.stat.PowerplaySaves[0].value
            : 0,
          length: splits.length,
          type: 'powerPlaySaves',
        };
        PowerPlaySavePtage[index] = {
          key: index,
          value: element.stat.PowerPlaySavePtage
            ? element.stat.PowerPlaySavePtage[0].value /
              element.stat.GP[0].value
            : 0,
          length: splits.length,
          type: 'powerPlaySavePtage',
        };
        ShortHandedShots[index] = {
          key: index,
          value: element.stat.ShortHandedShots
            ? element.stat.ShortHandedShots[0].value
            : 0,
          length: splits.length,
          type: 'shortHandedShots',
        };
        ShortHandedSaves[index] = {
          key: index,
          value: element.stat.ShortHandedSaves
            ? element.stat.ShortHandedSaves[0].value
            : 0,
          length: splits.length,
          type: 'shortHandedSaves',
        };
        ShortHandedSavePercentage[index] = {
          key: index,
          value: element.stat.ShortHandedSavePercentage
            ? element.stat.ShortHandedSavePercentage[0].value /
              element.stat.GP[0].value
            : 0,
          length: splits.length,
          type: 'shortHandedSavePercentage',
        };
        EventStrengthShots[index] = {
          key: index,
          value: element.stat.EventStrengthShots
            ? element.stat.EventStrengthShots[0].value
            : 0,
          length: splits.length,
          type: 'eventStrengthShots',
        };
        EventStrengthSaves[index] = {
          key: index,
          value: element.stat.EventStrengthSaves
            ? element.stat.EventStrengthSaves[0].value
            : 0,
          length: splits.length,
          type: 'eventStrengthSaves',
        };
        EventStrengthSavePtage[index] = {
          key: index,
          value: element.stat.EventStrengthSavePtage
            ? element.stat.EventStrengthSavePtage[0].value /
              element.stat.GP[0].value
            : 0,
          length: splits.length,
          type: 'eventStrengthSavePtage',
        };
        SavePercentage[index] = {
          key: index,
          value: element.stat.SavePercentage[0].value
            ? this.formola_SV_GAA(
                element.stat.Saves[0].value,
                element.stat.ShotsAgainst[0].value,
              )
            : 0,
          type: 'SavePercentage',
        };
      });
    } else {
      splits.forEach((element, index) => {
        GP[index] = {
          key: index,
          value: element.stat.GP ? element.stat.GP[0].value : 0,
        };
        GS[index] = {
          key: index,
          value: element.stat.GS ? element.stat.GS[0].value : 0,
        };
        G[index] = {
          key: index,
          value: element.stat.G ? element.stat.G[0].value : 0,
        };
        A[index] = {
          key: index,
          value: element.stat.A ? element.stat.A[0].value : 0,
        };
        P[index] = {
          key: index,
          value: element.stat.P ? element.stat.P[0].value : 0,
        };
        PlusMinus[index] = {
          key: index,
          value: element.stat.PlusMinus ? element.stat.PlusMinus[0].value : 0,
        };
        S[index] = {
          key: index,
          value: element.stat.S ? element.stat.S[0].value : 0,
        };
        SPtage[index] = {
          key: index,
          value: element.stat.SPtage ? element.stat.SPtage[0].value : 0,
        };
        PIM[index] = {
          key: index,
          value: element.stat.PIM ? element.stat.PIM[0].value : 0,
        };
        Hits[index] = {
          key: index,
          value: element.stat.Hits ? element.stat.Hits[0].value : 0,
        };
        BS[index] = {
          key: index,
          value: element.stat.BS ? element.stat.BS[0].value : 0,
        };
        PointsPerGame[index] = {
          key: index,
          value: element.stat.PointsPerGame
            ? element.stat.PointsPerGame[0].value
            : 0,
          length: splits.length,
          type: 'PointsPerGamePerGame',
        };
        PowerplayGoals[index] = {
          key: index,
          value: element.stat.PowerplayGoals
            ? element.stat.PowerplayGoals[0].value
            : 0,
          length: splits.length,
          type: 'PowerplayGoals',
        };
        PowerplayPoints[index] = {
          key: index,
          value: element.stat.PowerplayPoints
            ? element.stat.PowerplayPoints[0].value
            : 0,
          length: splits.length,
          type: 'PowerplayPointsPerGame',
        };
        ShortHandedGoals[index] = {
          key: index,
          value: element.stat.ShortHandedGoals
            ? element.stat.ShortHandedGoals[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedGoals',
        };
        ShortHandedPoints[index] = {
          key: index,
          value: element.stat.ShortHandedPoints
            ? element.stat.ShortHandedPoints[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedPointsPerGame',
        };
        GameWinningGoals[index] = {
          key: index,
          value: element.stat.GameWinningGoals
            ? element.stat.GameWinningGoals[0].value
            : 0,
          length: splits.length,
          type: 'GameWinningGoals',
        };
        OvertimeGoals[index] = {
          key: index,
          value: element.stat.OvertimeGoals
            ? element.stat.OvertimeGoals[0].value
            : 0,
          length: splits.length,
          type: 'OvertimeGoals',
        };
        // TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame [0].value : 0, length: splits.length, type: "timeOnIcePerGame", }
        TimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.TimeOnIcePerGame
            ? element.stat.TimeOnIcePerGame[0].value
            : 0,
          length: splits.length,
          type: 'timeOnIcePerGame',
        };
        ShiftsPerGame[index] = {
          key: index,
          value: element.stat.ShiftsPerGame
            ? element.stat.ShiftsPerGame[0].value
            : 0,
          length: splits.length,
          type: 'shifts',
        };

        FaceoffWinPercentage[index] = {
          key: index,
          value: element.stat.FaceoffWinPercentage
            ? element.stat.FaceoffWinPercentage[0].value
            : 0,
          length: splits.length,
          type: 'faceOffPct',
        };
        PowerplayTimeOnIce[index] = {
          key: index,
          value: element.stat.PowerplayTimeOnIce
            ? element.stat.PowerplayTimeOnIce[0].value
            : 0,
          length: splits.length,
          type: 'powerPlayTimeOnIce',
        };
        ShortHandedTimeOnIce[index] = {
          key: index,
          value: element.stat.ShortHandedTimeOnIce
            ? element.stat.ShortHandedTimeOnIce[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedTimeOnIce',
        };
        PowerplayTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.PowerplayTimeOnIcePerGame
            ? element.stat.PowerplayTimeOnIcePerGame[0].value
            : 0,
          length: splits.length,
          type: 'PowerplayTimeOnIcePerGame',
        };
        ShortHandedTimeOnIcePerGame[index] = {
          key: index,
          value: element.stat.ShortHandedTimeOnIcePerGame
            ? element.stat.ShortHandedTimeOnIcePerGame[0].value
            : 0,
          length: splits.length,
          type: 'ShortHandedTimeOnIcePerGame',
        };
        // evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce [0].value : 0, length: splits.length, type: "evenTimeOnIce", }
        Wins[index] = {
          key: index,
          value: element.stat.Wins ? element.stat.Wins[0].value : 0,
          length: splits.length,
          type: 'wins',
        };
        Losses[index] = {
          key: index,
          value: element.stat.Losses ? element.stat.Losses[0].value : 0,
          length: splits.length,
          type: 'losses',
        };
        Ties[index] = {
          key: index,
          value: element.stat.Ties ? element.stat.Ties[0].value : 0,
          length: splits.length,
          type: 'ties',
        };
        OvertimeLosses[index] = {
          key: index,
          value: element.stat.OvertimeLosses
            ? element.stat.OvertimeLosses[0].value
            : 0,
          length: splits.length,
          type: 'overTimeLosses',
        };
        ShotsAgainst[index] = {
          key: index,
          value: element.stat.ShotsAgainst
            ? element.stat.ShotsAgainst[0].value
            : 0,
          length: splits.length,
          type: 'shotsAgainst',
        };
        Saves[index] = {
          key: index,
          value: element.stat.Saves ? element.stat.Saves[0].value : 0,
          length: splits.length,
          type: 'saves',
        };
        GoalsAgainst[index] = {
          key: index,
          value: element.stat.GoalsAgainst
            ? element.stat.GoalsAgainst[0].value
            : 0,
          length: splits.length,
          type: 'goalsAgainst',
        };
        GoalsAgainstAverage[index] = {
          key: index,
          value: element.stat.GoalsAgainstAverage
            ? element.stat.GoalsAgainstAverage[0].value
            : 0,
          length: splits.length,
          type: 'goalsAgainstAverage',
        };
        TimeOnIce[index] = {
          key: index,
          value: element.stat.TimeOnIce ? element.stat.TimeOnIce[0].value : 0,
          length: splits.length,
          type: 'timeOnIce',
        };
        Shutouts[index] = {
          key: index,
          value: element.stat.Shutouts ? element.stat.Shutouts[0].value : 0,
          length: splits.length,
          type: 'shutouts',
        };
        PenaltyMinutes[index] = {
          key: index,
          value: element.stat.PenaltyMinutes
            ? element.stat.PenaltyMinutes[0].value
            : 0,
          length: splits.length,
          type: 'BpenaltyMinutesS',
        };
        PowerplayShots[index] = {
          key: index,
          value: element.stat.PowerplayShots
            ? element.stat.PowerplayShots[0].value
            : 0,
          length: splits.length,
          type: 'powerPlayShots',
        };
        PowerplaySaves[index] = {
          key: index,
          value: element.stat.PowerplaySaves
            ? element.stat.PowerplaySaves[0].value
            : 0,
          length: splits.length,
          type: 'powerPlaySaves',
        };
        PowerPlaySavePtage[index] = {
          key: index,
          value: element.stat.PowerPlaySavePtage
            ? element.stat.PowerPlaySavePtage[0].value
            : 0,
          length: splits.length,
          type: 'powerPlaySavePtage',
        };
        ShortHandedShots[index] = {
          key: index,
          value: element.stat.ShortHandedShots
            ? element.stat.ShortHandedShots[0].value
            : 0,
          length: splits.length,
          type: 'shortHandedShots',
        };
        ShortHandedSaves[index] = {
          key: index,
          value: element.stat.ShortHandedSaves
            ? element.stat.ShortHandedSaves[0].value
            : 0,
          length: splits.length,
          type: 'shortHandedSaves',
        };
        ShortHandedSavePercentage[index] = {
          key: index,
          value: element.stat.ShortHandedSavePercentage
            ? element.stat.ShortHandedSavePercentage[0].value
            : 0,
          length: splits.length,
          type: 'shortHandedSavePercentage',
        };
        EventStrengthShots[index] = {
          key: index,
          value: element.stat.EventStrengthShots
            ? element.stat.EventStrengthShots[0].value
            : 0,
          length: splits.length,
          type: 'eventStrengthShots',
        };
        EventStrengthSaves[index] = {
          key: index,
          value: element.stat.EventStrengthSaves
            ? element.stat.EventStrengthSaves[0].value
            : 0,
          length: splits.length,
          type: 'eventStrengthSaves',
        };
        EventStrengthSavePtage[index] = {
          key: index,
          value: element.stat.EventStrengthSavePtage
            ? element.stat.EventStrengthSavePtage[0].value
            : 0,
          length: splits.length,
          type: 'eventStrengthSavePtage',
        };
        SavePercentage[index] = {
          key: index,
          value: element.stat.SavePercentage
            ? element.stat.SavePercentage[0].value
            : 0,
          type: 'SavePercentage',
        };
      });
    }
    var set_data = {
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
      // evenTimeOnIce,
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
      SavePercentage,
    };

    return set_data;
  };

  addGameLogs = (num) => {
    const temparr = this.state.lastGameDataTemp;
    if (temparr.GP.length >= num) {
      var game_data = [];
      var added_arr = [];
      var sum_arr = [];
      var final_arr = [];
      var datalength = temparr.GP.length;
      var arr = [];
      for (var kk = 1; kk <= 10; kk++) {
        if (datalength <= this.state.gamelengths[kk]) {
          var total_to_cal = kk - 1;
          for (var jj = 0; jj < total_to_cal; jj++) {
            this.calculate(
              total_to_cal,
              jj,
              jj + 1,
              temparr,
              game_data,
              'main_add',
            );
            if (jj === 0) {
              added_arr.push(game_data[0]);
              final_arr.push({ stat: added_arr[0] });
            } else {
              var texts = [
                { stat: added_arr[jj - 1] },
                { stat: game_data[jj] },
              ];
              arr = this.make_array(texts, 'add');
              var sum_arr = [];

              this.calculate(1, 0, 1, arr, sum_arr, 'add');
              added_arr.push(sum_arr[0]);
              final_arr.push({ stat: added_arr[jj] });
            }
          }
          break;
        }
      }
      arr = this.make_array(final_arr, 'last');
      this.setState({ lastGameData: arr });

      // added_arr.forEach((element, index) => {
      //     // if (element.league.name == 'National Hockey League') {

      //     GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
      //     G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
      //     A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
      //     P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
      //     PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
      //     S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
      //     SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct : 0 }
      //     PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
      //     Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
      //     BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

      //     PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games).toFixed(2) : 0, length: splits.length, type: "PointsPerGame", }
      //     PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
      //     PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
      //     ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
      //     ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
      //     GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
      //     OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
      //     // TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame : 0, length: splits.length, type: "timeOnIcePerGame", }
      //     TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? element.stat.timeOnIce : 0, length: splits.length, type: "timeOnIcePerGame" }

      //     ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
      //     FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? element.stat.faceOffPct : 0, length: splits.length, type: "faceOffPct", }
      //     PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? element.stat.powerPlayTimeOnIce : 0, length: splits.length, type: "powerPlayTimeOnIce", }
      //     ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? element.stat.shortHandedTimeOnIce : 0, length: splits.length, type: "shortHandedTimeOnIce", }
      //     PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? element.stat.powerPlayTimeOnIcePerGame : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
      //     ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? element.stat.shortHandedTimeOnIcePerGame : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
      //   //  evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
      //     Wins[index] = { key: index, value: element.stat.decision == "W" ? 1 : 0, length: splits.length, type: "wins", }
      //     Losses[index] = { key: index, value: element.stat.decision == "L" ? 1 : 0, length: splits.length, type: "losses", }
      //     Ties[index] = { key: index, value: element.stat.decision == "T" ? 1 : 0, length: splits.length, type: "ties", }
      //     OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
      //     ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
      //     Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
      //     GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
      //     GoalsAgainstAverage[index] = { key: index, value: element.stat.goalsAgainstAverage ? element.stat.goalsAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
      //     TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? element.stat.timeOnIce : 0, length: splits.length, type: "timeOnIce", }
      //     Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
      //     PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
      //     PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
      //     PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
      //     PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
      //     ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
      //     ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
      //     ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage : 0, length: splits.length, type: "shortHandedSavePercentage", }
      //     EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
      //     EventStrengthSaves[index] = { key: index, value: element.stat.eventStrengthSaves ? element.stat.eventStrengthSaves : 0, length: splits.length, type: "eventStrengthSaves", }
      //     EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

      //     // }
      // });
      // var obj = ist.merge(snd);
    }
    // if (this.state.lastGameDataPlayOffsTemp.GP.length >= num) {

    //     var lastGameDataPlayOffs = {
    //         GP: [], G: [], A: [], P: [], PlusMinus: [], S: [], SPtage: [], PIM: [], Hits: [], BS: [], team: [], seasons: [],
    //         PointsPerGame: [],
    //         PowerplayGoals: [],
    //         PowerplayPoints: [],
    //         ShortHandedGoals: [],
    //         ShortHandedPoints: [],
    //         GameWinningGoals: [],
    //         OvertimeGoals: [],
    //         TimeOnIcePerGame: [],
    //         ShiftsPerGame: [],
    //         FaceoffWinPercentage: [],
    //         PowerplayTimeOnIce: [],
    //         ShortHandedTimeOnIce: [],
    //         PowerplayTimeOnIcePerGame: [],
    //         ShortHandedTimeOnIcePerGame: [],
    //         evenTimeOnIce: [],
    //         Wins: [],
    //         Losses: [],
    //         Ties: [],
    //         OvertimeLosses: [],
    //         ShotsAgainst: [],
    //         Saves: [],
    //         GoalsAgainst: [],
    //         GoalsAgainstAverage: [],
    //         TimeOnIce: [],
    //         Shutouts: [],
    //         PenaltyMinutes: [],
    //         PowerplayShots: [],
    //         PowerplaySaves: [],
    //         PowerPlaySavePtage: [],
    //         ShortHandedShots: [],
    //         ShortHandedSaves: [],
    //         ShortHandedSavePercentage: [],
    //         EventStrengthShots: [],
    //         EventStrengthSaves: [],
    //         EventStrengthSavePtage: [],
    //     }

    //     start = 0
    //     var GP = this.state.lastGameDataPlayOffsTemp.GP;
    //     lastGameDataPlayOffs.GP[0] = { key: 0, value: this.getSum(start, num, GP) }

    //     var G = this.state.lastGameDataPlayOffsTemp.G;
    //     lastGameDataPlayOffs.G[0] = { key: 0, value: this.getSum(start, num, G) }

    //     var A = this.state.lastGameDataPlayOffsTemp.A;
    //     lastGameDataPlayOffs.A[0] = { key: 0, value: this.getSum(start, num, A) }

    //     var P = this.state.lastGameDataPlayOffsTemp.P;
    //     lastGameDataPlayOffs.P[0] = { key: 0, value: this.getSum(start, num, P) }

    //     var PlusMinus = this.state.lastGameDataPlayOffsTemp.PlusMinus;
    //     lastGameDataPlayOffs.PlusMinus[0] = { key: 0, value: this.getSum(start, num, PlusMinus) }

    //     var S = this.state.lastGameDataPlayOffsTemp.S;
    //     lastGameDataPlayOffs.S[0] = { key: 0, value: this.getSum(start, num, S) }

    //     var SPtage = this.state.lastGameDataPlayOffsTemp.SPtage;
    //     var value = this.getSum(start, num, SPtage);
    //     lastGameDataPlayOffs.SPtage[0] = { key: 0, value: value.toPrecision(3) }

    //     var PIM = this.state.lastGameDataPlayOffsTemp.PIM;
    //     lastGameDataPlayOffs.PIM[0] = { key: 0, value: this.getSum(start, num, PIM) }

    //     var Hits = this.state.lastGameDataPlayOffsTemp.Hits;
    //     lastGameDataPlayOffs.Hits[0] = { key: 0, value: this.getSum(start, num, Hits) }

    //     var BS = this.state.lastGameDataPlayOffsTemp.BS;
    //     lastGameDataPlayOffs.BS[0] = { key: 0, value: this.getSum(start, num, BS) }

    //     var PointsPerGame = this.state.lastGameDataPlayOffsTemp.PointsPerGame;
    //     lastGameDataPlayOffs.PointsPerGame[0] = { key: 0, value: this.getSum(start, num, PointsPerGame) }

    //     var PowerplayGoals = this.state.lastGameDataPlayOffsTemp.PowerplayGoals;
    //     lastGameDataPlayOffs.PowerplayGoals[0] = { key: 0, value: this.getSum(start, num, PowerplayGoals) }

    //     var PowerplayPoints = this.state.lastGameDataPlayOffsTemp.PowerplayPoints;
    //     lastGameDataPlayOffs.PowerplayPoints[0] = { key: 0, value: this.getSum(start, num, PowerplayPoints) }

    //     var ShortHandedGoals = this.state.lastGameDataPlayOffsTemp.ShortHandedGoals;
    //     lastGameDataPlayOffs.ShortHandedGoals[0] = { key: 0, value: this.getSum(start, num, ShortHandedGoals) }

    //     var ShortHandedPoints = this.state.lastGameDataPlayOffsTemp.ShortHandedPoints;
    //     lastGameDataPlayOffs.ShortHandedPoints[0] = { key: 0, value: this.getSum(start, num, ShortHandedPoints) }

    //     var GameWinningGoals = this.state.lastGameDataPlayOffsTemp.GameWinningGoals;
    //     lastGameDataPlayOffs.GameWinningGoals[0] = { key: 0, value: this.getSum(start, num, GameWinningGoals) }

    //     var OvertimeGoals = this.state.lastGameDataPlayOffsTemp.OvertimeGoals;
    //     lastGameDataPlayOffs.OvertimeGoals[0] = { key: 0, value: this.getSum(start, num, OvertimeGoals) }

    //     var TimeOnIcePerGame = this.state.lastGameDataPlayOffsTemp.TimeOnIcePerGame;
    //     lastGameDataPlayOffs.TimeOnIcePerGame[0] = { key: 0, value: this.getSumtime(start, num, TimeOnIcePerGame) }

    //     var ShiftsPerGame = this.state.lastGameDataPlayOffsTemp.ShiftsPerGame;
    //     lastGameDataPlayOffs.ShiftsPerGame[0] = { key: 0, value: this.getSum(start, num, ShiftsPerGame) }

    //     var FaceoffWinPercentage = this.state.lastGameDataPlayOffsTemp.FaceoffWinPercentage;
    //     lastGameDataPlayOffs.FaceoffWinPercentage[0] = { key: 0, value: this.getSum(start, num, FaceoffWinPercentage) }

    //     var PowerplayTimeOnIce = this.state.lastGameDataPlayOffsTemp.PowerplayTimeOnIce;
    //     lastGameDataPlayOffs.PowerplayTimeOnIce[0] = { key: 0, value: this.getSumtime(start, num, PowerplayTimeOnIce) }

    //     var ShortHandedTimeOnIce = this.state.lastGameDataPlayOffsTemp.ShortHandedTimeOnIce;
    //     lastGameDataPlayOffs.ShortHandedTimeOnIce[0] = { key: 0, value: this.getSumtime(start, num, ShortHandedTimeOnIce) }

    //     var PowerplayTimeOnIcePerGame = this.state.lastGameDataPlayOffsTemp.PowerplayTimeOnIcePerGame;
    //     lastGameDataPlayOffs.PowerplayTimeOnIcePerGame[0] = { key: 0, value: this.getSumtime(start, num, PowerplayTimeOnIcePerGame) }

    //     var ShortHandedTimeOnIcePerGame = this.state.lastGameDataPlayOffsTemp.ShortHandedTimeOnIcePerGame;
    //     lastGameDataPlayOffs.ShortHandedTimeOnIcePerGame[0] = { key: 0, value: this.getSumtime(start, num, ShortHandedTimeOnIcePerGame) }

    //     var evenTimeOnIce = this.state.lastGameDataPlayOffsTemp.evenTimeOnIce;
    //     lastGameDataPlayOffs.evenTimeOnIce[0] = { key: 0, value: this.getSumtime(start, num, evenTimeOnIce) }

    //     var Wins = this.state.lastGameDataPlayOffsTemp.Wins;
    //     lastGameDataPlayOffs.Wins[0] = { key: 0, value: this.getSum(start, num, Wins) }

    //     var Losses = this.state.lastGameDataPlayOffsTemp.Losses;
    //     lastGameDataPlayOffs.Losses[0] = { key: 0, value: this.getSum(start, num, Losses) }

    //     var Ties = this.state.lastGameDataPlayOffsTemp.Ties;
    //     lastGameDataPlayOffs.Ties[0] = { key: 0, value: this.getSum(start, num, Ties) }

    //     var OvertimeLosses = this.state.lastGameDataPlayOffsTemp.OvertimeLosses;
    //     lastGameDataPlayOffs.OvertimeLosses[0] = { key: 0, value: this.getSum(start, num, OvertimeLosses) }

    //     var ShotsAgainst = this.state.lastGameDataPlayOffsTemp.ShotsAgainst;
    //     lastGameDataPlayOffs.ShotsAgainst[0] = { key: 0, value: this.getSum(start, num, ShotsAgainst) }

    //     var Saves = this.state.lastGameDataPlayOffsTemp.Saves;
    //     lastGameDataPlayOffs.Saves[0] = { key: 0, value: this.getSum(start, num, Saves) }

    //     var GoalsAgainst = this.state.lastGameDataPlayOffsTemp.GoalsAgainst;
    //     lastGameDataPlayOffs.GoalsAgainst[0] = { key: 0, value: this.getSum(start, num, GoalsAgainst) }

    //     var GoalsAgainstAverage = this.state.lastGameDataPlayOffsTemp.GoalsAgainstAverage;
    //     lastGameDataPlayOffs.GoalsAgainstAverage[0] = { key: 0, value: this.getSum(start, num, GoalsAgainstAverage) }

    //     var TimeOnIce = this.state.lastGameDataPlayOffsTemp.TimeOnIce;
    //     lastGameDataPlayOffs.TimeOnIce[0] = { key: 0, value: 0 /*this.getSum(start,num, TimeOnIce)*/ }

    //     var Shutouts = this.state.lastGameDataPlayOffsTemp.Shutouts;
    //     lastGameDataPlayOffs.Shutouts[0] = { key: 0, value: this.getSum(start, num, Shutouts) }

    //     var PenaltyMinutes = this.state.lastGameDataPlayOffsTemp.PenaltyMinutes;
    //     lastGameDataPlayOffs.PenaltyMinutes[0] = { key: 0, value: this.getSum(start, num, PenaltyMinutes) }

    //     var PowerplayShots = this.state.lastGameDataPlayOffsTemp.PowerplayShots;
    //     lastGameDataPlayOffs.PowerplayShots[0] = { key: 0, value: this.getSum(start, num, PowerplayShots) }

    //     var PowerplaySaves = this.state.lastGameDataPlayOffsTemp.PowerplaySaves;
    //     lastGameDataPlayOffs.PowerplaySaves[0] = { key: 0, value: this.getSum(start, num, PowerplaySaves) }

    //     var PowerPlaySavePtage = this.state.lastGameDataPlayOffsTemp.PowerPlaySavePtage;
    //     lastGameDataPlayOffs.PowerPlaySavePtage[0] = { key: 0, value: this.getSum(start, num, PowerPlaySavePtage) }

    //     var ShortHandedShots = this.state.lastGameDataPlayOffsTemp.ShortHandedShots;
    //     lastGameDataPlayOffs.ShortHandedShots[0] = { key: 0, value: this.getSum(start, num, ShortHandedShots) }

    //     var ShortHandedSaves = this.state.lastGameDataPlayOffsTemp.ShortHandedSaves;
    //     lastGameDataPlayOffs.ShortHandedSaves[0] = { key: 0, value: this.getSum(start, num, ShortHandedSaves) }

    //     var ShortHandedSavePercentage = this.state.lastGameDataPlayOffsTemp.ShortHandedSavePercentage;
    //     lastGameDataPlayOffs.ShortHandedSavePercentage[0] = { key: 0, value: this.getSum(start, num, ShortHandedSavePercentage) }

    //     var EventStrengthShots = this.state.lastGameDataPlayOffsTemp.EventStrengthShots;
    //     lastGameDataPlayOffs.EventStrengthShots[0] = { key: 0, value: this.getSum(start, num, EventStrengthShots) }

    //     var EventStrengthSaves = this.state.lastGameDataPlayOffsTemp.EventStrengthSaves;
    //     lastGameDataPlayOffs.EventStrengthSaves[0] = { key: 0, value: this.getSum(start, num, EventStrengthSaves) }

    //     var EventStrengthSavePtage = this.state.lastGameDataPlayOffsTemp.EventStrengthSavePtage;
    //     lastGameDataPlayOffs.EventStrengthSavePtage[0] = { key: 0, value: this.getSum(start, num, EventStrengthSavePtage) }
    //     this.setState({ lastGameDataPlayOffs })
    // }
  };
  calculate = (total, from, to, state_array, data_array, addtype) => {
    var lastGameData = {
      GP: [],
      GS: [],
      G: [],
      A: [],
      P: [],
      PlusMinus: [],
      S: [],
      SPtage: [],
      PIM: [],
      Hits: [],
      BS: [],
      team: [],
      seasons: [],
      PointsPerGame: [],
      PowerplayGoals: [],
      PowerplayPoints: [],
      ShortHandedGoals: [],
      ShortHandedPoints: [],
      GameWinningGoals: [],
      OvertimeGoals: [],
      TimeOnIcePerGame: [],
      ShiftsPerGame: [],
      FaceoffWinPercentage: [],
      PowerplayTimeOnIce: [],
      ShortHandedTimeOnIce: [],
      PowerplayTimeOnIcePerGame: [],
      ShortHandedTimeOnIcePerGame: [],
      // evenTimeOnIce: [],
      Wins: [],
      Losses: [],
      Ties: [],
      OvertimeLosses: [],
      ShotsAgainst: [],
      Saves: [],
      GoalsAgainst: [],
      GoalsAgainstAverage: [],
      TimeOnIce: [],
      Shutouts: [],
      PenaltyMinutes: [],
      PowerplayShots: [],
      PowerplaySaves: [],
      PowerPlaySavePtage: [],
      ShortHandedShots: [],
      ShortHandedSaves: [],
      ShortHandedSavePercentage: [],
      EventStrengthShots: [],
      EventStrengthSaves: [],
      EventStrengthSavePtage: [],
      SavePercentage: [],
    };
    var num = 0;

    var start = this.state.gamelengths[from];
    if (from < total) {
      num = this.state.gamelengths[to];
    } else {
      num = state_array.GP.length;
    }

    var SavePercentage = state_array.SavePercentage;
    lastGameData.SavePercentage[0] = {
      key: 0,
      value: this.getSum(start, num, SavePercentage),
    };

    var GP = state_array.GP;
    lastGameData.GP[0] = { key: 0, value: this.getSum(start, num, GP) };

    var GS = state_array.GS;
    lastGameData.GS[0] = { key: 0, value: this.getSum(start, num, GS) };

    var G = state_array.G;
    lastGameData.G[0] = { key: 0, value: this.getSum(start, num, G) };

    var A = state_array.A;
    lastGameData.A[0] = { key: 0, value: this.getSum(start, num, A) };

    var P = state_array.P;
    lastGameData.P[0] = { key: 0, value: this.getSum(start, num, P) };

    var PlusMinus = state_array.PlusMinus;
    lastGameData.PlusMinus[0] = {
      key: 0,
      value: this.getSum(start, num, PlusMinus),
    };

    var S = state_array.S;
    lastGameData.S[0] = { key: 0, value: this.getSum(start, num, S) };

    var SPtage = state_array.SPtage;
    var value = this.getSum(start, num, SPtage);
    lastGameData.SPtage[0] = { key: 0, value: value.toPrecision(3) };

    var PIM = state_array.PIM;
    lastGameData.PIM[0] = { key: 0, value: this.getSum(start, num, PIM) };

    var Hits = state_array.Hits;
    lastGameData.Hits[0] = { key: 0, value: this.getSum(start, num, Hits) };

    var BS = state_array.BS;
    lastGameData.BS[0] = { key: 0, value: this.getSum(start, num, BS) };

    var PointsPerGame = state_array.PointsPerGame;
    lastGameData.PointsPerGame[0] = {
      key: 0,
      value: this.getSum(start, num, PointsPerGame),
    };

    var PowerplayGoals = state_array.PowerplayGoals;
    lastGameData.PowerplayGoals[0] = {
      key: 0,
      value: this.getSum(start, num, PowerplayGoals),
    };

    var PowerplayPoints = state_array.PowerplayPoints;
    lastGameData.PowerplayPoints[0] = {
      key: 0,
      value: this.getSum(start, num, PowerplayPoints),
    };

    var ShortHandedGoals = state_array.ShortHandedGoals;
    lastGameData.ShortHandedGoals[0] = {
      key: 0,
      value: this.getSum(start, num, ShortHandedGoals),
    };

    var ShortHandedPoints = state_array.ShortHandedPoints;
    lastGameData.ShortHandedPoints[0] = {
      key: 0,
      value: this.getSum(start, num, ShortHandedPoints),
    };

    var GameWinningGoals = state_array.GameWinningGoals;
    lastGameData.GameWinningGoals[0] = {
      key: 0,
      value: this.getSum(start, num, GameWinningGoals),
    };

    var OvertimeGoals = state_array.OvertimeGoals;
    lastGameData.OvertimeGoals[0] = {
      key: 0,
      value: this.getSum(start, num, OvertimeGoals),
    };

    var TimeOnIcePerGame = state_array.TimeOnIcePerGame;
    lastGameData.TimeOnIcePerGame[0] = {
      key: 0,
      value: this.getSumtime(start, num, TimeOnIcePerGame),
    };

    var ShiftsPerGame = state_array.ShiftsPerGame;
    lastGameData.ShiftsPerGame[0] = {
      key: 0,
      value: this.getSum(start, num, ShiftsPerGame),
    };

    var FaceoffWinPercentage = state_array.FaceoffWinPercentage;
    lastGameData.FaceoffWinPercentage[0] = {
      key: 0,
      value: this.getSum(start, num, FaceoffWinPercentage),
    };

    var PowerplayTimeOnIce = state_array.PowerplayTimeOnIce;
    lastGameData.PowerplayTimeOnIce[0] = {
      key: 0,
      value: this.getSumtime(start, num, PowerplayTimeOnIce),
    };

    var ShortHandedTimeOnIce = state_array.ShortHandedTimeOnIce;
    lastGameData.ShortHandedTimeOnIce[0] = {
      key: 0,
      value: this.getSumtime(start, num, ShortHandedTimeOnIce),
    };

    var PowerplayTimeOnIcePerGame = state_array.PowerplayTimeOnIcePerGame;
    lastGameData.PowerplayTimeOnIcePerGame[0] = {
      key: 0,
      value: this.getSumtime(start, num, PowerplayTimeOnIcePerGame),
    };

    var ShortHandedTimeOnIcePerGame = state_array.ShortHandedTimeOnIcePerGame;
    lastGameData.ShortHandedTimeOnIcePerGame[0] = {
      key: 0,
      value: this.getSumtime(start, num, ShortHandedTimeOnIcePerGame),
    };

    var Wins = state_array.Wins;
    lastGameData.Wins[0] = { key: 0, value: this.getSum(start, num, Wins) };

    var Losses = state_array.Losses;
    lastGameData.Losses[0] = { key: 0, value: this.getSum(start, num, Losses) };

    var Ties = state_array.Ties;
    lastGameData.Ties[0] = { key: 0, value: this.getSum(start, num, Ties) };

    var OvertimeLosses = state_array.OvertimeLosses;
    lastGameData.OvertimeLosses[0] = {
      key: 0,
      value: this.getSum(start, num, OvertimeLosses),
    };

    var ShotsAgainst = state_array.ShotsAgainst;
    lastGameData.ShotsAgainst[0] = {
      key: 0,
      value: this.getSum(start, num, ShotsAgainst),
    };

    var Saves = state_array.Saves;
    lastGameData.Saves[0] = { key: 0, value: this.getSum(start, num, Saves) };

    var GoalsAgainst = state_array.GoalsAgainst;
    lastGameData.GoalsAgainst[0] = {
      key: 0,
      value: this.getSum(start, num, GoalsAgainst),
    };

    var GoalsAgainstAverage = state_array.GoalsAgainstAverage;
    lastGameData.GoalsAgainstAverage[0] = {
      key: 0,
      value: this.getSum2(start, num, GoalsAgainstAverage),
    };

    var TimeOnIce = state_array.TimeOnIce;
    lastGameData.TimeOnIce[0] = {
      key: 0,
      value: this.getSum(start, num, TimeOnIce),
    };

    var Shutouts = state_array.Shutouts;
    lastGameData.Shutouts[0] = {
      key: 0,
      value: this.getSum(start, num, Shutouts),
    };

    var PenaltyMinutes = state_array.PenaltyMinutes;
    lastGameData.PenaltyMinutes[0] = {
      key: 0,
      value: this.getSum(start, num, PenaltyMinutes),
    };

    var PowerplayShots = state_array.PowerplayShots;
    lastGameData.PowerplayShots[0] = {
      key: 0,
      value: this.getSum(start, num, PowerplayShots),
    };

    var PowerplaySaves = state_array.PowerplaySaves;
    lastGameData.PowerplaySaves[0] = {
      key: 0,
      value: this.getSum(start, num, PowerplaySaves),
    };

    var PowerPlaySavePtage = state_array.PowerPlaySavePtage;
    lastGameData.PowerPlaySavePtage[0] = {
      key: 0,
      value: this.getSum(start, num, PowerPlaySavePtage),
    };

    var ShortHandedShots = state_array.ShortHandedShots;
    lastGameData.ShortHandedShots[0] = {
      key: 0,
      value: this.getSum(start, num, ShortHandedShots),
    };

    var ShortHandedSaves = state_array.ShortHandedSaves;
    lastGameData.ShortHandedSaves[0] = {
      key: 0,
      value: this.getSum(start, num, ShortHandedSaves),
    };

    var ShortHandedSavePercentage = state_array.ShortHandedSavePercentage;
    lastGameData.ShortHandedSavePercentage[0] = {
      key: 0,
      value: this.getSum(start, num, ShortHandedSavePercentage),
    };

    var EventStrengthShots = state_array.EventStrengthShots;
    lastGameData.EventStrengthShots[0] = {
      key: 0,
      value: this.getSum(start, num, EventStrengthShots),
    };

    var EventStrengthSaves = state_array.EventStrengthSaves;
    lastGameData.EventStrengthSaves[0] = {
      key: 0,
      value: this.getSum(start, num, EventStrengthSaves),
    };

    var EventStrengthSavePtage = state_array.EventStrengthSavePtage;
    lastGameData.EventStrengthSavePtage[0] = {
      key: 0,
      value: this.getSum(start, num, EventStrengthSavePtage),
    };

    data_array.push(lastGameData);
    //this.setState({arr:lastGameData})

    // arr.push(lastGameData)
  };

  getSum2 = (from, num, data) => {
    var sum = 0;
    var i = from;

    for (i; i < num; i++) {
      sum += data[i].value;
    }
    return sum;
  };

  getSum = (from, num, data) => {
    var sum = 0;
    var i = from;

    for (i; i < num; i++) {
      var value2 = data[i].value;
      var typee = typeof value2;

      if (typee === 'string') {
        sum += parseInt(data[i].value);
      } else {
        sum += data[i].value;
      }
    }
    return sum;
  };

  getSumtime = (from, num, data) => {
    var sum = 0;
    var i = from;
    for (i; i < num; i++) {
      var value2 = data[i].value;
      var value = sum;

      if (value2) {
        var time = value2.split(':');
        var hour = parseInt(time[0]);
        var min = parseInt(time[1]);

        var minutes = min;
        var hours = hour;
        if (value) {
          var time2 = value.split(':');
          var hour2 = parseInt(time2[0]);
          var min2 = parseInt(time2[1]);
          minutes = min + min2;
          hours = hour + hour2;
        }
        var cal_hours = Math.floor(minutes / 60);
        if (cal_hours > 0) {
          minutes = minutes % 60;
          hours = hours + cal_hours;
        }
        sum = hours + ':' + minutes;
      }
    }
    return sum;
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

  render() {
    if (this.state.droupDown2Selected === 'Playoffs') {
      // var {
      //     GP, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS,
      //     PointsPerGame,
      //     PowerplayGoals,
      //     PowerplayPoints,
      //     ShortHandedGoals,
      //     ShortHandedPoints,
      //     GameWinningGoals,
      //     OvertimeGoals,
      //     TimeOnIcePerGame,
      //     ShiftsPerGame,
      //     FaceoffWinPercentage,
      //     PowerplayTimeOnIce,
      //     ShortHandedTimeOnIce,
      //     PowerplayTimeOnIcePerGame,
      //     ShortHandedTimeOnIcePerGame,
      //     evenTimeOnIce,
      //     Wins,
      //     Losses,
      //     Ties,
      //     OvertimeLosses,
      //     ShotsAgainst,
      //     Saves,
      //     GoalsAgainst,
      //     GoalsAgainstAverage,
      //     TimeOnIce,
      //     Shutouts,
      //     PenaltyMinutes,
      //     PowerplayShots,
      //     PowerplaySaves,
      //     PowerPlaySavePtage,
      //     ShortHandedShots,
      //     ShortHandedSaves,
      //     ShortHandedSavePercentage,
      //     EventStrengthShots,
      //     EventStrengthSaves,
      //     EventStrengthSavePtage,
      // } = this.state.lastGameDataPlayOffs;
      // if (
      //     // seasons != undefined && team != undefined &&
      //     GP != undefined
      //     //  && G != undefined &&
      //     // A != undefined && P != undefined && PlusMinus != undefined && S != undefined &&
      //     // SPtage != undefined && PIM != undefined && Hits != undefined && BS != undefined
      //     ) {
      //     GP = this.state.lastGameDataPlayOffs.GP;
      //     G = this.state.lastGameDataPlayOffs.G;
      //     A = this.state.lastGameDataPlayOffs.A;
      //     P = this.state.lastGameDataPlayOffs.P;
      //     S = this.state.lastGameDataPlayOffs.S;
      //     PlusMinus = this.state.lastGameDataPlayOffs.PlusMinus;
      //     SPtage = this.state.lastGameDataPlayOffs.SPtage;
      //     PIM = this.state.lastGameDataPlayOffs.PIM;
      //     Hits = this.state.lastGameDataPlayOffs.Hits;
      //     BS = this.state.lastGameDataPlayOffs.BS;
      //     PointsPerGame = this.state.lastGameDataPlayOffs.PointsPerGame;
      //     PowerplayGoals = this.state.lastGameDataPlayOffs.PowerplayGoals;
      //     PowerplayPoints = this.state.lastGameDataPlayOffs.PowerplayPoints;
      //     ShortHandedGoals = this.state.lastGameDataPlayOffs.ShortHandedGoals;
      //     ShortHandedPoints = this.state.lastGameDataPlayOffs.ShortHandedPoints;
      //     GameWinningGoals = this.state.lastGameDataPlayOffs.GameWinningGoals;
      //     OvertimeGoals = this.state.lastGameDataPlayOffs.OvertimeGoals;
      //     TimeOnIcePerGame = this.state.lastGameDataPlayOffs.TimeOnIcePerGame;
      //     ShiftsPerGame = this.state.lastGameDataPlayOffs.ShiftsPerGame;
      //     FaceoffWinPercentage = this.state.lastGameDataPlayOffs.FaceoffWinPercentage;
      //     PowerplayTimeOnIce = this.state.lastGameDataPlayOffs.PowerplayTimeOnIce;
      //     ShortHandedTimeOnIce = this.state.lastGameDataPlayOffs.ShortHandedTimeOnIce;
      //     PowerplayTimeOnIcePerGame = this.state.lastGameDataPlayOffs.PowerplayTimeOnIcePerGame;
      //     ShortHandedTimeOnIcePerGame = this.state.lastGameDataPlayOffs.ShortHandedTimeOnIcePerGame;
      //     evenTimeOnIce = this.state.lastGameDataPlayOffs.evenTimeOnIce;
      //     Wins = this.state.lastGameDataPlayOffs.Wins;
      //     Losses = this.state.lastGameDataPlayOffs.Losses;
      //     Ties = this.state.lastGameDataPlayOffs.Ties;
      //     OvertimeLosses = this.state.lastGameDataPlayOffs.OvertimeLosses;
      //     ShotsAgainst = this.state.lastGameDataPlayOffs.ShotsAgainst;
      //     Saves = this.state.lastGameDataPlayOffs.Saves;
      //     GoalsAgainst = this.state.lastGameDataPlayOffs.GoalsAgainst;
      //     GoalsAgainstAverage = this.state.lastGameDataPlayOffs.GoalsAgainstAverage;
      //     TimeOnIce = this.state.lastGameDataPlayOffs.TimeOnIce;
      //     Shutouts = this.state.lastGameDataPlayOffs.Shutouts;
      //     PenaltyMinutes = this.state.lastGameDataPlayOffs.PenaltyMinutes;
      //     PowerplayShots = this.state.lastGameDataPlayOffs.PowerplayShots;
      //     PowerplaySaves = this.state.lastGameDataPlayOffs.PowerplaySaves;
      //     PowerPlaySavePtage = this.state.lastGameDataPlayOffs.PowerPlaySavePtage;
      //     ShortHandedShots = this.state.lastGameDataPlayOffs.ShortHandedShots;
      //     ShortHandedSaves = this.state.lastGameDataPlayOffs.ShortHandedSaves;
      //     ShortHandedSavePercentage = this.state.lastGameDataPlayOffs.ShortHandedSavePercentage;
      //     EventStrengthShots = this.state.lastGameDataPlayOffs.EventStrengthShots;
      //     EventStrengthSaves = this.state.lastGameDataPlayOffs.EventStrengthSaves;
      //     EventStrengthSavePtage = this.state.lastGameDataPlayOffs.EventStrengthSavePtage;
      // }
    } else {
      var {
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
        // PowerplayTimeOnIcePerGame,
        // ShortHandedTimeOnIcePerGame,
        // evenTimeOnIce,
        Wins,
        Losses,
        OvertimeLosses,
        ShotsAgainst,
        Saves,
        GoalsAgainst,
        GoalsAgainstAverage,
        TimeOnIce,
        Shutouts,
        SavePercentage,
      } = this.state.lastGameData;
      if (
        // seasons != undefined && team != undefined &&
        GP !== undefined
        //  && G != undefined &&
        // A != undefined && P != undefined && PlusMinus != undefined && S != undefined &&
        // SPtage != undefined && PIM != undefined && Hits != undefined && BS != undefined
      ) {
        GP = this.state.lastGameData.GP;
        GS = this.state.lastGameData.GS;
        G = this.state.lastGameData.G;
        A = this.state.lastGameData.A;
        P = this.state.lastGameData.P;
        S = this.state.lastGameData.S;
        PlusMinus = this.state.lastGameData.PlusMinus;
        SPtage = this.state.lastGameData.SPtage;
        PIM = this.state.lastGameData.PIM;
        Hits = this.state.lastGameData.Hits;
        BS = this.state.lastGameData.BS;

        PointsPerGame = this.state.lastGameData.PointsPerGame;
        PowerplayGoals = this.state.lastGameData.PowerplayGoals;
        PowerplayPoints = this.state.lastGameData.PowerplayPoints;
        ShortHandedGoals = this.state.lastGameData.ShortHandedGoals;
        ShortHandedPoints = this.state.lastGameData.ShortHandedPoints;
        GameWinningGoals = this.state.lastGameData.GameWinningGoals;
        OvertimeGoals = this.state.lastGameData.OvertimeGoals;
        TimeOnIcePerGame = this.state.lastGameData.TimeOnIcePerGame;
        ShiftsPerGame = this.state.lastGameData.ShiftsPerGame;
        FaceoffWinPercentage = this.state.lastGameData.FaceoffWinPercentage;
        PowerplayTimeOnIce = this.state.lastGameData.PowerplayTimeOnIce;
        ShortHandedTimeOnIce = this.state.lastGameData.ShortHandedTimeOnIce;
        //PowerplayTimeOnIcePerGame = this.state.lastGameData.PowerplayTimeOnIcePerGame;
        //  ShortHandedTimeOnIcePerGame = this.state.lastGameData.ShortHandedTimeOnIcePerGame;
        // evenTimeOnIce = this.state.lastGameData.evenTimeOnIce;
        Wins = this.state.lastGameData.Wins;
        Losses = this.state.lastGameData.Losses;
        OvertimeLosses = this.state.lastGameData.OvertimeLosses;
        ShotsAgainst = this.state.lastGameData.ShotsAgainst;
        Saves = this.state.lastGameData.Saves;
        GoalsAgainst = this.state.lastGameData.GoalsAgainst;
        GoalsAgainstAverage = this.state.lastGameData.GoalsAgainstAverage;
        TimeOnIce = this.state.lastGameData.TimeOnIce;
        Shutouts = this.state.lastGameData.Shutouts;
        SavePercentage = this.state.lastGameData.SavePercentage;
      }
    }

    var headings = this.state.headings;
    if (this.props.position === 'G') {
      headings = this.state.headingsGoalies;
    }

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={this.state.enableScroll}>
        <View style={{ marginTop: 10 }}>
          {/* <View style={[styles.containerRowCenter, { marginVertical: "5%" }]}>

                        <View style={{ width: "40%", marginLeft: 5, }}>
                            <TouchableOpacity style={[styles.droupDownLabelContainer, { height: 30 }]}
                                onPress={() => this.updateScroll(1)}
                            >
                                <Text style={[styles.droupDownLabelText, { fontSize: 11, lineHeight: 13 }]}>{this.state.droupDown1Selected}</Text>
                                <View
                                    style={{ marginRight: 20, marginBottom: 2 }}>
                                    <Image source={this.state.showDroupDown1 ? arrowUpImage : arrowDownImage} />
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.showDroupDown1 &&
                                <View >
                                    <View style={[styles.droupDownFlatListContainer, {}]}>
                                        <FlatList
                                            style={{ height: 100 }}
                                            data={this.state.droupDown1Options}
                                            renderItem={({ item }) => this._getDroupDownOptions(item)}
                                            numColumns={1}
                                        />
                                    </View>
                                </View>
                            }
                        </View>


                        <View style={{ width: "40%", marginHorizontal: 5, }}>
                            <TouchableOpacity style={[styles.droupDownLabelContainer, { height: 30 }]}
                                onPress={() => this.setState({ showDroupDown2: !this.state.showDroupDown2 })}

                            >
                                <Text style={[styles.droupDownLabelText, { fontSize: 11, lineHeight: 13 }]}>{this.state.droupDown2Selected}</Text>
                                <View
                                    style={{ marginRight: 20, marginBottom: 2 }}>
                                    <Image source={this.state.showDroupDown2 ? arrowUpImage : arrowDownImage} />
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.showDroupDown2 &&
                                <View >
                                    <View style={[styles.droupDownFlatListContainer, {}]}>
                                        <FlatList
                                            style={{}}
                                            data={this.state.droupDown2Options}
                                            renderItem={({ item }) => this._getDroupDownOptions(item)}
                                            numColumns={1}
                                        />
                                    </View>
                                </View>
                            }
                        </View>

                    </View> */}
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
                <View style={styles.scoreStyleStats}>
                  {this._getHeadings(headings[0])}
                </View>
                <View style={styles.scoreStyleStats}>
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
                <View style={styles.scoreStyleStats}>
                  <FlatList
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#dedede88',
                      marginHorizontal: 0,
                      paddingBottom: 15,
                    }}
                    data={GP}
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
                      this.props.position !== 'G' ? PointsPerGame : GoalsAgainst
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
                      this.props.position != 'G'
                        ? PowerplayGoals
                        : SavePercentage
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
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#dedede88',
                      marginHorizontal: 0,
                    }}
                    data={
                      this.props.position != 'G' ? ShortHandedGoals : TimeOnIce
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
                      this.props.position != 'G' ? ShortHandedPoints : Shutouts
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
                      <FlatList
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
</View>


<View style={styles.scoreStyleStats}>
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
        {this.state.process === true && (
          <View
            style={{
              position: 'absolute',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            <ActivityIndicator size="large" color="#2233aa" />
          </View>
        )}
      </ScrollView>
    );
  }
}

export default PD_Tab_LastGames;
