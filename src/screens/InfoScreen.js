import React from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import logo from '../assets/images/logo.png';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const InfoScreen = ({ navigation }) => {
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
        <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>Information</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', gap: responsiveWidth(5), marginTop: responsiveWidth(5) }}>
        <Image
          source={logo}
          style={{ width: responsiveWidth(28), height: responsiveHeight(12.5), borderRadius: 10, }}
        />
        <View style={{ backgroundColor: '#fff', width: responsiveWidth(86), borderRadius: 5 }}>
          <View style={{ padding: responsiveWidth(5), paddingBottom: responsiveWidth(14), width: responsiveWidth(85), }}>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold'}}>Welcome To Kalyan Satta Online Matka Play App
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5)}}>Download Our Application Form Google Play Store Or Form Official Website........
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5)}}>Register With Your Mobile Number, Email Id, User Name, Our Platform.......
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5)}}>Select The Game Type, Select Your Favourite Number And Start To Play Game
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5)}}>Get A Chance To Win 10 Lac Points
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5)}}>Rules And Regulations
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5)}}>-Minimum Deposit 500 Rs....
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', }}>-Minimum Withdrawal 1000 Rs.
              </Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', }}>- Diposit Karne Se Pehle Admin Se Contact Jarur Kare
              </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default InfoScreen