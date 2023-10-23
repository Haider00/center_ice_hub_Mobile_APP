import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, Picker, FlatList } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import playerComparisonImage from '../assets/img/PlayerComparison.png';

import AddDressImage from '../assets/img/addDress.png';
import DressARIImage from '../assets/img/dressARI.png';
import CircleCrossImage from '../assets/img/circleCross.png';



class TabPlayerComparsion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            season: "Season",
            time: "Time",
            GridViewItems: [
                { key: 1, name: "Ryan Getzlaf", team: "Anaheim Ducks", role: "C", image: DressARIImage, number: 89, circleCross: CircleCrossImage, selected: true },
                { key: 2, name: "Ondrej Kase", team: "Anaheim Ducks", role: "C", image: DressARIImage, number: 89, circleCross: CircleCrossImage, selected: true },
                { key: 3, name: "Adam Henrique", team: "Anaheim Ducks", role: "C", image: DressARIImage, number: 89, circleCross: CircleCrossImage, selected: true },
                { key: 4, name: "Select Player", team: "Team", role: "Role", image: AddDressImage, selected: false },
            ],
            headings: [
                { key: 1, title: "", },
                { key: 2, title: "Team", },
                { key: 3, title: "GP", },
                { key: 4, title: "G", },
                { key: 5, title: "A", },
                { key: 6, title: "P", },
                { key: 7, title: "+/-", },
                { key: 8, title: "PIM", },
                { key: 9, title: "PPG", },
                { key: 10, title: "PPP", },
                { key: 11, title: "SHG", },
                { key: 12, title: "SHP", },
                { key: 13, title: "GWG", },
                { key: 14, title: "OTG", },
                { key: 15, title: "S", },
                { key: 16, title: "S%", },
                { key: 17, title: "FO%", },
            ],
            team: [
                { key: 1, date: "2018-19" },
                { key: 2, team: "ANA", },
                { key: 3, score: "51", color: "green" },
                { key: 4, score: "13", color: "green" },
                { key: 5, score: "57", color: "green" },
                { key: 6, score: "37", color: "red" },
                { key: 7, score: "38", color: "red" },
                { key: 8, score: "29", color: "red" },
                { key: 9, score: "21", color: "red" },
                { key: 10, score: "30", color: "red" },
                { key: 11, score: "36", color: "black" },
                { key: 12, score: "79", color: "black" },
                { key: 13, score: "28", color: "black" },
                { key: 14, score: "14", color: "black" },
                { key: 15, score: "22", color: "green" },
                { key: 16, score: "38%", color: "green" },
                { key: 17, score: "32%", color: "green" },

            ],
            team2: [
                { key: 1, date: "2018-19" },
                { key: 2, team: "CAR", },
                { key: 3, score: "51", color: "green" },
                { key: 4, score: "13", color: "green" },
                { key: 5, score: "57", color: "green" },
                { key: 6, score: "37", color: "red" },
                { key: 7, score: "38", color: "red" },
                { key: 8, score: "29", color: "red" },
                { key: 9, score: "21", color: "red" },
                { key: 10, score: "30", color: "red" },
                { key: 11, score: "36", color: "black" },
                { key: 12, score: "79", color: "black" },
                { key: 13, score: "28", color: "black" },
                { key: 14, score: "14", color: "black" },
                { key: 15, score: "22", color: "green" },
                { key: 16, score: "38%", color: "green" },
                { key: 17, score: "32%", color: "green" },

            ],


        }

        this._getFavoriteOption = this._getFavoriteOption.bind(this);
        this._getHeadings = this._getHeadings.bind(this);
        this._getScore = this._getScore.bind(this);

    }


    _getFavoriteOption(item) {
        return (
            <View
                key={item.key}
                style={[styles.favoriteOptionCard, {
                    backgroundColor: "transparent", padding: 0, justifyContent: "flex-start"
                }]}>
                <View style={item.selected ? [styles.sliderColumnContainer, { marginTop: 10 }] : [styles.sliderColumnContainer]}>
                    <Image source={item.image} />
                    <View style={styles.sliderCirlceTextContainer}>
                        <Text style={styles.sliderCirlceText}>{item.number}</Text>
                    </View>
                </View>
                <Text
                    style={
                        item.selected ?
                            [styles.yellowButtonSmallText, { color: "#404040", textAlign: "center", marginTop: 5 }] :
                            [styles.yellowButtonSmallText, { color: "#40404044", textAlign: "center", marginTop: 5 }]
                    }>{item.name}</Text>
                <Text
                    style={
                        item.selected ?
                            [styles.yellowLabelText, { color: "#8AABFF", textAlign: "center", marginTop: 2 }] :
                            [styles.yellowLabelText, { color: "#40404044", textAlign: "center", marginTop: 2 }]
                    }>{item.team}</Text>

                <Text
                    style={
                        item.selected ?
                            [styles.yellowLabelText, { color: "#8AABFF", textAlign: "center", marginTop: 2 }] :
                            [styles.yellowLabelText, { color: "#40404044", textAlign: "center", marginTop: 2 }]
                    }>{item.role}</Text>

                {
                    item.selected &&
                    <Image source={item.circleCross} />
                }
            </View>
        )

    }

    _getHeadings(item) {
        return (
            <View
                key={item.key}>
                <Text style={[styles.teamItems, { color: "#8AABFF", marginTop: 2 }]}>{item.title}</Text>
            </View>
        )
    }

    _getScore(item) {
        return (
            <View
                key={item.key}>
                {
                    item.date &&
                    <View style={{ backgroundColor: "#8aabff", borderRadius: 20, height: 20, justifyContent: "center", marginHorizontal: 10 }}>
                        <Text style={[styles.teamItems, { color: "#404040", marginVertical: 0 }]}>{item.date}</Text>
                    </View>
                }
                {
                    item.team &&
                    <Text style={[styles.teamItems, { color: "#404040", marginBottom: 0 }]}>{item.team}</Text>
                }
                {
                    item.score &&
                    <Text style={[styles.teamItems, { color: item.color, marginBottom: 2 }]}>{item.score}</Text>
                }

            </View>
        )
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <View style={[styles.DailyWatchTitleBar, { backgroundColor: "#FFF" }]}>
                        <View style={[styles.containerRowCenter]}>
                            <View style={[styles.roundDroupdownContainer, { width: "40%", marginRight: 5 }]}>
                                <Picker
                                    selectedValue={this.state.season}
                                    mode="dropdown"
                                    label="Season"
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ season: itemValue })
                                    }
                                >
                                    <Picker.Item label="Season" value="b" color="#404040" />
                                    <Picker.Item label="Season 2" value="a" color="#404040" />
                                </Picker>
                            </View>

                            <View style={[styles.roundDroupdownContainer, { width: "40%", marginLeft: 5 }]}>
                                <Picker
                                    selectedValue={this.state.season}
                                    mode="dropdown"
                                    label="Time"
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ season: itemValue })
                                    }
                                >
                                    <Picker.Item label="Time" value="b" color="#404040" />
                                    <Picker.Item label="Time 2" value="a" color="#404040" />
                                </Picker>
                            </View>

                        </View>
                    </View>

                    <View style={[styles.sliderTabView, { height: "13%", padding: 20 }]}>
                        <View style={styles.containerRowStart}>
                            <Image source={playerComparisonImage} style={{ marginTop: 5 }} />
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={[styles.greyText, { fontWeight: "500", color: "#FFF", borderBottomColor: "#ffffff88", borderBottomWidth: 1, paddingVertical: 5 }]}>Let’s compare your players!</Text>
                                <Text style={[styles.containerMiddlemodelDescription, { color: "#8AABFF" }]}>Start adding your favorite players to compare them. Tap the '+' icon above and make sure to select the time you'd like to see for your comparisons.</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.GridViewItems}
                            renderItem={({ item }) => this._getFavoriteOption(item)}
                            numColumns={4}
                        />
                    </View>

                    <View style={[{ backgroundColor: "#FFF", marginHorizontal: "5%", borderRadius: 15, paddingVertical: 10 }]}>
                        <View style={[styles.containerRowStart]}>
                            <View style={{ width: "15%", height: "100%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.headings}
                                    renderItem={({ item }) => this._getHeadings(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "30%", height: "100%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.team}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "30%", height: "100%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.team2}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                        </View>

                    </View>

                    <View style={styles.containerRowCenter}>
                        <TouchableOpacity
                            style={[styles.yellowButton, { width: "50%", backgroundColor: "#DEDEDE", borderWidth: 0 }]}
                            onPress={this.moveToCreatePassword} >
                            <Text style={[styles.yellowButtonText, { color: "#0F1A38" }]}>Reset Comparison</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        );
    }
};

export default TabPlayerComparsion;
