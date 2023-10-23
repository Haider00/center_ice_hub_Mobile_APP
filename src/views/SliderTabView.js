import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../assets/css/styles";
import yelloCircleImage from "../assets/img/yelloCircle.png";
import rightArrowImage from "../assets/img/rightArrow.png";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import images from "../Services/Images";
import dressImages from "../Services/DressImages";
import AppService from "../Services/AppServices";

class SliderTabView extends React.PureComponent {
  item = {
    image: 54,
    key: 11,
    name: "Carter Rowney",
    number: "24",
    playerLink: "/api/v1/people/8477240",
  };

  takeAction = async () => {
    var index = this.props.index;
    var appService = new AppService();
    appService.setIndex(index.toString());
    Actions.ExpectedGoalies();
  };

  _takeAction = (link) => {
    var item = { playerLink: link };
    if (item.playerLink != "") {
      Actions.PlayerStats({ item });
    } else
      alert(
        "Sorry but it looks like we can't pull this player's stats at this time. Please try again later."
      );
  };

  getplayershort = (item) => {
    const name = item.split(" ");
    const splitname = name[0].charAt(0) + ". " + name[1];
    return splitname;
  };

  _PlayerStats = (teamname) => {
    var teamTag = teamname.toLowerCase().replace(/ /g, "-");
    var res = this.service.getTeamsLineUpLocal(teamTag);
    var teamCode = this.appService.getTeamCode(teamname);
    var teamLabel = this.appService.getTeamLabel(teamname);
    var res2 = this.service.getTeamPlayers(teamCode);

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
        };
      });
    }
    {
      /* Actions.PlayerStats({ teamName: this.props.playerid1})} */
    }
  };

  render() {
    return (
      <View>
        <LinearGradient
          style={[
            styles.sliderTabView,
            {
              height: "95%",
              margin: "0%",
              paddingHorizontal: 5,
              paddingTop: 15,
              paddingBottom: 0,
              alignItems: "center",
            },
          ]}
          colors={["#182955", "#0F1633"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: -1.0, y: 0.0 }}
          locations={[0.42, 1]}
        >
          <View style={[styles.containerColumn, {}]}>
            <View style={[styles.containerRow, { marginHorizontal: 10 }]}>
              <TouchableOpacity
                style={{ width: "35%" }}
                onPress={() => Actions.Team({ teamName: this.props.team1Name })}
              >
                <View style={styles.sliderColumnContainer}>
                  <Image source={images[this.props.team1Label]} />
                  <View style={[styles.sliderCirlceTextContainer, { top: 7 }]}>
                    <Text style={[styles.sliderCirlceText]}>
                      {this.props.team1Label}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.sliderCirlceTeamName, { marginTop: 7 }]}>
                  {this.props.team1Name}
                </Text>
              </TouchableOpacity>

              <View
                style={[
                  styles.sliderColumnContainer,
                  { justifyContent: "flex-start", alignItems: "center" },
                ]}
              >
                <Text style={styles.sliderDayAndTime}>{this.props.date}</Text>
                <Text style={styles.sliderDayAndTime}>{this.props.time}</Text>
              </View>

              <TouchableOpacity
                style={{ width: "35%" }}
                onPress={() => Actions.Team({ teamName: this.props.team2Name })}
              >
                <View style={styles.sliderColumnContainer}>
                  <Image source={images[this.props.team2Label]} />
                  <View style={[styles.sliderCirlceTextContainer, { top: 7 }]}>
                    <Text style={[styles.sliderCirlceText]}>
                      {this.props.team2Label}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.sliderCirlceTeamName, { marginTop: 7 }]}>
                  {this.props.team2Name}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginVertical: 2,
              }}
            >
              <View
                style={{
                  borderBottomColor: "#ffffff33",
                  borderBottomWidth: 1,
                  width: "100%",
                  position: "absolute",
                }}
              />
              <Image source={yelloCircleImage} />
              <View
                style={[styles.sliderCirlceTextContainer, { marginTop: 6 }]}
              >
                <Text style={[styles.greyTextSmall, { color: "#182955" }]}>
                  VS
                </Text>
              </View>
            </View>

            <View style={[styles.containerRow, { marginHorizontal: 10 }]}>
              <TouchableOpacity
                style={{ width: "35%" }}
                onPress={() => this._takeAction(this.props.PlayerTeam1Link)}
              >
                <View style={styles.sliderColumnContainer}>
                  <Image source={dressImages[this.props.team1Label]} />
                  <View style={styles.sliderCirlceTextContainer}>
                    <Text style={[styles.sliderDressNumText]}>
                      {this.props.player1JurseyNumber}
                    </Text>
                  </View>
                </View>

                <Text style={styles.sliderTeamPlayer}>
                  {this.getplayershort(this.props.playerTeam1)}
                </Text>
                <Text style={[styles.sliderTeamPlayerStatus, { opacity: 0 }]}>
                  {this.props.playerStatus1}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: "35%" }}
                onPress={() => this._takeAction(this.props.PlayerTeam2Link)}
              >
                <View style={styles.sliderColumnContainer}>
                  <Image source={dressImages[this.props.team2Label]} />
                  <View style={styles.sliderCirlceTextContainer}>
                    <Text style={styles.sliderDressNumText}>
                      {this.props.player2JurseyNumber}
                    </Text>
                  </View>
                </View>
                <Text style={styles.sliderTeamPlayer}>
                  {this.getplayershort(this.props.playerTeam2)}
                </Text>
                <Text style={[styles.sliderTeamPlayerStatus, { opacity: 0 }]}>
                  {this.props.playerStatus2}
                </Text>
                {}
              </TouchableOpacity>
            </View>

            <View>
              <View
                style={{
                  position: "relative",
                  zIndex: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  style={[styles.transparentButton, { paddingHorizontal: 15 }]}
                  onPress={this.takeAction}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={styles.transparentButtonText}>
                      View Breakdown
                    </Text>
                    <Image source={rightArrowImage} style={{ marginLeft: 5 }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default SliderTabView;
