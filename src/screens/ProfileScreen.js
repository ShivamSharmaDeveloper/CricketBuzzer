import React, { useContext } from 'react'
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

const ProfileScreen = ({ navigation }) => {
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
        <Text style={{ fontSize: 21, color: '#333', marginBottom: 10, fontWeight: 600, margin: 15 }}>My Profile</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', gap: 20, marginTop: 20 }}>
        <Image
          source={logo}
          style={{ width: 100, height: 100, borderRadius: 10, }}
        />
        <View style={{ backgroundColor: '#a80a44', width: windowWidth - 50, borderRadius: 10 }}>
          <View style={{ padding: 20, paddingBottom: 30, width: windowWidth - 60, gap: 20 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 50,
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: 4,
                  marginBottom: 5,
                  width: windowWidth - 90,
                  backgroundColor: '#fff',
                  border: 10,
                }}>
                <TextInput
                  placeholder={'Enter Name'}
                  // keyboardType={'phone-pad'}
                  // onChangeText={(text) => { setPoints(text); }}
                  value={userToken?.name}
                  // maxLength={25}
                  placeholderTextColor="#666"
                  style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 5 }}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 50,
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: 4,
                  marginBottom: 5,
                  width: windowWidth - 90,
                  backgroundColor: '#fff',
                  border: 10,
                }}>
                <TextInput
                  placeholder={'Enter Email'}
                  keyboardType={'email-address'}
                  // onChangeText={(text) => { setPoints(text); }}
                  value={userToken?.email}
                  // maxLength={5}
                  placeholderTextColor="#666"
                  style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 5 }}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Mobile Number</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 50,
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: 4,
                  marginBottom: 5,
                  width: windowWidth - 90,
                  backgroundColor: '#fff',
                  border: 10,
                }}>
                <TextInput
                  placeholder={'Enter Mobile Number'}
                  // keyboardType={'phone-pad'}
                  // onChangeText={(text) => { setPoints(text); }}
                  value={userToken?.phone}
                  // maxLength={5}
                  placeholderTextColor="#666"
                  style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 5 }}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
// marginBottom: pointsError ? 10 : 5