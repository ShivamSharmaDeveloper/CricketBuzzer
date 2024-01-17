import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import { TextInput } from 'react-native-gesture-handler'
import RadioButtonGroup from '../../components/RadioBottonGroup'
import { validateAmount, validateDigit, validateRiquired } from '../../components/validation'
import { AuthContext } from '../../context/AuthContext'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Dialog } from 'react-native-elements'
import { Dropdown } from 'react-native-element-dropdown'

const DoublePannaScreen = ({ route }) => {
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
        { label: '100', value: '100' },
        { label: '110', value: '110' },
        { label: '112', value: '112' },
        { label: '113', value: '113' },
        { label: '114', value: '114' },
        { label: '115', value: '115' },
        { label: '116', value: '116' },
        { label: '117', value: '117' },
        { label: '118', value: '118' },
        { label: '119', value: '119' },
        { label: '122', value: '122' },
        { label: '133', value: '133' },
        { label: '144', value: '144' },
        { label: '155', value: '155' },
        { label: '166', value: '166' },
        { label: '177', value: '177' },
        { label: '188', value: '188' },
        { label: '199', value: '199' },
        { label: '200', value: '200' },
        { label: '220', value: '220' },
        { label: '223', value: '223' },
        { label: '224', value: '224' },
        { label: '225', value: '225' },
        { label: '226', value: '226' },
        { label: '227', value: '227' },
        { label: '228', value: '228' },
        { label: '229', value: '229' },
        { label: '233', value: '233' },
        { label: '244', value: '244' },
        { label: '255', value: '255' },
        { label: '266', value: '266' },
        { label: '277', value: '277' },
        { label: '288', value: '288' },
        { label: '299', value: '299' },
        { label: '300', value: '300' },
        { label: '330', value: '330' },
        { label: '334', value: '334' },
        { label: '335', value: '335' },
        { label: '336', value: '336' },
        { label: '337', value: '337' },
        { label: '338', value: '338' },
        { label: '339', value: '339' },
        { label: '344', value: '344' },
        { label: '355', value: '355' },
        { label: '366', value: '366' },
        { label: '377', value: '377' },
        { label: '388', value: '388' },
        { label: '399', value: '399' },
        { label: '400', value: '400' },
        { label: '440', value: '440' },
        { label: '445', value: '445' },
        { label: '446', value: '446' },
        { label: '447', value: '447' },
        { label: '448', value: '448' },
        { label: '449', value: '449' },
        { label: '455', value: '455' },
        { label: '466', value: '466' },
        { label: '477', value: '477' },
        { label: '488', value: '488' },
        { label: '499', value: '499' },
        { label: '500', value: '500' },
        { label: '550', value: '550' },
        { label: '556', value: '556' },
        { label: '557', value: '557' },
        { label: '558', value: '558' },
        { label: '559', value: '559' },
        { label: '566', value: '566' },
        { label: '577', value: '577' },
        { label: '588', value: '588' },
        { label: '599', value: '599' },
        { label: '600', value: '600' },
        { label: '660', value: '660' },
        { label: '667', value: '667' },
        { label: '668', value: '668' },
        { label: '669', value: '669' },
        { label: '677', value: '677' },
        { label: '688', value: '688' },
        { label: '699', value: '699' },
        { label: '700', value: '700' },
        { label: '770', value: '770' },
        { label: '778', value: '778' },
        { label: '779', value: '779' },
        { label: '788', value: '788' },
        { label: '799', value: '799' },
        { label: '800', value: '800' },
        { label: '880', value: '880' },
        { label: '889', value: '889' },
        { label: '899', value: '899' },
        { label: '900', value: '900' },
        { label: '990', value: '990' },
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
        const valid = error === '' ? Number(amount) > 3200 ? 'Amount can not be greater than 3200' : '' : error;
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
                const currentTime = date.toString();

                await firestore()
                    .collection('User_Events')
                    .add({
                        phone: userToken?.phone,
                        amount: amount,
                        digit: digits,
                        date: currentTime,
                        session: selectedOption,
                        game: 'Double Panna',
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
                            placeholder={'Enter Digits'}
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
    );
};

export default DoublePannaScreen;
