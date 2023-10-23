import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../assets/css/styles';
import heartIcon from '../assets/img/heart.png';
import leftArrowIcon from '../assets/img/leftArrow.png';

import { Actions } from 'react-native-router-flux';


class NavBarSecondary extends React.PureComponent {
    handleBack = (method) => {
        if (method != undefined)
            this.props.backPress()
        else
            Actions.pop()
    }
    render() {
        return (
            <View style={styles.navBar}>
                <View style={styles.navBarDrawerIconContainer}>
                    <TouchableWithoutFeedback onPress={() => this.handleBack(this.props.backPress)} >
                        <Image source={leftArrowIcon} />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.navBarTitle}>{this.props.title}</Text>
                {
                    this.props.heart &&
                    <View style={{ marginLeft: 8 }}>
                        <Image source={heartIcon} />
                    </View>
                }
                {
                    this.props.search &&
                    <View style={styles.navBarSearchIconContainer}>
                        {/* <TouchableWithoutFeedback onPress={() => Actions.Welcome()} >
                            <Image source={searchIcon} />
                        </TouchableWithoutFeedback> */}
                    </View>
                }
            </View>
        );
    }
};
export default NavBarSecondary;