import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, StatusBar } from 'react-native';
import styles from '../assets/css/styles';
import drawerIcon from '../assets/img/drawer.png';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon }  from '@fortawesome/react-native-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons'
import AppService from '../Services/AppServices';
import AsyncStorage from '@react-native-community/async-storage';

class NavBar extends React.Component {
  constructor(props) {
      super();
      this.state = {
          admobStatus: '0',
      }
  }

  async componentDidMount() {
    while(this.state.admobStatus=='0'){
        var admobStatus = await this.isgetAdmubStatus();
        this.setState({
          admobStatus: admobStatus ? admobStatus : '0'
        })
    }
  }

  async  isgetAdmubStatus() {
      var storage = new AppService();
      var v = await storage.getAdmubStatus();
      return v;
  }

    render() {
        return (
            <View style={styles.navBar}>
                <View style={styles.navBarDrawerIconContainer}>
                    <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()} >
                        <Image source={drawerIcon} />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.navBarTitle}>{this.props.title}</Text>
                <View style={styles.navBarSearchIconContainer}>
                  {
                    this.state.admobStatus =='0' && Platform.OS =='ios' ? (
                      <TouchableWithoutFeedback onPress={() => Actions.Restore()} >
                         <FontAwesomeIcon style={{ color: '#96979a' }} icon={faCog}  size={18}  />
                      </TouchableWithoutFeedback>
                    ) : null
                  }
                </View>
            </View>
        );
    }
};
export default NavBar;
