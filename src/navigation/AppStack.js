import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mcicons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import TabNavigator from './TabNavigator';
import AddFundScreen from '../screens/AddFundScreen';
import WalletScreen from '../screens/WalletScreen';
import InfoScreen from '../screens/InfoScreen';
import SupportScreen from '../screens/SupportScreen';
import WithdrawFundScreen from '../screens/WithdrawFundScreen';

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
      <Drawer.Screen name="Wallet Fund" component={WithdrawFundScreen} options={{
        drawerIcon: ({focused}) => (
          <Mcicons name="bank-outline" size={22} color={focused ? "#fff" : "#333"} />
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
