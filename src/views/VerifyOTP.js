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

class VerifyOTP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      process: false,
      otp: "",
    };
    this.service = new Service();
    this.validation = new Validation();
  }

  async VerifyOTP() {
    this.setState({ process: true });

    if (this.state.otp) {
      console.log("this.props.email>>>", this.props.email);
      var res = await this.service.verifyOtp(this.props.email, this.state.otp);
      if (res.data == "Email verified successfully.") {
        if (this.props.nav == "login") {
          alert("Email verified Successfully, Add new Password");
          Actions.VerifyResetPassword({ email: this.props.email });
        } else if (this.props.nav == "signup") {
          alert("Email verified Successfully");
          Actions.Login({ email: this.props.email });
        } else if (this.props.nav == "forgetPassword") {
          alert("Email verified Successfully, Add new Password");
          Actions.VerifyResetPassword({ email: this.props.email });
        }
      } else if (res.data == "OTP has expired. Please request a new one.") {
        alert("OTP has expired. Please request a new one");
      } else {
        alert("Invalid Otp, Please Enter Correct OTP...");
      }
    } else {
      alert("please enter your OTP");
    }
    this.setState({ process: false });
  }

  async resendOtp() {
    this.setState({ process: true });

    var res = await this.service.resendOtp(this.props.email);
    console.log("ResponseEmail>>>", res.data);
    // if (res.data == "Email verified successfully.") {
    //   if (this.props.nav == "login") {
    //     alert("Email verified Successfully, Add new Password");
    //     Actions.VerifyResetPassword({ email: this.props.email });
    //   } else if (this.props.nav == "signup") {
    //     alert("Email verified Successfully");
    //     Actions.Login({ email: this.props.email });
    //   }
    // } else if (res.data == "OTP has expired. Please request a new one.") {
    //   alert("OTP has expired. Please request a new one");
    // } else {
    //   alert("Invalid Otp, Please Enter Correct OTP...");
    // }
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
                <Text style={styles.headingText}>Verify OTP</Text>

                <TextInput
                  placeholder="Enter your OTP"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={styles.roundEditText}
                  value={this.state.otp}
                  onChangeText={(text) => this.setState({ otp: text })}
                />

                <Text
                  style={styles.requestANewOtp}
                  onPress={() => this.resendOtp()}
                >
                  Request New OTP
                </Text>

                <TouchableOpacity
                  style={[styles.yellowButton, { marginTop: 20 }]}
                  onPress={() => this.VerifyOTP()}
                >
                  <Text style={styles.yellowButtonText}>Verify OTP</Text>
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

export default VerifyOTP;
