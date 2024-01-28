import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mcicons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import TabNavigator from './TabNavigator';
import AddFundScreen from '../screens/AddFundScreen';
import WalletScreen from '../screens/WalletScreen';
import InfoScreen from '../screens/InfoScreen';
import SupportScreen from '../screens/SupportScreen';
import WalletFundNavigation from './WalletFundNavigation';
import BidHistory from '../screens/BidHistory';
import WinHistory from '../screens/WinHistory';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import GameRates from '../screens/GameRates';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
      headerShown: false, drawerActiveBackgroundColor: '#6a0028',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }}>
      <Drawer.Screen name="Home" component={TabNavigator} options={{
        drawerIcon: ({ focused }) => (
          <Ionicons name="home-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="person-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Add Fund" component={AddFundScreen} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="add-circle-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Wallet Statement" component={WalletScreen} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="newspaper-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Bid History" component={BidHistory} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="hammer-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Win History" component={WinHistory} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="trophy-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Withdraw Fund" component={WalletFundNavigation} options={{
        drawerIcon: ({focused}) => (
          <Mcicons name="bank-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Game Rates" component={GameRates} options={{
        drawerIcon: ({focused}) => (
          <FontAwesome5 name="dollar-sign" size={20} style={{marginLeft: responsiveWidth(1)}} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Information" component={InfoScreen} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="information-circle-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
      <Drawer.Screen name="Support" component={SupportScreen} options={{
        drawerIcon: ({focused}) => (
          <Ionicons name="call-outline" size={22} color={focused ? "#fff" : "#333"} />
        ),
      }} />
    </Drawer.Navigator>
  );
};

export default AuthStack;
