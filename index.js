/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import NavigationRef from './src/components/NavigationRef';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    if (remoteMessage?.data?.action === 'Results') {
        NavigationRef.navigate("Results", { title: remoteMessage?.data?.title });
    }
});

AppRegistry.registerComponent(appName, () => App);
