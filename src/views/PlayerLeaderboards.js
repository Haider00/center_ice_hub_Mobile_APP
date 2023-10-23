import React from 'react';
import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabPlayersLeaderboards from './TabPlayersLeaderboards';
import TabGoaliesLeaderboards from './TabGoaliesLeaderboards';

const FirstRoute = () => (
    <TabPlayersLeaderboards />
);

const SecondRoute = () => (
    <TabGoaliesLeaderboards />
);

class PlayerLeaderboards extends React.Component {

    constructor(prpos) {
        super(prpos);

        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Players' },
                { key: 'second', title: 'Goalies' },
            ],
        }
    }

    _renderTabBar = props => {
        return (
            <View style={[styles.tabBar, { justifyContent: "center", alignItems: "center" }]}>
                {props.navigationState.routes.map((route, i) => {
                    if (i === props.navigationState.index) {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[styles.tabStyle, { borderBottomColor: "#8AABFF", borderBottomWidth: 2 }]}
                                onPress={() => this.setState({ index: i })}>
                                <Text style={styles.selectedTabText}>{route.title}</Text>
                            </TouchableOpacity>
                        );
                    }
                    else {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={styles.tabStyle}
                                onPress={() => this.setState({ index: i })}>
                                <Text style={styles.unselectedTabText}>{route.title}</Text>
                            </TouchableOpacity>
                        );
                    }
                })}
            </View>
        );
    };

    bannerError = (e) => {
        //////
    }


    render() {
        return (
            <View>
                <ScrollView style={{ height: "100%", }}>
                    <View style={[styles.body, { backgroundColor: "#F8F8F8", paddingBottom: 50 }]}>
                        <View style={{ flex: 1, width: "100%", flexDirection: "row" }}>
                            <TabView
                                navigationState={this.state}
                                renderScene={SceneMap({
                                    first: FirstRoute,
                                    second: SecondRoute,
                                })}
                                onIndexChange={(index) => this.setState({ index })}
                                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                                renderTabBar={this._renderTabBar}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default PlayerLeaderboards;
