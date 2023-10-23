import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';

class Example extends React.Component {
  render() {
    return (
      <View style={styles.body}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}>
          <Text>Example</Text>
        </ImageBackground>
      </View>
    );
  }
}

export default Example;
