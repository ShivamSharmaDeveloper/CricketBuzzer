import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { windowWidth } from '../utils/Dimensions';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';
import BidList from '../components/BidList';
import { useIsFocused } from '@react-navigation/native';

const BidHistory = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dobLabel, setDobLabel] = useState('From Date');
    const [dobLabel2, setDobLabel2] = useState('To Date');
    const [list, setList] = useState([
        {
            id: 1,
            event: 'Kalyan Satta',
            session: 'open',
            date: 'Tue Jan 23 2024',
            game: 'Single Digit',
            points: '5',
            panna: '888',
        },
        {
            id: 2,
            event: 'Kalyan Satta',
            session: 'open',
            date: 'Tue Jan 23 2024',
            game: 'Full Sangam',
            points: '5',
            panna: '2',
        },
        {
            id: 3,
            event: 'Kalyan Satta',
            session: 'open',
            date: 'Tue Jan 23 2024',
            game: 'Full Sangam',
            points: '5',
            panna: '2',
        },
        {
            id: 4,
            event: 'Kalyan Satta',
            session: 'open',
            date: 'Tue Jan 23 2024',
            game: 'Full Sangam',
            points: '5',
            panna: '2',
        },
    ]);
    const digit = 'Open Panna';
    useEffect(() => {
        if (isFocused) {
            const currentDate = new Date();
            setDate(currentDate);
            setDobLabel(currentDate.toDateString());
            setDate2(currentDate);
            setDobLabel2(currentDate.toDateString());
        }
    }, [isFocused])
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
                <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>Bid History</Text>
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
                        onPress={() => { }}
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
                        <BidList
                            key={item.id}
                            title={item.event}
                            type={digit}
                            session={item.session}
                            date={item.date}
                            gameType={item.game}
                            points={item.points}
                            panna={item.panna}
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

export default BidHistory