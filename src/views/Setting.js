import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import ProfileIcon from '../assets/img/profile.png';
import EditIcon from '../assets/img/editCircle.png';
import TickersIcon from '../assets/img/Tickers.png';
import DeleteIcon from '../assets/img/deleteCircle.png';
import ConnectIcon from '../assets/img/connect.png';
import RightArrowIcon from '../assets/img/RightArrowGray.png';
import PolicyIcon from '../assets/img/policy.png';
import { Actions } from 'react-native-router-flux';


import NavBarSecondary from '../components/NavBarSecondary';


class Setting extends React.PureComponent {

    bannerError = (e) => {
        //////
    }


    render() {
        return (
            <View>
                <ScrollView style={{ height: "100%", backgroundColor: "#F8F8F8" }}>
                    <View style={{ backgroundColor: "#F8F8F8" }}>
                        <NavBarSecondary title="Settings" />
                        <View style={{ borderBottomColor: "#dedede", borderBottomWidth: 1, padding: 20, paddingBottom: 5 }}>
                            <View style={styles.containerRowStart}>
                                <Image source={ProfileIcon} resizeMode="contain" />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[styles.greyText, { color: "#626262" }]}>Account</Text>
                                    <View style={[styles.containerRow, { width: "80%", marginTop: 5 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", textAlign: "left", marginRight: 15, width: "100%", marginTop: 10 }]}>Andrew Tsionas</Text>
                                        <Image source={EditIcon} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ borderBottomColor: "#dedede", borderBottomWidth: 1, padding: 20, }}>
                            <View style={styles.containerRowStart}>
                                <Image source={TickersIcon} resizeMode="contain" />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[styles.greyText, { color: "#626262" }]}>Tickers</Text>
                                    <View style={[styles.containerRow, { width: "72%", marginTop: 15 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", textAlign: "left", marginRight: 15, width: "80%", marginTop: 10 }]}>Ticker Title 1</Text>
                                        <View style={[styles.containerRow, { marginTop: 0, }]}>
                                            <Image source={EditIcon} style={{ marginLeft: 40, position: "absolute" }} />
                                            <Image source={DeleteIcon} style={{ marginLeft: 73, position: "absolute" }} />
                                        </View>
                                    </View>

                                    <View style={[styles.containerRow, { width: "72%", marginTop: 15 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", textAlign: "left", marginRight: 15, width: "80%", marginTop: 10 }]}>Ticker Title 1</Text>
                                        <View style={[styles.containerRow, { marginTop: 0, }]}>
                                            <Image source={EditIcon} style={{ marginLeft: 40, position: "absolute" }} />
                                            <Image source={DeleteIcon} style={{ marginLeft: 73, position: "absolute" }} />
                                        </View>
                                    </View>

                                    <View style={{ width: "38%", marginTop: 10 }}>
                                        <TouchableOpacity
                                            style={[styles.yellowButtonSmall]}
                                            onPress={() => Actions.AddTickers()} >
                                            <Text style={styles.yellowButtonSmallText}>Add New Ticker</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ borderBottomColor: "#dedede", borderBottomWidth: 1, padding: 20 }}>
                            <View style={styles.containerRowStart}>
                                <Image source={ConnectIcon} resizeMode="contain" />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[styles.greyText, { color: "#626262" }]}>Contact/Feedback</Text>
                                    <View style={[styles.containerRow, { width: "76%", marginTop: 15 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", marginRight: 15 }]}>Suggestion</Text>
                                        <Image source={RightArrowIcon} />
                                    </View>
                                    <View style={[styles.containerRow, { width: "76%", marginTop: 15 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", marginRight: 15 }]}>Rate the App Now</Text>
                                        <Image source={RightArrowIcon} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ padding: 20 }}>
                            <View style={styles.containerRowStart}>
                                <Image source={PolicyIcon} resizeMode="contain" />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[styles.greyText, { color: "#626262", marginRight: 15 }]}>Policies</Text>
                                    <View style={[styles.containerRow, { width: "73%", marginTop: 15 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", marginRight: 15 }]}>Privacy Policy</Text>
                                        <Image source={RightArrowIcon} />
                                    </View>
                                    <View style={[styles.containerRow, { width: "73%", marginTop: 15 }]}>
                                        <Text style={[styles.selectedTabText, { color: "#404040", marginRight: 15 }]}>FAQs</Text>
                                        <Image source={RightArrowIcon} />
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View >
                </ScrollView>
            </View>

        );
    }
};

export default Setting;
