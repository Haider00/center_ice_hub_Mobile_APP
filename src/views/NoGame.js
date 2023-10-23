import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../assets/css/styles';
import NoGameImage from '../assets/img/NoGame.png';

class NoGame extends React.Component {
  render() {
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 30,
          height: '100%',
          justifyContent: 'center',
        }}>
        <View style={styles.containerRowCenter}>
          <Image source={NoGameImage} resizeMode="contain" />
        </View>
        <Text style={styles.noGameTitle}>Well This Sucks!</Text>
        <Text style={styles.noGameDescription}>
          Did you expect something here with no games happening today? There is
          tons more on the app to do. Keep on clicking and hopefully tomorrow
          there will be some games.
        </Text>
      </View>
    );
  }
}

export default NoGame;
