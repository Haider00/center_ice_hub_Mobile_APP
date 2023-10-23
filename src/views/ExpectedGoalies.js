import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from '../assets/css/styles';
import ExpectedGoaliesSlider from './ExpectedGoaliesSlider';
import AppIntroSlider from 'react-native-app-intro-slider';
import NoGame from './NoGame';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { useGoaliesDataState } from '../context/goalies.context';

class ExpectedGoaliesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading_percent: '0%',
      refreshing: false,
      promisesExG: [],
      myIndex: 0,
    };

    this.service = new Service();
    this.appService = new AppService();

    this._slider = React.createRef();
  }

  onRefresh = () => {
    Actions.refresh();
  };
  async getTeamPlayerName(team) {
    // return { status: "Not Confirmed", name: "Ben Bishop" }
    var res = await this.service.getGameDetails(team);
    if (res.data && res.data.status) {
      var data = res.data.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].position === 'G1') {
          return { status: data[i].strength, name: data[i].player };
        }
      }
    }
  }

  _getOtherDeatails = async (team, player, team2) => {
    var careerRecord = [0, 0, 0];
    var seasonRecord = [0, 0, 0];
    var teamRecord = [0, 0, 0];
    // var startsRecord = [0, 0, 0]
    var goalAgainstAverageCareer = '00.00';
    var savePercentageCareer = '00.00';
    var goalAgainstAverage = '00.00';
    var savePercentage = '00.00';

    var code = this.appService.getTeamCode(team);
    var res = await this.service.getTeamPlayers(code);
    if (res !== undefined && res.data !== undefined) {
      var players = res.data.roster;
      if (players !== undefined) {
        for (var i = 0; i < players.length; i++) {
          if (players[i].person.fullName === player) {
            var playerLink = players[i].person.link;

            if (playerLink !== undefined) {
              var playerData = await this.service.getExpectedGoalies(
                playerLink,
                'careerRegularSeason',
              );
              if (playerData !== undefined && playerData.data !== undefined) {
                var stats = playerData.data.people[0].stats[0].splits[0].stat;
                careerRecord[0] = stats.wins ? stats.wins : 0;
                careerRecord[1] = stats.losses ? stats.losses : 0;
                careerRecord[2] = stats.ot ? stats.ot : 0;
                savePercentageCareer = stats.savePercentage
                  ? stats.savePercentage.toFixed(3)
                  : 0.0;
                goalAgainstAverageCareer = stats.goalAgainstAverage
                  ? stats.goalAgainstAverage
                  : 0.0;
              }

              var playerSeasonData = await this.service.getExpectedGoalies(
                playerLink,
                'statsSingleSeason',
              );

              if (
                playerSeasonData !== undefined &&
                playerSeasonData.data !== undefined
              ) {
                var stats = playerSeasonData.data.people[0].stats[0].splits[0];

                if (stats) {
                  stats =
                    playerSeasonData.data.people[0].stats[0].splits[0].stat;
                  seasonRecord[0] = stats.wins ? stats.wins : 0;
                  seasonRecord[1] = stats.losses ? stats.losses : 0;
                  seasonRecord[2] = stats.ot ? stats.ot : 0;
                  savePercentage = stats.savePercentage
                    ? stats.savePercentage.toFixed(3)
                    : 0.0;
                  goalAgainstAverage = stats.goalAgainstAverage
                    ? stats.goalAgainstAverage
                    : 0.0;
                } else {
                  seasonRecord[0] = 0;
                  seasonRecord[1] = 0;
                  seasonRecord[2] = 0;
                  savePercentage = 0.0;
                  goalAgainstAverage = 0.0;
                }
              }

              var uniqueseason = [];
              var Golieseasons = await this.service.getPlayerDetails(
                playerLink,
                'yearByYear',
              );
              if (
                Golieseasons !== undefined &&
                Golieseasons.data !== undefined
              ) {
                var seasons = [];
                var splits = Golieseasons.data.people[0].stats[0].splits;
                splits.forEach((element, index) => {
                  seasons.push(element.season);
                });
                var uniqueseason = seasons.filter(
                  (val, id, seasons) => seasons.indexOf(val) === id,
                );
              }
              uniqueseason = uniqueseason.reverse();

              var items = [];
              var items2 = [];
              var length = 0;
              for (var ii = 0; ii < uniqueseason.length; ii++) {
                var curseason = 'vsTeam&season=' + uniqueseason[ii];
                var playerData2 = await this.service.getExpectedGoalies(
                  playerLink,
                  curseason,
                );
                items.push(playerData2.data.people[0].stats[0].splits);

                if (length < 5) {
                  var gameseason = 'gameLog&season=' + uniqueseason[ii];
                  var playerData3 = await this.service.getExpectedGoalies(
                    playerLink,
                    gameseason,
                  );
                  items2.push(playerData3.data.people[0].stats[0].splits);
                  length = items2[ii].length;
                }
              }

              var playerData2 = [].concat.apply([], items);

              // var playerData2 = await this.service.getExpectedGoalies(playerLink, "vsTeam&season="+{element.season})
              if (playerData2 !== undefined) {
                for (var j = 0; j < playerData2.length; j++) {
                  var opTeam = playerData2[j].opponent.name;
                  if (opTeam === team2) {
                    var stats2 = playerData2[j].stat;
                    teamRecord[0] = teamRecord[0] + stats2.wins;
                    teamRecord[1] = teamRecord[1] + stats2.losses;
                    teamRecord[2] = teamRecord[2] + stats2.ot;
                    // goalAgainstAverage = stats2.goalAgainstAverage ? stats2.goalAgainstAverage : 0.00;
                  }
                }
              }

              teamRecord[0] = teamRecord[0] ? teamRecord[0] : 0;
              teamRecord[1] = teamRecord[1] ? teamRecord[1] : 0;
              teamRecord[2] = teamRecord[2] ? teamRecord[2] : 0;
            }
            break;
          }
        }
      }
    }
    // return { careerRecord, seasonRecord, teamRecord, startsRecord, goalAgainstAverageCareer, savePercentageCareer, goalAgainstAverage, savePercentage }

    return {
      careerRecord,
      seasonRecord,
      teamRecord,
      goalAgainstAverageCareer,
      savePercentageCareer,
      goalAgainstAverage,
      savePercentage,
    };
  };

  bannerError = (e) => {
    //////
  };

  async componentDidMount() {
    // this._slider.goToSlide(1);
  }

  async getPlayerJursey(teamCode, name) {
    var res = await this.service.getTeamPlayers(teamCode);
    var detail = {
      jerseyNumber: 0,
      link: '',
    };

    if (res !== undefined && res.data !== undefined) {
      var roster = res.data.roster;
      for (var i = 0; i < roster.length; i++) {
        if (roster[i].person.fullName === name) {
          detail = {
            jerseyNumber: roster[i].jerseyNumber,
            link: roster[i].person.link,
          };
        }
      }
    }
    return detail;
  }

  _renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: '5%' }}>
        <ExpectedGoaliesSlider
          team1Name={item.team1Name}
          team2Name={item.team2Name}
          team1Label={item.team1Label}
          team2Label={item.team2Label}
          playerTeam1={item.playerTeam1}
          playerTeam2={item.playerTeam2}
          PlayerTeam1Link={item.PlayerTeam1Link}
          PlayerTeam2Link={item.PlayerTeam2Link}
          playerStatus1={item.playerStatus1}
          playerStatus2={item.playerStatus2}
          player1JurseyNumber={item.player1JurseyNumber}
          player2JurseyNumber={item.player2JurseyNumber}
          date={item.date}
          time={item.time}
        />
      </View>
    );
  };
  handleGoaliesData = () => {
    if (
      this.props.goaliesState &&
      this.props.goaliesState.goaliesData &&
      this.props.goaliesState.goaliesData.length &&
      this.props.goaliesState.goaliesData.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EDF2FF' }}>
        <View
          style={[
            styles.containerRowStart,
            {
              backgroundColor: '#EDF2FF',
              height: 40,
              borderBottomColor: '#8AABFF',
              borderBottomWidth: 2,
            },
          ]}>
          <View style={{ width: 42, marginHorizontal: 5 }}>
            <TouchableOpacity
              style={[
                styles.yellowButtonSmall,
                { paddingVertical: 0, height: 20 },
              ]}
              onPress={this.moveToCreatePassword}>
              <Text style={[styles.yellowButtonSmallText, { fontSize: 9 }]}>
                TODAY
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[{ marginVertical: '3%', width: '65%' }]}>
            <Text style={styles.selectedTabText}>
              {moment().format('MMM DD, YYYY').toLocaleUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.expectedGoalieSlider}>
          {this.handleGoaliesData() ? (
            <AppIntroSlider
              ref={(c) => {
                this._slider = c;
              }}
              data={this.props.goaliesState.goaliesData}
              renderItem={this._renderItem}
              showDoneButton={false}
              showNextButton={false}
              activeDotStyle={styles.activeDotStyle2}
              dotStyle={styles.dotStyle2}
            />
          ) : (
            <NoGame />
          )}
        </View>
      </View>
    );
  }
}

function ExpectedGoalies(props) {
  const goaliesState = useGoaliesDataState();
  return <ExpectedGoaliesIndex goaliesState={goaliesState} />;
}

export default ExpectedGoalies;
