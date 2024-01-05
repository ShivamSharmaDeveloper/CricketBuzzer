import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowWidth } from '../../utils/Dimensions';
import { validatePhoneNumber } from '../../components/validation';

const Upi = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const validatePhoneNumberField = () => {
        const error = validatePhoneNumber(phoneNumber);
        setPhoneNumberError(error);
        return !error;
    };
    const handleProceed = () => {
        // Validate fields before proceeding
        if (!validatePhoneNumberField()) {
            console.log('save');
            // If any validation fails, return without proceeding
            return;
        } else {
            console.log('running');
        }
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#fff', flexDirection: 'column', margin: 20, gap: 20, padding: 20, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginTop: 10 }}>Mobile Number</Text>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 200, }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                width: windowWidth - 80,
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
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{phoneNumberError}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { handleProceed(); }}
                            style={{
                                backgroundColor: '#3689b1',
                                padding: 15,
                                borderRadius: 50,
                                marginBottom: 30,
                                width: 150,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 14,
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                }}>
                                Submit Request
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Upi;