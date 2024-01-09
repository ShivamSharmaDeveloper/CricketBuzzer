import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
  maxLength,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: responsiveWidth(0.3),
        paddingBottom: responsiveWidth(2),
        marginBottom: responsiveWidth(1),
        // backgroundColor: '#333'
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: responsiveWidth(0)}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          placeholderTextColor="#666"
          style={{flex: 1, paddingVertical: responsiveWidth(0), color: '#666'}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
