import React from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import logo from '../assets/images/logo.png';

const InfoScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', height: windowHeight - 705, width: windowWidth, flexDirection: 'row' }}>
        <MaterialIcons
          name="arrow-back"
          size={25}
          color="#333"
          style={{ margin: 15 }}
          onPress={() => { navigation.navigate('Home'); }}
        />
        <Text style={{ fontSize: 21, color: '#333', marginBottom: 10, fontWeight: 600, margin: 15 }}>Information</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', gap: 20, marginTop: 20 }}>
        <Image
          source={logo}
          style={{ width: 100, height: 100, borderRadius: 10, }}
        />
        <View style={{ backgroundColor: '#fff', width: windowWidth - 50, borderRadius: 5 }}>
          <View style={{ padding: 20, paddingBottom: 50, width: windowWidth - 60, }}>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold'}}>Welcome To Kalyan Satta Online Matka Play App
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', marginTop: 20}}>Download Our Application Form Google Play Store Or Form Official Website........
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', marginTop: 20}}>Register With Your Mobile Number, Email Id, User Name, Our Platform.......
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', marginTop: 20}}>Select The Game Type, Select Your Favourite Number And Start To Play Game
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', marginTop: 20}}>Get A Chance To Win 10 Lac Points
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', marginTop: 20}}>Rules And Regulations
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', marginTop: 20}}>-Minimum Deposit 100 Rs....
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', }}>-Minimum Withdrawal 1000 Rs.
              </Text>
            <Text style={{ color: '#333', fontSize: 15, fontFamily: 'Roboto-Bold', }}>- Diposit Karne Se Pehle Admin Se Contact Jarur Kare
              </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default InfoScreen