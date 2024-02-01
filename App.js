import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNev from './src/navigation/AppNev';
import SplashScreen from 'react-native-splash-screen';
import firestore from '@react-native-firebase/firestore';
import AppMaintainence from './src/screens/AppMaintainence';

function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [maintenanceText, setMaintenanceText] = useState('');
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, [])
  useEffect(() => {
    const handleAdmin = async () => {
      try {
        const userCollection = firestore().collection('admin');
        const userQuery = userCollection.where('name', '==', 'admin');

        // Set up a real-time listener
        const unsubscribe = userQuery.onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const app_maintenance = userDoc.get('app_maintainence') || false;
            const app_maintenance_text = userDoc.get('app_maintainence_text') || '';
            setMaintenance(app_maintenance);
            setMaintenanceText(app_maintenance_text);
          }
        });

        return unsubscribe;  // Return the unsubscribe function
      } catch (error) {
        console.log(error, 'error');
      }
    };

    const unsubscribe = handleAdmin();

    // Clean up the listener on component unmount
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();  // Call the unsubscribe function if it's a function
      }
    };
  }, []);
  return (
    <>
      {maintenance ?
        <AppMaintainence text={maintenanceText} />
        :
        <AuthProvider>
          <AppNev />
        </AuthProvider>
      }
    </>
  );
}

export default App;
