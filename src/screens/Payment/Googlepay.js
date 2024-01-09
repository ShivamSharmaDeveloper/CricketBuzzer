import { View, Text, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowWidth } from '../../utils/Dimensions';
import { validatePhoneNumber } from '../../components/validation';
import { AuthContext } from '../../context/AuthContext';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const Googlepay = () => {
    const { userToken } = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState(userToken ? userToken?.phone : '');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    // const validatePhoneNumberField = () => {
    //     const error = validatePhoneNumber(phoneNumber);
    //     setPhoneNumberError(error);
    //     return !error;
    // };
    // const handleProceed = () => {
    //     // Validate fields before proceeding
    //     if (!validatePhoneNumberField()) {
    //         console.log('save');
    //         // If any validation fails, return without proceeding
    //         return;
    //     } else {
    //         console.log('running');
    //     }
    // }

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
                                placeholder={'Enter Number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setPhoneNumber(text); }}
                                value={phoneNumber}
                                maxLength={10}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2), fontFamily: 'Roboto-Bold' }}
                                editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{phoneNumberError}</Text>
                    </View>
                    {/* <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            // onPress={() => { handleProceed(); }}
                            style={{
                                backgroundColor: '#3689b1',
                                padding: responsiveWidth(4.1),
                                borderRadius: 50,
                                marginBottom: responsiveWidth(8),
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
                    </View> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Googlepay