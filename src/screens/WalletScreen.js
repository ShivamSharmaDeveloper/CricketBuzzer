import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';

const WalletScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  useEffect(() => {
    const handleAdmin = async () => {
      try {
        const userCollection = firestore().collection('admin');
        const userQuery = userCollection.where('name', '==', 'admin');
        const userSnapshot = await userQuery.get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const opentime = userDoc.get('withdraw_open_time');
          const closetime = userDoc.get('withdraw_close_time');
          setOpenTime(opentime);
          setCloseTime(closetime);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
    handleAdmin();
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#6a0028', height: responsiveHeight(7.5), width: responsiveWidth(windowWidth), flexDirection: 'row' }}>
        <MaterialIcons
          name="arrow-back"
          size={responsiveWidth(7)}
          color="white"
          style={{ margin: responsiveWidth(4.1) }}
          onPress={() => { navigation.navigate('Home'); }}
        />
        <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>Wallet Statement</Text>
      </View>
      <View style={{ flex: 1, marginTop: responsiveWidth(5), marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3), backgroundColor: '#D9D9D9', maxHeight: responsiveHeight(22) }}>
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginLeft: responsiveWidth(3), marginTop: responsiveWidth(5), marginRight: responsiveWidth(3) }}>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(2.7),
          }}>Available Balance</Text>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(2.7),
          }}>{userToken?.coins ? userToken?.coins : 0}</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'column', marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3), }}>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            fontSize: responsiveFontSize(2.7),
          }}>Withdraw Open time is {openTime}</Text>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            fontSize: responsiveFontSize(2.7),
          }}>Withdraw Close time is {closeTime}</Text>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: responsiveWidth(5), marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3), flexDirection: 'row', justifyContent: 'space-evenly', gap: responsiveWidth(8) }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Add Fund');}} style={{
          backgroundColor: '#6a0028',
          padding: responsiveWidth(4.1),
          width: responsiveWidth(42),
          height: responsiveHeight(6.5),
          borderRadius: 50,
        }}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(1.9),
          }}>
            Add Fund
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Withdraw Fund')}} style={{
          backgroundColor: '#6a0028',
          padding: responsiveWidth(4.1),
          width: responsiveWidth(42),
          height: responsiveHeight(6.5),
          borderRadius: 50,
        }}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(1.9),
          }}>
            Withdraw Fund
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default WalletScreen