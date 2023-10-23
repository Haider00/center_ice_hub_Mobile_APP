import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import NavBarSecondary from '../components/NavBarSecondary';
import PlayerStatsHeader from '../components/PlayerStatsHeader';
import DressARIImage from '../assets/img/dressARI.png';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import moment from 'moment';
import PlayerDetailStats from './PlayerDetailStats';

class PlayerDeatails extends React.Component {
  constructor(prpos) {
    super(prpos);

    this.state = {
      flagback: true,
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
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    //BackHandler.addEventListener('softwareBackPress', this.handleBackButtonClick);
    // this.setPlayerFromStats();
    this.setState({ process: true, processHeader: true });
    await this.getCarrerData();
    this.setState({ process: false });
  }
  // componentWillUnmount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  //     BackHandler.addEventListener('softwareBackPress', this.handleBackButtonClick);
  // }

  _renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          var width = '25%';
          if (i == 0) width = '20%';
          else if (i == 1) width = '25%';
          else if (i == 2) width = '30%';
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
                  style={[styles.transparentButtonText, { color: '#404040' }]}>
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
                    { color: '#18295544' },
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

  getCarrerData = async (filter) => {
    var player = this.props.item;

    var playerLink = '';
    if (player.playerLink != '' && player.playerLink != undefined) {
      playerLink = player.playerLink;
    } else if (player.player_id != '' && player.player_id != undefined) {
      playerLink = `/api/v1/people/${player.player_id}`;
    }

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

      this.setState({ drafted });

      var res = await this.service.getPlayerDetails(playerLink, filter);
      if (res != null && res.data != null) {
        var playerDetails = res.data.people[0];
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
        birthData = moment(playerDetails.birthDate).format('MMM, D, YYYY');
        birthCity = playerDetails.birthCity;
        drafted = this.state.drafted;
        var captain = playerDetails.captain;
        var alternativeCaptain = playerDetails.alternateCaptain;
        if (drafted == ' overall, ') {
          drafted = 'NOT';
        }

        jursyNumber = playerDetails.primaryNumber;
        var playerData = {
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
          captain,
          alternativeCaptain,
        };
        this.setState({ playerData, processHeader: false, process: false });
      }
    }
    // else
    //     Actions.pop()
  };

  handleBackButtonClick = () => {
    if (this.state.flagback) {
      this.setState({ flagback: false });
      Actions.pop();
    }
  };

  render() {
    return (
      <View>
        <View style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
          <NavBarSecondary
            title="Player Stats"
            search
            backPress={this.handleBackButtonClick}
          />
          {this.state.playerData.name && (
            <PlayerStatsHeader
              dress={DressARIImage}
              playerData={this.state.playerData}
            />
          )}
          {
            /* <ScrollView contentContainerStyle={{ flexGrow: 1 }}

                scrollEnabled={this.state.scrollEnable}
            >*/
            <PlayerDetailStats item={this.props.item} />

            /* }{ </ScrollView> */
          }
        </View>
        {/* {
                        this.state.process == true &&
                        <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor:"#ffffff90" }}>
                           <View styles={styles.bg_primary}>
                                <ActivityIndicator size="large" color="#2233aa" />
                                <Text> Fetching data please wait ...</Text>
                            </View>
                        </View>
                    } */}
      </View>
    );
  }
}

export default PlayerDeatails;
