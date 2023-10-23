import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';
import DressARIImage from '../assets/img/dressARI.png';
import InfoImage from '../assets/img/info.png';
import PlusImage from '../assets/img/plus.png';
import crossImage from '../assets/img/crossGray.png';





class TabAnaheimDucksInjuries extends React.Component {
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
            ],
            descriptionFlag: false,

        }

        this._getFavoriteOption = this._getFavoriteOption.bind(this);
        this.showDescription = this.showDescription.bind(this);

    }

    _getFavoriteOption(item) {
        return (
            <View
                key={item.key}
                style={[styles.favoriteOptionCard, {
                    backgroundColor: "transparent", marginTop: 10
                }]}>
                <View style={styles.sliderColumnContainer}>
                    <Image source={item.image} />
                    <View style={styles.sliderCirlceTextContainer}>
                        <Text style={styles.sliderCirlceText}>{item.number}</Text>
                    </View>
                </View>
                <Text style={[styles.FavoriteOptionTitle, { color: "#404040" }]}>{item.name}</Text>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.setState({ descriptionFlag: true })}>
                    <Image source={PlusImage} />
                </TouchableOpacity>
            </View>
        )

    }

    showDescription(item) {
        return (
            <View style={[{ backgroundColor: "#FFF", marginHorizontal: "5%", borderRadius: 15, paddingVertical: 10 }]}>
                <View style={styles.containerColumn}>
                    <TouchableOpacity
                        style={styles.modelCrossBUtton}
                        onPress={() => {
                            this.setState({ descriptionFlag: false });
                        }}
                    >
                        <Image source={crossImage} />
                    </TouchableOpacity>

                    <View style={[styles.containerColumn, { width: "90%" }]}>
                        <View style={styles.containerRowStart}>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", marginLeft: 10 }]}>Date of Injury:</Text>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", fontWeight: "normal" }]}> Thu, Jun 13, 2019 </Text>
                        </View>
                        <View style={styles.containerRowStart}>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", marginLeft: 10 }]}>Injury Type:</Text>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", fontWeight: "normal" }]}> Hip </Text>
                        </View>
                        <View style={[styles.containerRowStart]}>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", marginLeft: 10 }]}>Injury Note:
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", fontWeight: "normal", textAlign: "left" }]}> Kesler is expected to miss the entire 2019-20 season after having offseason right hip surgery. </Text>
                            </Text>
                        </View>

                    </View>
                </View>

            </View>
        );
    }




    render() {
        return (
            <View style={[styles.tabScene, { height: "100%", flex: 1 }]}>
                <View style={styles.containerColumn}>
                    <View style={styles.containerRowStart}>
                        {
                            this._getFavoriteOption(this.state.GridViewItems[0])
                        }
                        {
                            this._getFavoriteOption(this.state.GridViewItems[1])
                        }
                        {
                            this._getFavoriteOption(this.state.GridViewItems[2])
                        }
                    </View>
                    {
                        this.state.descriptionFlag &&
                        this.showDescription(this.state.GridViewItems[2])
                    }

                    <View style={styles.containerRowStart}>
                        {
                            this._getFavoriteOption(this.state.GridViewItems[3])
                        }
                        {
                            this._getFavoriteOption(this.state.GridViewItems[4])
                        }
                        {
                            this._getFavoriteOption(this.state.GridViewItems[5])
                        }
                    </View>
                    {/* {
                        this.state.descriptionFlag &&
                        this.showDescription(this.state.GridViewItems[2])
                    } */}

                </View>


                <View style={[styles.containerRowCenter, { marginTop: 20, }]}>
                    <Image source={InfoImage} />
                    <Text style={[styles.grayTextSmall, { marginLeft: 5 }]}>Click the players to view details</Text>
                </View>

            </View>

        );
    }
};

export default TabAnaheimDucksInjuries;
