import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import InfoImage from '../assets/img/info.png';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppIntroSlider from 'react-native-app-intro-slider';

class SliderGoalies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todayPlayersSelected: true,
      popupVisibiliy: false,
    };

    this._getItem = this._getItem.bind(this);
  }

  _getItem(item) {
    var names = item.name.split(' ');
    if (names[1]) var splitname = names[0].charAt(0) + '. ' + names[1];
    else if (names[0]) var splitname = names[0];
    else var splitname = '';
    return (
      <View>
        <TouchableOpacity
          style={{
            marginTop: 4,
            zIndex: 1,
            elevation: 3,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => Actions.PlayerStats({ item })}>
          <Text
            adjustsFontSizeToFit
            style={[
              styles.transparentButtonText,
              { color: '#404040', lineHeight: 15 },
            ]}>
            {splitname}{' '}
          </Text>
          <Text
            style={[
              styles.transparentButtonText,
              { color: '#8AABFF', lineHeight: 15 },
            ]}>
            {item.name ? '(' + item.value + ')' : ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _getPercentage(item) {
    var names = item.name.split(' ');
    if (names[1]) var splitname = names[0].charAt(0) + '. ' + names[1];
    else if (names[0]) var splitname = names[0];
    else var splitname = '';
    return (
      <View>
        <TouchableOpacity
          style={[styles.containerRowCenter, { marginTop: 5 }]}
          onPress={() => Actions.PlayerStats({ item })}>
          <Text
            adjustsFontSizeToFit
            style={[
              styles.transparentButtonText,
              { fontSize: wp('3%'), color: '#404040', lineHeight: 15 },
            ]}>
            {splitname}{' '}
          </Text>
          <Text
            style={[
              styles.transparentButtonText,
              { fontSize: wp('3%'), color: '#8AABFF', lineHeight: 15 },
            ]}>
            {item.name ? '(' + item.value + ')' : ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  selectPlayersTab = (flag) => {
    this.setState({ todayPlayersSelected: flag });
    this._slider.goToSlide(flag ? 0 : 1, true);
  };

  handleOnSlideChange = (e) => {
    this.setState({ todayPlayersSelected: e === 0 });
  };

  _renderItem = ({ item }) => {
    var todaysGoalies = this.props.todaysGoalies;
    var todaysPlayers = this.props.todaysPlayers;

    var Wins = todaysGoalies.Wins;
    var GAA = todaysGoalies.GAA;
    var SV = todaysGoalies.SV;

    var Goals = todaysPlayers.Goals;
    var Against = todaysPlayers.Assests;
    var Shots = todaysPlayers.Shots;

    return (
      <View
        style={[
          styles.containerRow,
          { marginVertical: 20, marginHorizontal: 20 },
        ]}>
        <View
          style={{
            width: '33%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.sliderDayAndTime,
              { color: '#40404088', marginBottom: 0 },
            ]}>
            {!this.state.todayPlayersSelected ? 'Wins' : 'Goals'}
          </Text>
          <View style={{ height: 'auto' }}>
            <FlatList
              keyExtractor={(item) => item.toString()}
              data={!this.state.todayPlayersSelected ? Wins : Goals}
              renderItem={({ item }) => this._getItem(item)}
              numColumns={1}
            />
          </View>
        </View>
        <View
          style={{
            width: '33%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.sliderDayAndTime,
              { color: '#40404088', marginBottom: 0 },
            ]}>
            {!this.state.todayPlayersSelected ? 'GAA' : 'Assists'}
          </Text>
          <View style={{ height: 'auto' }}>
            <FlatList
              keyExtractor={(item) => item.toString()}
              data={!this.state.todayPlayersSelected ? GAA : Against}
              renderItem={({ item }) => this._getItem(item)}
              numColumns={1}
            />
          </View>
        </View>
        <View
          style={{
            width: '33%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.sliderDayAndTime,
              { color: '#40404088', marginBottom: 0 },
            ]}>
            {!this.state.todayPlayersSelected ? 'Save %' : 'Shots'}
          </Text>
          <View style={{ height: 'auto' }}>
            <FlatList
              keyExtractor={(item) => item.toString()}
              data={!this.state.todayPlayersSelected ? SV : Shots}
              renderItem={({ item }) => this._getItem(item)}
              numColumns={1}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.containerColumn, { backgroundColor: '#F8F8F8' }]}>
        <View style={[styles.DailyWatchTitleBar, { paddingTop: 0 }]}>
          <View
            style={[
              styles.containerRow,
              { marginTop: 0, paddingLeft: 5, height: 'auto' },
            ]}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.selectPlayersTab(true)}
                style={[
                  {
                    height: 30,
                    padding: 2,
                    marginTop: 2,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 7,
                    flex: 1,
                  },
                  this.state.todayPlayersSelected
                    ? { backgroundColor: '#8aabff' }
                    : { backgroundColor: '#EDF2FF' },
                ]}>
                <Text
                  style={[
                    styles.transparentButtonText,
                    this.state.todayPlayersSelected
                      ? { color: '#182955' }
                      : { color: '#152959' },
                  ]}>
                  Today's Players
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.selectPlayersTab(false)}
                style={[
                  {
                    height: 30,
                    padding: 2,
                    marginTop: 2,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 7,
                    flex: 1,
                  },
                  !this.state.todayPlayersSelected
                    ? { backgroundColor: '#8aabff' }
                    : { backgroundColor: '#EDF2FF' },
                ]}>
                <Text
                  style={[
                    styles.transparentButtonText,
                    ,
                    !this.state.todayPlayersSelected
                      ? { color: '#182955' }
                      : { color: '#152959' },
                  ]}>
                  Today’s Goalies
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <AppIntroSlider
          ref={(ref) => (this._slider = ref)}
          data={[1, 2]}
          renderItem={this._renderItem}
          showDoneButton={false}
          showNextButton={false}
          activeDotStyle={[styles.activeDotStyle, { marginTop: 50 }]}
          dotStyle={[styles.dotStyle, { marginTop: 50 }]}
          onSlideChange={this.handleOnSlideChange}
          style={{ height: 'auto', top: 10 }}
        />
      </View>
    );
  }
}

export default SliderGoalies;
