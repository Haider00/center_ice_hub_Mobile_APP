import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import fireImage from '../assets/img/fire.png';
import { Actions } from 'react-native-router-flux';
import SliderPlayers from './SliderPlayers';
import FavoriteOptions from './FavoriteOptions';
import SliderGoalies from './SliderGoalies';
import dressARIImage from '../assets/img/dressARI.png';
import dressSJSImage from '../assets/img/dressSJS.png';
import CardPlayers from '../components/CardPlayers';


class TabGoaliesLeaderboards extends React.PureComponent {
    render() {
        return (
            <ScrollView>
                <View>
                <View style={[styles.containerRowStart, { marginTop: 5, marginBottom:2, marginHorizontal: 5 }]} >
                        <View style={{ width: "45%", marginHorizontal: "2%" }}>
                            <CardPlayers title="GAA" />
                        </View>
                        <View style={{ width: "45%", marginHorizontal: "2%" }}>
                            <CardPlayers title="Save %" />
                        </View>
                    </View>

                    <View style={[styles.containerRowStart, { marginVertical: 2, marginHorizontal: 5 }]} >
                        <View style={{ width: "45%", marginHorizontal: "2%" }}>
                            <CardPlayers title="Wins" />
                        </View>
                        <View style={{ width: "45%", marginHorizontal: "2%" }}>
                            <CardPlayers title="Shutouts" />
                        </View>
                    </View>

                </View>
            </ScrollView>

        );
    }
};

export default TabGoaliesLeaderboards;
