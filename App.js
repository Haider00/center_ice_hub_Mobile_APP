/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect, useState } from 'react';
import Index from './src/index.js';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AdmobComp from './src/components/AdmobComp';
import { getSeason, SeasonContext } from './src/utils/seasonUtils';
import { Settings } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  console.disableYellowBox = true;
  const [currentSeason, setCurrentSeason] = useState('');

  useEffect(() => {
    Settings.initializeSDK();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '626428153921-o1afq8tc44l3m85sik8k2c9ro3jafj06.apps.googleusercontent.com',
      iosClientId:
        '626428153921-rttg2k744su01jaq155jjdd0idvmtkci.apps.googleusercontent.com',
    });
    Settings.initializeSDK();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getSeason();
      setCurrentSeason(data);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <SeasonContext.Provider value={currentSeason}>
      <StatusBar barStyle="light-content" backgroundColor="#132958" />
      <Index />
      <AdmobComp />
    </SeasonContext.Provider>
  );
};
export default App;
