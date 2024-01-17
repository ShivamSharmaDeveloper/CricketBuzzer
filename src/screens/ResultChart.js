import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ResultCard from '../components/ResultCard';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const ResultChart = ({ route }) => {
    const [results, setResults] = useState([]);

    const processOpenClose = (open, close) => {
        const openParts = open.split('-');
        const closeParts = close.split('-');

        const openDigits = openParts[0];
        const closeDigits = closeParts[1];

        const both = openParts[1] + closeParts[0];

        const processedResult = {
            open: openDigits,
            close: closeDigits,
            both,
        };

        return processedResult;
    };

    const fetchDataAndProcess = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('Result') // Replace with your collection name
                .where('game_name', '==', route.params?.title)
                .get();

            const data = querySnapshot.docs.map(doc => doc.data());

            // Sort the data in descending order based on result_date string
            data.sort((a, b) => {
                const dateA = new Date(a.result_date);
                const dateB = new Date(b.result_date);
                return dateB - dateA;
            });

            const processedData = data.map(item => {
                const processedResult = processOpenClose(item.open, item.close);

                // Format the date using JavaScript's Date object
                const dateObject = new Date(item.result_date);
                const formattedDate = `${dateObject.toLocaleString('en-us', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })}`;

                return {
                    date: formattedDate,
                    open: processedResult.open,
                    close: processedResult.close,
                    both: processedResult.both,
                };
            });

            setResults(processedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataAndProcess();
    }, []);
    // const results = [
    //     {
    //         date: 'Tue, Jan 16, 2024',
    //         open: '852',
    //         both: '10',
    //         close: '652',
    //     },
    //     {
    //         date: 'Mon, Jan 15, 2024',
    //         open: '852',
    //         both: '10',
    //         close: '652',
    //     },
    //     {
    //         date: 'Sun, Jan 14, 2024',
    //         open: '852',
    //         both: '10',
    //         close: '652',
    //     },
    //     {
    //         date: 'Sat, Jan 13, 2024',
    //         open: '852',
    //         both: '10',
    //         close: '652',
    //     },
    //     {
    //         date: 'Fri, Jan 12, 2024',
    //         open: '852',
    //         both: '10',
    //         close: '652',
    //     },
    // ];
    // const result = [
    //     {
    //         date: 'Tue, Jan 16, 2024',
    //         open: '852-1',
    //         close: '5-652',
    //     },
    //     {
    //         date: 'Mon, Jan 15, 2024',
    //         open: '852-2',
    //         close: '9-652',
    //     },
    //     {
    //         date: 'Sun, Jan 14, 2024',
    //         open: '852-5',
    //         close: '7-652',
    //     },
    //     {
    //         date: 'Sat, Jan 13, 2024',
    //         open: '852-2',
    //         close: '5-652',
    //     },
    //     {
    //         date: 'Fri, Jan 12, 2024',
    //         open: '852-2',
    //         close: '6-652',
    //     },
    // ];

    // const modifiedResult = result.map(item => {
    //     const openParts = item.open.split('-');
    //     const closeParts = item.close.split('-');

    //     return {
    //         open: openParts[0],
    //         close: closeParts[1],
    //         both: openParts[1] + closeParts[0],
    //     };
    // });

    // console.log(modifiedResult);
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'column' }}>
                    <View style={{ marginTop: responsiveWidth(3), alignItems: 'center' }}>
                        <Text style={{ color: '#333', fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), textTransform: 'uppercase', }}>{route.params?.title} Result Chart</Text>
                    </View>
                    <View style={{ marginTop: results && results.length > 0 ? responsiveWidth(3) : responsiveWidth(80), flexDirection: 'row', paddingHorizontal: results && results.length > 0 ? responsiveHeight(2) : responsiveHeight(12.5), width: responsiveWidth(100), flexWrap: 'wrap', gap: 10, }}>
                        {results && results.length > 0 ? results.map((data) => (
                            <ResultCard
                                key={data.date}
                                date={data.date}
                                open={data.open}
                                both={data.both}
                                close={data.close}
                            />
                        )) : <Text style={{ color: '#6a0028', fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), textTransform: 'uppercase',}}>No Result Chart Here</Text> }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResultChart