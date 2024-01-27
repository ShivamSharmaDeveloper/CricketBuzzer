import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/Dimensions';
import photo from '../assets/images/graph.png';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

export default React.memo(function ListItem({ title, won, session, points, gameType, date }) {
    return (
        <View style={{ backgroundColor: '#023051', flexDirection: 'column', marginBottom: responsiveWidth(2), borderRadius: responsiveWidth(3), height: responsiveHeight(18) }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottomColor: 'white', borderBottomWidth: 1
            }}>
                <View style={{ width: responsiveWidth(70), alignItems: 'center', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(1.5), marginBottom: responsiveHeight(1.5) }}>
                    <Text
                        style={{
                            color: 'white',
                            fontFamily: 'Roboto-BoldItalic',
                            fontSize: responsiveFontSize(2.1),
                            textTransform: 'uppercase',
                        }}>
                        {date}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column', margin: 10, alignItems: 'left' }}>
                    <Text style={{
                        color: 'white',
                        // textAlign: 'center',
                        fontFamily: 'Roboto-Regular',
                        fontSize: responsiveFontSize(1.9),
                    }}>{title} in {gameType} (Session- {session}) for bid amount- {points} Won</Text>
                </View>
                <View style={{ flexDirection: 'column', margin: 10, alignItems: 'center', paddingTop: responsiveHeight(2) }}>
                    {/* <Text style={{
                        color: 'white',
                        // textAlign: 'center',
                        fontFamily: 'Roboto-Medium',
                        fontSize: responsiveFontSize(1.9),
                    }}>({gameType})</Text> */}
                    <Text style={{
                        color: 'white',
                        // textAlign: 'center',
                        fontFamily: 'Roboto-Medium',
                        fontSize: responsiveFontSize(1.9),
                    }}>{won} pts</Text>
                </View>
            </View>
        </View>
    );
})
