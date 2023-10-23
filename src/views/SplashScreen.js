import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import styles from '../assets/css/styles';
import SplashScreenImage from '../assets/img/logo.png';
import BackgroundImage from '../assets/img/splashScreen.png';
import { Actions } from 'react-native-router-flux';

class SplashScreenView extends React.PureComponent {
  componentDidMount() {
    var that = this;
    setTimeout(function () {
      Actions.reset('drawer');
    }, 3000);
  }
  render() {
    return (
      <View style={styles.body}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}>
          <Image source={SplashScreenImage} />
          <View style={styles.footContainer}>
            {/* <Text style={styles.footerLogoText}>Center Ice Hub</Text> */}
            {/* <Text style={[styles.splashgreyText,{paddingVertical:10}]}>From One Fan To Another</Text> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default SplashScreenView;
