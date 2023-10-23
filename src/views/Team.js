import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styles from "../assets/css/styles";
import ForwardsImage from "../assets/img/Forwards.png";
import PPUnitImage from "../assets/img/ppUnit.png";
import PPUnitImage2 from "../assets/img/ppUnit2.png";
import InjuriesImage from "../assets/img/injuries.png";
import DefensemanImage from "../assets/img/Defenseman.png";
import ExpectedGoaliesImage from "../assets/img/ExpectedGoalies.png";
import { Actions } from "react-native-router-flux";
import { TabView, SceneMap } from "react-native-tab-view";
import NavBarSecondary from "../components/NavBarSecondary";
import T_TabForwards from "./T_TabForwards";
import T_TabDeffensive from "./T_TabDeffensive";
import T_TabGoalies from "./T_TabGoalies";
import T_Tab1stPP from "./T_Tab1stPP";
import T_Tab2ndPP from "./T_Tab2ndPP";
import T_TabInjuries from "./T_TabInjuries";
import dressImages from "../Services/DressImages";
import Service from "../Services/Service";
import AppService from "../Services/AppServices";
import TeamLineups from "./TeamLineups";

class Team extends React.Component {
  constructor(prpos) {
    super(prpos);

    this.state = {
      refreshing: false,
      process: true,
      index: 0,
      routes: [
        { key: "first", title: "Forwards", image: ForwardsImage },
        { key: "second", title: "Defense", image: DefensemanImage },
        { key: "third", title: "1st PP", image: PPUnitImage },
        { key: "fourth", title: "2nd PP", image: PPUnitImage2 },
        { key: "fifth", title: "Goalies", image: ExpectedGoaliesImage },
        { key: "sixth", title: "Injuries", image: InjuriesImage },
      ],
      ForwardsGridViewItems: [],
      DeffensiveGridViewItems: [],
      PP_1st_GridViewItems1: [],
      PP_1st_GridViewItems2: [],
      PP_2nd_GridViewItems1: [],
      PP_2nd_GridViewItems2: [],
      GaoliesGridViewItems: [],
      InjuriesGridViewItems: [],
    };

    this.service = new Service();
    this.appService = new AppService();
  }

  async componentWillMount() {
    this.setState({ process: true });
    var teamName = this.props.teamName;
    var teamTag = teamName.replace(/\. /g, " ");
    var teamTag = teamTag.toLowerCase().replace(/ /g, "-");
    var res = await this.service.getTeamsLineUpLocal(teamTag);

    var teamCode = this.appService.getTeamCode(teamName);

    var teamLabel = this.appService.getTeamLabel(teamName);

    var res2 = await this.service.getTeamPlayers(teamCode);

    var ForwardsGridViewItems = [];
    var DeffensiveGridViewItems = [];
    var PP_1st_GridViewItems1 = [];
    var PP_2nd_GridViewItems1 = [];
    var PP_1st_GridViewItems2 = [];
    var PP_2nd_GridViewItems2 = [];
    var GaoliesGridViewItems = [];
    var InjuriesGridViewItems = [];

    if (
      res != null &&
      res.data != null &&
      res.data.data &&
      res2 != null &&
      res2.data != null &&
      res2.data.roster
    ) {
      var data = res.data.data;

      var roster = res2.data.roster;
      data.forEach((element, index) => {
        var p = this.getPlayerLink(roster, element.player);

        var player = {
          key: index,
          name: element.player,
          image: dressImages[teamLabel],
          number: p.number,
          playerLink: p.playerLink,
          injury_date: element.injury_date,
          injury_detail: element.injury_details,
        };

        if (index < 12 && element.team_position == "forwards") {
          ForwardsGridViewItems.push(player);
        } else if (index < 18 && element.team_position == "defense") {
          DeffensiveGridViewItems.push(player);
        } else if (
          index < 21 &&
          element.team_position == "powerplay_1_forwards"
        ) {
          PP_1st_GridViewItems1.push(player);
        } else if (
          index < 23 &&
          element.team_position == "powerplay_1_defense"
        ) {
          PP_1st_GridViewItems2.push(player);
        } else if (
          index < 26 &&
          element.team_position == "powerplay_1_forwards"
        ) {
          PP_2nd_GridViewItems1.push(player);
        } else if (
          index < 28 &&
          element.team_position == "powerplay_1_defense"
        ) {
          PP_2nd_GridViewItems2.push(player);
        } else if (index < 30 && element.team_position == "goalie_list") {
          GaoliesGridViewItems.push(player);
        } else if (element.team_position == "injuries") {
          InjuriesGridViewItems.push(player);
        }
      });
    }
    this.setState({
      ForwardsGridViewItems,
      DeffensiveGridViewItems,
      PP_1st_GridViewItems1,
      PP_2nd_GridViewItems1,
      PP_1st_GridViewItems2,
      PP_2nd_GridViewItems2,
      GaoliesGridViewItems,
      InjuriesGridViewItems,
    });
    this.setState({ process: false });
  }

  getPlayerLink = (roster, playername) => {
    var player = { number: 0, playerLink: "" };
    for (var i = 0; i < roster.length; i++) {
      if (playername.toLowerCase() == roster[i].person.fullName.toLowerCase()) {
        player = {
          number: roster[i].jerseyNumber,
          playerLink: roster[i].person.link,
        };

        break;
      }
    }
    return player;
  };

  bannerError = (e) => {
    //////
  };
  onRefresh = () => {
    Actions.refresh();
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
                  {
                    borderBottomColor: "#8AABFF",
                    borderBottomWidth: 2,
                    paddingHorizontal: 0,
                    width: "17%",
                  },
                ]}
                onPress={() => this.setState({ index: i })}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 30,
                  }}
                >
                  <Image source={route.image} resizeMode="contain" />
                </View>
                <Text
                  style={[
                    styles.sliderTeamPlayerStatus,
                    { color: "#404040", fontSize: 10 },
                  ]}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabStyle,
                  { paddingHorizontal: 0 },
                  { width: "17%" },
                ]}
                onPress={() => this.setState({ index: i })}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 30,
                  }}
                >
                  <Image source={route.image} resizeMode="contain" />
                </View>
                <View style={{ bottom: 0 }}>
                  <Text
                    style={[
                      styles.sliderTeamPlayerStatus,
                      { color: "#18295544", fontSize: 10 },
                    ]}
                  >
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
      <View>
        <ScrollView
          style={{ height: "100%", backgroundColor: "#F8F8F8" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              title={"Refreshing"}
              titleColor={"#182955"}
              tintColor={"#182955"}
            />
          }
        >
          <NavBarSecondary title={this.props.teamName + " Lineups"} search />
          <View
            style={{
              backgroundColor: "#F8F8F8",
              flex: 1,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: () => (
                  <T_TabForwards
                    GridViewItems={this.state.ForwardsGridViewItems}
                  />
                ),
                second: () => (
                  <T_TabDeffensive
                    GridViewItems={this.state.DeffensiveGridViewItems}
                  />
                ),
                third: () => (
                  <T_Tab1stPP
                    GridViewItems1={this.state.PP_1st_GridViewItems1}
                    GridViewItems2={this.state.PP_1st_GridViewItems2}
                  />
                ),
                fourth: () => (
                  <T_Tab2ndPP
                    GridViewItems1={this.state.PP_2nd_GridViewItems1}
                    GridViewItems2={this.state.PP_2nd_GridViewItems2}
                  />
                ),
                fifth: () => (
                  <T_TabGoalies
                    GridViewItems={this.state.GaoliesGridViewItems}
                  />
                ),
                sixth: () => (
                  <T_TabInjuries
                    GridViewItems={this.state.InjuriesGridViewItems}
                  />
                ),
              })}
              onIndexChange={(index) => this.setState({ index })}
              initialLayout={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
              }}
              renderTabBar={this._renderTabBar}
            />
          </View>
        </ScrollView>
        {this.state.process == true && (
          <View
            style={{
              position: "absolute",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" color="#2233aa" />
          </View>
        )}
      </View>
    );
  }
}

export default Team;
