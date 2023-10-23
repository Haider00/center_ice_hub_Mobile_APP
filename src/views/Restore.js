import React from 'react';
import { View, ImageBackground, ScrollView, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';
import RNIap, {
  ProductPurchase,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import AsyncStorage from '@react-native-community/async-storage';
import AppService from '../Services/AppServices';


const itemCIH = Platform.select({
   ios: [
       'rniap_499_m1',
   ],
   android: [
       'rniap_499_m1',
   ]
});


class Restore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            logedin:true,
            admobStatus: '0',
        }

    }

    async componentDidMount(){
        var admobStatus = await this.isadmobStatus();
        this.setState({
          admobStatus: admobStatus ? admobStatus : '0'
        })

    }

    async  isadmobStatus() {
        var storage = new AppService();
        var v = await storage.getAdmubStatus();
        return v;
    }


    componentWillUnmount() {
      RNIap.endConnection();
    }

    async getPurchased() {
      try {
         const result = await RNIap.initConnection();
         await RNIap.getProducts(itemCIH);
       } catch (err) {
         console.log('error in cdm => ', err);
       }
       try {
         const purchases = await RNIap.getPurchaseHistory();
         console.log(purchases, 'purchasespurchases');
         if (purchases !== undefined && purchases.length !== 0 ) {
           var storage = new AppService();
           await AsyncStorage.setItem('@admob_status', '1');
           this.setState({
             admobStatus: '1'
           })
           Alert.alert('Restore Successful', 'You successfully restored your purchases!');
         }
       } catch (e) {
         console.log(e, 'getPurchaseHistory');
         // Alert.alert('Error', JSON.stringify(e))
       }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.body}>
                    <ImageBackground source={BackgroundImage} style={styles.backgroundImage} >
                        <View style={{ width: "80%", height: "100%", margin: "5%" }} >
                            <TouchableOpacity
                                style={styles.yellowButton}
                                onPress={() =>  this.getPurchased()}>
                                <Text style={styles.yellowButtonText}>Restore Purchases</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
};

export default Restore;
