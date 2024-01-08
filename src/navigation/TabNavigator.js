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
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

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
          size={responsiveWidth(8)}
          color='#fff'
        />
        <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: 'Roboto-Medium', textAlign: 'center', margin: responsiveWidth(1.5), color: '#fff' }}>
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
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          id: route.params?.id,
        })}
      />
      <Stack.Screen
        name="Single Digit"
        component={SingleDigitScreen}
        options={({route, navigation}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} headerTitle={'Single Digit'} navigation={navigation}/>
        })}
        screenOptions
      />
      <Stack.Screen
        name="Single Panna"
        component={SinglePannaScreen}
        options={({route, navigation}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} navigation={navigation}/>
        })}
      />
      <Stack.Screen
        name="Double Panna"
        component={DoublePannaScreen}
        options={({route, navigation}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} navigation={navigation}/>
        })}
      />
      <Stack.Screen
        name="Triple Panna"
        component={TriplePannaScreen}
        options={({route, navigation}) => ({
          // title: route.params?.title,
          headerStyle: {
            backgroundColor: '#6a0028',
          },
          headerTintColor: '#fff',
          headerRight: (...props) => <HeaderWallet {...props} navigation={navigation}/>
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
