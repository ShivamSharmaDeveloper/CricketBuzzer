import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        // Check AsyncStorage for the user token when the component mounts
        const checkUserToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setUserToken(storedToken);
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
            setIsLoading(true);
            await AsyncStorage.setItem('userToken', user);
            setUserToken(userData);
        } catch (error) {
            console.error('Error storing user token in AsyncStorage:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await AsyncStorage.removeItem('userToken');
            setUserToken(null);
            auth().signOut().then(() => console.log('User signed out!'));
        } catch (error) {
            console.error('Error clearing user token from AsyncStorage:', error);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(userToken, 'token');
    return (
        <AuthContext.Provider value={{ login, logout, isLoading, isLoadingGlobal, setIsLoadingGlobal, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};
