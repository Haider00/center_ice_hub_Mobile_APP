import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import styles from '../assets/css/styles';
import yelloCircleImage from '../assets/img/yelloCircle.png';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import images from '../Services/Images';
import dressImages from '../Services/DressImages';
import Service from '../Services/Service';
import AppService from '../Services/AppServices';

class ExpectedGoaliesSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ExpectedGoaliesSliderInfo: null,
      loading: false,
    };
    this.service = new Service();
    this.appService = new AppService();
  }
  _takeAction = (link) => {
    var item = { playerLink: link };

    if (item.playerLink !== '') {
      Actions.PlayerStats({ item });
    } else {
      Alert.alert(
        "Sorry but it looks like we can't pull this player's stats at this time. Please try again later.",
      );
    }
  };

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

  getOtherAllDetails = async () => {
    this.setState({ loading: true });
    const { playerTeam1, team1Name, team2Name, playerTeam2 } = this.props;
    console.log('++++++++++++++===');
    var otherData1 = await this._getOtherDeatails(
      team1Name,
      playerTeam1,
      team2Name,
    );
    var otherData2 = await this._getOtherDeatails(
      team2Name,
      playerTeam2,
      team1Name,
    );
    console.log('otherData1...', otherData1);
    const ExpectedGoaliesSliderInfo = {
      careerRecord1: otherData1.careerRecord,
      seasonRecord1: otherData1.seasonRecord,
      teamRecord1: otherData1.teamRecord,
      //startsRecord1: otherData1.startsRecord,
      goalAgainstAverageCareer1: otherData1.goalAgainstAverageCareer,
      savePercentageCareer1: otherData1.savePercentageCareer,
      goalAgainstAverage1: otherData1.goalAgainstAverage,
      savePercentage1: otherData1.savePercentage,
      careerRecord2: otherData2.careerRecord,
      seasonRecord2: otherData2.seasonRecord,
      teamRecord2: otherData2.teamRecord,
      //startsRecord2: otherData2.startsRecord,
      goalAgainstAverageCareer2: otherData2.goalAgainstAverageCareer,
      savePercentageCareer2: otherData2.savePercentageCareer,
      goalAgainstAverage2: otherData2.goalAgainstAverage,
      savePercentage2: otherData2.savePercentage,
    };
    this.setState({ ExpectedGoaliesSliderInfo, loading: false });
  };

  render() {
    const { ExpectedGoaliesSliderInfo } = this.state;
    return (
      <LinearGradient
        style={[
          styles.sliderTabView,
          { paddingHorizontal: 0, marginBottom: 40 },
        ]}
        colors={['#182955', '#0F1633']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: -1.0, y: 0.0 }}
        locations={[0.42, 1]}>
        <ScrollView>
          <View
            style={
              (styles.containerColumn,
              { backgroundColor: '#182955', borderRadius: 8 })
            }>
            <View
              style={[
                styles.containerRow,
                { marginHorizontal: 10, marginVertical: 10 },
              ]}>
              <TouchableOpacity
                style={{ width: '35%' }}
                onPress={() =>
                  Actions.Team({ teamName: this.props.team1Name })
                }>
                <View style={styles.sliderColumnContainer}>
                  <Image source={images[this.props.team1Label]} />
                  <View style={[styles.sliderCirlceTextContainer, { top: 7 }]}>
                    <Text style={styles.sliderCirlceText}>
                      {this.props.team1Label}
                    </Text>
                  </View>
                </View>
                <Text style={styles.sliderCirlceTeamName}>
                  {this.props.team1Name}
                </Text>
              </TouchableOpacity>

              <View
                style={[
                  styles.sliderColumnContainer,
                  { justifyContent: 'center', alignItems: 'center' },
                ]}>
                <Text style={styles.sliderDayAndTime}>{this.props.time}</Text>
              </View>

              <TouchableOpacity
                style={{ width: '35%' }}
                onPress={() =>
                  Actions.Team({ teamName: this.props.team2Name })
                }>
                <View style={styles.sliderColumnContainer}>
                  <Image source={images[this.props.team2Label]} />
                  <View style={[styles.sliderCirlceTextContainer, { top: 7 }]}>
                    <Text style={styles.sliderCirlceText}>
                      {this.props.team2Label}
                    </Text>
                  </View>
                </View>
                <Text style={styles.sliderCirlceTeamName}>
                  {this.props.team2Name}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderBottomColor: '#ffffff33',
                  borderBottomWidth: 1,
                  paddingBottom: 1,
                  width: '100%',
                  position: 'absolute',
                }}
              />
              <Image source={yelloCircleImage} />
              <View
                style={[styles.sliderCirlceTextContainer, { marginTop: 6 }]}>
                <Text style={[styles.greyTextSmall, { color: '#182955' }]}>
                  VS
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.containerRow,
                { marginHorizontal: 10, marginTop: 10 },
              ]}>
              <TouchableOpacity
                style={{ width: '35%' }}
                onPress={() => this._takeAction(this.props.PlayerTeam1Link)}>
                <View style={[styles.sliderColumnContainer]}>
                  <Image source={dressImages[this.props.team1Label]} />
                  <View style={[styles.sliderCirlceTextContainer]}>
                    <Text style={styles.sliderDressNumText}>
                      {this.props.player1JurseyNumber}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.sliderTeamPlayer, { marginTop: 4 }]}>
                  {this.props.playerTeam1}
                </Text>
                <Text
                  style={[
                    styles.sliderTeamPlayerStatus,
                    { marginTop: 1, opacity: 0 },
                  ]}>
                  {this.props.playerStatus1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '35%' }}
                onPress={() => this._takeAction(this.props.PlayerTeam2Link)}>
                <View style={[styles.sliderColumnContainer, { maxHeight: 40 }]}>
                  <Image source={dressImages[this.props.team2Label]} />
                  <View style={styles.sliderCirlceTextContainer}>
                    <Text style={styles.sliderDressNumText}>
                      {this.props.player2JurseyNumber}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.sliderTeamPlayer, { marginTop: 4 }]}>
                  {this.props.playerTeam2}
                </Text>
                <Text
                  style={[
                    styles.sliderTeamPlayerStatus,
                    { marginTop: 1, opacity: 0 },
                  ]}>
                  {this.props.playerStatus2}
                </Text>
              </TouchableOpacity>
            </View>

            {ExpectedGoaliesSliderInfo ? (
              <View>
                <View style={[styles.containerRowCenter]}>
                  <View style={{ width: '33%', marginTop: 0, marginBottom: 5 }}>
                    <TouchableOpacity
                      style={[
                        styles.yellowButtonSmall,
                        {
                          backgroundColor: '#8aabff',
                          borderWidth: 0,
                          height: 20,
                        },
                      ]}
                      onPress={this.moveToCreatePassword}>
                      <Text
                        style={[
                          styles.sliderTeamPlayerStatus,
                          {
                            color: '#FFFFFF',
                            fontWeight: '500',
                            marginTop: 0,
                            paddingHorizontal: 5,
                          },
                        ]}>
                        GOALIES STATS
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.containerRow, styles.leftRowSubContainer]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.careerRecord1[0] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.careerRecord1[1] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.careerRecord1[2]}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      Career
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.careerRecord2[0] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.careerRecord2[1] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.careerRecord2[2]}
                    </Text>
                  </View>
                </View>
                <View style={[styles.containerRow, styles.leftRowSubContainer]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.seasonRecord1[0] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.seasonRecord1[1] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.seasonRecord1[2]}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      Current Season
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.seasonRecord2[0] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.seasonRecord2[1] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.seasonRecord2[2]}
                    </Text>
                  </View>
                </View>

                <View style={[styles.containerRow, styles.leftRowSubContainer]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.teamRecord1[0] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.teamRecord1[1] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.teamRecord1[2]}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      Vs Team
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.teamRecord2[0] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.teamRecord2[1] +
                        ' - ' +
                        ExpectedGoaliesSliderInfo.teamRecord2[2]}
                    </Text>
                  </View>
                </View>
                <View style={[styles.containerRow, styles.leftRowSubContainer]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {parseFloat(
                        ExpectedGoaliesSliderInfo.goalAgainstAverageCareer1,
                      ).toFixed(1)}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      Career GAA
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {parseFloat(
                        ExpectedGoaliesSliderInfo.goalAgainstAverageCareer2,
                      ).toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={[styles.containerRow, styles.leftRowSubContainer]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {parseFloat(
                        ExpectedGoaliesSliderInfo.goalAgainstAverage1,
                      ).toFixed(1)}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      {' '}
                      Season GAA
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {parseFloat(
                        ExpectedGoaliesSliderInfo.goalAgainstAverage2,
                      ).toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={[styles.containerRow, styles.leftRowSubContainer]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.savePercentageCareer1}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      Career Save %
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.savePercentageCareer2}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.containerRow,
                    { paddingVertical: 10, height: 50, paddingBottom: 0 },
                  ]}>
                  <View
                    style={[
                      styles.containerRow,
                      { marginHorizontal: 10, marginTop: 0 },
                    ]}>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.savePercentage1}
                    </Text>
                    <Text
                      style={[styles.transparentButtonText, styles.blueLabel]}>
                      Season Save %
                    </Text>
                    <Text style={[styles.selectedTabText, styles.infoLabel]}>
                      {ExpectedGoaliesSliderInfo.savePercentage2}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#2233aa" />
                ) : (
                  <View style={[styles.containerRowCenter]}>
                    <TouchableOpacity
                      style={styles.loadGoaliesButton}
                      onPress={this.getOtherAllDetails}>
                      <Text style={styles.loadGoaliesLabel}>
                        LOAD GOALIES STATS
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default ExpectedGoaliesSlider;
