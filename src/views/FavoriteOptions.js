import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from '../assets/css/styles';
import LineUpImage from '../assets/img/Favourite/LineUp.png';
import FantasyTeamImage from '../assets/img/Favourite/FantasyTeam.png';
import ExpectedGoaliesImage from '../assets/img/Favourite/ExpectedGoalies.png';
import PlayerComparisonImage from '../assets/img/Favourite/PlayerComparison.png';
import { Actions } from 'react-native-router-flux';
import AppService from '../Services/AppServices';

class FavoriteOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      GridViewItems: [
        {
          key: 1,
          name1: 'Team',
          name2: 'Lineups',
          image: LineUpImage,
          action: 'TeamLineups',
        },
        {
          key: 2,
          name1: 'My Fantasy',
          name2: 'Team',
          image: FantasyTeamImage,
          action: 'MyFantasyTeam',
        },
        {
          key: 3,
          name1: 'Primary',
          name2: 'Goalies',
          image: ExpectedGoaliesImage,
          action: 'ExpectedGoalies',
        },
        // { key: 4, name1: "Player", name2: "Leaderboards", image: LeaderboardsImage, action: "PlayerLeaderboards" },
        {
          key: 5,
          name1: 'Player',
          name2: 'Comparisons',
          image: PlayerComparisonImage,
          action: 'PlayerComparison',
        },
        // { key: 6, name1: "Settings", name2: "", image: SettingsImage, action: "Setting" }
        //{ key: 7, name1: "Nhl Player", name2: "Pick'ems", image: Playerem, action: "CenterIcePlay" },
        //{ key: 8, name1: "", name2: "", image: "", action: "" },
      ],
    };

    this._getFavoriteOption = this._getFavoriteOption.bind(this);
    this.moveToItem = this.moveToItem.bind(this);
  }

  async isLogin() {
    var storage = new AppService();
    return await storage.isUserLogin();
  }

  async moveToItem(key) {
    if (key === 1) {
      Actions.TeamLineups();
    }
    if (key === 2) {
      // if (await this.isLogin())
      Actions.MyFantasyTeam();
      // else
      // Actions.Login({ fromScreen: "FavoriteOptions" })
    }
    if (key === 3) {
      Actions.ExpectedGoalies();
    }
    // if (key == 4)
    //     Actions.PlayerLeaderboards();
    if (key === 5) {
      Actions.PlayerComparison();
    }
    // if (key == 6)
    //     Actions.Setting();
    if (key === 7) {
      Actions.CenterIcePlay();
    }
  }

  _getFavoriteOption(item) {
    return (
      <TouchableOpacity
        style={[
          styles.favoriteOptionCard,
          item.key === 8
            ? styles.favoriteOptionCardShadowOdd
            : styles.favoriteOptionCardShadow,
        ]}
        activeOpacity={1}
        onPress={() => this.moveToItem(item.key)}>
        <View style={{ height: 38 }}>
          <Image source={item.image} resizeMode="center" />
        </View>
        <Text style={[styles.FavoriteOptionTitle]}>
          {item.name1 + '\n' + item.name2}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{ paddingBottom: 0 }}>
        <View style={{ width: '100%' }}>
          <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <FlatList
              style={{ paddingBottom: 20, width: '70%' }}
              data={this.state.GridViewItems}
              renderItem={({ item }) => this._getFavoriteOption(item)}
              numColumns={2}
            />
          </SafeAreaView>
        </View>
        {/* <View style={[styles.sliderColumnContainer, { marginVertical: "5%" }]}>
                    <Image source={AddImage} />
                    <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#8AABFF", marginVertical: 5 }]}>Add Favorites</Text>
                </View> */}
      </View>
    );
  }
}

export default FavoriteOptions;
