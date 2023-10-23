import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';
import DressARIImage from '../assets/img/dressARI.png';
import InfoImage from '../assets/img/info.png';

class T_TabDeffensive extends React.PureComponent {
  _takeAction = (item) => {
    if (item.playerLink != '') Actions.PlayerStats({ item });
    else
      alert(
        "Sorry but it looks 12like we can't pull this player's stats at this time. Please try again later.",
      );
  };

  _getFavoriteOption(item) {
    return (
      <View
        key={item.key}
        style={[
          styles.tabfavoriteOptionCard,
          {
            backgroundColor: 'transparent',
            marginVertical: 0,
            paddingHorizontal: 0,
          },
        ]}>
        <TouchableOpacity onPress={() => this._takeAction(item)}>
          <View style={styles.sliderColumnContainer}>
            <Image source={item.image} />
            <View style={styles.sliderCirlceTextContainer}>
              <Text style={styles.sliderDressNumText}>{item.number}</Text>
            </View>
          </View>
          <Text
            style={[
              styles.FavoriteOptionTitle,
              { color: '#404040', fontSize: 13 },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.tabScene,
          { height: '100%', flex: 1, marginVertical: 30, marginHorizontal: 10 },
        ]}>
        {this.props.GridViewItems.length > 0 && (
          <View>
            <View style={[styles.containerRowCenter]}>
              <View style={{ alignItems: 'center', width: '40%' }}>
                <Text
                  style={[
                    styles.checkboxDes,
                    { textAlign: 'center', color: '#40404088' },
                  ]}>
                  LD
                </Text>
              </View>
              <View style={{ alignItems: 'center', width: '40%' }}>
                <Text
                  style={[
                    styles.checkboxDes,
                    { textAlign: 'center', color: '#40404088' },
                  ]}>
                  RD
                </Text>
              </View>
            </View>
            <View style={{ width: '80%', marginHorizontal: '10%' }}>
              <FlatList
                style={{}}
                data={this.props.GridViewItems}
                renderItem={({ item }) => this._getFavoriteOption(item)}
                numColumns={2}
              />
            </View>

            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 25, marginTop: 10 },
              ]}>
              <Text
                style={[
                  styles.grayTextSmall,
                  { marginLeft: 5, backgroundColor: '#EDF2FF', padding: 6 },
                ]}>
                Click on a player to view their stats3.
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default T_TabDeffensive;
