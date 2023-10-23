import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from '../assets/css/styles';
import moment from 'moment';
import { TabView, SceneMap } from 'react-native-tab-view';
import PC_Tab_Players from './PC_Tab_Players';
import PC_Tab_Goalies from './PC_Tab_Goalies';
import AddDressImage from '../assets/img/addDress.png';
import DressARIImage from '../assets/img/dressARI.png';
import CircleCrossImage from '../assets/img/circleCross.png';
import RightArrowIcon from '../assets/img/RightArrowWhite.png';
import DownArrowIcon from '../assets/img/arrowDown.png';
import LeftArrowIcon from '../assets/img/LeftArrowWhite.png';
import crossImage from '../assets/img/cross.png';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import { SeasonContext } from '../utils/seasonUtils';

class PlayerComparison extends React.Component {
  static contextType = SeasonContext;
  constructor(prpos) {
    super(prpos);

    this.state = {
      enabled: false,
      index: 0,
      playerData: null,
      selectedTimeFilter: 'Career',
      selectedSeasonFilter: 'Season',
      routes: [
        { key: 'first', title: 'Players' },
        { key: 'second', title: 'Goalies' },
      ],
      modalTeams: false,
      modalPlayers: false,
      process: false,
      tab: 'Players',
      selectedIndex: 0,
      Teams: [],
      Players: [],
      selectedTeam: '',
      GridViewItemsPlayers: [
        { key: 1, image: AddDressImage, selected: false },
        { key: 2, image: AddDressImage, selected: false },
        { key: 3, image: AddDressImage, selected: false },
        { key: 4, image: AddDressImage, selected: false },
      ],
      GridViewItemsGoalies: [
        { key: 1, image: AddDressImage, selected: false },
        { key: 2, image: AddDressImage, selected: false },
        { key: 3, image: AddDressImage, selected: false },
        { key: 4, image: AddDressImage, selected: false },
      ],
      headings: [
        { key: 1, title: '' },
        { key: 2, title: 'Team' },
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
        { key: 1, title: '' },
        { key: 2, title: 'Team' },
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
      blank: [
        { key: 1, blank: '-' },
        { key: 2, blank: '-' },
        { key: 3, blank: '-' },
        { key: 4, blank: '-' },
        { key: 5, blank: '-' },
        { key: 6, blank: '-' },
        { key: 7, blank: '-' },
        { key: 8, blank: '-' },
        { key: 9, blank: '-' },
        { key: 10, blank: '-' },
        { key: 11, blank: '-' },
        { key: 12, blank: '-' },
        { key: 13, blank: '-' },
        { key: 14, blank: '-' },
        { key: 15, blank: '-' },
        { key: 16, blank: '-' },
        { key: 17, blank: '-' },
      ],
      player1P: [],
      player2P: [],
      player3P: [],
      player4P: [],
      player1G: [],
      player2G: [],
      player3G: [],
      player4G: [],
    };

    this.state.player1 = this.state.blank;
    this.state.player2 = this.state.blank;
    this.state.player3 = this.state.blank;
    this.state.player4 = this.state.blank;

    this.service = new Service();
    this.appService = new AppService();
  }

  async componentWillMount() {
    // selected Player

    var res = await this.service.getTeams2();
    var Teams = [];
    if (res != null && res.data != null && res.data.teams) {
      var data = res.data.teams;

      data.forEach((element) => {
        Teams[element.id] = { key: element.id, name: element.name, team: true };
      });
      Teams = Teams.filter(() => true);
      // if (Teams.length % 2 == 1) {
      //     Teams.push({ key: -1, team: true })
      // }
      this.setState({
        Teams: Teams,
      });
    } //end response gotten

    Teams.sort((a, b) => (a.name > b.name ? 1 : -1));
    var playerData = await this.appService.getPlayerDataStats();
    if (playerData) {
      playerData = JSON.parse(playerData);
      var tab = 'Players';
      var index = 0;

      var newPlayerData = {
        circleCross: CircleCrossImage,
        image: DressARIImage,
        key: 0,
        name: playerData.name,
        playerLink: playerData.playerLink,
        role: playerData.postion,
        selected: true,
        team: playerData.teamName,
        number: playerData.jursyNumber,
      };

      if (newPlayerData.role == 'G') {
        tab = 'Goalies';
        index = 1;
      }

      this.setState({
        playerData: newPlayerData,
        selectedIndex: 1,
        tab,
        index,
      });

      this.takeAction(newPlayerData);
      this.appService.setPlayerDataStats(null);
    }
  }

  selectPlayer = (item, tab) => {
    this.setState({ modalTeams: true, selectedIndex: item.key, tab });
  };

  _renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          if (i === props.navigationState.index) {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabStyle,
                  { borderBottomColor: '#8AABFF', borderBottomWidth: 2 },
                ]}
                onPress={() => this.setState({ index: i })}>
                <Text style={styles.selectedTabText}>{route.title}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={i}
                style={styles.tabStyle}
                onPress={() => this.setState({ index: i })}>
                <Text style={styles.unselectedTabText}>{route.title}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  _getFavoriteOption(item) {
    return (
      <View
        style={[
          styles.containerRowStart,
          {
            width: '50%',
            borderColor: '#ffffff44',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            height: 50,
          },
        ]}
        key={item.key}>
        {item.name && (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => this.takeAction(item)}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
                width: '70%',
                marginHorizontal: 20,
              }}>
              <Text
                style={[styles.underlineText, { textDecorationLine: 'none' }]}>
                {item.name}
              </Text>
            </View>
            <View style={{ position: 'absolute', right: 10, top: 15 }}>
              <Image source={RightArrowIcon} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  _showModelTeam = (id) => {
    // this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    return (
      <View style={[styles.modelBackground2, { paddingTop: 0 }]}>
        <View
          style={[
            styles.containerMiddle,
            { marginTop: 0, marginLeft: 15, marginRight: 15, height: '100%' },
          ]}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 18, borderRadius: 12, height: '100%' },
            ]}>
            <View style={{ flexDirection: 'row' }}>
              {/* <TouchableOpacity
                            style={[styles.modelBackBUtton, { flex:1,marginTop: 0, marginBottom: 0 }]}
                            onPress={() => {
                                this.setState({ modalTeams: false, enabled: true })
                            }}
                        >
                            <Image source={LeftArrowIcon} />
                        </TouchableOpacity> */}
              <TouchableOpacity
                style={[
                  styles.modelCrossBUtton,
                  { flex: 1, marginTop: 0, marginBottom: 0 },
                ]}
                onPress={() => {
                  this.setState({ modalTeams: false, enabled: true });
                }}>
                <Image source={crossImage} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: '#ffffff44',
                  borderBottomWidth: 1,
                  backgroundColor: '#182955',
                  width: '100%',
                  paddingBottom: 10,
                  marginTop: -2,
                },
              ]}>
              <Text style={[styles.navBarTitle]}>Select Team</Text>
            </View>

            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: '#ffffff44',
                  borderBottomWidth: 1,
                  backgroundColor: '#182955',
                  width: '100%',
                  padding: 10,
                },
              ]}>
              <Text style={[styles.containerMiddlemodelDescription]}>
                Teams
              </Text>
            </View>
            <ScrollView
              style={{ height: '100%' }}
              onTouchStart={(ev) => {
                this.setState({ enabled: false });
              }}
              //onMomentumScrollEnd={(e) => { this.setState({ enabled: true }); }}
              //onScrollEndDrag={(e) => { this.setState({ enabled: true }); }}
            >
              <View style={[styles.containerRow, { marginTop: 0 }]}>
                <FlatList
                  style={{
                    backgroundColor: '#182955',
                    width: '100%',
                    height: '100%',
                  }}
                  data={this.state.Teams}
                  renderItem={({ item }) => this._getFavoriteOption(item)}
                  numColumns={2}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };
  emptyPlayer = () => {
    this.setState({
      player1P: [],
      player2P: [],
      player3P: [],
      player4P: [],
    });
  };
  emptyGoalie = () => {
    this.setState({
      player1G: [],
      player2G: [],
      player3G: [],
      player4G: [],
    });
  };

  _showModelTeamMembers = (id) => {
    // this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    return (
      <View style={[styles.modelBackground2, { paddingTop: 0 }]}>
        <View
          style={[
            styles.containerMiddle,
            { marginTop: 0, marginLeft: 15, marginRight: 15, height: '100%' },
          ]}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 18, borderRadius: 12, height: '100%' },
            ]}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[
                  styles.modelBackBUtton,
                  { flex: 1, marginTop: 0, marginBottom: 0 },
                ]}
                onPress={() => {
                  this.setState({ modalPlayers: false, modalTeams: true });
                }}>
                <Image source={LeftArrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modelCrossBUtton,
                  { marginTop: 0, marginBottom: 0 },
                ]}
                onPress={() => {
                  this.setState({ modalPlayers: false, enabled: true });
                }}>
                <Image source={crossImage} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: '#ffffff44',
                  borderBottomWidth: 1,
                  backgroundColor: '#182955',
                  width: '100%',
                  paddingBottom: 10,
                  marginTop: -2,
                },
              ]}>
              <Text style={[styles.navBarTitle]}>
                {this.state.selectedTeam}
              </Text>
              <Image
                source={DownArrowIcon}
                style={{ marginLeft: 10, marginBottom: 5 }}
              />
            </View>
            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: '#ffffff44',
                  borderBottomWidth: 1,
                  backgroundColor: '#182955',
                  width: '100%',
                  padding: 10,
                },
              ]}>
              <Text style={[styles.containerMiddlemodelDescription, {}]}>
                {this.state.tab}
              </Text>
            </View>

            <ScrollView
              style={{ maxHeight: '100%' }}
              onTouchStart={(ev) => {
                this.setState({ enabled: false });
              }}>
              <View style={[styles.containerRow, { marginTop: 0 }]}>
                <FlatList
                  style={{
                    backgroundColor: '#182955',
                    width: '100%',
                    height: '100%',
                  }}
                  data={this.state.Players}
                  renderItem={({ item }) => this._getFavoriteOption(item)}
                  numColumns={2}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  async takeAction(item) {
    await this.setState({ process: true });
    if (item.team === true) {
      await this.setState({ selectedTeam: item.name });
      this._showPlayerDailogue();
    } else {
      var p_role = item.role;
      if (item.role == 'L') {
        p_role = 'LW';
      } else if (item.role == 'R') {
        p_role = 'RW';
      }

      var teamlabel = this.appService.getTeamLabel(item.team);
      var GridViewItems = [];
      var player = {};
      var tab = this.state.tab;
      if (this.state.selectedIndex == 1) {
        player = {
          key: 1,
          name: item.name,
          team: item.team,
          role: p_role,
          image: teamlabel,
          number: item.number,
          circleCross: CircleCrossImage,
          selected: true,
          playerLink: item.playerLink,
        };
        await this._getPlayerStats(1, item.playerLink, tab);
      } else if (this.state.selectedIndex == 2) {
        player = {
          key: 2,
          name: item.name,
          team: item.team,
          role: p_role,
          image: teamlabel,
          number: item.number,
          circleCross: CircleCrossImage,
          selected: true,
          playerLink: item.playerLink,
        };
        await this._getPlayerStats(2, item.playerLink, tab);
      } else if (this.state.selectedIndex == 3) {
        player = {
          key: 3,
          name: item.name,
          team: item.team,
          role: p_role,
          image: teamlabel,
          number: item.number,
          circleCross: CircleCrossImage,
          selected: true,
          playerLink: item.playerLink,
        };
        await this._getPlayerStats(3, item.playerLink, tab);
      } else if (this.state.selectedIndex == 4) {
        player = {
          key: 4,
          name: item.name,
          team: item.team,
          role: p_role,
          image: teamlabel,
          number: item.number,
          circleCross: CircleCrossImage,
          selected: true,
          playerLink: item.playerLink,
        };
        await this._getPlayerStats(4, item.playerLink, tab);
      }

      if (tab == 'Players') {
        this.state.GridViewItemsPlayers.forEach((item, index) => {
          if (item.key == player.key) {
            GridViewItems[index] = player;
          } else GridViewItems[index] = item;
        });

        this.setState({ GridViewItemsPlayers: GridViewItems });
      } else if (tab == 'Goalies') {
        this.state.GridViewItemsGoalies.forEach((item, index) => {
          if (item.key == player.key) {
            GridViewItems[index] = player;
          } else GridViewItems[index] = item;
        });

        this.setState({ GridViewItemsGoalies: GridViewItems });
      }

      this.setState({ modalPlayers: false, modalTeams: false });
    }
    this.setState({ process: false });
  }

  onHandleTimeFormat = (value) => {
    const subStringData = value.substring(0, value.length - 3);
    return subStringData;
  };

  onHandleDecimalFormat = (value, format) => {
    const tempValue = value.toFixed(format);
    return tempValue;
  };

  async _getPlayerStats(index, playerLink, tab) {
    if (playerLink != '' && playerLink != undefined) {
      var selectFlag = false; // for selectedFilter
      var isStored = false;
      var doubleSplit = false;
      var filter = this.state.selectedTimeFilter;
      var seasonFilter = this.state.selectedSeasonFilter;

      if (filter == 'Career' && seasonFilter != 'Playoffs') {
        filter = 'careerRegularSeason';
        selectFlag = true;
      } else if (filter.includes('Season') && seasonFilter != 'Playoffs') {
        var doubleSplit = true;
        if (filter == 'Current Season') {
          // var thisYear = moment().format('YYYY')
          // var nextYear = moment().add(1, 'Y').format('YYYY')
          var selectedYear = this.context;
          filter = 'statsSingleSeason&season=' + selectedYear;
        } else {
          var thisYear = moment().subtract(1, 'Y').format('YYYY');
          var lastYear = moment().subtract(2, 'Y').format('YYYY');
          var selectedYear = lastYear + '' + thisYear;
          filter = 'statsSingleSeason&season=' + selectedYear;
        }
        // selectFlag = true;
      } else if (filter.includes('Month') && seasonFilter != 'Playoffs') {
        filter = 'byMonth';
        // selectFlag = true;
      }

      // else if (this.state.selectedTimeFilter.includes("Week")) {
      //     filter = "byDayOfWeek";
      // }
      else if (filter.includes('Season') && seasonFilter == 'Playoffs') {
        var doubleSplit = true;
        if (filter == 'Current Season') {
          // var thisYear = moment().format('YYYY')
          // var nextYear = moment().add(1, 'Y').format('YYYY')
          var selectedYear = this.context;
          filter = 'statsSingleSeasonPlayoffs&season=' + selectedYear;
        } else {
          var thisYear = moment().subtract(1, 'Y').format('YYYY');
          var lastYear = moment().subtract(2, 'Y').format('YYYY');
          var selectedYear = lastYear + '' + thisYear;
          filter = 'statsSingleSeasonPlayoffs&season=' + selectedYear;
        }
        selectFlag = true;
      } else if (filter.includes('Month') && seasonFilter == 'Playoffs') {
        filter = 'byMonthPlayoffs';
        selectFlag = true;
      } else if (filter == 'Career' && seasonFilter == 'Playoffs') {
        filter = 'careerPlayoffs';
        selectFlag = true;
      }
      console.log('FILTER>>>>', filter);
      var res = await this.service.getPlayerDetails(playerLink, filter);
      if (res != null && res.data != null) {
        var playerDetails = res.data.people[0];
        var teamCode = this.appService.getTeamLabel(
          playerDetails.currentTeam.name,
        );

        var player = [];
        var splits = [];
        if (doubleSplit) splits = playerDetails.stats[0].splits;
        else splits = playerDetails.stats[0].splits.reverse();

        splits.forEach((element, indx) => {
          console.log('INDEX>>>>>>', indx, splits);
          // var myYear = ''
          // if (this.state.selectedTimeFilter.toLowerCase().includes("current season")) {
          //     var thisYear = moment().format('YYYY')
          //     var nextYear = thisYear - 1 + 2;
          //     var selectedYear = thisYear + "" + nextYear
          //     myYear = selectedYear
          //     if (splits[index].season == selectedYear) {
          //         //////
          //         selectFlag = true;
          //     }
          // }

          // else if (this.state.selectedTimeFilter.toLowerCase().includes("last season")) {
          //     var thisYear = moment().format('YYYY')
          //     var lastYear = thisYear - 1;
          //     var selectedYear = lastYear + "" + thisYear
          //     myYear = selectedYear

          //     if (splits[index].season == selectedYear) {
          //         //////
          //         selectFlag = true;
          //     }
          // }

          var myYear = '';
          if (
            this.state.selectedTimeFilter.toLowerCase().includes('season') &&
            indx == 0
          ) {
            selectFlag = true;
          } else if (
            this.state.selectedTimeFilter.toLowerCase().includes('this month')
          ) {
            var thisMonth = moment().format('MM');

            if (splits[indx].month == thisMonth) {
              //////
              selectFlag = true;
            }
          } else if (
            this.state.selectedTimeFilter.toLowerCase().includes('last month')
          ) {
            var thisMonth = moment().format('MM');
            var lastMonth = thisMonth - 1;
            // myYear = moment().format('YYYY')
            // myYear = myYear - 1 + myYear
            console.log('LASSSSSSTTTTTT>>>', splits[indx].month, lastMonth);

            if (splits[indx].month == lastMonth) {
              console.log('LASSSSSSTTTTTT');
              //////
              selectFlag = true;
            }
          }

          var color = '';
          var tempScore = null;
          var myPlayers = this.state.GridViewItemsPlayers;
          if (tab == 'Goalies') myPlayers = this.state.GridViewItemsGoalies;

          if (selectFlag && !isStored && tab == 'Players') {
            if (this.state.selectedTimeFilter == 'Career') {
              var seasons = 'Career';
            } else {
              var seasons =
                splits[indx].season.substring(0, 4) +
                '-' +
                element.season.substring(6, 8);
            }
            player[0] = { key: 1, date: seasons };
            // seasons[indx] = { key: indx, value: element.season.substring(0, 4) + "-" + element.season.substring(4, 8) }
            player[1] = { key: 2, team: teamCode };

            tempScore = element.stat.games ? element.stat.games : -1;
            color = this.getColorArray(tempScore, 2, tab);

            player[2] = {
              key: 3,
              score: element.stat.games ? element.stat.games : '-',
              color,
            };

            tempScore = element.stat.goals ? element.stat.goals : -1;
            color = this.getColorArray(tempScore, 3, tab);
            player[3] = {
              key: 4,
              score: element.stat.goals ? element.stat.goals : '-',
              color,
            };

            tempScore = element.stat.games ? element.stat.assists : -1;
            color = this.getColorArray(tempScore, 4, tab);
            player[4] = {
              key: 5,
              score: element.stat.assists ? element.stat.assists : '-',
              color,
            };

            tempScore = element.stat.points ? element.stat.points : -1;
            color = this.getColorArray(tempScore, 5, tab);
            player[5] = {
              key: 6,
              score: element.stat.points ? element.stat.points : '-',
              color,
            };

            tempScore = element.stat.plusMinus ? element.stat.plusMinus : -1;
            color = this.getColorArray(tempScore, 6, tab);
            player[6] = {
              key: 7,
              score: element.stat.plusMinus ? element.stat.plusMinus : '-',
              color,
            };

            tempScore = element.stat.shots ? element.stat.shots : -1;
            color = this.getColorArray(tempScore, 7, tab);
            player[7] = {
              key: 8,
              score: element.stat.shots ? element.stat.shots : '-',
              color,
            };

            tempScore = element.stat.shotPct ? element.stat.shotPct : -1;
            color = this.getColorArray(tempScore, 8, tab);
            player[8] = {
              key: 9,
              score: element.stat.shotPct ? element.stat.shotPct : '-',
              color,
            };

            tempScore = element.stat.points
              ? element.stat.points / element.stat.games
              : -1;
            color = this.getColorArray(tempScore, 9, tab);
            player[9] = {
              key: 10,
              score: element.stat.points
                ? this.onHandleDecimalFormat(
                    element.stat.points / element.stat.games,
                    1,
                  )
                : '-',
              color,
            };

            tempScore = element.stat.powerPlayGoals
              ? element.stat.powerPlayGoals
              : -1;
            color = this.getColorArray(tempScore, 10, tab);
            player[10] = {
              key: 11,
              score: element.stat.powerPlayGoals
                ? element.stat.powerPlayGoals
                : '-',
              color,
            };

            tempScore = element.stat.powerPlayPoints
              ? element.stat.powerPlayPoints
              : -1;
            color = this.getColorArray(tempScore, 11, tab);
            player[11] = {
              key: 12,
              score: element.stat.powerPlayPoints
                ? element.stat.powerPlayPoints
                : '-',
              color,
            };

            tempScore = element.stat.shortHandedGoals
              ? element.stat.shortHandedGoals
              : -1;
            color = this.getColorArray(tempScore, 12, tab);
            player[12] = {
              key: 13,
              score: element.stat.shortHandedGoals
                ? element.stat.shortHandedGoals
                : '-',
              color,
            };

            tempScore = element.stat.shortHandedPoints
              ? element.stat.shortHandedPoints
              : -1;
            color = this.getColorArray(tempScore, 13, tab);
            player[13] = {
              key: 14,
              score: element.stat.shortHandedPoints
                ? element.stat.shortHandedPoints
                : '-',
              color,
            };

            tempScore = element.stat.games ? element.stat.gameWinningGoals : -1;
            color = this.getColorArray(tempScore, 14, tab);
            player[14] = {
              key: 15,
              score: element.stat.gameWinningGoals
                ? element.stat.gameWinningGoals
                : '-',
              color,
            };

            tempScore = element.stat.games ? element.stat.overTimeGoals : -1;
            color = this.getColorArray(tempScore, 15, tab);
            player[15] = {
              key: 16,
              score: element.stat.overTimeGoals
                ? element.stat.overTimeGoals
                : '-',
              color,
            };

            tempScore = element.stat.timeOnIce
              ? this.onHandleTimeFormat(element.stat.timeOnIce)
              : -1;
            color = this.getColorArray(tempScore, 16, tab);
            player[16] = {
              key: 17,
              score: element.stat.timeOnIce
                ? this.onHandleTimeFormat(element.stat.timeOnIce)
                : '-',
              color,
            };

            tempScore = element.stat.shifts ? element.stat.shifts : -1;
            color = this.getColorArray(tempScore, 17, tab);
            player[17] = {
              key: 18,
              score: element.stat.shifts ? element.stat.shifts : '-',
              color,
            };

            tempScore = element.stat.faceOffPct ? element.stat.faceOffPct : -1;
            color = this.getColorArray(tempScore, 18, tab);
            player[18] = {
              key: 19,
              score: element.stat.faceOffPct ? element.stat.faceOffPct : '-',
              color,
            };

            tempScore = element.stat.powerPlayTimeOnIce
              ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce)
              : -1;
            color = this.getColorArray(tempScore, 19, tab);
            player[19] = {
              key: 20,
              score: element.stat.powerPlayTimeOnIce
                ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce)
                : '-',
              color,
            };

            tempScore = element.stat.shortHandedTimeOnIce
              ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce)
              : -1;
            color = this.getColorArray(tempScore, 20, tab);
            player[20] = {
              key: 21,
              score: element.stat.shortHandedTimeOnIce
                ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce)
                : '-',
              color,
            };

            tempScore = element.stat.pim ? element.stat.pim : -1;
            color = this.getColorArray(tempScore, 21, tab);
            player[21] = {
              key: 22,
              score: element.stat.pim ? element.stat.pim : '-',
              color,
            };

            tempScore = element.stat.hits ? element.stat.hits : -1;
            color = this.getColorArray(tempScore, 22, tab);
            player[22] = {
              key: 23,
              score: element.stat.hits ? element.stat.hits : '-',
              color,
            };

            tempScore = element.stat.blocked ? element.stat.blocked : -1;
            color = this.getColorArray(tempScore, 23, tab);
            player[23] = {
              key: 24,
              score: element.stat.blocked ? element.stat.blocked : '-',
              color,
            };

            // tempScore = element.stat.games ? element.stat.faceOffPct : -1;
            // color = this.getColorArray(tempScore, 16, tab)
            // player[16] = { key: 17, score: element.stat.faceOffPct ? element.stat.faceOffPct : '-', color }

            isStored = true;
          }

          if (selectFlag && !isStored && tab == 'Goalies') {
            if (this.state.selectedTimeFilter == 'Career') {
              var seasons = 'Career';
            } else {
              var seasons =
                splits[indx].season.substring(0, 4) +
                '-' +
                element.season.substring(6, 8);
            }
            //var seasons = splits[indx].season.substring(0, 4) + "-" + element.season.substring(6, 8)
            player[0] = { key: 1, date: seasons };
            // seasons[indx] = { key: indx, value: element.season.substring(0, 4) + "-" + element.season.substring(4, 8) }
            player[1] = { key: 2, team: teamCode };

            tempScore = element.stat.games ? element.stat.games : -1;
            //color = this.getColor(tempScore, 2, tab)

            color = this.getColorArray(tempScore, 2, tab);
            player[2] = {
              key: 3,
              score: element.stat.games ? element.stat.games : '-',
              color,
            };

            tempScore = element.stat.gamesStarted
              ? element.stat.gamesStarted
              : -1;
            color = this.getColorArray(tempScore, 3, tab);
            player[3] = {
              key: 4,
              score: element.stat.gamesStarted
                ? element.stat.gamesStarted
                : '-',
              color,
            };

            tempScore = element.stat.wins ? element.stat.wins : -1;
            color = this.getColorArray(tempScore, 4, tab);
            player[4] = {
              key: 5,
              score: element.stat.wins ? element.stat.wins : '-',
              color,
            };

            tempScore = element.stat.losses ? element.stat.losses : -1;
            color = this.getColorArray(tempScore, 5, tab);
            player[5] = {
              key: 6,
              score: element.stat.losses ? element.stat.losses : '-',
              color,
            };

            tempScore = element.stat.ot ? element.stat.ot : -1;
            color = this.getColorArray(tempScore, 6, tab);
            player[6] = {
              key: 7,
              score: element.stat.ot ? element.stat.ot : '-',
              color,
            };

            tempScore = element.stat.shotsAgainst
              ? element.stat.shotsAgainst
              : -1;
            color = this.getColorArray(tempScore, 7, tab);
            player[7] = {
              key: 8,
              score: element.stat.shotsAgainst
                ? element.stat.shotsAgainst
                : '-',
              color,
            };

            tempScore = element.stat.saves ? element.stat.saves : -1;
            color = this.getColorArray(tempScore, 8, tab);
            player[8] = {
              key: 9,
              score: element.stat.saves ? element.stat.saves : '-',
              color,
            };

            tempScore = element.stat.goalsAgainst
              ? element.stat.goalsAgainst
              : -1;
            color = this.getColorArray(tempScore, 9, tab);
            player[9] = {
              key: 10,
              score: element.stat.goalsAgainst
                ? element.stat.goalsAgainst
                : '-',
              color,
            };

            tempScore = element.stat.savePercentage
              ? this.onHandleDecimalFormat(element.stat.savePercentage, 3)
              : -1;
            color = this.getColorArray(tempScore, 10, tab);
            player[10] = {
              key: 11,
              score: element.stat.savePercentage
                ? this.onHandleDecimalFormat(element.stat.savePercentage, 3)
                : '-',
              color,
            };

            tempScore = element.stat.goalAgainstAverage
              ? this.onHandleDecimalFormat(element.stat.goalAgainstAverage, 2)
              : -1;
            color = this.getColorArray(tempScore, 11, tab);
            player[11] = {
              key: 12,
              score: element.stat.goalAgainstAverage
                ? this.onHandleDecimalFormat(element.stat.goalAgainstAverage, 2)
                : '-',
              color,
            };

            tempScore = element.stat.timeOnIce
              ? this.onHandleTimeFormat(element.stat.timeOnIce)
              : -1;
            color = this.getColorArray(tempScore, 12, tab);
            player[12] = {
              key: 13,
              score: element.stat.timeOnIce
                ? this.onHandleTimeFormat(element.stat.timeOnIce)
                : '-',
              color,
            };

            tempScore = element.stat.shutouts ? element.stat.shutouts : -1;
            color = this.getColorArray(tempScore, 13, tab);
            player[13] = {
              key: 14,
              score: element.stat.shutouts ? element.stat.shutouts : '-',
              color,
            };

            isStored = true;
          }

          // if (index == splits.length - 1 && !selectFlag) {

          //     var seasons = myYear.substring(0, 4) + "-" + myYear.substring(6, 8)

          //     player[0] = { key: 1, date: seasons }
          //     player[1] = { key: 2, team: teamCode }
          //     player[2] = { key: 3, blank: true ,score:'-'}
          //     player[3] = { key: 4, blank: true,score:'-' }
          //     player[4] = { key: 5, blank: true,score:'-' }
          //     player[5] = { key: 6, blank: true,score:'-' }
          //     player[6] = { key: 7, sblank: true,score:'-' }
          //     player[7] = { key: 8, blank: true,score:'-' }
          //     player[8] = { key: 9, blank: true,score:'-' }
          //     player[9] = { key: 10, blank: true,score:'-' }
          //     player[10] = { key: 11, blank: true,score:'-' }
          //     player[11] = { key: 12, blank: true,score:'-' }
          //     player[12] = { key: 13, blank: true ,score:'-'}
          //     player[13] = { key: 14, blank: true,score:'-' }
          //     player[14] = { key: 15, blank: true ,score:'-'}
          //     player[15] = { key: 16, blank: true ,score:'-'}
          //     player[16] = { key: 17, blank: true,score:'-' }
          // }
        });

        if (index == 1 && tab == 'Players') this.setState({ player1P: player });
        else if (index == 2 && tab == 'Players')
          this.setState({ player2P: player });
        else if (index == 3 && tab == 'Players')
          this.setState({ player3P: player });
        else if (index == 4 && tab == 'Players')
          this.setState({ player4P: player });
        else if (index == 1 && tab == 'Goalies')
          this.setState({ player1G: player });
        else if (index == 2 && tab == 'Goalies')
          this.setState({ player2G: player });
        else if (index == 3 && tab == 'Goalies')
          this.setState({ player3G: player });
        else if (index == 4 && tab == 'Goalies')
          this.setState({ player4G: player });
      }
      this.setState({ process: false, enabled: true });
    }
  }

  getColor = (value, index, tab) => {
    var colors = ['#00FF1E', '#8AABFF', '#FDB734', '#FF0000'];
    var selectedIndex = 3;
    var players = [];

    if (tab == 'Players') {
      players.push(this.state.player1P);
      players.push(this.state.player2P);
      players.push(this.state.player3P);
      players.push(this.state.player4P);
    }
    if (tab == 'Goalies') {
      players.push(this.state.player1G);
      players.push(this.state.player2G);
      players.push(this.state.player3G);
      players.push(this.state.player4G);
    }

    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      if (player.length > 0) {
        var oldScore = player[index].score;
        if (oldScore > value) selectedIndex -= 1;
      }
    }

    return colors[selectedIndex];
  };

  getColorArray = (value, index, tab) => {
    if (tab == 'Players') {
      //var colors = ["#00FF1E", '#8AABFF',"#FDB734", "#FF0000"]
      var colors = [];
      var selectedIndex = 0;
      var lastselectedindex = selectedIndex - 1;
      var players = [];

      players.push(this.state.player1P);
      players.push(this.state.player2P);
      players.push(this.state.player3P);
      players.push(this.state.player4P);

      var player0 = players[0];
      var player1 = players[1];
      var player2 = players[2];
      var player3 = players[3];

      if (player0.length > 0) {
        player0 = player0[index].score;
        if (player0 == '-' || player0 == ' ') player0 = -999999;
      }
      if (player1.length > 0) {
        var player1 = player1[index].score;
        if (player1 == '-' || player1 == ' ') player1 = -999999;
      }
      if (player2.length > 0) {
        var player2 = player2[index].score;
        if (player2 == '-' || player2 == ' ') player2 = -99999;
      }
      if (player3.length > 0) {
        var player3 = player3[index].score;
        if (player3 == '-' || player3 == ' ') player3 = -999999;
      }
      var player_new_data_old = [];

      if (player0.length != 0) player_new_data_old.push(player0);
      if (player1.length != 0) player_new_data_old.push(player1);
      if (player2.length != 0) player_new_data_old.push(player2);
      if (player3.length != 0) player_new_data_old.push(player3);

      player_new_data_old.push(value);

      var player_new_data = player_new_data_old.filter(
        (val, id, player_new_data_old) =>
          player_new_data_old.indexOf(val) == id,
      );

      if (player_new_data.length == 1) {
        colors = ['#00FF1E'];
      }
      if (player_new_data.length == 2) {
        colors = ['#00FF1E', '#FF0000'];
      }
      if (player_new_data.length == 3) {
        colors = ['#00FF1E', '#FDB734', '#FF0000'];
      }
      if (player_new_data.length == 4) {
        colors = ['#00FF1E', '#8AABFF', '#FDB734', '#FF0000'];
      }

      player_new_data.sort(function (a, b) {
        return b - a;
      });

      if (player0 != 0 || player0 == '-') {
        var b = player_new_data.indexOf(player0);
        var pl1 = this.state.player1P;
        pl1[index].color = colors[b];
        this.setState({
          player1P: pl1,
        });
      }

      if (player1 != 0 || player1 == '-') {
        var b = player_new_data.indexOf(player1);
        var pl1 = this.state.player2P;
        pl1[index].color = colors[b];
        this.setState({
          player2P: pl1,
        });
      }

      if (player2 != 0 || player2 == '-') {
        var b = player_new_data.indexOf(player2);
        var pl1 = this.state.player3P;
        pl1[index].color = colors[b];
        this.setState({
          player3P: pl1,
        });
      }

      if (player3 != 0 || player3 == '-') {
        var b = player_new_data.indexOf(player3);
        var pl1 = this.state.player4P;
        pl1[index].color = colors[b];
        this.setState({
          player4P: pl1,
        });
      }

      if (value != 0) {
        selectedIndex = player_new_data.indexOf(value);
      }

      return colors[selectedIndex];
    }

    if (tab == 'Goalies') {
      //var colors = ["#00FF1E", '#8AABFF',"#FDB734", "#FF0000"]
      var colors = [];
      var selectedIndex = 0;
      var lastselectedindex = selectedIndex - 1;
      var players = [];

      players.push(this.state.player1G);
      players.push(this.state.player2G);
      players.push(this.state.player3G);
      players.push(this.state.player4G);

      var player0 = players[0];
      var player1 = players[1];
      var player2 = players[2];
      var player3 = players[3];

      if (player0.length > 0) {
        player0 = player0[index].score;
        if (player0 == '-' || player0 == ' ') player0 = -999999;
      }
      if (player1.length > 0) {
        var player1 = player1[index].score;
        if (player1 == '-' || player1 == ' ') player1 = -999999;
      }
      if (player2.length > 0) {
        var player2 = player2[index].score;
        if (player2 == '-' || player2 == ' ') player2 = -999999;
      }
      if (player3.length > 0) {
        var player3 = player3[index].score;
        if (player3 == '-' || player3 == ' ') player3 = -999999;
      }
      var player_new_data_old = [];

      if (player0.length != 0) player_new_data_old.push(player0);
      if (player1.length != 0) player_new_data_old.push(player1);
      if (player2.length != 0) player_new_data_old.push(player2);
      if (player3.length != 0) player_new_data_old.push(player3);

      player_new_data_old.push(value);

      var player_new_data = player_new_data_old.filter(
        (val, id, player_new_data_old) =>
          player_new_data_old.indexOf(val) == id,
      );

      if (player_new_data.length == 1) {
        colors = ['#00FF1E'];
      }
      if (player_new_data.length == 2) {
        colors = ['#00FF1E', '#FF0000'];
      }
      if (player_new_data.length == 3) {
        colors = ['#00FF1E', '#FDB734', '#FF0000'];
      }
      if (player_new_data.length == 4) {
        colors = ['#00FF1E', '#8AABFF', '#FDB734', '#FF0000'];
      }

      player_new_data.sort(function (a, b) {
        return b - a;
      });
      if (player0 != 0 || player0 == '-') {
        var b = player_new_data.indexOf(player0);
        var pl1 = this.state.player1G;
        pl1[index].color = colors[b];
        this.setState({
          player1G: pl1,
        });
      }

      if (player1 != 0 || player1 == '-') {
        var b = player_new_data.indexOf(player1);
        var pl1 = this.state.player2G;
        pl1[index].color = colors[b];
        this.setState({
          player2G: pl1,
        });
      }

      if (player2 != 0 || player2 == '-') {
        var b = player_new_data.indexOf(player2);
        var pl1 = this.state.player3G;
        pl1[index].color = colors[b];
        this.setState({
          player3G: pl1,
        });
      }

      if (player3 != 0 || player3 == '-') {
        var b = player_new_data.indexOf(player3);
        var pl1 = this.state.player4G;
        pl1[index].color = colors[b];
        this.setState({
          player4G: pl1,
        });
      }

      if (value != 0) {
        selectedIndex = player_new_data.indexOf(value);
      }

      return colors[selectedIndex];
    }
  };

  _changeTimeFilter = async (selectedTimeFilter, tab) => {
    await this.setState({ process: true, selectedTimeFilter });
    if (tab == 'Players') {
      var players = this.state.GridViewItemsPlayers;
      this.emptyPlayer();
      for (var i = 0; i < players.length; i++) {
        await this.setState({ process: true, selectedTimeFilter });
        var player = players[i];
        if (player.selected) {
          await this._getPlayerStats(player.key, player.playerLink, tab);
        }
      }
    } else if (tab == 'Goalies') {
      var players = this.state.GridViewItemsGoalies;
      this.emptyGoalie();
      for (var i = 0; i < players.length; i++) {
        await this.setState({ process: true, selectedTimeFilter });
        var player = players[i];
        if (player.selected) {
          await this._getPlayerStats(player.key, player.playerLink, tab);
        }
      }
    }

    await this.setState({ process: false });
  };

  _changeSeasonFilter = async (selectedSeasonFilter, tab) => {
    await this.setState({ process: true, selectedSeasonFilter });
    if (tab == 'Players') {
      var players = this.state.GridViewItemsPlayers;
      this.emptyPlayer();
      for (var i = 0; i < players.length; i++) {
        await this.setState({ process: true, selectedSeasonFilter });
        var player = players[i];
        if (player.selected) {
          await this._getPlayerStats(player.key, player.playerLink, tab);
        }
      }
    } else if (tab == 'Goalies') {
      var players = this.state.GridViewItemsGoalies;
      this.emptyGoalie();
      for (var i = 0; i < players.length; i++) {
        await this.setState({ process: true, selectedSeasonFilter });
        var player = players[i];
        if (player.selected) {
          await this._getPlayerStats(player.key, player.playerLink, tab);
        }
      }
    }
    await this.setState({ process: false });
  };

  _showPlayerDailogue = async () => {
    await this.setState({ process: true });

    var Players = [];
    var teamCode = this.appService.getTeamCode(this.state.selectedTeam);

    this.setState({ teamCode });
    var res = await this.service.getTeamPlayers(teamCode);

    if (res != null && res.data != null) {
      var data = res.data.roster;

      for (var i = 0; i < data.length; i++) {
        var player = data[i];
        var player_object = {};
        if (this.state.tab == 'Players') {
          if (player.position.abbreviation != 'G') {
            player_object = {
              key: i,
              name: player.person.fullName,
              team: this.state.selectedTeam,
              role: player.position.code,
              image: DressARIImage,
              number: player.jerseyNumber,
              circleCross: CircleCrossImage,
              selected: true,
              playerLink: player.person.link,
            };
            Players.push(player_object);
          }
        } else if (this.state.tab == 'Goalies') {
          if (player.position.abbreviation == 'G') {
            player_object = {
              key: i,
              name: player.person.fullName,
              team: this.state.selectedTeam,
              role: player.position.code,
              image: DressARIImage,
              number: player.jerseyNumber,
              circleCross: CircleCrossImage,
              selected: true,
              playerLink: player.person.link,
            };
            Players.push(player_object);
          }
        }
      }
      if (Players.length % 2 == 1) {
        Players.push({ key: -1, player: true });
      }

      var sortedplayer = [];
      Players.forEach((item, index) => {
        if (item.name) {
          var splited = item.name.split(' ');
          var player_object = {
            key: item.key,
            name: splited[1] + ' ' + splited[0],
            team: item.team,
            role: item.role,
            image: item.image,
            number: item.number,
            circleCross: item.circleCross,
            selected: item.selected,
            playerLink: item.playerLink,
          };
          sortedplayer.push(player_object);
        }
      });
      sortedplayer.sort((a, b) => (a.name > b.name ? 1 : -1));
      Players = [];
      sortedplayer.forEach((item, index) => {
        if (item.name) {
          var splited = item.name.split(' ');
          var player_object = {
            key: item.key,
            name: splited[1] + ' ' + splited[0],
            team: item.team,
            role: item.role,
            image: item.image,
            number: item.number,
            circleCross: item.circleCross,
            selected: item.selected,
            playerLink: item.playerLink,
          };
          Players.push(player_object);
        }
      });
      if (Players.length % 2 == 1) {
        Players.push({ key: -1, player: true });
      }
      this.setState({
        Players: Players,
      });
    }

    this.setState({ modalPlayers: true, modalTeams: false, process: false });
  };

  _resetPlayer = (index, tab) => {
    this.setState({ process: true, tab });

    if (index.key == 1) {
      var GridViewItems = [];

      var unselectedPalyer = { key: 1, image: AddDressImage, selected: false };

      if (tab == 'Players') {
        this.state.GridViewItemsPlayers.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player1P: [], GridViewItemsPlayers: GridViewItems });
      } else if (tab == 'Goalies') {
        this.state.GridViewItemsGoalies.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player1G: [], GridViewItemsGoalies: GridViewItems });
      }
    } else if (index.key == 2) {
      var GridViewItems = [];
      var unselectedPalyer = { key: 2, image: AddDressImage, selected: false };
      if (tab == 'Players') {
        this.state.GridViewItemsPlayers.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player2P: [], GridViewItemsPlayers: GridViewItems });
      }

      if (tab == 'Goalies') {
        this.state.GridViewItemsGoalies.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player2G: [], GridViewItemsGoalies: GridViewItems });
      }
    } else if (index.key == 3) {
      var GridViewItems = [];
      var unselectedPalyer = { key: 3, image: AddDressImage, selected: false };
      if (tab == 'Players') {
        this.state.GridViewItemsPlayers.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player3P: [], GridViewItemsPlayers: GridViewItems });
      }

      if (tab == 'Goalies') {
        this.state.GridViewItemsGoalies.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player3G: [], GridViewItemsGoalies: GridViewItems });
      }
    } else if (index.key == 4) {
      var GridViewItems = [];
      var unselectedPalyer = { key: 4, image: AddDressImage, selected: false };

      if (tab == 'Players') {
        this.state.GridViewItemsPlayers.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player4P: [], GridViewItemsPlayers: GridViewItems });
      }

      if (tab == 'Goalies') {
        this.state.GridViewItemsGoalies.forEach((item, i) => {
          if (i + 1 == index.key) GridViewItems[i] = unselectedPalyer;
          else GridViewItems[i] = item;
        });

        this.setState({ player4G: [], GridViewItemsGoalies: GridViewItems });
      }
    }
    this.setState({ process: false });
  };

  allReset = (tab) => {
    var GridViewItems = [
      { key: 1, image: AddDressImage, selected: false },
      { key: 2, image: AddDressImage, selected: false },
      { key: 3, image: AddDressImage, selected: false },
      { key: 4, image: AddDressImage, selected: false },
    ];
    if (tab == 'Players')
      this.setState({
        player1P: [],
        player2P: [],
        player3P: [],
        player4P: [],
        GridViewItemsPlayers: GridViewItems,
      });
    else if (tab == 'Goalies')
      this.setState({
        player1G: [],
        player2G: [],
        player3G: [],
        player4G: [],
        GridViewItemsG: GridViewItems,
      });
  };

  bannerError = (e) => {
    //////
  };

  render() {
    return (
      <View>
        <View
          style={{ height: '100%' }}
          // scrollEnabled={false}
          // ref={(c) => { this.scroll = c }}
        >
          <View style={[styles.body, { backgroundColor: '#F8F8F8' }]}>
            <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                  first: () => (
                    <PC_Tab_Players
                      GridViewItems={this.state.GridViewItemsPlayers}
                      headings={this.state.headings}
                      player1={this.state.player1P}
                      player2={this.state.player2P}
                      player3={this.state.player3P}
                      player4={this.state.player4P}
                      selectPlayer={this.selectPlayer}
                      resetPlayer={this._resetPlayer}
                      allReset={this.allReset}
                      changeTimeFilter={this._changeTimeFilter}
                      selectedTimeFilter={this.state.selectedTimeFilter}
                      changeSeasonFilter={this._changeSeasonFilter}
                      selectedSeasonFilter={this.state.selectedSeasonFilter}
                    />
                  ),
                  second: () => (
                    <PC_Tab_Goalies
                      GridViewItems={this.state.GridViewItemsGoalies}
                      headings={this.state.headingsGoalies}
                      player1={this.state.player1G}
                      player2={this.state.player2G}
                      player3={this.state.player3G}
                      player4={this.state.player4G}
                      selectPlayer={this.selectPlayer}
                      resetPlayer={this._resetPlayer}
                      allReset={this.allReset}
                      changeTimeFilter={this._changeTimeFilter}
                      selectedTimeFilter={this.state.selectedTimeFilter}
                      changeSeasonFilter={this._changeSeasonFilter}
                      selectedSeasonFilter={this.state.selectedSeasonFilter}
                    />
                  ),
                })}
                onIndexChange={(index) => this.setState({ index })}
                initialLayout={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                }}
                renderTabBar={this._renderTabBar}
              />
            </View>
          </View>
        </View>

        {this.state.modalTeams && this._showModelTeam()}
        {this.state.modalPlayers && this._showModelTeamMembers()}
        {this.state.process == true && (
          <View
            style={{
              position: 'absolute',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            <ActivityIndicator
              size="large"
              color="#2233aa"
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 50,
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

export default PlayerComparison;
