import React from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import phone from '../assets/images/phone.png';
import whatsapp from '../assets/images/whatsapp.png';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', height: responsiveHeight(7.5), width: responsiveWidth(windowWidth), flexDirection: 'row' }}>
        <MaterialIcons
          name="arrow-back"
          size={responsiveWidth(7)}
          color="#333"
          style={{ margin: responsiveWidth(4.1) }}
          onPress={() => { navigation.navigate('Home'); }}
        />
        <Text style={{ fontSize: responsiveFontSize(2.8), color: '#333', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>Support</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-start', margin: responsiveWidth(8.2), gap: responsiveWidth(5.4), marginTop: responsiveWidth(5.4) }}>
        <View style={{ backgroundColor: '#6a0028', height: responsiveHeight(8.5), width: responsiveWidth(83.5), borderRadius: responsiveWidth(3), flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(3) }}>
          <View style={{ padding: responsiveWidth(4.1), backgroundColor: '#a80a44', borderTopLeftRadius: responsiveWidth(3), borderBottomLeftRadius: responsiveWidth(3), height: responsiveHeight(8.5) }}>
            <Image
              source={phone}
              style={{ width: responsiveWidth(9), height: responsiveHeight(4), borderRadius: responsiveWidth(3) }}
            />
          </View>
          <View>
            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>Call:</Text>
            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>+919256713662</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#6a0028', height: responsiveHeight(8.5), width: responsiveWidth(83.5), borderRadius: responsiveWidth(3), flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(3) }}>
          <View style={{ padding: responsiveWidth(4.1), backgroundColor: '#a80a44', borderTopLeftRadius: responsiveWidth(3), borderBottomLeftRadius: responsiveWidth(3), height: responsiveHeight(8.5) }}>
            <Image
              source={whatsapp}
              style={{ width: responsiveWidth(9), height: responsiveHeight(4), borderRadius: responsiveWidth(3) }}
            />
          </View>
          <View>
            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>WhatsApp:</Text>
            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>+919256713662</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SupportScreen
