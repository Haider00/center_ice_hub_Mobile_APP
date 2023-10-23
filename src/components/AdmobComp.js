import React from 'react';
import { View, Platform } from 'react-native';
import { AdMobBanner } from 'react-native-admob'
import { Actions } from 'react-native-router-flux';
import AppService from '../Services/AppServices';
import styles from '../assets/css/styles';

class AdmobComp extends React.Component {

  constructor(prpos) {
      super(prpos);
      this.state = {
        admubStatus: '0',
        isLogin: false
      }
  }

  async componentDidMount() {
    // var admubStatus = await this.isgetAdmubStatus();
    // this.setState({
    //   admubStatus: admubStatus,
    // })
    while(this.state.admubStatus=='0'){
        // var login = await this.isLogin();
        var admubStatus = await this.isgetAdmubStatus();
        this.setState({
          admubStatus: admubStatus,
          // isLogin: true,
        })
    }
  }

  // async  isLogin() {
  //     var storage = new AppService();
  //     var v = await storage.isUserLogin();
  //     return v;
  // }

  async isgetAdmubStatus() {
      var storage = new AppService();
      var v = await storage.getAdmubStatus();
      return v;
  }

  bannerError = (e) => {
      //////
  }
  render() {
    let adUnitId = Platform.OS === 'ios' ? 'ca-app-pub-0238621542326147/4926343297' : 'ca-app-pub-0238621542326147/9407023094'
    return this.state.admubStatus === '1' || Actions.currentScene === 'SplashScreen' ? null : (
      <View style={styles.addsContainer}>
          <AdMobBanner
              adSize="banner"
              adUnitID={adUnitId}
              didFailToReceiveAdWithError={(e) => this.bannerError(e)} />

      </View>
    )
  }
}

export default AdmobComp
