import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [verification, setVerification] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);

  function onAuthStateChanged(user) {
    if (user) {
      console.log(user, "user");
      // login(user);
    }
  }

  useEffect(() => {
    // GoogleSignin.configure({ webClientId: '163356141884-del12trf51fe64n5fqlqrqujee18uteh.apps.googleusercontent.com'});
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleUserLogin = (userData) => {
    firestore()
      .collection('Users')
      // Filter results
      .where('phone', '==', phoneNumber)
      .get()
      .then(querySnapshot => {
        console.log((querySnapshot?._docs[0]?._data), "snapshot")
        login(querySnapshot?._docs[0]?._data);
      });
  };

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     const { idToken } = await GoogleSignin.signIn();
  //     console.log(idToken, 'user');
  //     setUserInfo(idToken);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       console.log(error, "SIGN_IN_CANCELLED");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //       console.log(error, "IN_PROGRESS");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       console.log(error, "PLAY_SERVICES_NOT_AVAILABLE");
  //     } else {
  //       console.log(error, "error");
  //       // some other error happened
  //     }
  //   }
  // };

  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(`+91 ${phoneNumber}`);
    setVerification(confirmation);
    console.log(confirmation, 'user');
    setShowOtp(true);
  };

  const confirmCode = async () => {
    try {
      const confirm = await verification.confirm(otpValue);
      console.log(confirm, 'verified');
      handleUserLogin(confirm);
      // setShowOtp(false);
      // console.log('success');
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  // if (!verification) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+91 8979471768')}
  //     />
  //   );
  // }
  // console.log(phoneNumber, 'number');
  // console.log(verification, "user");
  // console.log(userInfo, 'userinfo');
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Phone Number'}
          icon={
            <MaterialIcons
              name="phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          maxLength={10}
        />

        {showOtp && (
          <InputField
            label={'OTP'}
            icon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="otp"
            onChangeText={setOtpValue}
            value={otpValue}
            maxLength={6}
            keyboardType="phone-pad"
          // fieldButtonLabel={'Forgot?'}
          // fieldButtonFunction={() => { }}
          />)}

        <CustomButton label={verification ? 'Verify OTP' : 'Get OTP'} onPress={() => { verification ? confirmCode() : signInWithPhoneNumber(); }} />

        {/* <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#6a0028', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
