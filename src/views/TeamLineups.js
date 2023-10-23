import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import styles from "../assets/css/styles";
import { Actions } from "react-native-router-flux";
import circleARIImage from "../assets/img/circleARI.png";
import { ScrollView } from "react-native-gesture-handler";
import AppService from "../Services/AppServices";
import images from "../Services/Images";
import BackgroundImage from "../assets/img/splashScreen.png";

class TeamLineups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      GridViewItems: [
        {
          key: 1,
          firstName: "Anaheim",
          secondName: "Ducks",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 2,
          firstName: "Arizona",
          secondName: "Coyotes",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 3,
          firstName: "Boston",
          secondName: "Bruins",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 4,
          firstName: "Buffalo",
          secondName: "Sabres",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 5,
          firstName: "Carolina",
          secondName: "Hurricanes",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 6,
          firstName: "Calgary",
          secondName: "Flames",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 7,
          firstName: "Chicago",
          secondName: "Blackhawks",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 8,
          firstName: "Columbus",
          secondName: "Blue Jackets",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 9,
          firstName: "Colorado",
          secondName: "Avalanche",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 10,
          firstName: "Dallas",
          secondName: "Stars",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 11,
          firstName: "Detroit",
          secondName: "Red Wings",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 12,
          firstName: "Edmonton",
          secondName: "Oilers",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 13,
          firstName: "Florida",
          secondName: "Panthers",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 14,
          firstName: "Los Angeles",
          secondName: "Kings",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 15,
          firstName: "Minnesota",
          secondName: "Wild",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 16,
          firstName: "Montréal",
          secondName: "Canadiens",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 17,
          firstName: "Nashville",
          secondName: "Predators",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 18,
          firstName: "New Jersey",
          secondName: "Devils",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 19,
          firstName: "New York",
          secondName: "Islanders",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 20,
          firstName: "New York",
          secondName: "Rangers",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 21,
          firstName: "Ottawa",
          secondName: "Senators",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 22,
          firstName: "Philadelphia",
          secondName: "Flyers",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 23,
          firstName: "Pittsburgh",
          secondName: "Penguins",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 24,
          firstName: "San Jose",
          secondName: "Sharks",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 24,
          firstName: "Seattle",
          secondName: "Kraken",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 25,
          firstName: "St. Louis",
          secondName: "Blues",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 26,
          firstName: "Tampa Bay",
          secondName: "Lightning",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 27,
          firstName: "Toronto Maple",
          secondName: "Leafs",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 28,
          firstName: "Vancouver",
          secondName: "Canucks",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 29,
          firstName: "Vegas Golden",
          secondName: "Knights",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 30,
          firstName: "Washington",
          secondName: "Capitals",
          image: circleARIImage,
          title: "ANA",
        },
        {
          key: 31,
          firstName: "Winnipeg",
          secondName: "Jets",
          image: circleARIImage,
          title: "ANA",
        },
      ],
    };
    this.appService = new AppService();
    this._getFavoriteOption = this._getFavoriteOption.bind(this);
  }
  onRefresh = () => {
    Actions.refresh();
  };
  _getFavoriteOption(item) {
    var teamLabel = this.appService.getTeamLabel(
      item.firstName + " " + item.secondName
    );
    return (
      <TouchableOpacity
        key={item.key}
        style={{ width: "24%", marginHorizontal: 1, marginVertical: 7 }}
        onPress={() =>
          Actions.Team({ teamName: item.firstName + " " + item.secondName })
        }
      >
        <View style={styles.sliderColumnContainer}>
          <Image source={images[teamLabel]} />
          <View style={[styles.sliderCirlceTextContainer, { top: 7 }]}>
            <Text style={styles.sliderCirlceText}>{teamLabel}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.sliderCirlceTeamName,
            { color: "#404040", marginTop: 2 },
          ]}
        >
          {item.firstName}
        </Text>
        <Text
          style={[
            styles.sliderCirlceTeamName,
            { color: "#404040", marginTop: 0 },
          ]}
        >
          {item.secondName}
        </Text>
        {/* <Text style={[styles.sliderCirlceTeamName, { color: "#404040", marginTop: 0 }]}>{item.secondName}</Text> */}
      </TouchableOpacity>
    );
  }

  bannerError = (e) => {
    //////
  };

  render() {
    return (
      <View style={styles.containerColumn}>
        <ScrollView
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
          <View
            style={{ background: "green", paddingBottom: 70, width: "100%" }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                marginHorizontal: 5,
                marginBottom: "5%",
                marginTop: 20,
              }}
            >
              <FlatList
                data={this.state.GridViewItems}
                renderItem={({ item }) => this._getFavoriteOption(item)}
                numColumns={4}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TeamLineups;
