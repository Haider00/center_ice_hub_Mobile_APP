import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, Picker, FlatList } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import playerComparisonImage from '../assets/img/PlayerComparison.png';

import AddDressImage from '../assets/img/addDress.png';
import DressARIImage from '../assets/img/dressARI.png';
import CircleCrossImage from '../assets/img/circleCross.png';

class TabPlayerStats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            season: "Season",
            time: "Time",
            headings: [
                { key: 1, title: "Season", },
                { key: 2, title: "Team", },
                { key: 3, title: "GP", },
                { key: 4, title: "G", },
                { key: 5, title: "A", },
                { key: 6, title: "P", },
                { key: 7, title: "+/-", },
                { key: 8, title: "S", },
                { key: 9, title: "S%", },
                { key: 10, title: "PIM", },
                { key: 11, title: "Hits", },
                { key: 12, title: "BS", },

            ],
            seasons: [
                { key: 1, value: "2018-2019", },
                { key: 2, value: "2017-2018", },
                { key: 3, value: "2016-2017", },
                { key: 4, value: "2015-2016", },
                { key: 5, value: "2014-2015", },
                { key: 6, value: "2013-2014", },
                { key: 7, value: "Career", },
            ],
            team: [
                { key: 1, value: "ABC", },
                { key: 2, value: "DEF", },
                { key: 3, value: "GHI", },
                { key: 4, value: "JKL", },
                { key: 5, value: "MNO", },
                { key: 6, value: "PQR", },
                { key: 7, value: " - ", },
            ],
            GP: [
                { key: 1, value: "12", },
                { key: 2, value: "13", },
                { key: 3, value: "14", },
                { key: 4, value: "15", },
                { key: 5, value: "16", },
                { key: 6, value: "17", },
                { key: 7, value: "343", },
            ],


        }

        this._getSeasons = this._getSeasons.bind(this);
        this._getScore = this._getScore.bind(this);
        this._getHeadings = this._getHeadings.bind(this);


    }


    _getSeasons(item) {
        return (
            <View
                key={item.key}>
                <Text style={[styles.yellowLabelText, { color: "#404040", marginTop: 10, fontWeight: "normal", lineHeight: 14 }]}>{item.value}</Text>
            </View>
        )
    }

    _getScore(item) {
        return (
            <View
                key={item.key}>
                <Text style={[styles.roundEditTextWhiteLabel, { color: "#404040", marginTop: 10 }]}>{item.value}</Text>
            </View>
        )
    }

    _getHeadings(item) {
        return (
            <View>
                <Text style={[styles.yellowLabelText, { color: "#8AABFF", marginTop: 10, fontWeight: "normal", }]}>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <View style={[styles.containerRowCenter, { marginVertical: "5%" }]}>
                        <View style={[styles.roundDroupdownContainer, { width: "40%", marginRight: 5 }]}>
                            <Picker
                                selectedValue={this.state.season}
                                mode="dropdown"
                                label="Season"
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ season: itemValue })
                                }
                            >
                                <Picker.Item label="NHL" value="b" color="#404040" />
                                <Picker.Item label="NHL 2" value="a" color="#404040" />
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
                                <Picker.Item label="Season" value="b" color="#404040" />
                                <Picker.Item label="Season 2" value="a" color="#404040" />
                            </Picker>
                        </View>

                    </View>


                    <View style={[{ backgroundColor: "#FFF", marginHorizontal: "5%", borderRadius: 15, paddingVertical: 10, width: "120%" }]}>
                        <View style={[styles.containerRowStart, { borderBottomColor: "#dedede", borderBottomWidth: 1, padding: 5 }]}>
                            <View style={{ width: "15%", marginLeft: "2%" }}>
                                {
                                    this._getHeadings(this.state.headings[0])
                                }
                            </View>
                            <View style={{ width: "8%", marginHorizontal: "1%" }}>
                                {

                                    this._getHeadings(this.state.headings[1])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[2])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[3])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[4])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[5])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[6])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[7])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[8])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[9])
                                }
                            </View>
                            <View style={{ width: "5%", marginLeft: "4%" }}>
                                {
                                    this._getHeadings(this.state.headings[10])
                                }
                            </View>

                        </View>

                        <View style={[styles.containerRowStart]}>
                            <View style={{ width: "15%", height: "100%", marginLeft: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.seasons}
                                    renderItem={({ item }) => this._getSeasons(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "8%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.team}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "5%", height: "100%", marginHorizontal: "2%" }}>
                                <FlatList
                                    style={{ borderRightWidth: 1, borderRightColor: "#dedede88" }}
                                    data={this.state.GP}
                                    renderItem={({ item }) => this._getScore(item)}
                                    numColumns={1}
                                />
                            </View>


                        </View>

                    </View>

                    <View style={[styles.containerRowCenter, { marginTop: "15%" }]}>
                        <Text style={[styles.yellowButtonSmallText, { fontWeight: "normal", marginRight: 10 }]}>Games Remaining:
                        <Text style={[styles.yellowButtonSmallText,]}>12</Text> </Text>
                        <View style={[styles.roundDroupdownContainer, { width: "40%", marginLeft: 5 }]}>
                            <Picker
                                selectedValue={this.state.season}
                                mode="dropdown"
                                label="Time"
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ season: itemValue })
                                }
                            >
                                <Picker.Item label="Month" value="b" color="#404040" />
                                <Picker.Item label="Month 2" value="a" color="#404040" />
                            </Picker>
                        </View>

                    </View>

                    <View style={[styles.containerRowCenter, { marginTop: "5%" }]}>
                        <TouchableOpacity
                            style={[styles.yellowButtonSmall, { width: "40%", marginTop: 0, marginRight: "2%" }]}
                            onPress={() => Actions.MyFantasyTeam()} >
                            <Text style={[styles.yellowButtonSmallText, { color: "#0F1A38" }]}>Add to Fantasy Team</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.yellowButtonSmall, { width: "40%", backgroundColor: "#DEDEDE", borderWidth: 0, marginTop: 0, marginLeft: "2%" }]}
                            onPress={this.Actions.PlayerComparison()} >
                            <Text style={[styles.yellowButtonSmallText, { color: "#0F1A38" }]}>Compare Player</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        );
    }
};

export default TabPlayerStats;
