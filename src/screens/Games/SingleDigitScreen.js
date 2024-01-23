import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { TextInput } from 'react-native-gesture-handler';
import RadioButtonGroup from '../../components/RadioBottonGroup';
import { validateAmount, validateDigit, validateRiquired } from '../../components/validation';
import { AuthContext } from '../../context/AuthContext';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useIsFocused } from '@react-navigation/native';
import { Dialog } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';

const SingleDigitScreen = ({ route }) => {
    const isFocused = useIsFocused();
    const { userToken, setUserToken } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [digits, setDigits] = useState([]);
    const [digitError, setDigitError] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [sessionError, setSessionError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    let data = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
    ];

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
        const error = validateAmount(amount, userToken?.coins);
        const valid = error === '' ? Number(amount) > 100 ? 'Amount can not be greater than 100' : '' : error;
        setAmountError(valid);
        return !valid;
    };
    const validateDigitsField = () => {
        const error = digits.length === 0 ? 'Please choose one option' : '';
        setDigitError(error);
        return !error;
    };
    const validateSessionField = () => {
        const error = validateRiquired(selectedOption);
        setSessionError(error);
        return !error;
    };
    const handleBid = async () => {
        try {
            const userCollection = firestore().collection('Users');
            const userQuery = userCollection.where('phone', '==', userToken?.phone);
            const userSnapshot = await userQuery.get();

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                const currentCoins = userDoc.get('coins') || 0;
                console.log(currentCoins, 'coins');

                const updatedCoins = currentCoins - Number(amount);

                // Use the document reference to update the document
                await userDoc.ref.update({
                    coins: updatedCoins,
                });
                const date = new Date();
                const currentTime = date.toDateString();
                const opendigit = selectedOption === 'Open' ? digits : '';
                const closedigit = selectedOption === 'Close' ? digits : '';
                await firestore()
                    .collection('User_Events')
                    .add({
                        name: userToken?.name,
                        points: amount,
                        opendigit: opendigit,
                        closedigit: closedigit,
                        date: currentTime,
                        session: selectedOption,
                        game: 'Single Digit',
                        event: route.params?.title,
                    });
                // console.log('Coins updated successfully');

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
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error updating coins:', error);
        }
        setLoading(false);
        setSuccess(true);
    };

    const handleProceed = () => {
        // Validate fields before proceeding
        if (!validateAmountField() || !validateDigitsField() || !validateSessionField()) {
            // If any validation fails, return without proceeding
            return;
        } else {
            setLoading(true);
            handleBid();
        }
    };
    useEffect(() => {
        if (isFocused) {
            setDigits([]);
            setDigitError('');
            setAmount('');
            setAmountError('');
            setSessionError('');
        }
    }, [isFocused]);
    useEffect(() => {
        if (amount.length > 0) {
            setAmountError('');
        }
        if (digits.length !== 0) {
            setDigitError('');
        }
        if (selectedOption.length > 0) {
            setSessionError('');
        }
    }, [amount, digits, selectedOption]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#6a0028', width: responsiveWidth(100), height: responsiveHeight(100) }}>
                <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(8.3) }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Choose Date</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderRadius: 50,
                            borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            borderWidth: 1,
                            paddingBottom: responsiveWidth(1.2),
                            marginBottom: responsiveWidth(1.5),
                            width: responsiveWidth(83.5),
                            backgroundColor: '#fff',
                            border: responsiveWidth(3),
                        }}>
                        <TextInput
                            placeholder={'Enter date'}
                            // keyboardType={'phone-pad'}
                            // onChangeText={(text) => { setPoints(text); }}
                            value={formatedDate}
                            placeholderTextColor="#666"
                            style={{ flex: 1, paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(1.5) }}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(3) }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Choose Session</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // borderRadius: 50,
                            // borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            // borderWidth: 1,
                            // paddingBottom: responsiveWidth(1.2),
                            // marginBottom: responsiveWidth(1),
                            width: responsiveWidth(25),
                            alignItems: 'center',
                            // backgroundColor: '#666',
                            // border: responsiveWidth(3),
                        }}>
                        <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption} openTime={route.params?.open} />
                    </View>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), marginTop: responsiveWidth(0.5) }}>{sessionError}</Text>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(3) }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Digits</Text>
                    <Dropdown
                        data={data}
                        placeholderStyle={{ color: '#333', fontSize: responsiveFontSize(2.2), fontFamily: 'Roboto-Medium', }}
                        placeholder='Select Digit'
                        labelField="label"
                        valueField="value"
                        value={digits}
                        style={{ color: '#333', borderColor: "#ccc", borderWidth: 1, padding: responsiveWidth(2), backgroundColor: '#fff', borderRadius: 10, marginTop: responsiveWidth(1), paddingLeft: responsiveWidth(5) }}
                        onChange={item => {
                            setDigits(item.value);
                        }}
                        selectedTextStyle={{ color: "#333", fontFamily: 'Roboto-Medium', fontSize: responsiveFontSize(2.5) }}
                        activeColor='#ccc'
                        itemTextStyle={{ color: "#333" }}
                    />
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), marginTop: responsiveWidth(3) }}>{digitError}</Text>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(3) }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Amount</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderRadius: 50,
                            borderColor: '#ccc',
                            // borderBottomWidth: 1,
                            borderWidth: 1,
                            paddingBottom: responsiveWidth(2.3),
                            marginBottom: 8,
                            width: responsiveWidth(83.5),
                            backgroundColor: '#fff',
                            border: responsiveWidth(3),
                        }}>
                        <TextInput
                            placeholder={'Enter Points'}
                            keyboardType={'phone-pad'}
                            onChangeText={(text) => { setAmount(text); }}
                            value={amount}
                            maxLength={responsiveWidth(1.5)}
                            placeholderTextColor="#666"
                            style={{ flex: 1, paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.3) }}
                        // editable={false}
                        />
                    </View>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3) }}>{amountError}</Text>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(3), alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => { handleProceed(); }}
                        style={{
                            backgroundColor: '#3689b1',
                            padding: responsiveWidth(4.1),
                            borderRadius: 60,
                            marginBottom: responsiveWidth(5),
                            width: responsiveWidth(30),
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: responsiveFontSize(2.2),
                                color: '#fff',
                            }}>
                            Proceed
                        </Text>
                    </TouchableOpacity>
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
                <Dialog.Title title="Bid Placed!" titleStyle={{ color: '#333', }} />
                <Dialog.Actions>
                    <Dialog.Button
                        title="OK"
                        onPress={() => {
                            setSuccess(false);
                            setAmount('');
                            setDigits('');
                        }}
                        titleStyle={{ color: 'green' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView>
    )
}

export default SingleDigitScreen;
