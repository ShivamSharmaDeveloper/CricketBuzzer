import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { TextInput } from 'react-native-gesture-handler';
import RadioButtonGroup from '../../components/RadioBottonGroup';
import { validateAmount, validateDigit } from '../../components/validation';
import { AuthContext } from '../../context/AuthContext';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useIsFocused } from '@react-navigation/native';
import { Dialog } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';

const JodiDigit = ({ route }) => {
    const isFocused = useIsFocused();
    const { userToken, setUserToken } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('Open');
    const [digits, setDigits] = useState([]);
    const [digitError, setDigitError] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    let data = [
        {label: '00', value: '00'},
        {label: '01', value: '01'},
        {label: '02', value: '02'},
        {label: '03', value: '03'},
        {label: '04', value: '04'},
        {label: '05', value: '05'},
        {label: '06', value: '06'},
        {label: '07', value: '07'},
        {label: '08', value: '08'},
        {label: '09', value: '09'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'},
        {label: '17', value: '17'},
        {label: '18', value: '18'},
        {label: '19', value: '19'},
        {label: '20', value: '20'},
        {label: '21', value: '21'},
        {label: '22', value: '22'},
        {label: '23', value: '23'},
        {label: '24', value: '24'},
        {label: '25', value: '25'},
        {label: '26', value: '26'},
        {label: '27', value: '27'},
        {label: '28', value: '28'},
        {label: '29', value: '29'},
        {label: '30', value: '30'},
        {label: '31', value: '31'},
        {label: '32', value: '32'},
        {label: '33', value: '33'},
        {label: '34', value: '34'},
        {label: '35', value: '35'},
        {label: '36', value: '36'},
        {label: '37', value: '37'},
        {label: '38', value: '38'},
        {label: '39', value: '39'},
        {label: '40', value: '40'},
        {label: '41', value: '41'},
        {label: '42', value: '42'},
        {label: '43', value: '43'},
        {label: '44', value: '44'},
        {label: '45', value: '45'},
        {label: '46', value: '46'},
        {label: '47', value: '47'},
        {label: '48', value: '48'},
        {label: '49', value: '49'},
        {label: '50', value: '50'},
        {label: '51', value: '51'},
        {label: '52', value: '52'},
        {label: '53', value: '53'},
        {label: '54', value: '54'},
        {label: '55', value: '55'},
        {label: '56', value: '56'},
        {label: '57', value: '57'},
        {label: '58', value: '58'},
        {label: '59', value: '59'},
        {label: '60', value: '60'},
        {label: '61', value: '61'},
        {label: '63', value: '63'},
        {label: '64', value: '64'},
        {label: '65', value: '65'},
        {label: '66', value: '66'},
        {label: '67', value: '67'},
        {label: '68', value: '68'},
        {label: '69', value: '69'},
        {label: '70', value: '70'},
        {label: '71', value: '71'},
        {label: '72', value: '72'},
        {label: '73', value: '73'},
        {label: '74', value: '74'},
        {label: '75', value: '75'},
        {label: '76', value: '76'},
        {label: '77', value: '77'},
        {label: '78', value: '78'},
        {label: '79', value: '79'},
        {label: '80', value: '80'},
        {label: '81', value: '81'},
        {label: '82', value: '82'},
        {label: '83', value: '83'},
        {label: '84', value: '84'},
        {label: '85', value: '85'},
        {label: '86', value: '86'},
        {label: '87', value: '87'},
        {label: '88', value: '88'},
        {label: '89', value: '89'},
        {label: '90', value: '90'},
        {label: '91', value: '91'},
        {label: '92', value: '92'},
        {label: '93', value: '93'},
        {label: '94', value: '94'},
        {label: '95', value: '95'},
        {label: '96', value: '96'},
        {label: '97', value: '97'},
        {label: '98', value: '98'},
        {label: '99', value: '99'},
    ];
    useEffect(() => {
        if (amount.length > 0) {
            setAmountError('');
        }
        if (digits.length !== 0) {
            setDigitError('');
        }
    }, [amount, digits]);
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
        // const valid = error === '' ? Number(amount) > 1000 ? 'Amount can not be greater than 1000' : '' : error;
        setAmountError(error);
        return !error;
    };
    const validateDigitsField = () => {
        const error = digits.length === 0 ? 'Please choose one option' : '';
        setDigitError(error);
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
                // Extracting openDigit and closeDigit from the selected digits
                const selectedDigits = digits.toString();
                const openDigit = selectedDigits[0];
                const closeDigit = selectedDigits[1];
                await firestore()
                    .collection('User_Events')
                    .add({
                        name: userToken?.name,
                        points: amount,
                        opendigit: openDigit,
                        closedigit: closeDigit,
                        date: currentTime,
                        game: 'Jodi Digit',
                        event: route.params?.title,
                        session: selectedOption,
                        phone: userToken?.phone,
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
        if (!validateAmountField() || !validateDigitsField()) {
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
        }
    }, [isFocused]);


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
                {/* <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(3) }}>
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
                            marginBottom: responsiveWidth(1.5),
                            width: responsiveWidth(25),
                            alignItems: 'center',
                            // backgroundColor: '#666',
                            // border: responsiveWidth(3),
                        }}>
                        <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    </View>
                </View> */}
                <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(8.3), marginTop: responsiveWidth(3) }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Digits</Text>
                    <Dropdown
                        data={data}
                        placeholderStyle={{ color: '#333', fontSize: responsiveFontSize(2.2), fontFamily: 'Roboto-Bold', }}
                        placeholder='Select Digit'
                        labelField="label"
                        valueField="value"
                        value={digits}
                        style={{ color: '#333', borderColor: "#ccc", borderWidth: 1, padding: responsiveWidth(2), backgroundColor: '#fff', borderRadius: 10, marginTop: responsiveWidth(1), paddingLeft: responsiveWidth(5) }}
                        onChange={item => {
                            setDigits(item.value);
                        }}
                        selectedTextStyle={{ color: "#333", fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.5) }}
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

export default JodiDigit;
