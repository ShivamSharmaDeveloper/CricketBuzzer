import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowWidth } from '../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';

const GameRates = ({ navigation }) => {
    const [gameRatesArray, setGameRatesArray] = useState([]);
    useEffect(() => {
        const fetchGameRates = async () => {
            try {
                const gameRatesDoc = await firestore()
                    .collection('admin') // Replace with your collection name
                    .where('name', '==', 'GameRates') // Replace with your document ID or use dynamic values
                    .get();

                if (!gameRatesDoc.empty) {
                    const gameRatesData = gameRatesDoc.docs[0].data();

                    // Create an array of objects based on the structure you specified
                    const newArray = [
                        {
                            title: 'Single Digit',
                            value1: gameRatesData.singleDigitValue1,
                            value2: gameRatesData.singleDigitValue2,
                        },
                        {
                            title: 'Jodi Digit',
                            value1: gameRatesData.jodiDigitValue1,
                            value2: gameRatesData.jodiDigitValue2,
                        },
                        {
                            title: 'Single Panna',
                            value1: gameRatesData.singlePannaValue1,
                            value2: gameRatesData.singlePannaValue2,
                        },
                        {
                            title: 'Double Panna',
                            value1: gameRatesData.doublePannaValue1,
                            value2: gameRatesData.doublePannaValue2,
                        },
                        {
                            title: 'Triple Panna',
                            value1: gameRatesData.triplePannaValue1,
                            value2: gameRatesData.triplePannaValue2,
                        },
                        {
                            title: 'Half Sangam',
                            value1: gameRatesData.halfSangamValue1,
                            value2: gameRatesData.halfSangamValue2,
                        },
                        {
                            title: 'Full Sangam',
                            value1: gameRatesData.fullSangamValue1,
                            value2: gameRatesData.fullSangamValue2,
                        },
                    ];

                    // Set the state with the new array
                    setGameRatesArray(newArray);
                } else {
                    console.log('Document not found');
                }
            } catch (error) {
                console.error('Error fetching game rates:', error);
            }
        };

        // Call the function to fetch and create the array
        fetchGameRates();
    }, []); // Empty dependency array to run the effect only once on mount

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
                <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', marginBottom: responsiveWidth(3), fontWeight: 600, margin: responsiveWidth(4.1) }}>Game Rates</Text>
            </View>
            <View style={{ flex: 1, gap: responsiveWidth(5), marginTop: responsiveWidth(5), flexDirection: 'column', margin: responsiveHeight(2.5) }}>
                {gameRatesArray && gameRatesArray.map((data) => (
                    <View key={data.title} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#023051', padding: responsiveHeight(2), borderRadius: 15 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: 'white', fontFamily: 'Roboto-Medium' }}>{data.title}</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: 'white', fontFamily: 'Roboto-Medium' }}>{data.value1}-{data.value2}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default GameRates