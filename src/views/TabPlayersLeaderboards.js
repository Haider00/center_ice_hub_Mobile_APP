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


class TabPlayersLeaderboards extends React.PureComponent {
    render() {
        return (
            <ScrollView>
                <View>
                    <View style={[styles.DailyWatchTitleBar, { backgroundColor: "#FFF" }]}>
                        <View style={styles.containerRowCenter}>
                            <View style={[styles.skyButton, { marginHorizontal: 5, width:40 }]}>
                                <Text style={[styles.transparentButtonText, { color: "#182955" }]}>All</Text>
                            </View>
                            <View style={[styles.skyButton, { backgroundColor: "#EDF2FF", marginHorizontal: 5, }]}>
                                <Text style={[styles.transparentButtonText, { color: "#18295588", paddingHorizontal:2 }]}>Forwards</Text>
                            </View>
                            <View style={[styles.skyButton, { backgroundColor: "#EDF2FF", marginHorizontal: 5, }]}>
                                <Text style={[styles.transparentButtonText, { color: "#18295588", paddingHorizontal:2 }]}>Defensemen</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.containerRowStart, { marginTop: 5, marginBottom:2, marginHorizontal: 5 }]} >
                        <View style={{ width: "45%", marginHorizontal:3 }}>
                            <CardPlayers title="Goals" />
                        </View>
                        <View style={{ width: "45%", marginHorizontal: 3 }}>
                            <CardPlayers title="Assists" />
                        </View>
                    </View>

                    <View style={[styles.containerRowStart, { marginVertical: 2, marginHorizontal: 5 }]} >
                        <View style={{ width: "45%", marginHorizontal: 3 }}>
                            <CardPlayers title="Points" />
                        </View>
                        <View style={{ width: "45%", marginHorizontal: 3 }}>
                            <CardPlayers title="Shots" />
                        </View>
                    </View>

                </View>
            </ScrollView>

        );
    }
};

export default TabPlayersLeaderboards;
