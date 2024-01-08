import React from 'react';
import { View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const RadioButtonGroup = ({ selectedOption, setSelectedOption }) => {
    return (
        <>
            <CheckBox
                key={1}
                checked={selectedOption === 'Open'}
                onPress={() => setSelectedOption('Open')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="white"
                // title={'Open'}
                containerStyle={{ padding: responsiveWidth(0)}}
                disabled
            />
            <Text style={{fontSize: responsiveFontSize(2), color: '#fff'}}>Open</Text>
            <CheckBox
                key={2}
                checked={selectedOption === 'Close'}
                onPress={() => setSelectedOption('Close')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="white"
                containerStyle={{ padding: responsiveWidth(0), paddingTop: responsiveWidth(3) }}
                disabled
            />
            <Text style={{fontSize: responsiveFontSize(2), color: '#fff', paddingTop: responsiveWidth(3)}}>Close</Text>
        </>
    );
};

export default RadioButtonGroup;