import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import TabNavigator from './TabNavigator';
import AddFundScreen from '../screens/AddFundScreen';
import WalletScreen from '../screens/WalletScreen';
import InfoScreen from '../screens/InfoScreen';
import SupportScreen from '../screens/SupportScreen';

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
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{
        drawerIcon: (color) => (
          <Ionicons name="person-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Add Fund" component={AddFundScreen} options={{
        drawerIcon: (color) => (
          <Ionicons name="add-circle-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Wallet Statement" component={WalletScreen} options={{
        drawerIcon: (color) => (
          <Ionicons name="newspaper-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Information" component={InfoScreen} options={{
        drawerIcon: (color) => (
          <Ionicons name="information-circle-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Support" component={SupportScreen} options={{
        drawerIcon: (color) => (
          <Ionicons name="call-outline" size={22} color={color} />
        ),
      }} />
    </Drawer.Navigator>
  );
};

export default AuthStack;
