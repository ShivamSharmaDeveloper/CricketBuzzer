import React from 'react'
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import singleDigit from '../assets/images/singleDigit.png';
import singlePanna from '../assets/images/singlePanna.png';
import doublePanna from '../assets/images/doublePanna.png';
import triplePanna from '../assets/images/triplePanna.png';

const GameDetailsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Single Digit', {
            title: route.params?.title,
            id: route.params?.id,
          });
        }}>
          <Image
            source={singleDigit}
            style={{ width: 150, height: 150, borderRadius: 10, }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', gap: 30 }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Single Panna', {
            title: route.params?.title,
            id: route.params?.id,
          });
        }}>
          <Image
            source={singlePanna}
            style={{ width: 150, height: 150, borderRadius: 10, }}
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
            style={{ width: 150, height: 150, borderRadius: 10, }}
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
            style={{ width: 150, height: 150, borderRadius: 10, }}
          />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default GameDetailsScreen;
