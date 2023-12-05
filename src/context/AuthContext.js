import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        // Check AsyncStorage for the user token when the component mounts
        const checkUserToken = async () => {
            try {
                setIsLoading(true);
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setUserToken(JSON.parse(storedToken));
                }
            } catch (error) {
                console.error('Error retrieving user token from AsyncStorage:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserToken();
    }, []);

    const login = async (userData) => {
        let user = JSON.stringify(userData);
        try {
            setIsLoadingGlobal(true);
            await AsyncStorage.setItem('userToken', user);
            setUserToken(userData);
        } catch (error) {
            console.error('Error storing user token in AsyncStorage:', error);
        } finally {
            setIsLoadingGlobal(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoadingGlobal(true);
            await AsyncStorage.removeItem('userToken');
            setUserToken(null);
            auth().signOut().then(() => console.log('User signed out!'));
        } catch (error) {
            console.error('Error clearing user token from AsyncStorage:', error);
        } finally {
            setIsLoadingGlobal(false);
        }
    };

    console.log(userToken, 'token');
    return (
        <AuthContext.Provider value={{ login, logout, isLoading, isLoadingGlobal, setIsLoadingGlobal, userToken }}>
            {children}
            <Loader visible={isLoadingGlobal} />
        </AuthContext.Provider>
    );
};
