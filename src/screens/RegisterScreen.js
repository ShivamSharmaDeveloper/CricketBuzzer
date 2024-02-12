/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import { validateFullName, validateEmail, validatePhoneNumber, validateOtp } from '../components/validation';
import { checkVerification, sendSmsVerification } from '../components/twillo';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const RegisterScreen = ({ navigation }) => {
  const { login, isLoadingGlobal, setIsLoadingGlobal } = useContext(AuthContext);
  // const [date, setDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [verification, setVerification] = useState(null);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [welecomeBonus, setWelecomeBonus] = useState('');
  // const [open, setOpen] = useState(false);
  // const [dobLabel, setDobLabel] = useState('Date of Birth');
  useEffect(() => {
    const handleAdmin = async () => {
      try {
        const userCollection = firestore().collection('admin');
        const userQuery = userCollection.where('name', '==', 'admin');
        const userSnapshot = await userQuery.get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const welcome_bonus = userDoc.get('welcome_bonus') || 0;
          // const phone_number = userDoc.get('phone_number');
          setWelecomeBonus(welcome_bonus);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
    handleAdmin();
  }, [])
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
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleUserLogin = async (userData) => {
    try {
      setIsLoadingGlobal(true); // Start global loader
      const currentDate = new Date();
      const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const currentTime = formattedDate.toString();
      await firestore()
        .collection('Users')
        .add({
          name: fullName,
          email: emailId,
          phone: phoneNumber,
          coins: welecomeBonus,
          date: currentTime,
          phonepe: phoneNumber,
          googlepay: phoneNumber,
          paytm: phoneNumber,
          Betting: true,
          Transfer: true,
          Active: true,
        });

      console.log('User added!');

      const querySnapshot = await firestore()
        .collection('Users')
        .where('phone', '==', phoneNumber)
        .get();

      console.log(querySnapshot?.docs[0]?.data(), "snapshot");
      login(querySnapshot?.docs[0]?.data());
    } catch (error) {
      console.error('Error handling user login:', error);
    } finally {
      setIsLoadingGlobal(false); // Stop global loader
    }
  };
  const signInWithPhoneNumber = async () => {
    try {
      setIsLoadingGlobal(true); // Start global loader
      const confirmation = await sendSmsVerification(`+91${phoneNumber}`);
      // const confirmation = await auth().signInWithPhoneNumber(`+91 ${phoneNumber}`);
      setVerification(confirmation);
      setShowOtp(true);
    } catch (error) {
      console.error('Error signing in with phone number:', error);
    } finally {
      setIsLoadingGlobal(false); // Stop global loader
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
        setOtpError('Invalid OTP. Please try again.');
        setIsLoadingGlobal(false);
      }
      // const confirm = await verification.confirm(otpValue);
    } catch (error) {
      console.log('Invalid code.', error);
      setOtpError('Please try after some Time.');
      setIsLoadingGlobal(false);
    }
  };
  const validateFullNameField = () => {
    const error = validateFullName(fullName);
    setFullNameError(error);
    return !error;
  };
  // Email validation function
  const validateEmailId = () => {
    const emailError = validateEmail(emailId);
    setEmailIdError(emailError);
    return !emailError;
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
  // Register function
  const handleUserRegistration = async () => {
    // Validate fields before proceeding
    if (!validatePhoneNumberField() || !validateFullNameField() || !validateEmailId() || (showOtp ? !validateOtpField() : false)) {
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
          setPhoneNumberError('');
          showOtp ? confirmCode() : signInWithPhoneNumber();
        }
        else {
          // User is registered, proceed with login
          setPhoneNumberError('User Already Registered, Please Login');
        }
      } catch (error) {
        console.error('Error handling user registration:', error);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: responsiveWidth(7) }}>
        <View style={{ alignItems: 'center' }}>
          <RegistrationSVG
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
          Register
        </Text>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <InputField
            label={'Full Name'}
            onChangeText={(text) => {
              setFullName(text);
              // validateFullNameField();
            }}
            value={fullName}
            maxLength={25}
            icon={
              <Ionicons
                name="person-outline"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
          />
          <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular' }}>{fullNameError}</Text>
        </View>
        <View style={{ flex: 1, marginVertical: responsiveWidth(4.2), flexDirection: 'column' }}>
          <InputField
            label={'Email ID'}
            onChangeText={(text) => {
              setEmailId(text);
              // validateEmailId();
            }}
            value={emailId}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="email-address"
          />
          <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular' }}>{emailIdError}</Text>
        </View>
        <View style={{ flex: 1, marginBottom: responsiveWidth(4.2), flexDirection: 'column' }}>
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
          <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular' }}>{phoneNumberError}</Text>
        </View>
        {showOtp && (
          <View style={{ flex: 1, marginBottom: responsiveWidth(4.2), flexDirection: 'column' }}>
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
          </View>)}
        {/* <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        /> */}
        {/*
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date(date)}
          minimumDate={new Date('1950-01-01')}
          onConfirm={option => {
            setOpen(false);
            setDate(option);
            setDobLabel(option.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <CustomButton label={verification ? 'Verify OTP' : 'Get OTP'} onPress={() => { handleUserRegistration(); }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: responsiveWidth(8),
          }}>
          <Text style={{ color: '#666' }}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#6a0028', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoadingGlobal} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
