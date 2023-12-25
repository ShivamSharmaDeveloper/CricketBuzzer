import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import { TextInput } from 'react-native-gesture-handler'
import RadioButtonGroup from '../../components/RadioBottonGroup'
import { validateAmount, validateDigit } from '../../components/validation'

const TriplePannaScreen = () => {
    const [selectedOption, setSelectedOption] = useState('Open');
    const [digits, setDigits] = useState('');
    const [digitError, setDigitError] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');

    const formatDate = () => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const currentDate = new Date();
        const dayOfWeek = days[currentDate.getUTCDay()];
        const dayOfMonth = currentDate.getUTCDate();
        const month = months[currentDate.getUTCMonth()];
        const year = currentDate.getUTCFullYear();

        const formattedDate = `${dayOfWeek} ${dayOfMonth}-${month}-${year}`;

        return formattedDate;
    };
    const formatedDate = formatDate();
    const validateAmountField = () => {
        const error = validateAmount(amount);
        setAmountError(error);
        return !error;
    };
    const validateDigitsField = () => {
        const error = validateDigit(digits);
        setDigitError(error);
        return !error;
    };
    const handleProceed = () => {
        // Validate fields before proceeding
        if (!validateAmountField() && !validateDigitsField()) {
            // If any validation fails, return without proceeding
            return;
        } else {

        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#6a0028', width: windowWidth, height: windowHeight }}>
                <View style={{ flexDirection: 'column', marginHorizontal: 30, marginTop: 30 }}>
                    <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Choose Date</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderRadius: 50,
                            borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            borderWidth: 1,
                            paddingBottom: 4,
                            marginBottom: 5,
                            width: windowWidth - 60,
                            backgroundColor: '#fff',
                            border: 10,
                        }}>
                        <TextInput
                            placeholder={'Enter date'}
                            // keyboardType={'phone-pad'}
                            // onChangeText={(text) => { setPoints(text); }}
                            value={formatedDate}
                            placeholderTextColor="#666"
                            style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 5 }}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 30, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Choose Session</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // borderRadius: 50,
                            // borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            // borderWidth: 1,
                            // paddingBottom: 4,
                            marginBottom: 5,
                            width: windowWidth - 250,
                            alignItems: 'center',
                            // backgroundColor: '#666',
                            // border: 10,
                        }}>
                        <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 30, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Digits</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderRadius: 50,
                            borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            borderWidth: 1,
                            paddingBottom: 8,
                            marginBottom: digitError ? 8 : 0,
                            width: windowWidth - 60,
                            backgroundColor: '#fff',
                            border: 10,
                        }}>
                        <TextInput
                            placeholder={'Enter Digits'}
                            keyboardType={'phone-pad'}
                            onChangeText={(text) => { setDigits(text); }}
                            value={digits}
                            maxLength={1}
                            placeholderTextColor="#666"
                            style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 8 }}
                        // editable={false}
                        />
                    </View>
                    <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10 }}>{digitError}</Text>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 30, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: '#fff', marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Amount</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderRadius: 50,
                            borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            borderWidth: 1,
                            paddingBottom: 8,
                            marginBottom: 8,
                            width: windowWidth - 60,
                            backgroundColor: '#fff',
                            border: 10,
                        }}>
                        <TextInput
                            placeholder={'Enter Digits'}
                            keyboardType={'phone-pad'}
                            onChangeText={(text) => { setAmount(text); }}
                            value={amount}
                            maxLength={5}
                            placeholderTextColor="#666"
                            style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 8 }}
                        // editable={false}
                        />
                    </View>
                    <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10 }}>{amountError}</Text>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 30, marginTop: 10, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => { handleProceed(); }}
                        style={{
                            backgroundColor: '#3689b1',
                            padding: 15,
                            borderRadius: 60,
                            marginBottom: 20,
                            width: 130,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#fff',
                            }}>
                            Proceed
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TriplePannaScreen