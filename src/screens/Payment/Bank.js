import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowWidth } from '../../utils/Dimensions';
import { validateRiquired } from '../../components/validation';

const Bank = () => {
    const [accNumber, setAccNumber] = useState('');
    const [accNumberError, setAccNumberError] = useState('');
    const [accName, setAccName] = useState('');
    const [accNameError, setAccNameError] = useState('');
    const [accConfNumber, setAccConfNumber] = useState('');
    const [accConfNumberError, setAccConfNumberError] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [Branch, setBranch] = useState('');
    const [BranchError, setBranchError] = useState('');

    useEffect(() => {
        if (accName.length > 3){
            setAccNameError('');
        }
        if (accNumber.length > 14){
            setAccNumberError('');
        }
        if (accConfNumber === accNumber){
            setAccConfNumberError('');
        }
        if (ifscCode.length === 11){
            setIfscCodeError('');
        }
        if (bankName.length > 3){
            setBankNameError('');
        }
        if (Branch.length > 3){
            setBranchError('');
        }
    }, [accName, accConfNumber, accNumber, ifscCode, Branch, bankName])

    const validateAccNameField = () => {
        const error = validateRiquired(accName) || accName.length < 3 ? 'Invalid name' : '';
        setAccNameError(error);
        return !error;
    };

    const validateAccNumberField = () => {
        const error = validateRiquired(accNumber);
        setAccNumberError(error);
        return !error;
    };

    const validateAccConfNumberField = () => {
        const error = validateRiquired(accConfNumber) || accConfNumber !== accNumber ? 'Account numbers do not match' : '';
        setAccConfNumberError(error);
        return !error;
    };

    const validateIfscField = () => {
        const error = validateRiquired(ifscCode) || ifscCode.length !== 11 ? 'Invalid IFSC code' : '';
        setIfscCodeError(error);
        return !error;
    };

    const validateBankNameField = () => {
        const error = validateRiquired(bankName) || bankName.length < 3 ? 'Invalid bank name' : '';
        setBankNameError(error);
        return !error;
    };

    const validateBranchField = () => {
        const error = validateRiquired(Branch) || Branch.length < 3 ? 'Invalid branch address' : '';
        setBranchError(error);
        return !error;
    };

    const handleProceed = () => {
        // Validate fields before proceeding
        if (!validateAccNameField() || !validateAccNumberField() || !validateAccConfNumberField() || !validateIfscField() || !validateBankNameField() || !validateBranchField() ) {
            console.log('save');
            // If any validation fails, return without proceeding
            return;
        } else {
            console.log('running');
        }
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', margin: 30, gap: 20, }}>
                <View style={{ flexDirection: 'column', gap: 2 }}>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 60 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginLeft: 5 }}>Account Holder Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: windowWidth - 65,
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter your name'}
                                // keyboardType={'phone-pad'}
                                onChangeText={(text) => { setAccName(text); }}
                                value={accName}
                                maxLength={25}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 15, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{accNameError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 60 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginLeft: 5 }}>Account Number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: windowWidth - 65,
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter Your Account Number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setAccNumber(text); }}
                                value={accNumber}
                                maxLength={16}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 15, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{accNumberError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 60 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginLeft: 5 }}>Confirm Account Number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: windowWidth - 65,
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Confirm Your Account Number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setAccConfNumber(text); }}
                                value={accConfNumber}
                                maxLength={16}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 15, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{accConfNumberError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 60 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginLeft: 5 }}>IFSC Code</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: windowWidth - 65,
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter IFSC Code'}
                                // keyboardType={'phone-pad'}
                                onChangeText={(text) => { setIfscCode(text); }}
                                value={ifscCode}
                                maxLength={11}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 15, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{ifscCodeError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 60 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginLeft: 5 }}>Bank Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: windowWidth - 65,
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter Bank Name'}
                                // keyboardType={'phone-pad'}
                                onChangeText={(text) => { setBankName(text); }}
                                value={bankName}
                                maxLength={25}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 15, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{bankNameError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 5, flexWrap: 'wrap', width: windowWidth - 60 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: "#333", marginLeft: 5 }}>Branch Address</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: 8,
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: windowWidth - 65,
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter Branch Address'}
                                // keyboardType={'phone-pad'}
                                onChangeText={(text) => { setBranch(text); }}
                                value={Branch}
                                maxLength={25}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 15, paddingHorizontal: 15, paddingTop: 8, fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10, flexWrap: 'wrap', width: windowWidth - 210, }}>{BranchError}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { handleProceed(); }}
                            style={{
                                backgroundColor: '#6a0028',
                                padding: 15,
                                borderRadius: 50,
                                marginBottom: 30,
                                width: 300,
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

export default Bank