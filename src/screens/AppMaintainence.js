import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import maintainance from '../assets/images/maintainance.png';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { windowWidth } from '../utils/Dimensions';

const AppMaintainence = ({ text }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Image
                    source={maintainance}
                    style={{ position: 'relative', width: windowWidth }}
                />
                <Text style={{position: 'absolute', color: '#333', fontSize: 22, top: 560, textAlign: 'center', marginHorizontal: 50, fontFamily: 'Roboto-Bold' }}>{text}</Text>
            </View>
        </SafeAreaView>
    );
};

export default AppMaintainence;
