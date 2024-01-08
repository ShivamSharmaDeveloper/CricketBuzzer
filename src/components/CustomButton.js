import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#6a0028',
        padding: responsiveWidth(5),
        borderRadius: responsiveWidth(3),
        marginBottom: responsiveWidth(8.2),
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: responsiveFontSize(2.2),
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
