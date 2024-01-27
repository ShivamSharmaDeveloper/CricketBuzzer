import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        // console.log('Authorization status:', authStatus);
        getFCMToken();
    }
};

const getFCMToken = async () => {
    try {
        const token = await messaging().getToken();
        const querySnapshot = await firestore()
            .collection('RegisteredDevice')
            .where('token', '==', token)
            // .orderBy('isPlay', 'asc')
            .get();

            if (querySnapshot.empty) {
                await firestore()
                    .collection('RegisteredDevice')
                    .add({
                        token: token,
                    });
            }
    } catch (error) {
        console.log('error generating token', error);
    }
};
// For forground messages
// export async function notificationListner() {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.warn('A new FCM message arrived!', remoteMessage);
//     });

//     return unsubscribe;
// }
