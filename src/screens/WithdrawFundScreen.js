import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, } from 'react-native';
import React, { useContext, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../context/AuthContext';
import bank from '../assets/images/bank.png';
import phonepe from '../assets/images/phonepe.png';
import googlepay from '../assets/images/googlepay.png';
import paytm from '../assets/images/paytm.png';
import { Dropdown } from 'react-native-element-dropdown';
import { validateAmount } from '../components/validation';

const WithdrawFundScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const data = [
    { label: 'PhonePe (9166276171)', value: 'phonepe' },
    { label: 'GooglePay (9166276171)', value: 'googlepay' },
  ];
  const [value, setValue] = useState([]);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const validateAmountField = () => {
    const error = validateAmount(amount, userToken?.coins);
    setAmountError(error);
    return !error;
  };

  const handleProceed = () => {
    // Validate fields before proceeding
    if (!validateAmountField() || value.length === 0) {
      console.log('save');
      // If any validation fails, return without proceeding
      return;
    } else {
      console.log(value, 'running');
    }
  };

  return (
    <SafeAreaView style={{ justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', height: windowHeight - 705, width: windowWidth, flexDirection: 'row' }}>
        <MaterialIcons
          name="arrow-back"
          size={25}
          color="#333"
          style={{ margin: 15 }}
          onPress={() => { navigation.navigate('Home'); }}
        />
        <Text style={{ fontSize: 21, color: '#333', marginBottom: 10, fontWeight: 600, margin: 15 }}>Withdraw Fund</Text>
        <View style={{ flexDirection: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', margin: 10, marginHorizontal: 100, paddingBottom: 8 }}>
          <Text style={{ fontSize: 21, color: '#333', fontFamily: 'Roboto-Bold' }}>{userToken?.coins ? userToken?.coins : 0}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'column', margin: 20, gap: 20 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: '#333' }}>Payment Method</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Bank Details', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: 5, padding: 5, backgroundColor: '#fff' }}
          >
            <Image
              source={bank}
              style={{ width: 60, height: 60, borderRadius: 10, }}
            />
            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Roboto-Bold' }}>Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Upi', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: 5, padding: 5, backgroundColor: '#fff' }}
          >
            <Image
              source={phonepe}
              style={{ width: 60, height: 60, borderRadius: 10, }}
            />
            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Roboto-Bold' }}>PhonePe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Upi', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: 5, padding: 5, backgroundColor: '#fff' }}
          >
            <Image
              source={googlepay}
              style={{ width: 60, height: 60, borderRadius: 10, }}
            />
            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Roboto-Bold' }}>Google Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Upi', {
              // title: route.params?.title,
              // id: route.params?.id,
            });

          }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: 5, padding: 5, backgroundColor: '#fff' }}
          >
            <Image
              source={paytm}
              style={{ width: 60, height: 60, borderRadius: 10, }}
            />
            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Roboto-Bold' }}>PayTM</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: "#333", marginTop: 10 }}>Withdraw Fund</Text>
        <Dropdown
          data={data}
          placeholderStyle={{ color: '#333', fontSize: 16, fontFamily: 'Roboto-Bold', alignItems: 'center', textAlign: 'center' }}
          placeholder='Select Payment Method'
          labelField="label"
          valueField="value"
          value={value}
          style={{ color: '#333', borderColor: "#ccc", borderWidth: 1, padding: 10, backgroundColor: '#fff' }}
          onChange={item => {
            setValue(item.value);
          }}
          selectedTextStyle={{ color: "#333", fontFamily: 'Roboto-Bold', fontSize: 16 }}
          activeColor='#ccc'
          itemTextStyle={{ color: "#333" }}
        />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 200, }}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 10,
                borderColor: '#ccc',
                // borderBottomWidth: 1,
                borderWidth: 1,
                paddingBottom: 8,
                // marginBottom: 4,
                width: windowWidth - 200,
                backgroundColor: '#fff',
                border: 10,
              }}>
              <TextInput
                placeholder={'Enter Amount'}
                keyboardType={'phone-pad'}
                onChangeText={(text) => { setAmount(text); }}
                value={amount}
                maxLength={5}
                placeholderTextColor="#666"
                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 8, textAlign: 'center' }}
              // editable={false}
              />
            </View>
            <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{amountError}</Text>
          </View>
          <TouchableOpacity
            onPress={() => { handleProceed(); }}
            style={{
              backgroundColor: '#3689b1',
              padding: 15,
              borderRadius: 10,
              marginBottom: 30,
              width: 150,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 14,
                color: '#fff',
                textTransform: 'uppercase',
              }}>
              Submit Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default WithdrawFundScreen;
