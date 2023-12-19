import React from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import phone from '../assets/images/phone.png';
import whatsapp from '../assets/images/whatsapp.png';

const SupportScreen = ({ navigation }) => {
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
        <Text style={{ fontSize: 21, color: '#333', marginBottom: 10, fontWeight: 600, margin: 15 }}>Support</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-start', margin: 30, gap: 20, marginTop: 20 }}>
        <View style={{ backgroundColor: '#6a0028', height: windowHeight - 700, width: windowWidth - 60, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ padding: 15, backgroundColor: '#a80a44', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 64 }}>
            <Image
              source={phone}
              style={{ width: 30, height: 30, borderRadius: 10 }}
            />
          </View>
          <View>
            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>Call:</Text>
            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>+919256713662</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#6a0028', height: windowHeight - 700, width: windowWidth - 60, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ padding: 15, backgroundColor: '#a80a44', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 64 }}>
            <Image
              source={whatsapp}
              style={{ width: 30, height: 30, borderRadius: 10 }}
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
