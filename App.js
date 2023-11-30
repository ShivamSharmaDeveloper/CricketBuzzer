import React, {useEffect} from 'react';
import { Platform } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNev from './src/navigation/AppNev';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, [])
  return (
    <AuthProvider>
      <AppNev />
    </AuthProvider>
  );
}

export default App;
