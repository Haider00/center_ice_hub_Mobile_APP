import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from '../assets/css/styles';
import ForwardsImage from '../assets/img/Forwards.png';
import PPUnitImage from '../assets/img/ppUnit.png';
import InjuriesImage from '../assets/img/injuries.png';
import DefensemanImage from '../assets/img/Defenseman.png';
import ExpectedGoaliesImage from '../assets/img/ExpectedGoalies.png';

import { TabView, SceneMap } from 'react-native-tab-view';
import NavBarSecondary from '../components/NavBarSecondary';
import TabAnaheimDucks from './TabAnaheimDucks';
import TabAnaheimDucksInjuries from './TabAnaheimDucksInjuries';

const FirstRoute = () => <TabAnaheimDucks />;

const SecondRoute = () => <TabAnaheimDucks />;

const ThirdRoute = () => <TabAnaheimDucks />;

const FourthRoute = () => <TabAnaheimDucks />;

const FifthRoute = () => <TabAnaheimDucks />;

const SixthRoute = () => <TabAnaheimDucksInjuries />;

class AnaheimDucks extends React.Component {
  constructor(prpos) {
    super(prpos);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Forwards', image: ForwardsImage },
        { key: 'second', title: 'Defenseman', image: DefensemanImage },
        { key: 'third', title: '1st PP Unit', image: PPUnitImage },
        { key: 'fourth', title: '2nd PP Unit', image: PPUnitImage },
        { key: 'fifth', title: 'Goalies', image: ExpectedGoaliesImage },
        { key: 'sixth', title: 'Injuries', image: InjuriesImage },
      ],
    };
  }

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
                  {
                    borderBottomColor: '#8AABFF',
                    borderBottomWidth: 2,
                    width: '16.6%',
                  },
                ]}
                onPress={() => this.setState({ index: i })}>
                <View style={{ alignItems: 'center', padding: 5 }}>
                  <Image source={route.image} />
                </View>
                <Text
                  style={[
                    styles.sliderTeamPlayerStatus,
                    { color: '#404040', fontSize: 9 },
                  ]}>
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.tabStyle, { width: '16.6%' }]}
                onPress={() => this.setState({ index: i })}>
                <View style={{ alignItems: 'center', padding: 5 }}>
                  <Image source={route.image} />
                </View>
                <View style={{ bottom: 0 }}>
                  <Text
                    style={[
                      styles.sliderTeamPlayerStatus,
                      { color: '#18295544', fontSize: 9 },
                    ]}>
                    {route.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
        <NavBarSecondary title="Anaheim Ducks" search />
        <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
              third: ThirdRoute,
              fourth: FourthRoute,
              fifth: FifthRoute,
              sixth: SixthRoute,
            })}
            onIndexChange={(index) => this.setState({ index })}
            initialLayout={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            renderTabBar={this._renderTabBar}
          />
        </View>
      </ScrollView>
    );
  }
}

export default AnaheimDucks;
