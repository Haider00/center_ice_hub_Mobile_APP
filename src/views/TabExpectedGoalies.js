import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../assets/css/styles';
import moment from 'moment';
import SliderTabView from './SliderTabView';
import NoGame from './NoGame';
import AppIntroSlider from 'react-native-app-intro-slider';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import { useGoaliesDataDispatch } from '../context/goalies.context';


var todayDate;

class TabExpectedGoaliesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading_percent: '0%',
      process: true,
      slider: false,
      slidessEG: [],
    };

    this.service = new Service();
    this.appService = new AppService();
  }
  _renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
        <SliderTabView
          key={item.key}
          team1Name={item.team1Name}
          team2Name={item.team2Name}
          team1Label={item.team1Label}
          team2Label={item.team2Label}
          playerTeam1={item.playerTeam1}
          PlayerTeam1Link={item.PlayerTeam1Link}
          PlayerTeam2Link={item.PlayerTeam2Link}
          playerTeam2={item.playerTeam2}
          playerStatus1={item.playerStatus1}
          playerStatus2={item.playerStatus2}
          player1JurseyNumber={item.player1JurseyNumber}
          player2JurseyNumber={item.player2JurseyNumber}
          index={item.key}
          date={item.date}
          time={item.time}
        />
      </View>
    );
  };

  async componentWillMount() {
    await this._getPlayers();

    this.setState({ process: false });
  }

  async _getPlayers() {
    var slidessEG = [];
    var today = moment().format('YYYY-MM-DD');
    todayDate = moment().format('MMM DD, YYYY');
    var DSTTodayDate = moment().format(today);
    var res = await this.service.getGamesOnDate(today);
    if (res.data && res.data.dates && res.data.dates.length > 0) {
      var todayGames = res.data.dates[0];
      var totalGames = todayGames.games;

      var promisesEG = totalGames.map(async (element, index) =>
        this._delayedData(element, index, slidessEG),
      );
      await Promise.all(promisesEG);
    }
    slidessEG.sort(function (a, b) {
      return a.key - b.key;
    });

    if (slidessEG.length > 0) this.setState({ slidessEG, slider: true });
    else this.setState({ slider: false });
  }

  _delayedData = async (element, index, slidessEG) => {
    var teams = element.teams;
    var team1Name = teams.away.team.name;
    var team2Name = teams.home.team.name;

    var date = element.gameDate;

    this.setState({ loading_percent: '10%' });
    var team1Label = this.appService.getTeamLabel(team1Name);
    var team2Label = this.appService.getTeamLabel(team2Name);

    var team1Code = this.appService.getTeamCode(team1Name);
    var team2Code = this.appService.getTeamCode(team2Name);
    this.setState({ loading_percent: '20%' });

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

    var playerdata1 = await this.getTeamPlayerName(team1);
    this.setState({ loading_percent: '30%' });
    var playerdata2 = await this.getTeamPlayerName(team2);
    this.setState({ loading_percent: '50%' });

    if (playerdata1 != undefined) {
      var player1_detail = await this.getPlayerJursey(
        team1Code,
        playerdata1.name,
      );
      this.setState({ loading_percent: '70%' });
      var player2_detail = await this.getPlayerJursey(
        team2Code,
        playerdata2.name,
      );
      this.setState({ loading_percent: '80%' });
      var player1JurseyNumber = player1_detail.jerseyNumber;
      var player1link = player1_detail.link;

      var player2JurseyNumber = player2_detail.jerseyNumber;
      var player2link = player2_detail.link;

      var sliderData = {
        key: Number(index),
        date: todayDate,
        team1Name: team1Name,
        team2Name: team2Name,
        team1Label: team1Label,
        team2Label: team2Label,
        playerTeam1: playerdata1.name,
        PlayerTeam1Link: player1link,
        PlayerTeam2Link: player2link,
        playerTeam2: playerdata2.name,
        playerStatus1: playerdata1.status
          ? playerdata1.status
          : 'Not Confirmed',
        playerStatus2: playerdata2.status
          ? playerdata2.status
          : 'Not Confirmed',
        player1JurseyNumber: player1JurseyNumber ? player1JurseyNumber : 0,
        player2JurseyNumber: player2JurseyNumber ? player2JurseyNumber : 0,
        time: moment.utc(date).utcOffset('-0500').format('h:mm A') + ' ET',
      };
      slidessEG.push(sliderData);
    }
    // Tab Expected Goalies
    this.props.goaliesDispatch({
      type: 'SET_GOALIES_DATA',
      payload: slidessEG,
    });
  };

  async getTeamPlayerName(team) {
    // return { status: "Not Confirmed", name: "Ben Bishop" }
    var res = await this.service.getGameDetails(team);
    if (res.data && res.data.status) {
      var data = res.data.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].position == 'G1') {
          return { status: data[i].strength, name: data[i].player };
        }
      }
    }
  }

  async getPlayerJursey(teamCode, name) {
    var detail = {
      jerseyNumber: 0,
      link: '',
    };

    var res = await this.service.getTeamPlayers(teamCode);

    if (res != undefined && res.data != undefined) {
      var roster = res.data.roster;
      for (var i = 0; i < roster.length; i++) {
        if (roster[i].person.fullName == name) {
          detail = {
            jerseyNumber: roster[i].jerseyNumber,
            link: roster[i].person.link,
          };
        }
      }
    }
    return detail;
  }

  render() {
    return (
      <View
        style={[styles.tabScene, { backgroundColor: '#fff0', height: 350 }]}>
        {this.state.process ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20%',
              height: 240,
            }}>
            <Text style={styles.yellowButtonSmallText}>
              {this.state.loading_percent}
            </Text>
            <ActivityIndicator size="large" color="#2233aa" />
          </View>
        ) : (
          <View
            style={this.state.slider ? { height: 350 } : { height: '100%' }}>
            {this.state.slider ? (
              <AppIntroSlider
                ref={(ref) => (this._slider = ref)}
                data={this.state.slidessEG}
                renderItem={this._renderItem}
                showDoneButton={false}
                showNextButton={false}
                activeDotStyle={[styles.activeDotStyle, { marginTop: 50 }]}
                dotStyle={[styles.dotStyle, { marginTop: 50 }]}
                style={{ height: 210 }}
              />
            ) : (
              <NoGame />
            )}
          </View>
        )}
        {/* <View style={{ marginTop: 20}}>
                    <FavoriteOptions />
                </View> */}
      </View>
    );
  }
}

function TabExpectedGoalies(props) {
  const goaliesDispatch = useGoaliesDataDispatch();
  return <TabExpectedGoaliesIndex goaliesDispatch={goaliesDispatch} />;
}

export default TabExpectedGoalies;
