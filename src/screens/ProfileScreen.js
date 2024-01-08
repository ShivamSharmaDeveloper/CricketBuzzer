import React, { useContext } from 'react'
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ProfileScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: responsiveWidth(1), justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', height: responsiveHeight(7.5), width: responsiveWidth(windowWidth), flexDirection: 'row' }}>
        <MaterialIcons
          name="arrow-back"
          size={responsiveWidth(7)}
          color="#333"
          style={{ margin: responsiveWidth(4.1) }}
          onPress={() => { navigation.navigate('Home'); }}
        />
        <Text style={{ fontSize: responsiveFontSize(2.8), color: '#333', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>My Profile</Text>
      </View>
      <View style={{ flex: responsiveWidth(1), alignItems: 'center', gap: responsiveWidth(3), marginTop: responsiveWidth(5) }}>
        <Image
          source={logo}
          style={{ width: responsiveWidth(28), height: responsiveHeight(12.5), borderRadius: responsiveWidth(3), }}
        />
        <View style={{ backgroundColor: '#a80a44', width: responsiveWidth(86), borderRadius: responsiveWidth(3) }}>
          <View style={{ padding: responsiveWidth(5), paddingBottom: responsiveWidth(7), width: responsiveWidth(86), gap: responsiveWidth(5) }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: responsiveWidth(50),
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: responsiveWidth(1),
                  marginBottom: responsiveWidth(1.5),
                  width: responsiveWidth(75),
                  backgroundColor: '#fff',
                  border: responsiveWidth(3),
                }}>
                <TextInput
                  placeholder={'Enter Name'}
                  // keyboardType={'phone-pad'}
                  // onChangeText={(text) => { setPoints(text); }}
                  value={userToken?.name}
                  // maxLength={25}
                  placeholderTextColor="#666"
                  style={{ flex: responsiveWidth(1), paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(1.5) }}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: responsiveWidth(50),
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: responsiveWidth(1),
                  marginBottom: responsiveWidth(1.5),
                  width: responsiveWidth(75),
                  backgroundColor: '#fff',
                  border: responsiveWidth(3),
                }}>
                <TextInput
                  placeholder={'Enter Email'}
                  keyboardType={'email-address'}
                  // onChangeText={(text) => { setPoints(text); }}
                  value={userToken?.email}
                  // maxLength={5}
                  placeholderTextColor="#666"
                  style={{ flex: responsiveWidth(1), paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(1.5) }}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Mobile Number</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: responsiveWidth(50),
                  borderColor: '#ccc',
                  // borderBottomWidth: 1,
                  borderWidth: 1,
                  paddingBottom: responsiveWidth(1),
                  marginBottom: responsiveWidth(1.5),
                  width: responsiveWidth(75),
                  backgroundColor: '#fff',
                  border: responsiveWidth(3),
                }}>
                <TextInput
                  placeholder={'Enter Mobile Number'}
                  // keyboardType={'phone-pad'}
                  // onChangeText={(text) => { setPoints(text); }}
                  value={userToken?.phone}
                  // maxLength={5}
                  placeholderTextColor="#666"
                  style={{ flex: responsiveWidth(1), paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(1.5) }}
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