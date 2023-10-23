import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import { TabView } from 'react-native-tab-view';
import TabExpectedGoalies from './TabExpectedGoalies';
import TabDailyWatch from './TabDailyWatch';
import FavoriteOptions from './FavoriteOptions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

class Home extends React.Component {
  constructor(prpos) {
    super(prpos);

    this.state = {
      refreshing: false,
      index: 0,
      routes: [
        { key: 'first', title: 'Primary Goalies' },
        { key: 'second', title: 'Daily Hot Watch' },
      ],
      popupVisibiliy: false,
      ppopupVisibiliy: false,
    };
  }

  opengolipopup = () => {
    this.setState({ popupVisibiliy: true });
  };
  openplayerpopup = () => {
    this.setState({ ppopupVisibiliy: true });
  };

  closepopup = () => {
    this.setState({ popupVisibiliy: false, ppopupVisibiliy: false });
  };

  _renderTabBar = (props) => {
    return (
      <View
        style={[
          styles.tabBar,
          { justifyContent: 'center', alignItems: 'center' },
        ]}>
        {props.navigationState.routes.map((route, i) => {
          if (i === props.navigationState.index) {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
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
                activeOpacity={1}
                style={[
                  styles.tabStyle,
                  { borderBottomColor: '#EDF2FF', borderBottomWidth: 2 },
                ]}
                onPress={() => this.setState({ index: i })}>
                <Text style={styles.unselectedTabText}>{route.title}</Text>
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
  onRefresh = () => {
    Actions.refresh();
  };
  render() {
    return (
      <View style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              title={'Refreshing'}
              titleColor={'#182955'}
              tintColor={'#182955'}
            />
          }>
          <View style={[styles.body, { backgroundColor: '#F8F8F8' }]}>
            {/* <ImageBackground source={BackgroundImage} style={styles.backgroundImage}> */}
            {/* <View style={[styles.goalsStatics, { alignContent: "center" }]}>
                                <View style={[styles.yellowLabelContainer, { height: 20, marginTop: 4 }]}>
                                    <Text style={styles.yellowLabelText}>GOALS</Text>
                                </View>
                                <ScrollView horizontal={true} style={{ marginHorizontal: 5, marginVertical: 3 }}>
                                    <Text style={styles.goalsStaticsPlayerName}>A. Mattews <Text style={{ color: "#8AABFF" }}>(10)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>P. Smith <Text style={{ color: "#8AABFF" }}>(9)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>D. Carrey <Text style={{ color: "#8AABFF" }}>(9)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>S. Alex <Text style={{ color: "#8AABFF" }}>(8)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>A. Mattews <Text style={{ color: "#8AABFF" }}>(10)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>P. Smith <Text style={{ color: "#8AABFF" }}>(9)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>D. Carrey <Text style={{ color: "#8AABFF" }}>(9)</Text></Text>
                                    <Text style={styles.goalsStaticsPlayerName}>S. Alex <Text style={{ color: "#8AABFF" }}>(8)</Text></Text>

                                </ScrollView>
                            </View> */}

            <View style={{ flex: 1, width: '100%', backgroundColor: '#fff0' }}>
              <TabView
                navigationState={this.state}
                renderScene={() => null}
                style={{ height: '100%', backgroundColor: '#fffff' }}
                onIndexChange={(index) => this.setState({ index })}
                initialLayout={{
                  width: Dimensions.get('window').width,
                  height: 0,
                }}
                renderTabBar={this._renderTabBar}
                swipeEnabled={false}
                // cacheEnabled={true}
                // cacheMode={"LOAD_CACHE_ONLY"}
              />

              <View
                style={
                  this.state.index === 0
                    ? styles.display_flex
                    : styles.display_none
                }>
                {<TabExpectedGoalies />}
              </View>
              <View
                style={
                  this.state.index === 1
                    ? styles.display_flex
                    : styles.display_none
                }>
                {
                  <TabDailyWatch />
                  // <TabDailyWatch popupgoli={this.opengolipopup} popupplayer={this.openplayerpopup} />
                }
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#F8F8F8',
                width: '100%',
                paddingBottom: 10,
                paddingTop: 20,
                marginTop: 0,
              }}>
              <FavoriteOptions />
            </View>
            {/* </ImageBackground> */}
          </View>
        </ScrollView>

        {(this.state.ppopupVisibiliy || this.state.popupVisibiliy) && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: '#ffffff99',
            }}
            onPress={() => {
              this.closepopup();
            }}>
            <View
              style={{
                zIndex: 99999,
                position: 'absolute',
                width: '100%',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  marginLeft: 112,
                  marginTop: 40,
                  backgroundColor: '#182955',
                  width: 200,
                  flex: 1,
                  borderRadius: 5,
                }}>
                <View style={styles.flex_row}>
                  <View style={styles.flexhalf}>
                    <FontAwesomeIcon
                      style={[
                        styles.txt_primary,
                        { marginTop: 8, marginLeft: -12, position: 'absolute' },
                      ]}
                      icon={faCaretLeft}
                      size={20}
                    />
                  </View>

                  {this.state.ppopupVisibiliy ? (
                    <Text
                      style={[
                        styles.flex8,
                        styles.txt,
                        styles.txt_white,
                        styles.p8,
                      ]}>
                      See which players are hot right now in the last 5 games
                      they have played.
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.flex8,
                        styles.txt,
                        styles.txt_white,
                        styles.p8,
                      ]}>
                      See which goalies are hot right now in the last 5 games
                      they have played.
                    </Text>
                  )}
                  <View style={[styles.flexhalf, { padding: 4 }]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.closepopup();
                      }}>
                      <FontAwesomeIcon
                        style={[
                          styles.txt_red,
                          styles.txt_secondary,
                          { alignSelf: 'flex-end' },
                        ]}
                        icon={faTimes}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Home;
