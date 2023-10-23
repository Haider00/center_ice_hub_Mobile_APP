import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, TouchableHighlight,FlatList } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';
import FantasyTeamImage from '../assets/img/FantasyTeam.png';
import CrossImage from '../assets/img/cross.png';
import AddDressImage from '../assets/img/addDress.png';
import DressARIImage from '../assets/img/dressARI.png';
import CircleCrossImage from '../assets/img/circleCross.png';
import InfoImage from '../assets/img/info.png';




class TabForwads extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            GridViewItems: [
                { key: 1, name: "Rickard Rakell", image: DressARIImage, number: 89, circleCross: CircleCrossImage, selected: true },
                { key: 2, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 3, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 4, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 5, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 6, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 7, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 8, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 9, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 10, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 11, name: "+ Add Player", image: AddDressImage, selected: false },
                { key: 12, name: "+ Add Player", image: AddDressImage, selected: false },

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
                <View style={styles.sliderColumnContainer}>
                    <TouchableOpacity onPress={() => this.props.showTeamDailogue()}>
                        <Image source={item.image} />
                    </TouchableOpacity>
                    <View style={styles.sliderCirlceTextContainer}>
                        <Text style={styles.sliderCirlceText}>{item.number}</Text>
                    </View>
                </View>
                <Text
                    style={
                        item.selected ?
                            [styles.FavoriteOptionTitle, { color: "#404040" }] :
                            [styles.FavoriteOptionTitle, { color: "#40404044" }]
                    }>{item.name}</Text>
                {
                    item.selected &&
                    <Image source={item.circleCross} style={{ marginTop: 5 }} />
                }
            </View>
        )

    }

    render() {
        return (
            <View style={[styles.tabScene, { height: "200%" }]}>
                <View style={[styles.sliderTabView, { height: "25%", paddingHorizontal: 30 }]}>
                    <Image source={CrossImage} style={{ position: "absolute", top: 2, right: 2 }} />
                    <View style={styles.containerRowStart}>
                        <Image source={FantasyTeamImage} />
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ borderBottomColor: "#ffffff33", borderBottomWidth: 1, paddingVertical: 5 }}>
                                <Text style={[styles.greyText, { fontWeight: "500", color: "#FFF" }]}>Build your fantasy team!</Text>
                            </View>
                            <Text style={[styles.containerMiddlemodelDescription, { color: "#8AABFF" }]}>Start adding your favorite players to build your own custom fantasy team. Tap the '+' icon to begin adding your players. When you want to remove them click on the x below them or if you'd like to reset all click on the button below.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerRow}>
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
                <View style={{ height: "55%" }}>
                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) => this._getFavoriteOption(item)}
                        numColumns={3}
                    />
                </View>

                <View style={styles.containerRowCenter}>
                    <View style={{ marginLeft: "5%", marginRight: "2%", width: "40%" }}>
                        <TouchableOpacity
                            style={[styles.transparentButton, { marginTop: 10, backgroundColor: '#FDB734', borderWidth: 0, height: 40 }]}
                            onPress={this.moveToLogin} >
                            <Text style={[styles.roundGrayButtonText, { color: "#0F1A38" }]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: "5%", marginLeft: "2%", width: "40%" }}>
                        <TouchableOpacity
                            style={[styles.transparentButton, { marginTop: 10, backgroundColor: "#DEDEDE", borderWidth: 0, height: 40 }]}
                            onPress={() => this.props.showTeamDailogue()} >
                            <Text style={styles.roundGrayButtonText}>Reset Forwards</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.containerRowCenter, { marginTop: 15 }]}>
                    <Image source={InfoImage} />
                    <Text style={[styles.grayTextSmall, { marginLeft: 5 }]}>Click the players to view details</Text>
                </View>
            </View >

        );
    }
};

export default TabForwads;
