import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/Dimensions';
import photo from '../assets/images/graph.png';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default function ListItem({ title, subTitle, isPlay, price, onPress, open, close }) {
  return (
    <View style={{ backgroundColor: '#1111', flexDirection: 'column', marginBottom: responsiveWidth(5), borderRadius: responsiveWidth(3), height: responsiveHeight(18), }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: responsiveWidth(3) }}>
          <Image
            source={photo}
            style={{ width: responsiveWidth(13.8), height: responsiveHeight(6.5), borderRadius: responsiveWidth(3), marginRight: responsiveWidth(8), marginLeft: responsiveWidth(3) }}
          />
          <View style={{ width: responsiveWidth(37), alignItems: 'center' }}>
            <Text
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: responsiveFontSize(2.4),
                textTransform: 'uppercase',
              }}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#6a0028',
                fontFamily: 'Roboto-Medium',
                fontSize: responsiveFontSize(2),
              }}>
              {subTitle}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={onPress} style={{
          backgroundColor: isPlay == 'Yes' ? '#6a0028' : '#ed574c',
          padding: 10,
          width: responsiveWidth(23),
          borderRadius: responsiveWidth(6),
          marginTop: responsiveWidth(3),
          marginRight: responsiveWidth(2)
        }} disabled={isPlay == 'No'}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(1.9),
          }}>
            {isPlay == 'Yes' && 'Play Now'}
            {isPlay == 'No' && 'Closed'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ backgroundColor: '#3333', fontSize: responsiveFontSize(0.1), marginTop: responsiveWidth(3), marginRight: responsiveWidth(2), marginLeft: responsiveWidth(3) }}></Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <Text style={{
          color: '#333',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: responsiveFontSize(1.9),
        }}>Open: {open}</Text>
        <Text style={{
          color: isPlay == 'Yes' ? 'green' : 'red',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: responsiveFontSize(2.4),
        }}>{isPlay == 'Yes' && 'RUNNING'}
          {isPlay == 'No' && 'CLOSED'}</Text>
        <Text style={{
          color: '#333',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: responsiveFontSize(1.9),
        }}>Close: {close}</Text>
      </View>
    </View>
  );
}
