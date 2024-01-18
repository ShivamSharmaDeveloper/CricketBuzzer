import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/Dimensions';
import photo from '../assets/images/graph.png';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default React.memo(function ListItem({ title, subTitle, isPlay, price, onPress, open, close, navigation }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isPlay == 'No'}>
      <View style={{ backgroundColor: '#a80a44', flexDirection: 'column', marginBottom: responsiveWidth(1), borderRadius: responsiveWidth(3), height: responsiveHeight(18), marginTop: 10 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: responsiveWidth(3) }}>
            <TouchableOpacity onPress={() => navigation.navigate('Results', {
              title: title,
              open: open,
              close: close,
            })}>
              <Image
                source={photo}
                style={{ width: responsiveWidth(13.8), height: responsiveHeight(7), borderRadius: responsiveWidth(3), marginLeft: responsiveWidth(3) }}
              />
            </TouchableOpacity>
            <View style={{ width: responsiveWidth(39), alignItems: 'center', marginLeft: responsiveWidth(5) }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Roboto-Medium',
                  fontSize: responsiveFontSize(2.1),
                  textTransform: 'uppercase',
                }}>
                {title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: '#CD853F',
                  fontFamily: 'Roboto-Medium',
                  fontSize: responsiveFontSize(2.1),
                }}>
                {subTitle}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={onPress} style={{
            backgroundColor: isPlay == 'Yes' ? '#228B22' : '#DC143C',
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
            color: 'grey',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(1.9),
          }}>Open: {open}</Text>
          <Text style={{
            color: isPlay == 'Yes' ? '#7CFC00' : '#FF0000',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(2.4),
          }}>{isPlay == 'Yes' && 'RUNNING'}
            {isPlay == 'No' && 'CLOSED'}</Text>
          <Text style={{
            color: 'grey',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(1.9),
          }}>Close: {close}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
})
