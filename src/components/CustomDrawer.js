import React, { useCallback, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../context/AuthContext';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import auth from '@react-native-firebase/auth';

const CustomDrawer = props => {
  const { logout, userToken } = useContext(AuthContext);
  // const logoutUser = useCallback(() => {
  //   auth().signOut();
  //   logout();
  // }, [logout]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'This is Kalyan Sattta app Please share: https://www.bytenexttechnologies.in/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.warn(error.message);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{ padding: responsiveWidth(5) }}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{ height: responsiveHeight(10.5), width: responsiveWidth(22), borderRadius: responsiveWidth(40), marginBottom: responsiveWidth(3) }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(2.5),
              fontFamily: 'Roboto-Medium',
              marginBottom: responsiveWidth(2),
            }}>
            {userToken?.name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: responsiveWidth(1.5),
              }}>
              {userToken?.coins ? userToken?.coins : 0} Coins
            </Text>
            <FontAwesome5 name="coins" size={responsiveWidth(4)} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: responsiveWidth(3) }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: responsiveWidth(5.5), borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={onShare} style={{ paddingVertical: responsiveWidth(4.2) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={responsiveWidth(6)} color='#333' />
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontFamily: 'Roboto-Medium',
                marginLeft: responsiveWidth(1.5),
                color: '#333'
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={{ paddingVertical: responsiveWidth(4.2) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={responsiveWidth(6)} color="#333"/>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontFamily: 'Roboto-Medium',
                marginLeft: responsiveWidth(1.5),
                color: '#333'
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
