import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import { TextInput } from 'react-native-gesture-handler'
import RadioButtonGroup from '../../components/RadioBottonGroup'
import { validateAmount, validateDigit, validateRiquired } from '../../components/validation'
import { AuthContext } from '../../context/AuthContext'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useIsFocused } from '@react-navigation/native'
import { Dialog } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown'

const SinglePannaScreen = ({ route }) => {
    const isFocused = useIsFocused();
    const { userToken, setUserToken } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [digits, setDigits] = useState('');
    const [digitError, setDigitError] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [sessionError, setSessionError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    let data = [
        { label: '120', value: '120' },
        { label: '123', value: '123' },
        { label: '124', value: '124' },
        { label: '125', value: '125' },
        { label: '126', value: '126' },
        { label: '127', value: '127' },
        { label: '128', value: '128' },
        { label: '129', value: '129' },
        { label: '130', value: '130' },
        { label: '134', value: '134' },
        { label: '135', value: '135' },
        { label: '136', value: '136' },
        { label: '137', value: '137' },
        { label: '138', value: '138' },
        { label: '139', value: '139' },
        { label: '140', value: '140' },
        { label: '145', value: '145' },
        { label: '146', value: '146' },
        { label: '147', value: '147' },
        { label: '148', value: '148' },
        { label: '149', value: '149' },
        { label: '150', value: '150' },
        { label: '156', value: '156' },
        { label: '157', value: '157' },
        { label: '158', value: '158' },
        { label: '159', value: '159' },
        { label: '160', value: '160' },
        { label: '167', value: '167' },
        { label: '168', value: '168' },
        { label: '169', value: '169' },
        { label: '170', value: '170' },
        { label: '178', value: '178' },
        { label: '179', value: '179' },
        { label: '180', value: '180' },
        { label: '189', value: '189' },
        { label: '190', value: '190' },
        { label: '230', value: '230' },
        { label: '234', value: '234' },
        { label: '235', value: '235' },
        { label: '236', value: '236' },
        { label: '237', value: '237' },
        { label: '238', value: '238' },
        { label: '239', value: '239' },
        { label: '240', value: '240' },
        { label: '245', value: '245' },
        { label: '246', value: '246' },
        { label: '247', value: '247' },
        { label: '248', value: '248' },
        { label: '249', value: '249' },
        { label: '250', value: '250' },
        { label: '256', value: '256' },
        { label: '257', value: '257' },
        { label: '258', value: '258' },
        { label: '259', value: '259' },
        { label: '260', value: '260' },
        { label: '267', value: '267' },
        { label: '268', value: '268' },
        { label: '269', value: '269' },
        { label: '270', value: '270' },
        { label: '278', value: '278' },
        { label: '279', value: '279' },
        { label: '280', value: '280' },
        { label: '289', value: '289' },
        { label: '290', value: '290' },
        { label: '340', value: '340' },
        { label: '345', value: '345' },
        { label: '346', value: '346' },
        { label: '347', value: '347' },
        { label: '348', value: '348' },
        { label: '349', value: '349' },
        { label: '350', value: '350' },
        { label: '356', value: '356' },
        { label: '357', value: '357' },
        { label: '358', value: '358' },
        { label: '359', value: '359' },
        { label: '360', value: '360' },
        { label: '367', value: '367' },
        { label: '368', value: '368' },
        { label: '369', value: '369' },
        { label: '370', value: '370' },
        { label: '378', value: '378' },
        { label: '379', value: '379' },
        { label: '380', value: '380' },
        { label: '389', value: '389' },
        { label: '390', value: '390' },
        { label: '450', value: '450' },
        { label: '456', value: '456' },
        { label: '457', value: '457' },
        { label: '458', value: '458' },
        { label: '459', value: '459' },
        { label: '460', value: '460' },
        { label: '467', value: '467' },
        { label: '468', value: '468' },
        { label: '469', value: '469' },
        { label: '470', value: '470' },
        { label: '478', value: '478' },
        { label: '479', value: '479' },
        { label: '480', value: '480' },
        { label: '489', value: '489' },
        { label: '490', value: '490' },
        { label: '560', value: '560' },
        { label: '567', value: '567' },
        { label: '568', value: '568' },
        { label: '569', value: '569' },
        { label: '570', value: '570' },
        { label: '578', value: '578' },
        { label: '579', value: '579' },
        { label: '580', value: '580' },
        { label: '589', value: '589' },
        { label: '590', value: '590' },
        { label: '670', value: '670' },
        { label: '678', value: '678' },
        { label: '679', value: '679' },
        { label: '680', value: '680' },
        { label: '689', value: '689' },
        { label: '690', value: '690' },
        { label: '780', value: '780' },
        { label: '789', value: '789' },
        { label: '790', value: '790' },
        { label: '890', value: '890' },
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
        const valid = error === '' ? Number(amount) > 1600 ? 'Amount can not be greater than 1600' : '' : error;
        setAmountError(valid);
        return !valid;
    };
    const validateDigitsField = () => {
        const error = validateDigit(digits);
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
                const openpanna = selectedOption === 'Open' ? digits : '';
                const closepanna = selectedOption === 'Close' ? digits : '';
                await firestore()
                    .collection('User_Events')
                    .add({
                        name: userToken?.name,
                        points: amount,
                        openpanna: openpanna,
                        closepanna: closepanna,
                        date: currentTime,
                        session: selectedOption,
                        game: 'Single Panna',
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
            setDigits('');
            setDigitError('');
            setAmount('');
            setAmountError('');
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
                            // marginBottom: responsiveWidth(1.5),
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
                            marginBottom: 20,
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

export default SinglePannaScreen;
