import React from 'react'
import { View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import singleDigit from '../assets/images/singleDigit.png';
import singlePanna from '../assets/images/singlePanna.png';
import doublePanna from '../assets/images/doublePanna.png';
import triplePanna from '../assets/images/triplePanna.png';
import jodiDigit from '../assets/images/jodiDigit.png';
import halfSangam from '../assets/images/halfSangam.png';
import fullSangam from '../assets/images/fullSangam.png';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const GameDetailsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#870032' }}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ margin: responsiveHeight(4), width: responsiveWidth(100), flexDirection: 'row', gap: responsiveWidth(4), flexWrap: 'wrap', paddingHorizontal: responsiveWidth(5) }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Single Digit', {
                title: route.params?.title,
                id: route.params?.id,
                open: route.params?.open,
                close: route.params?.close,
              });
            }}
            >
              <Image
                source={singleDigit}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Single Panna', {
                title: route.params?.title,
                id: route.params?.id,
                open: route.params?.open,
                close: route.params?.close,
              });
            }}>
              <Image
                source={singlePanna}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Double Panna', {
                title: route.params?.title,
                id: route.params?.id,
                open: route.params?.open,
                close: route.params?.close,
              });
            }}>
              <Image
                source={doublePanna}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Triple Panna', {
                title: route.params?.title,
                id: route.params?.id,
                open: route.params?.open,
                close: route.params?.close,
              });
            }}>
              <Image
                source={triplePanna}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Jodi Digit', {
                title: route.params?.title,
                id: route.params?.id,
              });
            }}>
              <Image
                source={jodiDigit}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Half Sangam', {
                title: route.params?.title,
                id: route.params?.id,
                open: route.params?.open,
                close: route.params?.close,
              });
            }}>
              <Image
                source={halfSangam}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Full Sangam', {
                title: route.params?.title,
                id: route.params?.id,
              });
            }}>
              <Image
                source={fullSangam}
                style={{ width: responsiveWidth(42.5), height: responsiveHeight(20), borderRadius: 10, }}
              />
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default GameDetailsScreen;
