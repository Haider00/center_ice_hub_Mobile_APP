import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';
import DressARIImage from '../assets/img/dressARI.png';
import InfoImage from '../assets/img/info.png';




class TabAnaheimDucks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            GridViewItems: [
                { key: 1, name: "Rickard Rakell", image: DressARIImage, number: 89 },
                { key: 2, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 3, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 4, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 5, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 6, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 7, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 8, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 9, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 10, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 11, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },
                { key: 12, name: "Ryan Getzlaf", image: DressARIImage, number: 89, },

            ]
        }

        this._getFavoriteOption = this._getFavoriteOption.bind(this);
    }

    _getFavoriteOption(item) {
        return (
            <View
                key={item.key}
                style={[styles.favoriteOptionCard, {
                    backgroundColor: "transparent",
                }]}>
                <TouchableOpacity onPress={() => Actions.PlayerStats()}>
                    <View style={styles.sliderColumnContainer}>
                        <Image source={item.image} />
                        <View style={styles.sliderCirlceTextContainer}>
                            <Text style={styles.sliderCirlceText}>{item.number}</Text>
                        </View>
                    </View>
                    <Text style={[styles.FavoriteOptionTitle, { color: "#404040" }]}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )

    }

    render() {
        return (
            <View style={[styles.tabScene, { height: "100%", flex: 1 }]}>
                <View style={[styles.containerRow, { marginTop: "5%" }]}>
                    <View style={{ alignItems: "center", width: "33%" }}>
                        <Text style={[styles.checkboxDes, { textAlign: "center", color: "#40404088" }]}>LW</Text>
                    </View>
                    <View style={{ alignItems: "center", width: "33%" }}>
                        <Text style={[styles.checkboxDes, { textAlign: "center", color: "#40404088" }]}>C</Text>
                    </View>
                    <View style={{ alignItems: "center", width: "33%" }}>
                        <Text style={[styles.checkboxDes, { textAlign: "center", color: "#40404088" }]}>RW</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.GridViewItems}
                    renderItem={({ item }) => this._getFavoriteOption(item)}
                    numColumns={3}
                />

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.transparentButton, { marginTop: 25, backgroundColor: "#DEDEDE", borderWidth: 0 }]}
                        onPress={this.moveToLogin} >
                        <Text style={styles.roundGrayButtonText}>Reset Forwards</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.containerRowCenter, { marginTop: 20, }]}>
                    <Image source={InfoImage} />
                    <Text style={[styles.grayTextSmall, { marginLeft: 5 }]}>Click the players to view details</Text>
                </View>

            </View>

        );
    }
};

export default TabAnaheimDucks;
