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
import Loader from '../components/Loader';
import { validateOtp, validatePhoneNumber } from '../components/validation';
import { sendSmsVerification, checkVerification } from '../components/twillo';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const { login, setIsLoadingGlobal, isLoadingGlobal } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [verification, setVerification] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  // const [userInfo, setUserInfo] = useState(null);

  function onAuthStateChanged(user) {
    if (user) {
      console.log(user, "user");
      // login(user);
    }
  }
  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumberError('');
    }
    if (otpValue.length === 6) {
      setOtpError('');
    }
  }, [phoneNumber, otpValue]);

  useEffect(() => {
    // GoogleSignin.configure({ webClientId: '163356141884-del12trf51fe64n5fqlqrqujee18uteh.apps.googleusercontent.com'});
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    setPhoneNumber('');
    setOtpValue('');
    setShowOtp(false);
    console.log("login")
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleUserLogin = async (userData) => {
    try {
      setIsLoadingGlobal(true); // Start global loader

      const querySnapshot = await firestore()
        .collection('Users')
        .where('phone', '==', phoneNumber)
        .get();

      console.log(querySnapshot?.docs[0]?.data(), "snapshot");

      if (querySnapshot.size > 0) {
        if (querySnapshot.docs[0].data().Active) {
          login(querySnapshot.docs[0].data());
        } else {
          alert('Please contact admin!');
        }
      } else {
        console.warn('User not found.');
      }
    } catch (error) {
      console.error('Error handling user login:', error);
    } finally {
      setIsLoadingGlobal(false); // Stop global loader
    }
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
    try {
      setIsLoadingGlobal(true);
      const confirmation = await sendSmsVerification(`+91${phoneNumber}`);
      // const confirmation = await auth().signInWithPhoneNumber(`+91 ${phoneNumber}`);
      setVerification(confirmation);
      // console.log(confirmation, 'user');
      setShowOtp(true);
    } catch (error) {
      console.error('Error signing in with phone number:', error);
    } finally {
      setIsLoadingGlobal(false);
    }
  };

  const confirmCode = async () => {
    try {
      setIsLoadingGlobal(true);
      const confirm = await checkVerification(`+91${phoneNumber}`, otpValue);
      if (confirm) {
        setOtpError('');
        handleUserLogin(confirm);
      } else {
        // console.error('Error confirming code:');
        setOtpError('Invalid OTP. Please try again.');
        setIsLoadingGlobal(false);
      }
      // const confirm = await verification.confirm(otpValue);
      // console.log(confirm, 'verified');
    } catch (error) {
      console.error('Error confirming code:', error);
      setOtpError('Please try again.');
      setIsLoadingGlobal(false);
    }
  };
  const validatePhoneNumberField = () => {
    const error = validatePhoneNumber(phoneNumber);
    setPhoneNumberError(error);
    return !error;
  };
  const validateOtpField = () => {
    const error = validateOtp(otpValue);
    setOtpError(error);
    return !error;
  };
  const handleUserRegistration = async () => {
    // Validate fields before proceeding
    if (!validatePhoneNumberField() || (showOtp ? !validateOtpField() : false)) {
      console.log('test');
      // If any validation fails, return without proceeding
      return;
    } else {
      try {
        // Check if the user is already registered
        const userSnapshot = await firestore()
          .collection('Users')
          .where('phone', '==', phoneNumber)
          .get();
        if (userSnapshot.empty) {
          // User not registered
          setPhoneNumberError('User is not registered, Please Register');
        }
        else {
          setPhoneNumberError('');
          showOtp ? confirmCode() : signInWithPhoneNumber();
          // User is registered, proceed with login
        }
      } catch (error) {
        console.error('Error handling user registration:', error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: responsiveWidth(7) }}>
        <View style={{ alignItems: 'center' }}>
          <LoginSVG
            height={responsiveHeight(33)}
            width={responsiveWidth(88)}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(3.8),
            fontWeight: '500',
            color: '#333',
            marginBottom: responsiveWidth(8),
          }}>
          Login
        </Text>
        <View style={{ flexDirection: 'column', marginBottom: responsiveWidth(4.2) }}>
          <InputField
            label={'Phone Number'}
            icon={
              <MaterialIcons
                name="phone"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setPhoneNumber(text);
              // validatePhoneNumberField();
            }}
            value={phoneNumber}
            maxLength={10}
          />
          <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', }}>{phoneNumberError}</Text>
        </View>

        {showOtp && (
          <View style={{ marginBottom: responsiveWidth(4), flexDirection: 'column', }}>
            <InputField
              label={'OTP'}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={responsiveWidth(6)}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1.5) }}
                />
              }
              inputType="otp"
              onChangeText={(text) => {
                setOtpValue(text);
                // validateOtpField();
              }}
              value={otpValue}
              maxLength={6}
              keyboardType="phone-pad"
            // fieldButtonLabel={'Forgot?'}
            // fieldButtonFunction={() => { }}
            />
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular' }}>{otpError}</Text>
          </View>
        )}

        <CustomButton label={verification ? 'Verify OTP' : 'Get OTP'} onPress={() => { handleUserRegistration(); }} />

        {/* <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: responsiveWidth(8),
          }}>
          <Text style={{ color: '#666' }}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#6a0028', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={isLoadingGlobal} />
    </SafeAreaView>
  );
};

export default LoginScreen;
