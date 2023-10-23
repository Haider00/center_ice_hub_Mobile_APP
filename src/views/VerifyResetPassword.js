import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../assets/css/styles";
import BackgroundImage from "../assets/img/Group.png";
import logoImage from "../assets/img/logo2.png";
import { Actions } from "react-native-router-flux";
import Service from "../Services/Service";
import Validation from "../Services/Validation";

class VerifyResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      process: false,
      password: "",
    };
    this.service = new Service();
    this.validation = new Validation();
  }

  async Login() {
    this.setState({ process: true });
    var passwordValidation = this.validation.passwordValidation(
      this.state.password
    );

    if (passwordValidation == true) {
      var res = await this.service.updatePassword(
        this.props.email,
        this.state.password
      );

      if (res.data == "Password updated.") {
        alert("Password updated.");
        Actions.Login();
      } else {
        alert(
          "Oops Something went wrong please check your internet connection & try again..."
        );
      }
    } else {
    }
    this.setState({ process: false });
  }

  render() {
    console.log("ResetEmail", this.props.email);
    return (
      <View style={styles.body}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
        >
          <View style={styles.containerColumn}>
            <View style={{ flex: 2, marginTop: 12 }}>
              <Image
                source={logoImage}
                style={[styles.logo2, { marginTop: 36, marginRight: 32 }]}
              />
            </View>
            <View style={{ flex: 7 }}>
              <View style={[{ marginHorizontal: 25, marginVertical: 20 }]}>
                <Text style={styles.headingText}>Reset Password</Text>

                <TextInput
                  placeholder="Enter new password"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={styles.roundEditText}
                  onChangeText={(text) => this.setState({ password: text })}
                />
                <TextInput
                  placeholder="Confirm password"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={styles.roundEditText}
                  // onChangeText={(text) => this.setState({ email: text })}
                />
                <TouchableOpacity
                  style={[styles.yellowButton, { marginTop: 20 }]}
                  onPress={() => this.Login()}
                >
                  <Text style={styles.yellowButtonText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        {this.state.process == true && (
          <View
            style={{
              position: "absolute",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 50,
            }}
          >
            <ActivityIndicator size="large" color="#2233aa" />
          </View>
        )}
      </View>
    );
  }
}

export default VerifyResetPassword;
