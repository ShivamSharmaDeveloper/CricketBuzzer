import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bank from '../screens/Payment/Bank';
import WalletFundScreen from '../screens/WithdrawFundScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Upi from '../screens/Payment/Upi';
import Phonepe from '../screens/Payment/Phonepe';
import Googlepay from '../screens/Payment/Googlepay';
import Paytm from '../screens/Payment/Paytm';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const WalletStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WalletFund2"
                component={WalletFundScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bank Details"
                component={Bank}
                options={{ headerShown: true,
                    headerStyle: {
                        backgroundColor: '#6a0028',
                    },
                    headerTintColor: '#fff',
                 }}
            />
            <Stack.Screen
                name="Phonepe"
                component={Phonepe}
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#6a0028',
                    },
                    headerTintColor: '#fff',
                    title: 'UPI Details',
                })}
            />
            <Stack.Screen
                name="Googlepay"
                component={Googlepay}
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#6a0028',
                    },
                    headerTintColor: '#fff',
                    title: 'UPI Details',
                })}
            />
            <Stack.Screen
                name="Paytm"
                component={Paytm}
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#6a0028',
                    },
                    headerTintColor: '#fff',
                    title: 'UPI Details',
                })}
            />
        </Stack.Navigator>
    );
};

const WalletFundNavigation = () => {
  return (
      <Tab.Navigator
          screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: { backgroundColor: '#AD40AF' },
              tabBarInactiveTintColor: '#fff',
              tabBarActiveTintColor: 'yellow',
          }}>
          <Tab.Screen
              name="Wallet Fund1"
              component={WalletStack}
              options={({ route }) => ({
                  tabBarStyle: {
                      display: getTabBarVisibility(route),
                      backgroundColor: '#AD40AF',
                  },
              })}
          />
      </Tab.Navigator>
  )
}
const getTabBarVisibility = route => {
    // console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName);

    if (routeName == 'GameDetails') {
        return 'none';
    }
    return 'none';
};

export default WalletFundNavigation