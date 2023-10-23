import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import logoImage from '../assets/img/logo2.png';
import { Actions } from 'react-native-router-flux';

class CreatePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pass: '',
      confirmPass: '',
    };
  }

  submit = () => {
    Actions.reset('Login');
  };

  render() {
    return (
      <View style={styles.body}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}>
          <View style={styles.containerColumn}>
            <View style={{ flex: 2, marginTop: 12 }}>
              <Image
                source={logoImage}
                style={[styles.logo2, { marginTop: 36, marginRight: 32 }]}
              />
            </View>
            <View style={{ flex: 7 }}>
              <View style={[{ marginHorizontal: 25, marginVertical: 15 }]}>
                <Text style={styles.headingText}>Create New Password</Text>

                <TextInput
                  placeholder="Enter new password"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={[styles.roundEditText, { marginTop: 20 }]}
                  onChangeText={(text) => this.setState({ pass: text })}
                />

                <TextInput
                  placeholder="Confirm new password"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={[styles.roundEditText, { marginTop: 15 }]}
                  onChangeText={(text) => this.setState({ confirmPass: text })}
                />

                <TouchableOpacity
                  style={[styles.yellowButton, { marginTop: 15 }]}
                  onPress={() => this.submit()}>
                  <Text style={styles.yellowButtonText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default CreatePassword;
