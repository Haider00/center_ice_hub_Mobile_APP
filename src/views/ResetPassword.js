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

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      process: false,
      email: "",
    };
    this.service = new Service();
    this.validation = new Validation();
  }

  async forget() {
    this.setState({ process: true });
    var emailValidation = this.validation.emailValidation(this.state.email);

    if (emailValidation == true) {
      var res = await this.service.forget(this.state.email);
      console.log("Res>>>>>>", res.data);
      if (res.data) {
        var data = res.data;
        console.log("forgetFrontEnd", data);
        if (data.message == "OTP sent successfully.") {
          alert(
            "An OTP has been sent on your mail. Enter OTP to reset password"
          );
          console.log("this.state.email", this.state.email);
          Actions.VerifyOTP({ email: this.state.email, nav: "forgetPassword" });
        } else if (data == "not success") {
          alert("Email not found");
        }
      } else {
        alert(
          "Oops Something went wrong please check your internet connection & try again..."
        );
      }
    } else {
      alert(emailValidation);
    }
    this.setState({ process: false });
  }

  render() {
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
                  placeholder="Enter your email"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={styles.roundEditText}
                  onChangeText={(text) => this.setState({ email: text })}
                />

                <TouchableOpacity
                  style={[styles.yellowButton, { marginTop: 20 }]}
                  onPress={() => this.forget()}
                >
                  <Text style={styles.yellowButtonText}>Send</Text>
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

export default ResetPassword;
