import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import dressARIImage from '../assets/img/dressARI.png';



class CardPlayers extends React.PureComponent {

    render() {
        return (
            <View style={{ marginVertical: 15 }}>
                <Text style={[styles.checkboxDes, { color: "#40404077", textAlign: "center" }]}>{this.props.title}</Text>
                <View style={[styles.modelBody, { backgroundColor: "#FFF", paddingBottom: 10, marginTop: 10, borderRadius:12 }]}>
                    <View style={{ marginVertical: 10, marginHorizontal:7 }}>
                        <View style={styles.sliderColumnContainer}>
                            <Image source={dressARIImage} />
                            <View style={styles.sliderCirlceTextContainer}>
                                <Text style={styles.sliderDressNumText}>35</Text>
                            </View>
                        </View>
                        <Text style={[styles.noGameTitle, { color: "#404040", marginTop: 5, marginBottom: 0 }]}>Ben Bishop</Text>
                        <Text style={[styles.roundEditTextWhiteLabel, { color: "#8AABFF", textAlign: "center", marginTop: 0 }]}>Buffalo Sabres | C</Text>
                        <Text style={[styles.playerNumberText, { marginTop: 5 }]}>178</Text>
                        <View style={{ marginTop: 10, marginBottom: 5, marginHorizontal: 5 }}>
                            <View style={styles.containerRow}>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>Ryan Getzlaf</Text>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>165</Text>
                            </View>
                            <Text style={[styles.sliderTeamPlayerStatus, { color: "#8AABFF", textAlign: "left" }]}>Philadelphia Flyers | C</Text>
                        </View>

                        <View style={{ margin: 5 }}>
                            <View style={styles.containerRow}>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>Ondrej Kase</Text>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>169</Text>
                            </View>
                            <Text style={[styles.sliderTeamPlayerStatus, { color: "#8AABFF", textAlign: "left" }]}>Anaheim Ducks | LW</Text>
                        </View>

                        <View style={{ margin: 5 }}>
                            <View style={styles.containerRow}>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>Adam Henrique</Text>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>145</Text>
                            </View>
                            <Text style={[styles.sliderTeamPlayerStatus, { color: "#8AABFF", textAlign: "left" }]}>Carolina Hurricanes | C</Text>
                        </View>

                        <View style={{ margin: 5 }}>
                            <View style={styles.containerRow}>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>Jakob Silf</Text>
                                <Text style={[styles.underlineText, { textDecorationLine: "none", color: "#404040",  }]}>143</Text>
                            </View>
                            <Text style={[styles.sliderTeamPlayerStatus, { color: "#8AABFF", textAlign: "left" }]}>Buffalo Sabres | C</Text>
                        </View>

                        <View style={[styles.containerRowCenter]}>
                            <View style={{ marginTop: 5, width: 100, }}>
                                <TouchableOpacity
                                    style={[styles.yellowButtonSmall,{height:28}]}
                                    onPress={this.moveToSignUp} >
                                    <Text style={styles.yellowButtonSmallText}>View Top 100</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </View>

        );
    }
};

export default CardPlayers;
