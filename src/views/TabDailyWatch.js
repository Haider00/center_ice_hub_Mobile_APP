import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from '../assets/css/styles';
import fireImage from '../assets/img/fire.png';
import SliderPlayers from './SliderPlayers';
import LinearGradient from 'react-native-linear-gradient';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import NoGame from './NoGame';
import moment from 'moment';

import { SeasonContext } from '../utils/seasonUtils';

var todaysPlayersGoals = [];
var todaysPlayersAssists = [];
var todaysPlayersShots = [];
var todaysPlayers = [];
var todaysGoalies = [];
var todaysPlayersWins = [];
var todaysPlayersGAA = [];
var todaysPlayersSV = [];

class TabDailyWatch extends React.Component {
  static contextType = SeasonContext;
  constructor(props) {
    super(props);

    this.state = {
      process: true,
      sliderHeight: true,
      slidees: [],
      todaysPlayers: [],
      loading_text: 'One Moment Please',
      loading_percent: '0%',
      todaysGoalies: [],
      todaysPlayers: [],
      isNoGame: false,
    };

    this.service = new Service();
    this.appService = new AppService();
  }
  popupgoli = () => {
    this.props.popupgoli();
  };
  popupplayer = () => {
    this.props.popupplayer();
  };
  async componentWillMount() {
    await this._getPlayers();
    await this._calculatePlayers();
    this.setState({ process: false });
  }

  async _getPlayers() {
    var todaysPlayers = await this.getTodaysPlayers();
    var allTodaysPlayers = [].concat.apply([], todaysPlayers);
    todaysPlayers = [];

    var promisesDW = allTodaysPlayers.map(async (element) =>
      this._delayedData(element),
    );
    await Promise.all(promisesDW);
  }

  async _calculatePlayers() {
    todaysPlayersGoals.sort(function (b, a) {
      return a.value - b.value;
    });

    todaysPlayersAssists.sort(function (b, a) {
      return a.value - b.value;
    });

    todaysPlayersShots.sort(function (b, a) {
      return a.value - b.value;
    });

    todaysPlayersWins.sort(function (b, a) {
      return a.value - b.value;
    });
    todaysPlayersGAA.sort(function (b, a) {
      return b.value - a.value;
    });

    todaysPlayersSV.sort(function (b, a) {
      return a.value - b.value;
    });
    await this._todayGoalies(
      todaysPlayersWins,
      todaysPlayersGAA,
      todaysPlayersSV,
    );
    await this._todayPlayers(
      todaysPlayersGoals,
      todaysPlayersAssists,
      todaysPlayersShots,
    );
  }

  _delayedData = async (item) => {
    await this._getData(item);
  };
  _todayPlayers = async () => {
    if (
      todaysPlayersGoals.length > 0 ||
      todaysPlayersAssists.length > 0 ||
      todaysPlayersShots.length > 0
    ) {
      // Players = {
      // allPlayers: Players.allPlayers,
      todaysPlayers = {
        Goals: [
          {
            key: 1,
            name:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[0].name : '',
            value:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[0].value : '',
            playerLink:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[0].link : '',
          },
          {
            key: 2,
            name:
              todaysPlayersGoals.length > 1 ? todaysPlayersGoals[1].name : '',
            value:
              todaysPlayersGoals.length > 1 ? todaysPlayersGoals[1].value : '',
            playerLink:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[1].link : '',
          },
          {
            key: 3,
            name:
              todaysPlayersGoals.length > 2 ? todaysPlayersGoals[2].name : '',
            value:
              todaysPlayersGoals.length > 2 ? todaysPlayersGoals[2].value : '',
            playerLink:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[2].link : '',
          },
          {
            key: 4,
            name:
              todaysPlayersGoals.length > 3 ? todaysPlayersGoals[3].name : '',
            value:
              todaysPlayersGoals.length > 3 ? todaysPlayersGoals[3].value : '',
            playerLink:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[3].link : '',
          },
          {
            key: 5,
            name:
              todaysPlayersGoals.length > 4 ? todaysPlayersGoals[4].name : '',
            value:
              todaysPlayersGoals.length > 4 ? todaysPlayersGoals[4].value : '',
            playerLink:
              todaysPlayersGoals.length > 0 ? todaysPlayersGoals[4].link : '',
          },
        ],
        Assests: [
          {
            key: 1,
            name:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[0].name
                : '',
            value:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[0].value
                : '',
            playerLink:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[0].link
                : '',
          },
          {
            key: 2,
            name:
              todaysPlayersAssists.length > 1
                ? todaysPlayersAssists[1].name
                : '',
            value:
              todaysPlayersAssists.length > 1
                ? todaysPlayersAssists[1].value
                : '',
            playerLink:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[1].link
                : '',
          },
          {
            key: 3,
            name:
              todaysPlayersAssists.length > 2
                ? todaysPlayersAssists[2].name
                : '',
            value:
              todaysPlayersAssists.length > 2
                ? todaysPlayersAssists[2].value
                : '',
            playerLink:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[2].link
                : '',
          },
          {
            key: 4,
            name:
              todaysPlayersAssists.length > 3
                ? todaysPlayersAssists[3].name
                : '',
            value:
              todaysPlayersAssists.length > 3
                ? todaysPlayersAssists[3].value
                : '',
            playerLink:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[3].link
                : '',
          },
          {
            key: 5,
            name:
              todaysPlayersAssists.length > 4
                ? todaysPlayersAssists[4].name
                : '',
            value:
              todaysPlayersAssists.length > 4
                ? todaysPlayersAssists[4].value
                : '',
            playerLink:
              todaysPlayersAssists.length > 0
                ? todaysPlayersAssists[4].link
                : '',
          },
        ],
        Shots: [
          {
            key: 1,
            name:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[0].name : '',
            value:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[0].value : '',
            playerLink:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[0].link : '',
          },
          {
            key: 2,
            name:
              todaysPlayersShots.length > 1 ? todaysPlayersShots[1].name : '',
            value:
              todaysPlayersShots.length > 1 ? todaysPlayersShots[1].value : '',
            playerLink:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[1].link : '',
          },
          {
            key: 3,
            name:
              todaysPlayersShots.length > 2 ? todaysPlayersShots[2].name : '',
            value:
              todaysPlayersShots.length > 2 ? todaysPlayersShots[2].value : '',
            playerLink:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[2].link : '',
          },
          {
            key: 4,
            name:
              todaysPlayersShots.length > 3 ? todaysPlayersShots[3].name : '',
            value:
              todaysPlayersShots.length > 3 ? todaysPlayersShots[3].value : '',
            playerLink:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[3].link : '',
          },
          {
            key: 5,
            name:
              todaysPlayersShots.length > 4 ? todaysPlayersShots[4].name : '',
            value:
              todaysPlayersShots.length > 4 ? todaysPlayersShots[4].value : '',
            playerLink:
              todaysPlayersShots.length > 0 ? todaysPlayersShots[4].link : '',
          },
        ],
      };

      await this.setState({
        todaysPlayers: todaysPlayers,
        process: false,
        loading_percent: '90%',
      });
      // }
    }
  };
  _todayGoalies = async () => {
    if (
      todaysPlayersWins.length > 0 ||
      todaysPlayersGAA.length > 0 ||
      todaysPlayersSV.length > 0
    ) {
      // Goalies = {
      todaysGoalies = {
        Wins: [
          {
            key: 1,
            name: todaysPlayersWins.length > 0 ? todaysPlayersWins[0].name : '',
            value:
              todaysPlayersWins.length > 0 ? todaysPlayersWins[0].value : '',
            playerLink:
              todaysPlayersWins.length > 0 ? todaysPlayersWins[0].link : '',
          },
          {
            key: 2,
            name: todaysPlayersWins.length > 1 ? todaysPlayersWins[1].name : '',
            value:
              todaysPlayersWins.length > 1 ? todaysPlayersWins[1].value : '',
            playerLink:
              todaysPlayersWins.length > 0 ? todaysPlayersWins[1].link : '',
          },
          {
            key: 3,
            name: todaysPlayersWins.length > 2 ? todaysPlayersWins[2].name : '',
            value:
              todaysPlayersWins.length > 2 ? todaysPlayersWins[2].value : '',
            playerLink:
              todaysPlayersWins.length > 0 ? todaysPlayersWins[2].link : '',
          },
          {
            key: 4,
            name: todaysPlayersWins.length > 3 ? todaysPlayersWins[3].name : '',
            value:
              todaysPlayersWins.length > 3 ? todaysPlayersWins[3].value : '',
            playerLink:
              todaysPlayersWins.length > 0 ? todaysPlayersWins[3].link : '',
          },
          {
            key: 5,
            name: todaysPlayersWins.length > 4 ? todaysPlayersWins[4].name : '',
            value:
              todaysPlayersWins.length > 4 ? todaysPlayersWins[4].value : '',
            playerLink:
              todaysPlayersWins.length > 0 ? todaysPlayersWins[4].link : '',
          },
        ],
        GAA: [
          {
            key: 1,
            name: todaysPlayersGAA.length > 0 ? todaysPlayersGAA[0].name : '',
            value: todaysPlayersGAA.length > 0 ? todaysPlayersGAA[0].value : '',
            playerLink:
              todaysPlayersGAA.length > 0 ? todaysPlayersGAA[0].link : '',
          },
          {
            key: 2,
            name: todaysPlayersGAA.length > 1 ? todaysPlayersGAA[1].name : '',
            value: todaysPlayersGAA.length > 1 ? todaysPlayersGAA[1].value : '',
            playerLink:
              todaysPlayersGAA.length > 0 ? todaysPlayersGAA[1].link : '',
          },
          {
            key: 3,
            name: todaysPlayersGAA.length > 2 ? todaysPlayersGAA[2].name : '',
            value: todaysPlayersGAA.length > 2 ? todaysPlayersGAA[2].value : '',
            playerLink:
              todaysPlayersGAA.length > 0 ? todaysPlayersGAA[2].link : '',
          },
          {
            key: 4,
            name: todaysPlayersGAA.length > 3 ? todaysPlayersGAA[3].name : '',
            value: todaysPlayersGAA.length > 3 ? todaysPlayersGAA[3].value : '',
            playerLink:
              todaysPlayersGAA.length > 0 ? todaysPlayersGAA[3].link : '',
          },
          {
            key: 5,
            name: todaysPlayersGAA.length > 4 ? todaysPlayersGAA[4].name : '',
            value: todaysPlayersGAA.length > 4 ? todaysPlayersGAA[4].value : '',
            playerLink:
              todaysPlayersGAA.length > 0 ? todaysPlayersGAA[4].link : '',
          },
        ],
        SV: [
          {
            key: 1,
            name: todaysPlayersSV.length > 0 ? todaysPlayersSV[0].name : '',
            value: todaysPlayersSV.length > 0 ? todaysPlayersSV[0].value : '',
            playerLink:
              todaysPlayersSV.length > 0 ? todaysPlayersSV[0].link : '',
          },
          {
            key: 2,
            name: todaysPlayersSV.length > 1 ? todaysPlayersSV[1].name : '',
            value: todaysPlayersSV.length > 1 ? todaysPlayersSV[1].value : '',
            playerLink:
              todaysPlayersSV.length > 0 ? todaysPlayersSV[1].link : '',
          },
          {
            key: 3,
            name: todaysPlayersSV.length > 2 ? todaysPlayersSV[2].name : '',
            value: todaysPlayersSV.length > 2 ? todaysPlayersSV[2].value : '',
            playerLink:
              todaysPlayersSV.length > 0 ? todaysPlayersSV[2].link : '',
          },
          {
            key: 4,
            name: todaysPlayersSV.length > 3 ? todaysPlayersSV[3].name : '',
            value: todaysPlayersSV.length > 3 ? todaysPlayersSV[3].value : '',
            playerLink:
              todaysPlayersSV.length > 0 ? todaysPlayersSV[3].link : '',
          },
          {
            key: 5,
            name: todaysPlayersSV.length > 4 ? todaysPlayersSV[4].name : '',
            value: todaysPlayersSV.length > 4 ? todaysPlayersSV[4].value : '',
            playerLink:
              todaysPlayersSV.length > 0 ? todaysPlayersSV[4].link : '',
          },
        ],
      };
      console.log('TODAYSGOALIES>>>>', todaysGoalies);
      await this.setState({ todaysGoalies: todaysGoalies });
      // allGoalies: Goalies.allGoalies
      // }
    }
  };
  _getData = async (item) => {
    let playerarray = 0;
    let goal = 0;
    let assist = 0;
    let shot = 0;
    let win = 0;
    let gaa = 0;
    let sv = 0;

    // var thisYear = moment().format('YYYY')
    // var nextYear = moment().add(1, 'Y').format('YYYY')
    var selectedYear = this.context;
    var res4 = await this.service.getGameLogs(
      item.person.link,
      'gameLog',
      selectedYear,
    );
    var playerdata = res4.data.stats[0].splits;

    this.setState({ loading_percent: '10%' });
    if (playerdata.length >= 5) {
      for (var pp = 0; pp < 5; pp++) {
        if (playerarray === 1) {
          this.setState({ loading_percent: '20%' });
        }
        if (playerarray === 2) {
          this.setState({ loading_percent: '30%' });
        }
        if (playerarray === 3) {
          this.setState({ loading_percent: '40%' });
        }
        if (playerarray === 4) {
          this.setState({ loading_percent: '60%' });
        }
        if (playerarray === 5) {
          this.setState({ loading_percent: '80%' });
        }

        if (playerarray < 5) {
          if (playerarray < 6) {
            for (var ppp = 0; ppp < playerdata.length; ppp++) {
              if (item.position.code == 'G') {
                var pwin = playerdata[ppp].stat.decision == 'W' ? 1 : 0;
                win = pwin + win;
                gaa = playerdata[ppp].stat.goalsAgainst + gaa;
                sv =
                  playerdata[ppp].stat.saves /
                    playerdata[ppp].stat.shotsAgainst +
                  sv;
              } else {
                goal = playerdata[ppp].stat.goals + goal;
                assist = playerdata[ppp].stat.assists + assist;
                shot = playerdata[ppp].stat.shots + shot;
              }
              playerarray++;
              if (playerarray >= 5) break;
            }
          }
        } else {
          if (item.position.code == 'G') {
            var link = item.person.link;
            var name = item.person.fullName;
            var goalAgainstAverage = (gaa / 5).toFixed(1);
            var savePercentage = ((sv / 5) * 100).toFixed(1);
            if (savePercentage == 100.0) {
              savePercentage = 100;
            }

            todaysPlayersWins.push({ name, link, value: win });
            todaysPlayersGAA.push({ name, link, value: goalAgainstAverage });
            todaysPlayersSV.push({ name, link, value: savePercentage });
          } else {
            var link = item.person.link;
            var name = item.person.fullName;

            todaysPlayersGoals.push({ name, link, value: goal });
            todaysPlayersAssists.push({ name, link, value: assist });
            todaysPlayersShots.push({ name, link, value: shot });
          }
          break;
        }
      }
    }
  };

  makeArrayUnique(array) {
    var newArray = [];
    array.forEach(function (item1) {
      var unique = true;
      newArray.forEach(function (item2) {
        if (item1.id == item2.id) {
          unique = false;
        }
      });
      if (unique) newArray.push(item1);
    });
    return newArray;
  }

  calculateWins(playersWinners) {
    var newWinnerPlayers = [];
    var k = 0;
    for (var i = 0; i < playersWinners.length; i++) {
      var player = playersWinners[i];
      var stored = false;
      var myIndex = 0;
      for (var j = 0; j < newWinnerPlayers.length; j++) {
        if (player.id == newWinnerPlayers[j].id) {
          stored = true;
          myIndex = j;
          break;
        }
      }
      if (!stored) {
        newWinnerPlayers[k] = {
          id: player.id,
          value: player.value,
          name: player.name,
        };
        k++;
      } else
        newWinnerPlayers[myIndex] = {
          id: player.id,
          value: newWinnerPlayers[myIndex].value + 1,
          name: player.name,
        };
    }
    newWinnerPlayers.sort(function (b, a) {
      return a.value - b.value;
    });

    return newWinnerPlayers;
  }

  _renderItem = ({ item }) => {
    //////

    return (
      <View
        style={{
          marginHorizontal: 0,
          marginVertical: 10,
          backgroundColor: 'red',
          height: 100,
        }}>
        {
          // item.key === 1 ?
          <SliderPlayers
            todaysGoalies={this.state.todaysGoalies}
            popup_player={this.popupplayer}
            todaysPlayers={this.state.todaysPlayers}
          />
          // :
          // <SliderGoalies goalies={item.data} popup_goli={this.popupgoli} todaysPlayers={this.state.todaysPlayers} />
        }
      </View>
    );
  };

  getTodaysPlayers = async () => {
    var today = moment().format('YYYY-MM-DD');
    //  today= moment(todayDate).subtract(1, 'day').format('YYYY-MM-DD');
    var res = await this.service.getGamesOnDate(today);

    var todaysPlayers = [];
    var todaysGoalies = [];

    if (res.data && res.data.dates && res.data.dates.length > 0) {
      var todayGames = res.data.dates[0];
      // //////

      var totalGames = todayGames.totalGames;

      for (var i = 0; i < totalGames; i++) {
        var teams = todayGames.games[i].teams;

        var team1Name = teams.away.team.name;
        var team2Name = teams.home.team.name;

        var team1 = team1Name
          .toString()
          .replace('.', '')
          .toLowerCase()
          .replace(/\s/g, '-');
        var team2 = team2Name
          .toString()
          .replace('.', '')
          .toLowerCase()
          .replace(/\s/g, '-');

        var playersTeam1 = await this.getTeamPlayerName(team1Name);
        var playersTeam2 = await this.getTeamPlayerName(team2Name);
        todaysPlayers.push(playersTeam1);
        todaysPlayers.push(playersTeam2);
      }
    } else {
      this.setState({ isNoGame: true });
    }

    return todaysPlayers;
  };

  async getTeamPlayerName(team) {
    // var res = await this.service.getGameDetails(team);
    var code = await this.appService.getTeamCode(team);
    var res = await this.service.getTeamPlayers(code);
    var teamPlayers = [];
    if (res.data && res.data.roster) {
      var data = res.data.roster;
      for (var i = 0; i < data.length; i++) {
        const isHaveP = teamPlayers.indexOf(
          (e) => e.jerseyNumber === data[i].jerseyNumber,
        );
        if (isHaveP === -1) {
          // checking duplicate player
          teamPlayers.push(data[i]);
        }
      }
    }
    return teamPlayers;
  }

  getTodaysData(allData, todaysPlayer) {
    var todayPlayersData = [];
    for (var i = 0; i < allData.length; i++) {
      var playerId = allData[i].id;
      var len2 = todaysPlayer.length;
      for (var j = 0; j < len2; j++) {
        var todayTeam = todaysPlayer[j];
        for (var k = 0; k < todayTeam.length; k++) {
          var player2Id = todayTeam[k].person.id;
          if (playerId == player2Id) {
            todayPlayersData.push(allData[i]);
          }
        }
      }
    }

    return todayPlayersData;
  }
  getTodaysGoalie(allData, todaysPlayer) {
    var todayPlayersData = [];
    for (var i = 0; i < allData.length; i++) {
      var playerId = allData[i].id;
      var len2 = todaysPlayer.length;
      for (var j = 0; j < len2; j++) {
        var todayTeam = todaysPlayer[j];
        for (var k = 0; k < todayTeam.length; k++) {
          var player2Id = todayTeam[k].person.id;
          var playercode = todayTeam[k].position.code;
          if (playerId == player2Id && playercode == 'G') {
            todayPlayersData.push(allData[i]);
          }
        }
      }
    }

    return todayPlayersData;
  }

  render() {
    return (
      <View
        style={[styles.tabScene, { backgroundColor: '#fff0', height: 350 }]}>
        {
          this.state.process ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20%',
                height: 240,
              }}>
              <Text style={styles.yellowButtonSmallText}>
                {' '}
                {this.state.loading_percent}
              </Text>
              <ActivityIndicator size="large" color="#2233aa" />
            </View>
          ) : (
            <React.Fragment>
              {this.state.isNoGame ? (
                <NoGame />
              ) : (
                <React.Fragment>
                  <SliderPlayers
                    todaysGoalies={this.state.todaysGoalies}
                    popup_player={this.popupplayer}
                    todaysPlayers={this.state.todaysPlayers}
                  />
                  <LinearGradient
                    style={[
                      styles.sliderTabView,
                      {
                        padding: 20,
                        marginBottom: 10,
                        marginTop: 15,
                        marginHorizontal: 20,
                        borderRadius: 12,
                      },
                    ]}
                    colors={['#182955', '#0F1633']}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: -1.0, y: 0.0 }}
                    locations={[0.42, 1]}>
                    <View style={[styles.containerRowStart]}>
                      <Image source={fireImage} />
                      <View style={{ marginHorizontal: 10 }}>
                        <Text
                          style={[
                            styles.greyText,
                            {
                              color: '#FFF',
                              paddingVertical: 5,
                              lineHeight: 22,
                            },
                          ]}>
                          Check who is on{' '}
                          <Text style={{ fontWeight: 'bold' }}>fire</Text> in
                          their last 5 games with the daily hot watch.
                        </Text>
                        {/* <Text style={[styles.greyText, { fontWeight: "500", color: "#FFF", borderBottomColor: "#ffffff33", borderBottomWidth: 1, paddingVertical: 5 }]}>Did you expect these players to be HOT?</Text>
                                          <Text style={[styles.containerMiddlemodelDescription, { color: "#8AABFF" }]}>Compare them with your favorite players to see who and what they are up against.</Text>
                                          <View style={{ width: "40%" }}>
                                              <TouchableOpacity
                                                  style={[styles.yellowButtonSmall]}
                                                  onPress={() => Actions.PlayerComparison()} >
                                                  <Text style={styles.yellowButtonSmallText}>Compare Now</Text>
                                              </TouchableOpacity>
                                          </View> */}
                      </View>
                    </View>
                  </LinearGradient>
                </React.Fragment>
              )}
            </React.Fragment>
          )

          // <AppIntroSlider
          //     ref={(c) => { this._slider = c }}
          //     data={this.state.slidees}
          //     renderItem={this._renderItem}
          //     // onSlideChange={() => this.setState({sliderHeight:!this.state.sliderHeight})}
          //     showDoneButton={false}
          //     showNextButton={false}

          //     activeDotStyle={{ marginTop: "20%", backgroundColor: "#222222aa", width: 7, height: 7 }}
          //     dotStyle={{ marginTop: "20%", backgroundColor: "#ddddddaa", width: 7, height: 7 }} />
        }

        {/* <View style={{ marginVertical: 20 }}>
                    <FavoriteOptions />
                </View> */}
      </View>
    );
  }
}

export default TabDailyWatch;
