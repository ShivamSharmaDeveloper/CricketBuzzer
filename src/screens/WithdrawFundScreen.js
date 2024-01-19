import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../context/AuthContext';
import bank from '../assets/images/bank.png';
import phonepe from '../assets/images/phonepe.png';
import googlepay from '../assets/images/googlepay.png';
import paytm from '../assets/images/paytm.png';
import { Dropdown } from 'react-native-element-dropdown';
import { validateAmount, validateRiquired } from '../components/validation';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Dialog } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const WithdrawFundScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { userToken, setUserToken } = useContext(AuthContext);
  const data = [
    { label: `PhonePe (${userToken?.phone})`, value: 'phonepe' },
    { label: `GooglePay (${userToken?.phone})`, value: 'googlepay' },
    { label: `PayTM (${userToken?.phone})`, value: 'paytm' },
  ];
  const [value, setValue] = useState([]);
  const [valueError, setValueError] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (amount.length > 0) {
      setAmountError('');
    } else if (Number(amount) >= 100) {
      setAmountError('');
    }
    if (value.length !== 0) {
      setValueError('');
    }
  }, [amount, value]);
  const validateAmountField = () => {
    const error = validateRiquired(amount) ? validateRiquired(amount) : Number(amount) < 1000 ? 'Please enter amount more than 1000 or 1000' : validateAmount(amount, userToken?.coins);
    setAmountError(error);
    return !error;
  };
  const validateValueField = () => {
    const error = value.length === 0 ? 'Please choose one option' : '';
    setValueError(error);
    return !error;
  };

  const handleUpdate = async () => {
    try {
      const userCollection = firestore().collection('Users');
      const userQuery = userCollection.where('phone', '==', userToken?.phone);
      const userSnapshot = await userQuery.get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const currentCoins = userDoc.get('coins') || 0;
        console.log(currentCoins, 'coins');

        const updatedCoins = currentCoins - Number(amount);

        // Use the document reference to update the document
        await userDoc.ref.update({
          coins: updatedCoins,
        });
        const date = new Date();
        const currentTime = date.toString();

        await firestore()
          .collection('Withdraw_List')
          .add({
            phone: userToken?.phone,
            amount: amount,
            time: currentTime,
            name: userToken?.name,
            method: value,
          });
        // console.log('Coins updated successfully');
        //
        const querySnapshot = await firestore()
          .collection('Users')
          .where('phone', '==', userToken?.phone)
          .get();

        if (querySnapshot.size > 0) {
          setUserToken(querySnapshot.docs[0].data());
        } else {
          console.warn('User not found.');
        }
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error updating coins:', error);
    }
    setLoading(false);
    setSuccess(true);
  };

  const handleProceed = () => {
    // Validate fields before proceeding
    if (!validateAmountField() || !validateValueField()) {
      console.log('save');
      // If any validation fails, return without proceeding
      return;
    } else {
      setLoading(true);
      handleUpdate();
    }
  };
  useEffect(() => {
    if (isFocused) {
      setAmount('');
      setAmountError('');
      setValue([]);
      setValueError('');
      setSuccess(false);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#6a0028', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: responsiveWidth(4.1) }}>
        <MaterialIcons
          name="arrow-back"
          size={responsiveWidth(7)}
          color="white"
          onPress={() => { navigation.navigate('Home'); }}
          style={{width: responsiveWidth(10)}}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', fontWeight: '600', marginRight: responsiveWidth(15), alignSelf: 'center', width: responsiveWidth(40) }}>Withdraw Fund</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', fontFamily: 'Roboto-Bold' }}>{userToken?.coins ? userToken?.coins : 0}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'column', margin: responsiveWidth(5), gap: responsiveWidth(5) }}>
        <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: 'Roboto-Bold', color: '#333' }}>Payment Method</Text>
        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Bank Details', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
          >
            <Image
              source={bank}
              style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
            />
            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Phonepe', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
          >
            <Image
              source={phonepe}
              style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
            />
            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>PhonePe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Googlepay', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
          >
            <Image
              source={googlepay}
              style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
            />
            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>Google Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Paytm', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
          >
            <Image
              source={paytm}
              style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
            />
            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>PayTM</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', }}>
          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.5), color: "#333", marginTop: responsiveWidth(1) }}>Withdraw Fund</Text>
          <Dropdown
            data={data}
            placeholderStyle={{ color: '#333', fontSize: responsiveFontSize(2.2), fontFamily: 'Roboto-Bold', alignItems: 'center', textAlign: 'center' }}
            placeholder='Select Payment Method'
            labelField="label"
            valueField="value"
            value={value}
            style={{ color: '#333', borderColor: "#ccc", borderWidth: 1, padding: responsiveWidth(2), backgroundColor: '#fff', borderRadius: 10, marginTop: responsiveWidth(5) }}
            onChange={item => {
              setValue(item.value);
            }}
            selectedTextStyle={{ color: "#333", fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.5) }}
            activeColor='#ccc'
            itemTextStyle={{ color: "#333" }}
          />
          <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(50), marginTop: responsiveWidth(2), }}>{valueError}</Text>
          <View style={{ flexDirection: 'row', gap: responsiveWidth(3), marginTop: responsiveWidth(2) }}>
            <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(45), }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 10,
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: responsiveWidth(2.2),
                  // marginBottom: 4,
                  width: responsiveWidth(45),
                  backgroundColor: '#fff',
                  border: responsiveWidth(3),
                }}>
                <TextInput
                  placeholder={'Enter Amount'}
                  keyboardType={'phone-pad'}
                  onChangeText={(text) => { setAmount(text); }}
                  value={amount}
                  maxLength={5}
                  placeholderTextColor="#666"
                  style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), textAlign: 'center' }}
                // editable={false}
                />
              </View>
              <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(1), flexWrap: 'wrap', width: responsiveWidth(65), }}>{amountError}</Text>
            </View>
            <TouchableOpacity
              onPress={() => { handleProceed(); }}
              style={{
                backgroundColor: '#3689b1',
                padding: responsiveWidth(4.1),
                borderRadius: 10,
                marginBottom: responsiveWidth(8),
                width: responsiveWidth(42),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(1.9),
                  color: '#fff',
                  textTransform: 'uppercase',
                }}>
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Dialog isVisible={loading} onBackdropPress={() => setLoading(true)}>
        <Dialog.Loading />
      </Dialog>
      <Dialog
        isVisible={success}
        onBackdropPress={() => { setSuccess(true); }}
        style={{ color: '#333', backgroundColor: '#333' }}
      >
        <Dialog.Title title="Request Sent!" titleStyle={{ color: '#333', }} />
        <Text style={{ color: '#333' }}>Amount will be credited in 24hr's in your account.</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="OK"
            onPress={() => {
              setSuccess(false);
              setAmount('');
              setValue([]);
            }}
            titleStyle={{ color: 'green' }}
          />
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView >
  );
};

export default WithdrawFundScreen;
