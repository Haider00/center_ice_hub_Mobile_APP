import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "../assets/css/styles";
import BackgroundImage from "../assets/img/Group.png";
import logoImage from "../assets/img/logo2.png";
import { Actions } from "react-native-router-flux";
import Service from "../Services/Service";
import AppService from "../Services/AppServices";
import Validation from "../Services/Validation";
import { NavigationEvents } from "react-navigation";
import GoogleAuth from "../components/Auth/google";
import FacebookAuth from "../components/Auth/fb";
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      process: false,
      userName: "",
      password: "",
      email: "",
      logedin: false,
    };

    this.service = new Service();
    this.storage = new AppService();
    this.validation = new Validation();

    this.login = this.login.bind(this);
  }

  checkLogin = async () => {
    var storage = new AppService();
    var v = await storage.isUserLogin();
    if (v) {
      Actions.pop();
    }
  };
  async login(info) {
    this.setState({ process: true });
    if (this.state.password && this.state.userName) {
      var res = await this.service.login(
        this.state.userName,
        this.state.password
      );

      if (res.data) {
        var data = res.data;
        console.log("Data", data);
        if (data.message === "Verify your email") {
          Alert.alert("Please Check Your Email");
          Actions.VerifyOTP({ email: this.state.userName, nav: "login" });
        } else if (data.message === "Invalid email or password") {
          alert("Invalid email or password");
        } else if (data.message === "User not found") {
          alert("User not found");
        } else {
          console.log(res.data);

          var id = data.user.id;
          var userName = this.state.userName;
          var emptyValue = "";
          var country = "Country";
          var yesValue = "yes";

          var flag = await this.storage.storeLoginData(
            this.state.userName,
            this.state.password,
            id + "",
            userName,
            emptyValue,
            country,
            yesValue
          );
          console.log("flag", flag);
          if (flag) {
            if (
              this.props.fromScreen === "PlayerDetail" ||
              this.props.fromScreen === "FavoriteOptions"
            ) {
              Actions.pop();
            } else if (this.props.fromScreen === "Fantasy") {
              Actions.MyFantasyTeam();
            } else {
              Actions.Home();
            }
          }
        }
      } else {
        if (info === "local") {
          alert("Invalid email or password!");
        } else {
          Alert.alert(
            "related email is already register as Center Ice Hub user"
          );
        }
      }
    } else {
      alert("Please Check Your Email and Password");
    }
    this.setState({ process: false });
  }

  handleGoogleLogin = async (info) => {
    const { user = {} } = info;
    const { email = "", id = "", name = "" } = user;

    this.service
      .signUp(name, "", "Country", email, id, true)
      .then(({ data }) => {
        this.setState({ userName: email, password: id }, () => {
          this.login("google");
        });
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong");
      });
  };

  handleFBlogin = async (info) => {
    const { email = "", name = "", userID = "" } = info;
    if (email) {
      this.service
        .signUp(name, "", "Country", email, userID, true)
        .then(({ data }) => {
          this.setState({ userName: email, password: userID }, () => {
            this.login("fb");
          });
        })
        .catch((err) => {
          Alert.alert("Something Went Wrong");
        });
    } else {
      Alert.alert("please add email in your account");
    }
  };

  render() {
    return (
      <View style={styles.body}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
        >
          <NavigationEvents onDidFocus={() => this.checkLogin()} />
          <View style={styles.containerColumn}>
            {/* <View style={{ flex: 2, marginTop: 12 }}>
              <Image
                source={logoImage}
                style={[styles.logo2, { marginTop: 36, marginRight: 32 }]}
              />
            </View> */}
            <View
              style={{
                width: "100%",
                paddingVertical: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={logoImage}
                style={[{ marginTop: 36, marginRight: 32 }]}
              />
            </View>
            <View style={{ flex: 7 }}>
              <View style={[{ marginHorizontal: 25, marginVertical: 20 }]}>
                <Text style={styles.headingText}>Login</Text>

                <TextInput
                  placeholder="Username"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  style={styles.roundEditText}
                  onChangeText={(text) => this.setState({ userName: text })}
                />

                <TextInput
                  placeholder="Password"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ffffffaa"
                  secureTextEntry={true}
                  style={styles.roundEditText}
                  onChangeText={(text) => this.setState({ password: text })}
                />

                <Text
                  style={[styles.underlineText, { marginTop: 20 }]}
                  onPress={() => Actions.ResetPassword()}
                >
                  Forgot Password?
                </Text>

                <TouchableOpacity
                  style={[styles.yellowButton, { marginTop: 30 }]}
                  activeOpacity={0.9}
                  onPress={() => this.login("local")}
                >
                  <Text style={styles.yellowButtonText}>Login</Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 30,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.greyText}>New User? </Text>
                  <Text
                    style={styles.underlineText}
                    onPress={() => Actions.SignUp()}
                  >
                    Create an Account
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    height: 100,
                    justifyContent: "space-between",
                    width: "75%",
                  }}
                >
                  <GoogleAuth googleLogin={this.handleGoogleLogin} />
                  <FacebookAuth FBlogin={this.handleFBlogin} />
                </View>
              </View>
            </View>
          </View>
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
        </ImageBackground>
      </View>
    );
  }
}

export default Login;
