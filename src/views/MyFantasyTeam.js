import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import styles from "../assets/css/styles";
import ForwardsImage from "../assets/img/Forwards.png";
import DefensemanImage from "../assets/img/Defenseman.png";
import ExpectedGoaliesImage from "../assets/img/ExpectedGoalies.png";
import RightArrowIcon from "../assets/img/RightArrowWhite.png";
import LeftArrowIcon from "../assets/img/LeftArrowWhite.png";
import DownArrowIcon from "../assets/img/arrowDown.png";
import { Actions } from "react-native-router-flux";
import { TabView, SceneMap } from "react-native-tab-view";
import NavBarSecondary from "../components/NavBarSecondary";
import TabForwads from "./MFT_TabForwads";
import crossImage from "../assets/img/cross.png";
import Service from "../Services/Service";
import TabDefensive from "./MFT_TabDefensive";
import TabGoalies from "./MFT_TabGoalies";

import AddDressImage from "../assets/img/addDress.png";
import CircleCrossImage from "../assets/img/circleCross.png";
import AppService from "../Services/AppServices";

import { NavigationEvents } from "react-navigation";

class MyFantasyTeam extends React.Component {
  constructor(prpos) {
    super(prpos);

    this.state = {
      logedin: false,
      process: true,
      modalVisibleRemove: false,
      modalVisibleBack: false,
      modalTeams: false,
      modalPlayers: false,
      modalVisibleAdd: false,
      selectedTeam: "",
      fantasy: true,
      selectedPlayer: null,
      selectedStatsPlayer: null,
      tab: null,
      position: null,
      enabled: true,
      save: false,
      changed: false,
      sleecteditem: "",
      index: 0,
      gotoStats: false,
      routes: [
        { key: "first", title: "Forwards", image: ForwardsImage },
        { key: "second", title: "Defenseman", image: DefensemanImage },
        { key: "third", title: "Goalies", image: ExpectedGoaliesImage },
      ],
      Teams: [],
      Players: [],
      ForwardsGridViewItems: [
        {
          key: 1,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r1",
          player_position: "lw",
        },
        {
          key: 2,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r1",
          player_position: "c",
        },
        {
          key: 3,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r1",
          player_position: "rw",
        },
        {
          key: 4,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r2",
          player_position: "lw",
        },
        {
          key: 5,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r2",
          player_position: "c",
        },
        {
          key: 6,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r2",
          player_position: "rw",
        },
        {
          key: 7,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r3",
          player_position: "lw",
        },
        {
          key: 8,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r3",
          player_position: "c",
        },
        {
          key: 9,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r3",
          player_position: "rw",
        },
        {
          key: 10,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r4",
          player_position: "lw",
        },
        {
          key: 11,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r4",
          player_position: "c",
        },
        {
          key: 12,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "off",
          row: "r4",
          player_position: "rw",
        },
      ],
      DefensiveGridViewItems: [
        {
          key: 1,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "def",
          row: "r1",
          player_position: "ld",
        },
        {
          key: 2,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "def",
          row: "r1",
          player_position: "rd",
        },
        {
          key: 3,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "def",
          row: "r2",
          player_position: "ld",
        },
        {
          key: 4,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "def",
          row: "r2",
          player_position: "rd",
        },
        {
          key: 5,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "def",
          row: "r3",
          player_position: "ld",
        },
        {
          key: 6,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "def",
          row: "r3",
          player_position: "rd",
        },
      ],
      GoaliesGridViewItems: [
        {
          key: 1,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "goa",
          row: "r1",
          player_position: "starting",
        },
        {
          key: 2,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "goa",
          row: "r1",
          player_position: "backup",
        },
        {
          key: 3,
          name: "+ Add Player",
          image: AddDressImage,
          selected: false,
          line: "goa",
          row: "r1",
          player_position: "extra",
        },
      ],
    };

    this.service = new Service();
    this.appService = new AppService();
  }

  async componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    BackHandler.addEventListener(
      "softwareBackPress",
      this.handleBackButtonClick
    );
    // this.setPlayerFromStats();

    this.checkLogin();
  }

  // componentDidMount() {
  //     this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  //   }

  //   componentWillUnmount() {
  //     this.backHandler.remove()
  //   }

  checkLogin = async () => {
    var storage = new AppService();
    var v = await storage.isUserLogin();
    if (v) {
      this.setPlayerFromStats();
      this.setState({ logedin: false, process: false });
    } else {
      this.setState({ logedin: true, process: false });
    }
  };

  getTeamData = async () => {
    this.setState({ process: true });
    var res = await this.service.getTeamsLocal();
    var Teams = [];
    if (res != null && res.data != null && res.data.data) {
      var data = res.data.data;

      data.forEach((element) => {
        Teams[element.id] = {
          key: element.team_id,
          name: element.title,
          team: true,
        };
      });
      Teams = Teams.filter(() => true);
      // if (Teams.length % 2 == 1) {
      //     Teams.push({ key: -1, team: true })
      // }
      this.setState({
        Teams: Teams,
      });
    } //end response gotten

    Teams.sort((a, b) => (a.name > b.name ? 1 : -1));

    var userId = await this.appService.getUserId();
    var res2 = await this.service.getMyFantasyTeamLocal(userId);
    var ForwardsGridViewItems = this.state.ForwardsGridViewItems;
    var DefensiveGridViewItems = this.state.DefensiveGridViewItems;
    var GoaliesGridViewItems = this.state.GoaliesGridViewItems;

    var teamlabel = this.appService.getTeamLabel(this.state.selectedTeam);

    if (res2 != null && res2.data != null) {
      var data = res2.data.data;

      data.forEach((element, id) => {
        if (element.line == "off") {
          var index_col = [];
          if (element.player_position == "lw") index_col = [0, 3, 6, 9];
          else if (element.player_position == "c") index_col = [1, 4, 7, 10];
          else if (element.player_position == "rw") index_col = [2, 5, 8, 11];

          if (index_col != []) {
            var index_row = -1;
            if (element.row == "r1") index_row = 0;
            else if (element.row == "r2") index_row = 1;
            else if (element.row == "r3") index_row = 2;
            else if (element.row == "r4") index_row = 3;

            if (index_row != -1) {
              // var jerseyNumber = element.jerseyNumber != null ? element.jerseyNumber : 89;
              var index = index_col[index_row];
              var player = {
                key: index + 1,
                name: element.player_name,
                image: element.image,
                number: element.jersey_number,
                selected: true,
                line: element.line,
                row: element.row,
                player_position: element.player_position,
                player_id: element.player_id,
                team: element.team,
                circleCross: CircleCrossImage,
                playerLink: element.player_link,
              };
              ForwardsGridViewItems[index] = player;
            }
          }
        } //end Forward
        else if (element.line === "def") {
          var index_col = [];
          if (element.player_position === "ld") {
            index_col = [0, 2, 4];
          } else if (element.player_position === "rd") {
            index_col = [1, 3, 5];
          }

          if (index_col !== []) {
            var index_row = -1;
            if (element.row === "r1") {
              index_row = 0;
            } else if (element.row === "r2") {
              index_row = 1;
            } else if (element.row === "r3") {
              index_row = 2;
            }

            if (index_row !== -1) {
              var index = index_col[index_row];
              var player = {
                key: index + 1,
                name: element.player_name,
                image: element.image,
                number: element.jersey_number,
                selected: true,
                line: element.line,
                row: element.row,
                player_position: element.player_position,
                player_id: element.player_id,
                team: element.team,
                circleCross: CircleCrossImage,
              };
              DefensiveGridViewItems[index] = player;
            }
          }
        } //end Defensive
        else if (element.line === "goa") {
          var index_col = [];
          if (element.player_position === "starting") {
            index_col = [0];
          } else if (element.player_position === "backup") {
            index_col = [1];
          } else if (element.player_position === "extra") {
            index_col = [2];
          }

          if (index_col !== []) {
            var index_row = -1;
            if (element.row === "r1") {
              index_row = 0;
            }

            if (index_row !== -1) {
              var index = index_col[index_row];
              var player = {
                key: index + 1,
                name: element.player_name,
                image: element.image,
                number: element.jersey_number,
                selected: true,
                line: element.line,
                row: element.row,
                player_position: element.player_position,
                player_id: element.player_id,
                team: element.team,
                circleCross: CircleCrossImage,
              };
              GoaliesGridViewItems[index] = player;
            }
          }
        } //end Gaolies
      });
      this.setState({
        ForwardsGridViewItems,
        DefensiveGridViewItems,
        GoaliesGridViewItems,
        process: false,
      });
    }
  };
  setPlayerFromStats = async () => {
    var playerData = await this.appService.getPlayerDataStats();

    if (playerData != null && playerData != "" && playerData != "null") {
      //////
      await this.setState({ modalVisibleAdd: true });
      playerData = await JSON.parse(playerData);
      var index = 0;
      // var tab = 'Forward'
      var teamcode = this.appService.getTeamCode(playerData.teamName);

      var postion = playerData.postion;

      var selectedStatsPlayer = null;
      if (postion === "G") {
        index = 2;
        // tab = 'Goalie'
        selectedStatsPlayer = {
          name: playerData.name,
          image: playerData.teamlabel,
          line: "goa",
          number: playerData.jursyNumber,
          player_id: playerData.id,
          team: playerData.teamName,
          circleCross: CircleCrossImage,
          playerLink: playerData.playerLink,
          from: "stats",
          teamCode: teamcode,
        };
      } else if (postion == "D") {
        index = 1;
        // tab = 'Defenseman'
        selectedStatsPlayer = {
          name: playerData.name,
          image: playerData.teamlabel,
          line: "def",
          number: playerData.jursyNumber,
          player_id: playerData.id,
          team: playerData.teamName,
          circleCross: CircleCrossImage,
          playerLink: playerData.playerSLink,
          from: "stats",
          teamCode: teamcode,
        };
      } else {
        index = 0;
        // tab = 'Forward'
        selectedStatsPlayer = {
          name: playerData.name,
          image: playerData.teamlabel,
          line: "off",
          number: playerData.jursyNumber,
          player_id: playerData.id,
          team: playerData.teamName,
          circleCross: CircleCrossImage,
          playerLink: playerData.playerLink,
          from: "stats",
          teamCode: teamcode,
        };
      }

      this.setState({ index, selectedStatsPlayer });
      this.appService.setPlayerDataStats(null);
    }

    await this.getTeamData();
  };

  bannerError = (e) => {
    //////
  };

  _showModelLogin = (item) => {
    return (
      <View style={[styles.modelBackground, { position: "absolute" }]}>
        <View style={styles.containerMiddle}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 20, marginTop: "80%", borderRadius: 12 },
            ]}
          >
            <View style={{ marginHorizontal: 28, marginTop: 31 }}>
              <Text
                style={[
                  styles.modelTitle,
                  { fontSize: 18, textAlign: "center", color: "#ffffffdd" },
                ]}
              >
                You need to login or create an account to start building your
                own custom fantasy team
              </Text>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 10, paddingBottom: 5 },
              ]}
            >
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.yellowButtonSmall,
                    { backgroundColor: "#DEDEDE", borderWidth: 0, height: 40 },
                  ]}
                  onPress={() => Actions.Login({ fromScreen: "Fantasy" })}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[styles.yellowButtonSmall, { height: 40 }]}
                  onPress={() => Actions.SignUp()}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  _getFavoriteOption(item) {
    return (
      <View
        style={[
          styles.containerRowStart,
          {
            width: "50%",
            borderColor: "#ffffff44",
            borderBottomWidth: 1,
            borderRightWidth: 1,
            height: 50,
          },
        ]}
        key={item.key}
      >
        {item.name && (
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => this.takeAction(item)}
          >
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100%",
                width: "70%",
                marginHorizontal: 20,
              }}
            >
              <Text
                style={[styles.underlineText, { textDecorationLine: "none" }]}
              >
                {item.name}
              </Text>
            </View>
            <View style={{ position: "absolute", right: 10, top: 15 }}>
              <Image source={RightArrowIcon} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  _goto() {
    this.setState({ gotoStats: true });
  }
  _showTeamDailogue = async (item, tab) => {
    await this.setState({ process: true, enabled: false });
    if (this.state.selectedStatsPlayer != null) {
      await this.setState({ tab, position: item.key });
      var player = {
        ...this.state.selectedStatsPlayer,
        key: item.key,
        player_position: item.player_position,
        row: item.row,
        selected: true,
      };
      await this.takeAction(player);
    } else {
      if (!item.selected) {
        await this.setState({
          modalTeams: true,
          modalPlayers: false,
          tab: tab,
          position: item.key,
          sleecteditem: item,
        });
      } else {
        if (
          (item.playerLink != "" && item.playerLink != undefined) ||
          (item.player_id != "" && item.player_id != undefined)
        ) {
          this.setState({ enabled: true });
          Actions.PlayerStats({ item });
        } else
          alert(
            "Sorry but it looks like we can't pull this player's stats at this time. Please try again later."
          );
      }
    }
    this.setState({ process: false });
  };

  _showRemoveDailogue = async (item, tab) => {
    // await this.setState({ modalTeams: true, modalPlayers: false, tab: tab, position: item.key })
    this.setState({ process: true });
    await this.setState({
      modalVisibleRemove: true,
      tab: tab,
      position: item.key,
      selectedPlayer: item,
    });
    this.setState({ process: false });
  };

  _hideTeamDailogue = () => {
    this.setState({ modalTeams: false, modalPlayers: false });
  };

  _showPlayerDailogue = async () => {
    this.setState({ process: true, enabled: false });

    var Players = [];
    var teamCode = this.appService.getTeamCode(this.state.selectedTeam);
    this.setState({ teamCode });
    var res = await this.service.getTeamPlayers(teamCode);
    var teamlabel = this.appService.getTeamLabel(this.state.selectedTeam);

    if (res != null && res.data != null) {
      var data = res.data.roster;

      for (var i = 0; i < data.length; i++) {
        var player = data[i];
        var positionType = player.position.type;
        if (positionType == this.state.tab) {
          var playerLink = player.person.link;

          var line = "";
          var row = "";
          var player_position = "";
          if (this.state.tab === "Forward") {
            line = "off";
            var row_index = this.state.position / 3;
            var col_index = this.state.position % 3;

            if (row_index <= 1) {
              row = "r1";
            } else if (row_index <= 2) {
              row = "r2";
            } else if (row_index <= 3) {
              row = "r3";
            } else if (row_index <= 4) {
              row = "r4";
            }

            if (col_index === 1) {
              player_position = "lw";
            } else if (col_index === 2) {
              player_position = "c";
            } else if (col_index === 0) {
              player_position = "rw";
            }
          } else if (this.state.tab === "Defenseman") {
            line = "def";
            var row_index = this.state.position / 2;
            var col_index = this.state.position % 2;

            if (row_index <= 1) {
              row = "r1";
            } else if (row_index <= 2) {
              row = "r2";
            } else if (row_index <= 3) {
              row = "r3";
            }

            if (col_index === 1) {
              player_position = "ld";
            } else if (col_index === 0) {
              player_position = "rd";
            }
          } else if (this.state.tab === "Goalie") {
            line = "goa";
            row = "r1";
            var col_index = this.state.position % 3;

            if (col_index === 1) {
              player_position = "starting";
            }
            if (col_index === 0) {
              player_position = "extra";
            } else if (col_index === 2) {
              player_position = "backup";
            }
          }
          var player_object = {
            key: i,
            name: player.person.fullName,
            image: teamlabel,
            teamCode,
            player_id: player.person.id,
            number: player.jerseyNumber,
            line,
            row,
            player_position,
            player: true,
            playerLink,
          };

          Players.push(player_object);
        }
      }

      var sortedplayer = [];
      Players.forEach((item, index) => {
        if (item.name) {
          var splited = item.name.split(" ");

          var player_object = {
            key: item.key,
            name: splited[1] + " " + splited[0],
            image: item.image,
            teamCode: item.teamCode,
            player_id: item.player_id,
            number: item.number,
            line: item.line,
            row: item.row,
            player_position: item.player_position,
            player: item.player,
            playerLink: item.playerLink,
          };
          //    var player_object = { key: item.key, name: splited[1]+" "+splited[0], team: item.team, role: item.role, image: item.image, number: item.number, circleCross: item.circleCross, selected: item.selected, playerLink: item.playerLink }
          sortedplayer.push(player_object);
        }
      });
      sortedplayer.sort((a, b) => (a.name > b.name ? 1 : -1));
      Players = [];
      sortedplayer.forEach((item, index) => {
        if (item.name) {
          var splited = item.name.split(" ");
          var player_object = {
            key: item.key,
            name: splited[1] + " " + splited[0],
            image: item.image,
            teamCode: item.teamCode,
            player_id: item.player_id,
            number: item.number,
            line: item.line,
            row: item.row,
            player_position: item.player_position,
            player: item.player,
            playerLink: item.playerLink,
          };
          //  var player_object = { key: item.key, name: splited[1]+" "+splited[0], team: item.team, role: item.role, image: item.image, number: item.number, circleCross: item.circleCross, selected: item.selected, playerLink: item.playerLink }
          Players.push(player_object);
        }
      });

      if (Players.length % 2 == 1) {
        Players.push({ key: -1, player: true });
      }

      this.setState({
        Players: Players,
      });
    }

    this.setState({ modalPlayers: true, modalTeams: false });
    this.setState({ process: false });
    this.forceUpdate();
  };

  async takeAction(item) {
    this.setState({ process: true });

    if (item.from || !item.team) {
      var player = {
        key: this.state.sleecteditem.key,
        name: item.name,
        image: item.image,
        number: item.number,
        circleCross: CircleCrossImage,
        selected: true,
        team: item.teamCode,
        player_id: item.player_id,
        line: item.line,
        row: this.state.sleecteditem.row,
        player_position: item.player_position,
        playerLink: item.playerLink,
      };
      var players = [];
      if (this.state.tab === "Forward") {
        this.state.ForwardsGridViewItems.forEach((element, index) => {
          if (this.state.position === index + 1) {
            players.push(player);
          } else {
            players.push(element);
          }
        });
        this.setState({
          modalPlayers: false,
          modalTeams: false,
          enabled: true,
          ForwardsGridViewItems: players,
        });
      } else if (this.state.tab === "Defenseman") {
        this.state.DefensiveGridViewItems.forEach((element, index) => {
          if (this.state.position === index + 1) {
            players.push(player);
          } else {
            players.push(element);
          }
        });

        this.setState({
          modalPlayers: false,
          modalTeams: false,
          enabled: true,
          DefensiveGridViewItems: players,
        });
      } else if (this.state.tab === "Goalie") {
        this.state.GoaliesGridViewItems.forEach((element, index) => {
          if (this.state.position === index + 1) {
            players.push(player);
          } else {
            players.push(element);
          }
        });

        this.setState({
          modalPlayers: false,
          modalTeams: false,
          enabled: true,
          GoaliesGridViewItems: players,
        });
      }
      if (item.from === "stats") {
        this.setState({ selectedStatsPlayer: null });
      }
    } else {
      await this.setState({ selectedTeam: item.name });
      this._showPlayerDailogue();
    }
    this.setState({ process: false, changed: true });
  }

  saveTeam = async () => {
    this.setState({ process: true });
    var Lines = [];
    var uid = await this.appService.getUserId();
    this.state.ForwardsGridViewItems.forEach((item) => {
      if (item.selected) {
        var player = {
          user_id: uid,
          team: item.team,
          image: item.image,
          player_name: item.name,
          player_id: item.player_id,
          player_position: item.player_position,
          line: item.line,
          row: item.row,
          jersey_number: item.number,
          player_link: item.playerLink,
        };
        Lines.push(player);
      }
    });
    this.state.DefensiveGridViewItems.forEach((item) => {
      if (item.selected) {
        var player = {
          user_id: uid,
          team: item.team,
          image: item.image,
          player_name: item.name,
          player_id: item.player_id,
          player_position: item.player_position,
          line: item.line,
          row: item.row,
          jersey_number: item.number,
          player_link: item.playerLink,
        };
        Lines.push(player);
      }
    });
    this.state.GoaliesGridViewItems.forEach((item) => {
      if (item.selected) {
        var player = {
          user_id: uid,
          team: item.team,
          image: item.image,
          player_name: item.name,
          player_id: item.player_id,
          player_position: item.player_position,
          line: item.line,
          row: item.row,
          jersey_number: item.number,
          player_link: item.playerLink,
        };
        Lines.push(player);
      }
    });

    var res = await this.service.setMyFantasyTeamLocal(uid, Lines);
    if (res != null && res.data != null) {
      if (res.data === "success" || res.status === 200) {
        alert("Successfully Saved");
      } else {
        alert(
          "Oops saving failed. Please check you internet connection and try again shortly"
        );
      }
    } else {
      alert(
        "Oops it looks like something went wrong. Please check your internet connection and try again shortly"
      );
    }

    this.setState({ process: false, save: true });
  };

  resetTeam = async (tab) => {
    var uid = await this.appService.getUserId();
    this.setState({ tab });
    // var res = await this.service.resetMyFantasyTeam(uid)

    var line = "";
    if (tab === "Forward") line = "off";
    else if (tab === "Defenseman") line = "def";
    else if (tab === "Goalie") line = "goa";

    var res = await this.service.resetMyFantasyTeamByTabLocal(uid, line);

    //////

    if (res != null && res.data != null) {
      if (res.data === "Lines Reset") {
        //////
        if (tab === "Forward") {
          var forwardPlayers = this.state.ForwardsGridViewItems;
          var newFowrardPlayers = [];
          forwardPlayers.forEach((item, index) => {
            newFowrardPlayers[index] = {
              key: item.key,
              name: "+ Add Player",
              image: AddDressImage,
              selected: false,
              line: item.line,
              row: item.row,
              player_position: item.player_position,
            };
          });

          this.setState({ ForwardsGridViewItems: newFowrardPlayers });

          //////
        } else if (tab === "Defenseman") {
          var deffensePlayers = this.state.DefensiveGridViewItems;
          var newDefensivePlayers = [];
          deffensePlayers.forEach((item, index) => {
            newDefensivePlayers[index] = {
              key: item.key,
              name: "+ Add Player",
              image: AddDressImage,
              selected: false,
              line: item.line,
              row: item.row,
              player_position: item.player_position,
            };
          });

          this.setState({ DefensiveGridViewItems: newDefensivePlayers });
          //////
        } else if (tab === "Goalie") {
          var goaloePlayers = this.state.GoaliesGridViewItems;
          var newGoaliesPlayers = [];
          goaloePlayers.forEach((item, index) => {
            newGoaliesPlayers[index] = {
              key: item.key,
              name: "+ Add Player",
              image: AddDressImage,
              selected: false,
              line: item.line,
              row: item.row,
              player_position: item.player_position,
            };
          });

          this.setState({ GoaliesGridViewItems: newGoaliesPlayers });
          //////
        }
        alert("Successfully removed");
      } else {
        alert("Problem removing your team! Please try again...");
      }
    } else {
      alert("Problem removing your team! Please try again...");
    }
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
                    width: "33%",
                  },
                ]}
                onPress={() => this.setState({ index: i })}
              >
                <View
                  style={{
                    alignItems: "center",
                    padding: 5,
                    width: "100%",
                    height: 40,
                  }}
                >
                  <Image source={route.image} resizeMode="contain" />
                </View>
                <Text style={styles.selectedTabText}>{route.title}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.tabStyle, { width: "33%" }]}
                onPress={() => this.setState({ index: i })}
              >
                <View
                  style={{
                    alignItems: "center",
                    padding: 5,
                    width: "100%",
                    height: 40,
                  }}
                >
                  <Image source={route.image} resizeMode="contain" />
                </View>
                <View style={{ bottom: 0 }}>
                  <Text style={styles.unselectedTabText}>{route.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  _showModelTeamMembers = (id) => {
    // this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    return (
      <View style={[styles.modelBackground2]}>
        <View
          style={[
            styles.containerMiddle,
            { marginTop: 20, marginLeft: 15, marginRight: 15, height: "100%" },
          ]}
        >
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 18, borderRadius: 12, height: "100%" },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.modelBackBUtton,
                  { flex: 1, marginTop: 0, marginBottom: 0 },
                ]}
                onPress={() => {
                  this.setState({ modalPlayers: false, modalTeams: true });
                }}
              >
                <Image source={LeftArrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modelCrossBUtton,
                  { marginTop: 0, marginBottom: 0 },
                ]}
                onPress={() => {
                  this.setState({ modalPlayers: false, enabled: true });
                }}
              >
                <Image source={crossImage} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: "#ffffff44",
                  borderBottomWidth: 1,
                  backgroundColor: "#182955",
                  width: "100%",
                  paddingBottom: 10,
                  marginTop: -2,
                },
              ]}
            >
              <Text style={[styles.navBarTitle]}>
                {this.state.selectedTeam}
              </Text>
              <Image
                source={DownArrowIcon}
                style={{ marginLeft: 10, marginBottom: 5 }}
              />
            </View>
            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: "#ffffff44",
                  borderBottomWidth: 1,
                  backgroundColor: "#182955",
                  width: "100%",
                  padding: 10,
                },
              ]}
            >
              <Text style={[styles.containerMiddlemodelDescription, {}]}>
                {this.state.tab}
              </Text>
            </View>

            <ScrollView
              style={{ maxHeight: "100%" }}
              onTouchStart={(ev) => {
                this.setState({ enabled: false });
              }}
            >
              <View style={[styles.containerRow, { marginTop: 0 }]}>
                <FlatList
                  style={{
                    backgroundColor: "#182955",
                    width: "100%",
                    height: "100%",
                  }}
                  data={this.state.Players}
                  renderItem={({ item }) => this._getFavoriteOption(item)}
                  numColumns={2}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  _showModelTeam = (id) => {
    // this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    return (
      <View style={[styles.modelBackground2]}>
        <View
          style={[
            styles.containerMiddle,
            { marginTop: 20, marginLeft: 15, marginRight: 15, height: "100%" },
          ]}
        >
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 18, borderRadius: 12, height: "100%" },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              {/* <TouchableOpacity
                            style={[styles.modelBackBUtton, { flex:1,marginTop: 0, marginBottom: 0 }]}
                            onPress={() => {
                                this.setState({ modalTeams: false, enabled: true })
                            }}
                        >
                            <Image source={LeftArrowIcon} />
                        </TouchableOpacity> */}
              <TouchableOpacity
                style={[
                  styles.modelCrossBUtton,
                  { flex: 1, marginTop: 0, marginBottom: 0 },
                ]}
                onPress={() => {
                  this.setState({ modalTeams: false, enabled: true });
                }}
              >
                <Image source={crossImage} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: "#ffffff44",
                  borderBottomWidth: 1,
                  backgroundColor: "#182955",
                  width: "100%",
                  paddingBottom: 10,
                  marginTop: -2,
                },
              ]}
            >
              <Text style={[styles.navBarTitle]}>Select Team</Text>
            </View>

            <View
              style={[
                styles.containerRowCenter,
                {
                  borderBottomColor: "#ffffff44",
                  borderBottomWidth: 1,
                  backgroundColor: "#182955",
                  width: "100%",
                  padding: 10,
                },
              ]}
            >
              <Text style={[styles.containerMiddlemodelDescription]}>
                Teams
              </Text>
            </View>
            <ScrollView
              style={{ height: "100%" }}
              onTouchStart={(ev) => {
                this.setState({ enabled: false });
              }}
              //onMomentumScrollEnd={(e) => { this.setState({ enabled: true }); }}
              //onScrollEndDrag={(e) => { this.setState({ enabled: true }); }}
            >
              <View style={[styles.containerRow, { marginTop: 0 }]}>
                <FlatList
                  style={{
                    backgroundColor: "#182955",
                    width: "100%",
                    height: "100%",
                  }}
                  data={this.state.Teams}
                  renderItem={({ item }) => this._getFavoriteOption(item)}
                  numColumns={2}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  removeItem = (option) => {
    if (option) {
      var players = [];
      var item = this.state.selectedPlayer;
      var tab = this.state.tab;
      if (tab === "Forward") {
        players = this.state.ForwardsGridViewItems;

        players.forEach((element, index) => {
          if (item === element) {
            var p = {
              key: element.key,
              name: "+ Add Player",
              image: AddDressImage,
              selected: false,
              line: element.line,
              row: element.row,
              player_position: element.player_position,
            };
            players[index] = p;
          }
        });
      } else if (tab === "Defenseman") {
        players = this.state.DefensiveGridViewItems;

        players.forEach((element, index) => {
          if (item === element) {
            var p = {
              key: element.key,
              name: "+ Add Player",
              image: AddDressImage,
              selected: false,
              line: element.line,
              row: element.row,
              player_position: element.player_position,
            };
            players[index] = p;
          }
        });
      } else if (tab === "Goalie") {
        players = this.state.GoaliesGridViewItems;

        players.forEach((element, index) => {
          if (item === element) {
            var p = {
              key: element.key,
              name: "+ Add Player",
              image: AddDressImage,
              selected: false,
              line: element.line,
              row: element.row,
              player_position: element.player_position,
            };
            players[index] = p;
          }
        });
      }
    }
    this.setState({ modalVisibleRemove: false });
  };

  _showModelRemove = (item) => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    return (
      <View style={[styles.modelBackground, { position: "absolute" }]}>
        <View style={styles.containerMiddle}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 20, marginTop: "80%", borderRadius: 12 },
            ]}
          >
            <View style={{ marginHorizontal: 28, marginTop: 31 }}>
              <Text
                style={[
                  styles.modelTitle,
                  { fontSize: 18, textAlign: "center", color: "#ffffffdd" },
                ]}
              >
                Do you want to remove the player from your fantasy team?
              </Text>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 10, paddingBottom: 5 },
              ]}
            >
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.yellowButtonSmall,
                    { backgroundColor: "#DEDEDE", borderWidth: 0, height: 40 },
                  ]}
                  onPress={() => this.removeItem(false)}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[styles.yellowButtonSmall, { height: 40 }]}
                  onPress={() => this.removeItem(true)}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _showModelAddDialogue = (item) => {
    return (
      <View style={[styles.modelBackground, { position: "absolute" }]}>
        <View style={styles.containerMiddle}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 20, marginTop: "80%", borderRadius: 12 },
            ]}
          >
            <View style={{ marginHorizontal: 28, marginTop: 31 }}>
              <Text
                style={[
                  styles.modelTitle,
                  { fontSize: 18, textAlign: "center", color: "#ffffffdd" },
                ]}
              >
                Select any position to add player to your Fantasy Team
              </Text>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 10, paddingBottom: 5 },
              ]}
            >
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.yellowButtonSmall,
                    { backgroundColor: "#DEDEDE", borderWidth: 0, height: 40 },
                  ]}
                  onPress={() => this.setState({ modalVisibleAdd: false })}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  handleSaveAndBack = async () => {
    //////
    this.setState({ modalVisibleBack: false });
    await this.saveTeam();
    this.props.navigation.goBack(null);
  };

  _showModelBack = (item) => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    return (
      <View style={[styles.modelBackground, { position: "absolute" }]}>
        <View style={styles.containerMiddle}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 20, marginTop: "80%", borderRadius: 12 },
            ]}
          >
            <View style={{ marginHorizontal: 28, marginTop: 31 }}>
              <Text
                style={[
                  styles.modelTitle,
                  { fontSize: 18, textAlign: "center", color: "#ffffffdd" },
                ]}
              >
                Do you want to save your fantasy team?
              </Text>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 10, paddingBottom: 5 },
              ]}
            >
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.yellowButtonSmall,
                    { backgroundColor: "#DEDEDE", borderWidth: 0, height: 40 },
                  ]}
                  onPress={() => this.props.navigation.goBack(null)}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "40%",
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={[styles.yellowButtonSmall, { height: 40 }]}
                  onPress={this.handleSaveAndBack}
                >
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  componentWillUnmount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    BackHandler.addEventListener(
      "softwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    if (this.state.modalTeams == true) {
      this.setState({ modalTeams: false, enabled: true });
      return true;
    } else if (this.state.modalPlayers == true) {
      this.setState({ modalPlayers: false, modalTeams: true });
      return true;
    } else if (!this.state.save && this.state.changed) {
      this.setState({ modalVisibleBack: true });
      return true;
    } else if (this.state.gotoStats) {
      this.setState({ gotoStats: true });
      return true;
    } else if (this.state.fantasy) {
      this.props.navigation.goBack(null);
      return true;
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#E5E5E5" }}>
        <ScrollView
          style={{ height: "100%", backgroundColor: "#F8F8F8" }}
          scrollEnabled={this.state.enabled}
          ref={(c) => {
            this.scroll = c;
          }}
        >
          <View style={{ paddingBottom: 100 }}>
            <NavBarSecondary
              title="My Fantasy Team"
              search
              backPress={this.handleBackButtonClick}
            />

            {this.state.logedin && (
              <NavigationEvents onDidFocus={() => this.checkLogin()} />
            )}
            <View style={{ flex: 1, width: "100%", flexDirection: "row" }}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                  first: () => (
                    <TabForwads
                      goto={this._goto}
                      showTeamDailogue={this._showTeamDailogue}
                      showRemoveDialogue={this._showRemoveDailogue}
                      GridViewItems={this.state.ForwardsGridViewItems}
                      saveTeam={this.saveTeam}
                      resetTeam={this.resetTeam}
                    />
                  ),
                  second: () => (
                    <TabDefensive
                      goto={this._goto}
                      showTeamDailogue={this._showTeamDailogue}
                      showRemoveDialogue={this._showRemoveDailogue}
                      GridViewItems={this.state.DefensiveGridViewItems}
                      saveTeam={this.saveTeam}
                      resetTeam={this.resetTeam}
                    />
                  ),
                  third: () => (
                    <TabGoalies
                      goto={this._goto}
                      showTeamDailogue={this._showTeamDailogue}
                      showRemoveDialogue={this._showRemoveDailogue}
                      GridViewItems={this.state.GoaliesGridViewItems}
                      saveTeam={this.saveTeam}
                      resetTeam={this.resetTeam}
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
          </View>
        </ScrollView>
        {this.state.modalVisibleRemove && this._showModelRemove()}

        {this.state.modalTeams && this._showModelTeam()}

        {this.state.modalPlayers && this._showModelTeamMembers()}

        {this.state.modalVisibleBack && this._showModelBack()}

        {this.state.modalVisibleAdd && this._showModelAddDialogue()}
        {this.state.logedin && this._showModelLogin()}

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
            <ActivityIndicator
              size="large"
              color="#2233aa"
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 50,
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

export default MyFantasyTeam;
