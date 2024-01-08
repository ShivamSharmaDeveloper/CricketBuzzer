import React from 'react'
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import singleDigit from '../assets/images/singleDigit.png';
import singlePanna from '../assets/images/singlePanna.png';
import doublePanna from '../assets/images/doublePanna.png';
import triplePanna from '../assets/images/triplePanna.png';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const GameDetailsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{flex: responsiveWidth(1)}}>
    <View style={{ flex: responsiveWidth(1), justifyContent: 'flex-start', alignItems: 'center' }}>
      <View style={{ marginTop: responsiveWidth(5.5) }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Single Digit', {
            title: route.params?.title,
            id: route.params?.id,
          });
        }}>
          <Image
            source={singleDigit}
            style={{ width: responsiveWidth(42), height: responsiveHeight(20), borderRadius: 10, }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', gap: responsiveWidth(8.1) }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Single Panna', {
            title: route.params?.title,
            id: route.params?.id,
          });
        }}>
          <Image
            source={singlePanna}
            style={{ width: responsiveWidth(42), height: responsiveHeight(20), borderRadius: 10, }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Double Panna', {
            title: route.params?.title,
            id: route.params?.id,
          });
        }}>
          <Image
            source={doublePanna}
            style={{ width: responsiveWidth(42), height: responsiveHeight(20), borderRadius: 10, }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Triple Panna', {
            title: route.params?.title,
            id: route.params?.id,
          });
        }}>
          <Image
            source={triplePanna}
            style={{ width: responsiveWidth(42), height: responsiveHeight(20), borderRadius: 10, }}
          />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default GameDetailsScreen;
