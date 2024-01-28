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

const HalfSangam = ({ route }) => {
    const isFocused = useIsFocused();
    const { userToken, setUserToken } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [digits, setDigits] = useState([]);
    const [digitError, setDigitError] = useState('');
    const [panna, setPanna] = useState([]);
    const [pannaError, setPannaError] = useState('');
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
    let pannaData = [
        { label: '000', value: '000' },
        { label: '100', value: '100' },
        { label: '111', value: '111' },
        { label: '112', value: '112' },
        { label: '113', value: '113' },
        { label: '114', value: '114' },
        { label: '115', value: '115' },
        { label: '116', value: '116' },
        { label: '117', value: '117' },
        { label: '118', value: '118' },
        { label: '119', value: '119' },
        { label: '120', value: '120' },
        { label: '122', value: '122' },
        { label: '123', value: '123' },
        { label: '124', value: '124' },
        { label: '125', value: '125' },
        { label: '126', value: '126' },
        { label: '127', value: '127' },
        { label: '128', value: '128' },
        { label: '129', value: '129' },
        { label: '130', value: '130' },
        { label: '133', value: '133' },
        { label: '134', value: '134' },
        { label: '135', value: '135' },
        { label: '136', value: '136' },
        { label: '137', value: '137' },
        { label: '138', value: '138' },
        { label: '139', value: '139' },
        { label: '140', value: '140' },
        { label: '144', value: '144' },
        { label: '145', value: '145' },
        { label: '146', value: '146' },
        { label: '147', value: '147' },
        { label: '148', value: '148' },
        { label: '149', value: '149' },
        { label: '150', value: '150' },
        { label: '155', value: '155' },
        { label: '156', value: '156' },
        { label: '157', value: '157' },
        { label: '158', value: '158' },
        { label: '159', value: '159' },
        { label: '160', value: '160' },
        { label: '166', value: '166' },
        { label: '167', value: '167' },
        { label: '168', value: '168' },
        { label: '169', value: '169' },
        { label: '170', value: '170' },
        { label: '177', value: '177' },
        { label: '178', value: '178' },
        { label: '179', value: '179' },
        { label: '180', value: '180' },
        { label: '188', value: '188' },
        { label: '189', value: '189' },
        { label: '190', value: '190' },
        { label: '199', value: '199' },
        { label: '200', value: '200' },
        { label: '220', value: '220' },
        { label: '222', value: '222' },
        { label: '223', value: '223' },
        { label: '224', value: '224' },
        { label: '225', value: '225' },
        { label: '226', value: '226' },
        { label: '227', value: '227' },
        { label: '228', value: '228' },
        { label: '229', value: '229' },
        { label: '230', value: '230' },
        { label: '233', value: '233' },
        { label: '234', value: '234' },
        { label: '235', value: '235' },
        { label: '236', value: '236' },
        { label: '237', value: '237' },
        { label: '238', value: '238' },
        { label: '239', value: '239' },
        { label: '240', value: '240' },
        { label: '244', value: '244' },
        { label: '245', value: '245' },
        { label: '246', value: '246' },
        { label: '247', value: '247' },
        { label: '248', value: '248' },
        { label: '249', value: '249' },
        { label: '250', value: '250' },
        { label: '255', value: '255' },
        { label: '256', value: '256' },
        { label: '257', value: '257' },
        { label: '258', value: '258' },
        { label: '259', value: '259' },
        { label: '260', value: '260' },
        { label: '266', value: '266' },
        { label: '267', value: '267' },
        { label: '268', value: '268' },
        { label: '269', value: '269' },
        { label: '270', value: '270' },
        { label: '277', value: '277' },
        { label: '278', value: '278' },
        { label: '279', value: '279' },
        { label: '280', value: '280' },
        { label: '288', value: '288' },
        { label: '289', value: '289' },
        { label: '290', value: '290' },
        { label: '291', value: '291' },
        { label: '292', value: '292' },
        { label: '293', value: '293' },
        { label: '294', value: '294' },
        { label: '295', value: '295' },
        { label: '296', value: '296' },
        { label: '297', value: '297' },
        { label: '298', value: '298' },
        { label: '299', value: '299' },
        { label: '300', value: '300' },
        { label: '329', value: '329' },
        { label: '330', value: '330' },
        { label: '333', value: '333' },
        { label: '334', value: '334' },
        { label: '335', value: '335' },
        { label: '336', value: '336' },
        { label: '337', value: '337' },
        { label: '338', value: '338' },
        { label: '339', value: '339' },
        { label: '340', value: '340' },
        { label: '344', value: '344' },
        { label: '345', value: '345' },
        { label: '346', value: '346' },
        { label: '347', value: '347' },
        { label: '348', value: '348' },
        { label: '349', value: '349' },
        { label: '350', value: '350' },
        { label: '355', value: '355' },
        { label: '356', value: '356' },
        { label: '357', value: '357' },
        { label: '358', value: '358' },
        { label: '359', value: '359' },
        { label: '360', value: '360' },
        { label: '366', value: '366' },
        { label: '367', value: '367' },
        { label: '368', value: '368' },
        { label: '369', value: '369' },
        { label: '370', value: '370' },
        { label: '377', value: '377' },
        { label: '378', value: '378' },
        { label: '379', value: '379' },
        { label: '380', value: '380' },
        { label: '388', value: '388' },
        { label: '389', value: '389' },
        { label: '390', value: '390' },
        { label: '399', value: '399' },
        { label: '400', value: '400' },
        { label: '440', value: '440' },
        { label: '444', value: '444' },
        { label: '445', value: '445' },
        { label: '446', value: '446' },
        { label: '447', value: '447' },
        { label: '448', value: '448' },
        { label: '449', value: '449' },
        { label: '450', value: '450' },
        { label: '455', value: '455' },
        { label: '456', value: '456' },
        { label: '457', value: '457' },
        { label: '458', value: '458' },
        { label: '459', value: '459' },
        { label: '460', value: '460' },
        { label: '466', value: '466' },
        { label: '467', value: '467' },
        { label: '468', value: '468' },
        { label: '469', value: '469' },
        { label: '470', value: '470' },
        { label: '477', value: '477' },
        { label: '478', value: '478' },
        { label: '479', value: '479' },
        { label: '480', value: '480' },
        { label: '488', value: '488' },
        { label: '489', value: '489' },
        { label: '490', value: '490' },
        { label: '499', value: '499' },
        { label: '500', value: '500' },
        { label: '555', value: '555' },
        { label: '556', value: '556' },
        { label: '557', value: '557' },
        { label: '558', value: '558' },
        { label: '559', value: '559' },
        { label: '560', value: '560' },
        { label: '566', value: '566' },
        { label: '567', value: '567' },
        { label: '568', value: '568' },
        { label: '569', value: '569' },
        { label: '570', value: '570' },
        { label: '577', value: '577' },
        { label: '578', value: '578' },
        { label: '579', value: '579' },
        { label: '580', value: '580' },
        { label: '588', value: '588' },
        { label: '589', value: '589' },
        { label: '590', value: '590' },
        { label: '591', value: '591' },
        { label: '592', value: '592' },
        { label: '593', value: '593' },
        { label: '594', value: '594' },
        { label: '595', value: '595' },
        { label: '596', value: '596' },
        { label: '597', value: '597' },
        { label: '598', value: '598' },
        { label: '599', value: '599' },
        { label: '600', value: '600' },
        { label: '660', value: '660' },
        { label: '666', value: '666' },
        { label: '667', value: '667' },
        { label: '668', value: '668' },
        { label: '669', value: '669' },
        { label: '670', value: '670' },
        { label: '677', value: '677' },
        { label: '678', value: '678' },
        { label: '679', value: '679' },
        { label: '680', value: '680' },
        { label: '681', value: '681' },
        { label: '682', value: '682' },
        { label: '683', value: '683' },
        { label: '684', value: '684' },
        { label: '685', value: '685' },
        { label: '686', value: '686' },
        { label: '687', value: '687' },
        { label: '688', value: '688' },
        { label: '689', value: '689' },
        { label: '690', value: '690' },
        { label: '699', value: '699' },
        { label: '700', value: '700' },
        { label: '770', value: '770' },
        { label: '777', value: '777' },
        { label: '778', value: '778' },
        { label: '779', value: '779' },
        { label: '780', value: '780' },
        { label: '799', value: '799' },
        { label: '800', value: '800' },
        { label: '880', value: '880' },
        { label: '899', value: '899' },
        { label: '900', value: '900' },
        { label: '990', value: '990' },
        { label: '999', value: '999' },
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
        // const valid = error === '' ? Number(amount) > 12000 ? 'Amount can not be greater than 12000' : '' : error;
        setAmountError(error);
        return !error;
    };
    const validateDigitsField = () => {
        const error = digits.length === 0 ? 'Please choose one option' : '';
        setDigitError(error);
        return !error;
    };
    const validatePannaField = () => {
        const error = panna.length === 0 ? 'Please choose one option' : '';
        setPannaError(error);
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
                const openPanna = selectedOption === 'Close' ? panna : '';
                const openDigit = selectedOption === 'Open' ? digits : '';
                const closePanna = selectedOption === 'Open' ? panna : '';
                const closeDigit = selectedOption === 'Close' ? digits : '';
                await firestore()
                    .collection('User_Events')
                    .add({
                        name: userToken?.name,
                        points: amount,
                        openpanna: openPanna,
                        opendigit: openDigit,
                        closepanna: closePanna,
                        closedigit: closeDigit,
                        date: currentTime,
                        session: selectedOption,
                        game: 'Half Sangam',
                        event: route.params?.title,
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
        if (!validateAmountField() || !validateDigitsField() || !validatePannaField() || !validateSessionField()) {
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
            setPanna([]);
            setPannaError('');
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
        if (panna.length !== 0) {
            setPannaError('');
        }
        if (selectedOption.length > 0) {
            setSessionError('');
        }
    }, [amount, digits, panna, selectedOption]);

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
                        placeholder={`Select ${selectedOption} Digit`}
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
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', marginBottom: responsiveWidth(3), fontFamily: 'Roboto-Bold' }}>Panna</Text>
                    <Dropdown
                        data={pannaData}
                        placeholderStyle={{ color: '#333', fontSize: responsiveFontSize(2.2), fontFamily: 'Roboto-Medium', }}
                        placeholder={`Select ${selectedOption === 'Open' ? 'Close' : selectedOption === 'Close' ? 'Open' : ''} Panna`}
                        labelField="label"
                        valueField="value"
                        value={panna}
                        style={{ color: '#333', borderColor: "#ccc", borderWidth: 1, padding: responsiveWidth(2), backgroundColor: '#fff', borderRadius: 10, marginTop: responsiveWidth(1), paddingLeft: responsiveWidth(5) }}
                        onChange={item => {
                            setPanna(item.value);
                        }}
                        selectedTextStyle={{ color: "#333", fontFamily: 'Roboto-Medium', fontSize: responsiveFontSize(2.5) }}
                        activeColor='#ccc'
                        itemTextStyle={{ color: "#333" }}
                    />
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), marginTop: responsiveWidth(3) }}>{pannaError}</Text>
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
                            setDigits([]);
                            setPanna([]);
                        }}
                        titleStyle={{ color: 'green' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView>
    )
}

export default HalfSangam;
