import React, { Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Platform,
} from 'react-native';
import RNIap, {
  ProductPurchase,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import styles from '../assets/css/styles';
import AsyncStorage from '@react-native-community/async-storage';
import profilePic from '../assets/img/profilePic.png';
import addCircle from '../assets/img/addCircle.png';
import HomeImage from '../assets/img/Drawer/HomeIcon.png';
import LineUpImage from '../assets/img/Drawer/Lineup.png';
import FantasyTeamImage from '../assets/img/Drawer/FantasyTeam.png';
import ExpectedGoaliesImage from '../assets/img/Drawer/ExpectedGoalies.png';
import LeaderboardsImage from '../assets/img/Leaderboards.png';
import PlayerComparisonImage from '../assets/img/Drawer/PlayerComparison.png';
import Playerem from '../assets/img/Drawer/Playerem.png';
import SettingsImage from '../assets/img/Settings.png';
import SplashScreenImage from '../assets/img/logo.png';
import { Actions } from 'react-native-router-flux';
import AppService from '../Services/AppServices';
import crossImage from '../assets/img/cross.png';
// import Service from '../Services/Service';

const itemCIH = Platform.select({
  ios: ['rniap_499_m1'],
  android: ['rniap_499_m1'],
});

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

class DrawerContent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      buttonText: 'Login',
      isLogin: false,
      fullName: 'Andrew Tsioans',
      logedin: true,
      privacy: false,
      terms: false,
      logoutPopup: false,
      userId: '',
      token: '',
      admobStatus: '0',
    };

    // this.service = new Service();
  }

  async componentDidMount() {
    var admobStatus = await this.isadmobStatus();
    this.setState({
      admobStatus: admobStatus ? admobStatus : '0',
    });
    if (this.state.admobStatus == '0') {
      try {
        const result = await RNIap.initConnection();
        await RNIap.getProducts(itemCIH);
      } catch (err) {
        console.log('error in cdm => ', err);
      }

      try {
        const purchases = await RNIap.getPurchaseHistory();
        if (purchases !== undefined && purchases.length !== 0) {
          var storage = new AppService();
          await AsyncStorage.setItem('@admob_status', '1');
          this.setState({
            admobStatus: '1',
          });
        }
      } catch (e) {
        console.log(e, 'getPurchaseHistory');
        // Alert.alert('Error', JSON.stringify(e))
      }

      purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: ProductPurchase) => {
          console.log('purchaseUpdatedListener', purchase);
          if (
            purchase.purchaseStateAndroid === 1 &&
            !purchase.isAcknowledgedAndroid
          ) {
            try {
              const ackResult = await acknowledgePurchaseAndroid(
                purchase.purchaseToken,
              );
              console.log('ackResult', ackResult);
            } catch (ackErr) {
              console.warn('ackErr', ackErr);
            }
          }
          try {
            await this.purchaseConfirmed();
          } catch (e) {
            console.log(e, 'purchaseConfirmed');
          }
          purchaseErrorSubscription = purchaseErrorListener(
            (error: PurchaseError) => {
              console.log('purchaseErrorListener', error);
              // alert('purchase error', JSON.stringify(error));
            },
          );
        },
      );
    }
  }

  componentWillUnmount() {
    RNIap.endConnection();
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }

  async purchaseConfirmed() {
    // var res = await this.service.removeAds(this.state.userId, this.state.token)
    // if (res.status === 200) {
    //   var storage = new AppService();
    //   await AsyncStorage.setItem('@admob_status', '1');
    //   this.setState({
    //     admobStatus: '1'
    //   })
    //   Alert.alert("Success", "You purchase was successful!");
    // }
    var admobStatus = await this.isadmobStatus();
    if (admobStatus == '0') {
      var storage = new AppService();
      await AsyncStorage.setItem('@admob_status', '1');
      this.setState({
        admobStatus: '1',
      });
      Alert.alert(
        'Success',
        'Thank you for your purchase. You are now ad free.',
      );
    }
  }

  async componentDidUpdate() {
    while (
      this.state.isLogin == false &&
      this.props.navigation.state.isDrawerOpen
    ) {
      var login = await this.isLogin();
      var fullname = await this.getuserfullname();
      var userId = await this.getUserId();
      // var token = await this.getToken();
      var admobStatus = await this.isadmobStatus();
      if (login) {
        this.setState({
          buttonText: 'Logout',
          isLogin: true,
          fullName: fullname,
          userId: userId,
          admobStatus: admobStatus ? admobStatus : '0',
        });
      }
    }
  }

  async requestPurchase() {
    const productID = 'rniap_499_m1';
    try {
      RNIap.requestPurchase(productID);
    } catch (e) {
      Alert.alert('Error', e);
    }
  }

  async isLogin() {
    var storage = new AppService();
    var v = await storage.isUserLogin();
    return v;
  }

  async isadmobStatus() {
    var storage = new AppService();
    var v = await storage.getAdmubStatus();
    return v;
  }

  async getuserfullname() {
    var storage = new AppService();
    var v = await storage.getUserFullName();
    return v;
  }

  async getUserId() {
    var storage = new AppService();
    var v = await storage.getUserId();
    return v;
  }

  // async getToken() {
  //   var storage = new AppService();
  //   var v = await storage.getToken();
  //   return v;
  // }

  async movetoMyFantasyTeam() {
    // if ( await this.isLogin()) {
    Actions.MyFantasyTeam();
    // }
    // else {
    Actions.drawerClose();
    //     Actions.Login({ fromScreen: "Fantasy" })
    // }
  }

  async handleAction() {
    var storage = new AppService();
    if (await this.isLogin()) {
      Actions.drawerClose();
      storage.removeLoginData();
      this.setState({ buttonText: 'Login', isLogin: false, logedin: false });
      Alert.alert('', 'You have successfully logged out');
    } else {
      Actions.drawerClose();
      Actions.Login();
    }
  }

  setModalVisible(visible) {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    if (this.state.privacy) this.setState({ privacy: fasle });
    if (this.state.terms) this.setState({ terms: fasle });
  }
  _showModelLogin = (item) => {
    return (
      <View style={[styles.modelBackground, { position: 'absolute' }]}>
        <View style={styles.containerMiddle}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 20, marginTop: '80%', borderRadius: 12 },
            ]}>
            <View style={{ marginHorizontal: 28, marginTop: 31 }}>
              <Text
                style={[
                  styles.modelTitle,
                  { fontSize: 18, textAlign: 'center', color: '#ffffffdd' },
                ]}>
                You have successfully logged out
              </Text>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 10, paddingBottom: 5 },
              ]}>
              <View
                style={{
                  width: '40%',
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={[
                    styles.yellowButtonSmall,
                    { borderWidth: 0, height: 40 },
                  ]}
                  onPress={() => this.setState({ logoutPopup: false })}>
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Fragment>
        <View style={styles.containerDrawer}>
          <View
            style={[
              styles.headerDrawer,
              this.state.isLogin ? { padding: 0 } : { paddingBottom: 0 },
            ]}>
            <View style={[styles.containerRowCenter]}>
              <Image
                source={SplashScreenImage}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>

          {this.state.isLogin && (
            <View style={[styles.topDrawer, { paddingBottom: 0 }]}>
              {/* <View style={[styles.containerColumn,{}]}>
                                <View >

                                    <Image source={profilePic} />
                                    <TouchableHighlight style={{ position: "absolute", bottom: 2, left: 45 }}>
                                        <Image source={addCircle} />
                                    </TouchableHighlight>
                                     <Text style={[styles.modelTitle, ]}>Welcome</Text>
                                     <Text style={[styles.modelTitle, ]}>{this.state.fullName}</Text>

                                </View>

                    </View> */}

              <Text style={[styles.modelTitle, { marginLeft: 15 }]}>
                Welcome
              </Text>
              <Text
                style={[styles.modelTitle, { marginLeft: 15, paddingTop: 4 }]}>
                {this.state.fullName}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.bottomDrawer,
              this.state.isLogin
                ? { justifyContent: 'center' }
                : { justifyContent: 'center' },
            ]}>
            <TouchableOpacity
              style={[
                styles.containerRowStart,
                { paddingHorizontal: 30, paddingVertical: 10 },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                Actions.drawerClose();
                Actions.Home();
              }}>
              <Image
                source={HomeImage}
                resizeMode="contain"
                style={{ width: 40 }}
              />
              <Text
                style={[
                  styles.underlineText,
                  {
                    textDecorationLine: 'none',
                    alignSelf: 'center',
                    paddingHorizontal: 5,
                  },
                ]}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.containerRowStart,
                { paddingHorizontal: 30, paddingVertical: 10 },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                Actions.drawerClose();
                Actions.TeamLineups();
              }}>
              <Image
                source={LineUpImage}
                resizeMode="contain"
                style={{ width: 40 }}
              />
              <Text
                style={[
                  styles.underlineText,
                  {
                    textDecorationLine: 'none',
                    alignSelf: 'center',
                    paddingHorizontal: 5,
                  },
                ]}>
                Team Lineups
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.containerRowStart,
                { paddingHorizontal: 30, paddingVertical: 10 },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                Actions.drawerClose();
                Actions.MyFantasyTeam();
              }}>
              <Image
                source={FantasyTeamImage}
                resizeMode="contain"
                style={{ width: 40 }}
              />
              <Text
                style={[
                  styles.underlineText,
                  {
                    textDecorationLine: 'none',
                    alignSelf: 'center',
                    paddingHorizontal: 5,
                  },
                ]}>
                My Fantasy Team
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.containerRowStart,
                { paddingHorizontal: 30, paddingVertical: 10 },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                Actions.drawerClose();
                Actions.ExpectedGoalies();
              }}>
              <Image
                source={ExpectedGoaliesImage}
                resizeMode="contain"
                style={{ width: 40 }}
              />
              <Text
                style={[
                  styles.underlineText,
                  {
                    textDecorationLine: 'none',
                    alignSelf: 'center',
                    paddingHorizontal: 5,
                  },
                ]}>
                Primary Goalies
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                            style={[styles.containerRowStart, { marginHorizontal: "15%", margin: "3%", marginBottom: 10 }]}
                            activeOpacity={0.8}
                            onPress={() => { Actions.drawerClose(); Actions.PlayerLeaderboards() }}>
                            <Image source={LeaderboardsImage} resizeMode="contain" />
                            <Text
                                style={[styles.underlineText, { textDecorationLine: "none", marginVertical: 10, marginHorizontal: 13 }]}
                            >Player Leaderboards</Text>
                        </TouchableOpacity> */}
            <TouchableOpacity
              style={[
                styles.containerRowStart,
                { paddingHorizontal: 30, paddingVertical: 10 },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                Actions.drawerClose();
                Actions.PlayerComparison();
              }}>
              <Image
                source={PlayerComparisonImage}
                resizeMode="contain"
                style={{ width: 40 }}
              />
              <Text
                style={[
                  styles.underlineText,
                  {
                    textDecorationLine: 'none',
                    alignSelf: 'center',
                    paddingHorizontal: 5,
                  },
                ]}>
                Player Comparisons
              </Text>
            </TouchableOpacity>
            {this.state.admobStatus == '0' ? (
              <TouchableOpacity
                style={[
                  styles.containerRowStart,
                  { paddingHorizontal: 30, paddingVertical: 10 },
                ]}
                activeOpacity={0.8}
                onPress={() => this.requestPurchase()}>
                <Image
                  source={Playerem}
                  resizeMode="contain"
                  style={{ width: 40 }}
                />
                <Text
                  style={[
                    styles.underlineText,
                    {
                      textDecorationLine: 'none',
                      alignSelf: 'center',
                      paddingHorizontal: 5,
                    },
                  ]}>
                  Remove Ads
                </Text>
              </TouchableOpacity>
            ) : null}

            {/* <TouchableOpacity
                            style={[styles.containerRowStart, { marginHorizontal: "15%", marginVertical: "3%", }]}
                            activeOpacity={0.8}
                            onPress={() => { Actions.drawerClose(); Actions.Setting() }}>
                            <Image source={SettingsImage} resizeMode="contain" />
                            <Text
                                style={[styles.underlineText, { textDecorationLine: "none", marginVertical: 2, marginHorizontal: 13 }]}
                            >Settings</Text>
                        </TouchableOpacity> */}

            <View style={{ alignSelf: 'center', width: '70%' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.yellowButton, { marginTop: 25, height: 40 }]}
                onPress={() => this.handleAction()}>
                <Text style={styles.yellowButtonText}>
                  {this.state.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerDrawer}>
            <View
              style={[
                styles.containerRowCenter,
                { paddingHorizontal: 20, marginBottom: 5 },
              ]}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'flex-start',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={styles.underlineText}
                    onPress={() => {
                      Actions.TermsOfUse();
                    }}>
                    Terms Of Use
                  </Text>
                  <Text
                    style={[styles.underlineText, { paddingLeft: 10 }]}
                    onPress={() => {
                      Actions.PrivacyPolicy();
                    }}>
                    Privacy Policy
                  </Text>
                </View>
              </View>
            </View>
            {/*  <View style={[styles.containerRowCenter, { paddingHorizontal: 20, marginBottom: 5 }]}>

                            <View style={[styles.containerColumn, { }]}>
                                <Text style={[styles.footerLogoText, { fontSize: 12, lineHeight: 14 }]}>Ver : 1.0</Text>

                            </View>
                        </View>
                         <View style={[styles.containerRowCenter, { paddingHorizontal: 20, marginBottom: 5 }]}>

                            <View style={[styles.containerColumn, { }]}>
                                <Text style={[styles.footerLogoText, { fontSize: 12, lineHeight: 14 }]}>Powered by Center Ice Hub Inc</Text>

                            </View>
                        </View> */}
          </View>

          {/* <View style={styles.footerDrawer}>
                        <View style={[styles.containerRowCenter, { marginHorizontal: 30, marginBottom: 5 }]}>
                            <Image source={SplashScreenImage} style={{ width: 70, height: 70 }} />
                            <View style={[styles.containerColumn, { marginLeft: 10, }]}>
                                <Text style={[styles.footerLogoText, { fontSize: 12, lineHeight: 14 }]}>Center Ice Hub</Text>
                                <Text style={[styles.greyText, { fontSize: 9 }]}>From One Fan To Another</Text>
                            </View>
                        </View>
                    </View> */}
          {/* {
                            this.state.logoutPopup &&
                            this._showModelLogin()

                        } */}
        </View>
      </Fragment>
    );
  }
}
export default DrawerContent;
