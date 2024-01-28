import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { windowWidth } from '../utils/Dimensions';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';
import WinList from '../components/WinList';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';

const WinHistory = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { userToken, setIsLoadingGlobal } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dobLabel, setDobLabel] = useState('From Date');
    const [dobLabel2, setDobLabel2] = useState('To Date');
    const [list, setList] = useState([]);

    useEffect(() => {
        if (isFocused) {
            const currentDate = new Date();
            setDate(currentDate);
            setDobLabel(currentDate.toDateString());
            setDate2(currentDate);
            setDobLabel2(currentDate.toDateString());
            setList([]);
        }
    }, [isFocused])
    useEffect(() => {
        setList([]);
    }, [date, date2])
    useEffect(() => {
        if (isFocused) {
            const currentDate = new Date();
            setDate(currentDate);
            setDobLabel(currentDate.toDateString());
            setDate2(currentDate);
            setDobLabel2(currentDate.toDateString());
        }
    }, [isFocused])
    const handleSubmit = async () => {
        try {
            setIsLoadingGlobal(true);
            const fromDate = new Date(date);
            const toDate = new Date(date2);
            // Check if the fromDate is later than toDate or toDate is earlier than fromDate
            if (fromDate > toDate) {
                alert("Invalid date range. 'From' date should be earlier than 'To' date.");
                return;
            }
            console.log(fromDate, toDate)
            const querySnapshot = await firestore()
                .collection('winningHistory') // Replace with your collection name
                .where('phone', '==', userToken?.phone)
                .get();

            const data = querySnapshot.docs.map(doc => doc.data());
            const filteredArray = data.filter(item => {
                const itemDate = new Date(item.date).toLocaleDateString();
                const fromDateFormatted = fromDate.toLocaleDateString();
                const toDateFormatted = toDate.toLocaleDateString();
                return itemDate >= fromDateFormatted && itemDate <= toDateFormatted;
            });

            console.log(filteredArray);
            // Sort the data in descending order based on result_date string
            const listItem = filteredArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log(listItem);
            setList(listItem);
        } catch (error) {
            console.log(error, 'error');
        } finally {
            setIsLoadingGlobal(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#6a0028', height: responsiveHeight(7.5), width: responsiveWidth(windowWidth), flexDirection: 'row' }}>
                <MaterialIcons
                    name="arrow-back"
                    size={responsiveWidth(7)}
                    color="white"
                    style={{ margin: responsiveWidth(4.1) }}
                    onPress={() => { navigation.navigate('Home'); }}
                />
                <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>Win History</Text>
            </View>
            <View style={{ flex: 1, gap: responsiveWidth(5), marginTop: responsiveWidth(5), paddingHorizontal: responsiveHeight(5) }}>
                {/* <View>
                    <Text>BidHistory</Text>
                </View> */}
                <View style={{ width: responsiveWidth(80), padding: 5, flexDirection: 'column' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            paddingBottom: responsiveHeight(1.5),
                            marginBottom: responsiveHeight(2),
                            alignItems: 'center'
                        }}>
                        <Ionicons
                            name="calendar-outline"
                            size={25}
                            color="#333"
                            style={{ marginRight: 5, marginTop: 5 }}
                        />
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <Text style={{ color: '#333', marginLeft: 5, marginTop: 5, fontSize: responsiveFontSize(2) }}>
                                {dobLabel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            paddingBottom: responsiveHeight(1.5),
                            marginBottom: responsiveHeight(2),
                            alignItems: 'center'
                        }}>
                        <Ionicons
                            name="calendar-outline"
                            size={25}
                            color="#333"
                            style={{ marginRight: 5, marginTop: 5 }}
                        />
                        <TouchableOpacity onPress={() => setOpen2(true)}>
                            <Text style={{ color: '#333', marginLeft: 5, marginTop: 5, fontSize: responsiveFontSize(2) }}>
                                {dobLabel2}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { handleSubmit();}}
                        style={{
                            backgroundColor: '#6a0028',
                            padding: responsiveWidth(4.1),
                            borderRadius: 50,
                            marginBottom: responsiveWidth(4),
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
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {list && list.length !== 0 ? list.map(item => (
                        <WinList
                            key={item.id}
                            title={item.event}
                            // type={digit}
                            session={item.session}
                            date={item.date}
                            gameType={item.game}
                            points={item.points}
                            won={item.won}
                        />
                    )) : (
                        <View style={{ alignItems: 'center', marginTop: responsiveHeight(20) }}>
                            <Text style={{ fontSize: responsiveFontSize(2), fontFamily: 'Roboto-Bold', color: '#6a0028' }}>No Result Found</Text>
                        </View>
                    )}
                </ScrollView>

                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode={'date'}
                    maximumDate={new Date(date)}
                    minimumDate={new Date('2000-01-01')}
                    onConfirm={option => {
                        setOpen(false);
                        setDate(option);
                        setDobLabel(option.toDateString());
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                <DatePicker
                    modal
                    open={open2}
                    date={date2}
                    mode={'date'}
                    maximumDate={new Date(date2)}
                    minimumDate={new Date('2000-01-01')}
                    onConfirm={option => {
                        setOpen2(false);
                        setDate2(option);
                        setDobLabel2(option.toDateString());
                    }}
                    onCancel={() => {
                        setOpen2(false);
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default WinHistory