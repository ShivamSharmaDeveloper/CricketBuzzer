import { View, Text, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { validateRiquired } from '../../components/validation';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Dialog } from 'react-native-elements';

const Phonepe = () => {
  const { userToken, setUserToken } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(userToken ? userToken?.phonepe : '');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePhoneNumberField = () => {
    const error = validateRiquired(phoneNumber);
    setPhoneNumberError(error);
    return !error;
  };
  const handleSumbit = async () => {
    try {
      const userCollection = firestore().collection('Users');
      const userQuery = userCollection.where('phone', '==', userToken?.phone);
      const userSnapshot = await userQuery.get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        // Use the document reference to update the document
        await userDoc.ref.update({
          phonepe: phoneNumber,
        });
        const querySnapshot = await firestore()
          .collection('Users')
          .where('phone', '==', userToken?.phone)
          .get();

        if (querySnapshot.size > 0) {
          setUserToken(querySnapshot.docs[0].data());
        } else {
          console.warn('User not found.');
        }
      } else {
        console.log("Can't update");
      }
    } catch (error) {
      console.log(error, 'error');
    }
    setLoading(false);
    setSuccess(true);
  }
  const handleProceed = () => {
    // Validate fields before proceeding
    if (!validatePhoneNumberField()) {
      console.log('save');
      // If any validation fails, return without proceeding
      return;
    } else {
      setLoading(true);
      handleSumbit();
      // console.log('running');
    }
  }

  return (
    <SafeAreaView style={{ justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', flexDirection: 'column', margin: responsiveWidth(5), gap: responsiveWidth(5), padding: responsiveWidth(5), borderRadius: 10 }}>
        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginTop: 10 }}>Mobile Number</Text>
        <View style={{ flexDirection: 'column', gap: responsiveWidth(3) }}>
          <View style={{ flexDirection: 'column', gap: responsiveWidth(1), flexWrap: 'wrap', width: responsiveWidth(45), }}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 50,
                borderColor: '#ccc',
                // borderBottomWidth: 1,
                borderWidth: 1,
                paddingBottom: responsiveWidth(2),
                // marginBottom: 4,
                width: responsiveWidth(79),
                backgroundColor: '#fff',
                border: 10,
              }}>
              <TextInput
                placeholder={'Enter UPI Id'}
                // keyboardType={'phone-pad'}
                onChangeText={(text) => { setPhoneNumber(text); }}
                value={phoneNumber}
                // maxLength={10}
                placeholderTextColor="#666"
                style={{ flex: 1, paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2), fontFamily: 'Roboto-Bold' }}
              // editable={false}
              />
            </View>
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{phoneNumberError}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => { handleProceed(); }}
              style={{
                backgroundColor: '#3689b1',
                padding: responsiveWidth(4.1),
                borderRadius: 50,
                marginBottom: responsiveWidth(4),
                width: responsiveWidth(42),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(1.9),
                  color: '#fff',
                  textTransform: 'uppercase',
                }}>
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Dialog isVisible={loading} onBackdropPress={() => setLoading(true)}>
        <Dialog.Loading />
      </Dialog>
      <Dialog
        isVisible={success}
        onBackdropPress={() => { setSuccess(true); }}
        style={{ color: '#333', backgroundColor: '#333' }}
      >
        <Dialog.Title title="Request Sent!" titleStyle={{ color: '#333', }} />
        <Text style={{ color: '#333' }}>Your Phonepe upi id is saved!</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="OK"
            onPress={() => {
              setSuccess(false);
            }}
            titleStyle={{ color: 'green' }}
          />
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  )
}

export default Phonepe