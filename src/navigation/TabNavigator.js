import React, { useContext } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/SupportScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SingleDigitScreen from '../screens/Games/SingleDigitScreen';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import SinglePannaScreen from '../screens/Games/SinglePannaScreen';
import DoublePannaScreen from '../screens/Games/DoublePannaScreen';
import TriplePannaScreen from '../screens/Games/TriplePannaScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HeaderWallet = ({navigation}) => {
  const { userToken } = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Wallet Statement')}>
      <View
        style={{
          // marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Ionicons
          name="wallet"
          size={30}
          color='#fff'
        />
        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', textAlign: 'center', margin: 5, color: '#fff' }}>
          {userToken?.coins ? userToken?.coins : 0}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Game"
        component={GameDetailsScreen}
        // options={({route}) => ({
        //   title: route.params?.title,
        // })}
      />
      <Stack.Screen
        name="Single Digit"
        component={SingleDigitScreen}
        options={({route}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} headerTitle={'Single Digit'} />
        })}
      />
      <Stack.Screen
        name="Single Panna"
        component={SinglePannaScreen}
        options={({route}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} />
        })}
      />
      <Stack.Screen
        name="Double Panna"
        component={DoublePannaScreen}
        options={({route}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} />
        })}
      />
      <Stack.Screen
        name="Triple Panna"
        component={TriplePannaScreen}
        options={({route}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} />
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#AD40AF'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#AD40AF',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'yellow'},
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'none';
};

export default TabNavigator;
