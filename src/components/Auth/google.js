import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {api} from '../../services';
// import {toastEvent} from '../../utils/toastEvent';
// import {useAuthDispatch} from '../../context/auth.context';

const GoogleAuth = ({ googleLogin = () => {} }) => {
  //   const authDispatch = useAuthDispatch();
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      googleLogin(userInfo);
    } catch (error) {}
  };

  return (
    <Icon.Button
      onPress={() => {
        handleGoogleLogin();
      }}
      name="google"
      size={20}
      backgroundColor="#395ad8"
      style={{ marginLeft: 5 }}>
      <Text style={styles.socialBttn}>Continue with Google</Text>
    </Icon.Button>
  );
};

export default GoogleAuth;
const styles = StyleSheet.create({
  socialBttn: {
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginLeft: -10,
  },
});
