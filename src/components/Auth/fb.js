import React from 'react';
import { Platform, Text, StyleSheet } from 'react-native';
import { LoginManager, Profile, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import Service from '../../Services/Service';
// import {useAuthDispatch} from '../../context/auth.context';
// import {api} from '../../services';

const FacebookAuth = ({ FBlogin = () => {} }) => {
  //   const authDispatch = useAuthDispatch();
  const service = new Service();
  const handleFbLogin = async () => {
    if (Platform.OS === 'android') {
      await LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          console.log('Facebook Login Cancelled');
        } else {
          const accessToken = await AccessToken.getCurrentAccessToken();
          let info = await Profile.getCurrentProfile();

          service
            .getFacebookUserInfo({
              token: accessToken.accessToken,
              userId: info.userID,
            })
            .then((profileInfo) => {
              info = { ...info, email: profileInfo.data.email };
              if (info.email) {
                FBlogin(info);
              } else {
                // toastEvent(
                //   'please check login permission for email or check your facebook profile',
                // );
              }
            })
            .catch((error) => {
              // console.log('Login Error>>>', error);
              // toastEvent('Something Went Wrong While Login With Facebook');
            });
        }
      },
      async function (error) {
        // toastEvent('Something Went Wrong While Login With Platerate');
      },
    );
  };

  return (
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      onPress={() => {
        handleFbLogin();
      }}
      size={20}
      style={{ marginLeft: 5 }}>
      <Text style={styles.socialBttn}>Continue with Facebook</Text>
    </Icon.Button>
  );
};

export default FacebookAuth;

const styles = StyleSheet.create({
  socialBttn: {
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginLeft: -10,
  },
});
