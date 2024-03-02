import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import logo from '../assets/images/logo.png';
import youtube from '../assets/images/youtube.png';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';

const InfoScreen = ({ navigation }) => {
  const [playing, setPlaying] = useState(null);
  useEffect(() => {
    const handleAdmin = async () => {
      try {
        const userCollection = firestore().collection('admin');
        const userQuery = userCollection.where('name', '==', 'admin');
        const userSnapshot = await userQuery.get();
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const youtubeVideo = userDoc.get('youtube');
          setPlaying(youtubeVideo);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
    handleAdmin();
  }, [])
  const handleYoutube = () => {
    if (playing) {
      Linking.openURL(playing);
    } else {
      alert('Sorry, No video link here!')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView>
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
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold' }}>Welcome To Kalyan Satta Online Matka Play App
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5) }}>Download Our Application Form Google Play Store Or Form Official Website........
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5) }}>Register With Your Mobile Number, Email Id, User Name, Our Platform.......
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5) }}>Select The Game Type, Select Your Favourite Number And Start To Play Game
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5) }}>Get A Chance To Win 10 Lac Points
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5) }}>Rules And Regulations
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', marginTop: responsiveWidth(5) }}>-Minimum Deposit 500 Rs....
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', }}>-Minimum Withdrawal 1000 Rs.
              </Text>
              <Text style={{ color: '#333', fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', }}>- Diposit Karne Se Pehle Admin Se Contact Jarur Kare
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-start', margin: responsiveWidth(4.2), gap: responsiveWidth(5.4), marginTop: responsiveWidth(1.4) }}>
            <TouchableOpacity onPress={() => { handleYoutube(); }} style={{ backgroundColor: '#6a0028', height: responsiveHeight(8.5), width: responsiveWidth(83.5), borderRadius: responsiveWidth(3), flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(3) }}>
              <View style={{ padding: responsiveWidth(4.1), backgroundColor: '#a80a44', borderTopLeftRadius: responsiveWidth(3), borderBottomLeftRadius: responsiveWidth(3), height: responsiveHeight(8.5) }}>
                <Image
                  source={youtube}
                  style={{ width: responsiveWidth(9), height: responsiveHeight(4), borderRadius: responsiveWidth(3) }}
                />
              </View>
              <View>
                <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>Click here know more</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default InfoScreen