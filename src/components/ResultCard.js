import { View, Text } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const ResultCard = ({ date, open, both, close }) => {
    // Array of random background colors
    const backgroundColors = ['#b3ffb3', '#ffb3d9', '#ffe066', '#b3b3ff', '#ff6666'];

    // Randomly select a color from the array
    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    return (
        <View style={{ backgroundColor: randomColor, flexDirection: 'column', marginBottom: responsiveWidth(3), borderRadius: responsiveWidth(3), height: 'auto', width: responsiveWidth(28), borderWidth: responsiveWidth(0.3) }}>
            <View style={{ borderBottomWidth: 1, alignItems: 'center', paddingVertical: responsiveHeight(0.5), paddingHorizontal: responsiveWidth(5) }}>
                <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8) }}>{date}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ borderRightWidth: 1, width: responsiveWidth(9), paddingHorizontal: responsiveWidth(3.1), paddingVertical: responsiveHeight(1) }}>
                    <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8) }}>{open}</Text>
                </View>
                <View style={{ width: responsiveWidth(10), paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1) }}>
                    <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8) }}>{both}</Text>
                </View>
                <View style={{ borderLeftWidth: 1, width: responsiveWidth(9), paddingHorizontal: responsiveWidth(3.1), paddingVertical: responsiveHeight(1) }}>
                    <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8) }}>{close}</Text>
                </View>
            </View>
        </View>
    )
}

export default ResultCard