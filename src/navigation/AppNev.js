import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';
import NavigationRef from '../components/NavigationRef';

const AppNev = () => {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <NavigationContainer ref={(ref) => NavigationRef.setTopLevelNavigator(ref)}>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNev;
