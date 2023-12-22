import React from 'react';
import { View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';

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
                containerStyle={{ padding: 0}}
                disabled
            />
            <Text style={{fontSize: 14, color: '#fff'}}>Open</Text>
            <CheckBox
                key={2}
                checked={selectedOption === 'Close'}
                onPress={() => setSelectedOption('Close')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="white"
                containerStyle={{ padding: 0, paddingTop: 10 }}
                disabled
            />
            <Text style={{fontSize: 14, color: '#fff', paddingTop: 10}}>Close</Text>
        </>
    );
};

export default RadioButtonGroup;