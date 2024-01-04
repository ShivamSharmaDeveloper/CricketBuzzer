import React, { useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const WalletScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
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
        <Text style={{ fontSize: 21, color: '#333', marginBottom: 10, fontWeight: 600, margin: 15 }}>Wallet Statement</Text>
      </View>
      <View style={{ flex: 1, marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: '#D9D9D9', maxHeight: windowHeight - 600 }}>
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginLeft: 10, marginTop: 20, marginRight: 10 }}>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
          }}>Available Balance</Text>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
          }}>{userToken?.coins ? userToken?.coins : 0}</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'column', marginLeft: 10, marginRight: 10, }}>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
          }}>Withdraw Open time is 8:00 AM</Text>
          <Text style={{
            color: '#000',
            // textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
          }}>Withdraw Close time is 10:00 AM</Text>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 20, marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-evenly', gap: 30 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Add Fund');}} style={{
          backgroundColor: '#6a0028',
          padding: 15,
          width: 150,
          height: 50,
          borderRadius: 50,
        }}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
          }}>
            Add Fund
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={{
          backgroundColor: '#6a0028',
          padding: 15,
          width: 150,
          height: 50,
          borderRadius: 50,
        }}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
          }}>
            Withdraw Fund
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default WalletScreen