import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowWidth } from '../../utils/Dimensions';
import { validateRiquired } from '../../components/validation';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Dialog } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

const Bank = () => {
    const {userToken, setUserToken} = useContext(AuthContext);
    const [accNumber, setAccNumber] = useState(userToken?.bank_details ? userToken?.bank_details.acc_number : '');
    const [accNumberError, setAccNumberError] = useState('');
    const [accName, setAccName] = useState(userToken?.bank_details ? userToken?.bank_details.acc_name : '');
    const [accNameError, setAccNameError] = useState('');
    const [accConfNumber, setAccConfNumber] = useState(userToken?.bank_details ? userToken?.bank_details.acc_number : '');
    const [accConfNumberError, setAccConfNumberError] = useState('');
    const [ifscCode, setIfscCode] = useState(userToken?.bank_details ? userToken?.bank_details.ifsc : '');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [bankName, setBankName] = useState(userToken?.bank_details ? userToken?.bank_details.bank_name : '');
    const [bankNameError, setBankNameError] = useState('');
    const [Branch, setBranch] = useState(userToken?.bank_details ? userToken?.bank_details.bank_add : '');
    const [BranchError, setBranchError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (accName?.length > 3){
            setAccNameError('');
        }
        if (accNumber?.length > 14){
            setAccNumberError('');
        }
        if (accConfNumber === accNumber){
            setAccConfNumberError('');
        }
        if (ifscCode?.length === 11){
            setIfscCodeError('');
        }
        if (bankName?.length > 3){
            setBankNameError('');
        }
        if (Branch?.length > 3){
            setBranchError('');
        }
    }, [accName, accConfNumber, accNumber, ifscCode, Branch, bankName]);

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
    // Function to update the bank object in the Users table
    const updateBankObject = async (phone, bankObject) => {
        try {
            const userQuery = firestore().collection('Users').where('phone', '==', phone);
            const userSnapshot = await userQuery.get();

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                // Use the document reference to update the document
                await userDoc.ref.update({
                    bank_details: bankObject,
                });
                const querySnapshot = await firestore()
                    .collection('Users')
                    .where('phone', '==', userToken?.phone)
                    .get();

                if (querySnapshot.size > 0) {
                    setUserToken(querySnapshot.docs[0].data());
                    setSuccess(true);
                } else {
                    console.warn('User not found.');
                }
            } else {
                console.log('User not found with the provided phone number.');
            }
        } catch (error) {
            console.error('Error updating bank object:', error);
        }
    };
    const handleProceed = () => {
        // Validate fields before proceeding
        if (!validateAccNameField() || !validateAccNumberField() || !validateAccConfNumberField() || !validateIfscField() || !validateBankNameField() || !validateBranchField() ) {
            console.log('save');
            // If any validation fails, return without proceeding
            return;
        } else {
            console.log('running');
            const bankObject = {
                acc_name: accName,
                acc_number: accNumber,
                bank_add: Branch,
                bank_name: bankName,
                ifsc: ifscCode,
            };
            // Call the function to update the bank object in Firestore
            updateBankObject(userToken?.phone, bankObject);
        }
    };

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', margin: responsiveWidth(8), gap: responsiveWidth(5), }}>
                <View style={{ flexDirection: 'column', gap: responsiveWidth(0.5) }}>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Account Holder Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
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
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{accNameError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Account Number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
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
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{accNumberError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Confirm Account Number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
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
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{accConfNumberError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>IFSC Code</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
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
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{ifscCodeError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Bank Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
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
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{bankNameError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Branch Address</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
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
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{BranchError}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { handleProceed(); }}
                            style={{
                                backgroundColor: '#6a0028',
                                padding: responsiveWidth(4.1),
                                borderRadius: 50,
                                marginBottom: responsiveWidth(8),
                                width: responsiveWidth(85),
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
            <Dialog
                isVisible={success}
                onBackdropPress={() => { setSuccess(true); }}
                style={{ color: '#333', backgroundColor: '#333' }}
            >
                <Dialog.Title title="Bank Details Saved" titleStyle={{ color: '#333', }} />
                <Text style={{ color: '#333' }}>Your Bank details request has been sent.</Text>
                <Dialog.Actions>
                    <Dialog.Button
                        title="OK"
                        onPress={() => {
                            setSuccess(false);
                            setAccName('');
                            setAccNumber('');
                            setAccConfNumber('');
                            setBankName('');
                            setBranch('');
                            setIfscCode('');
                        }}
                        titleStyle={{ color: 'green' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView>
    )
}

export default Bank