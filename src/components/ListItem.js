import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { windowWidth } from '../utils/Dimensions';

export default function ListItem({photo, title, subTitle, isFree, price, onPress, open, close}) {
  return (
    <View style={{ backgroundColor: '#1111', flexDirection: 'column', marginBottom: 15, borderRadius: 10, height: 120, }}>
    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 10}}>
        <Image
          source={photo}
          style={{width: 50, height: 50, borderRadius: 10, marginRight: 25, marginLeft: 10}}
        />
        <View style={{width: windowWidth - 230, alignItems: 'center'}}>
          <Text
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 18,
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#6a0028',
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
            }}>
            {subTitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={{
          backgroundColor: isFree == 'Yes' ? '#6a0028' : '#ed574c',
        padding:10,
        width: 80,
        borderRadius: 20,
        marginTop: 10,
        marginRight: 8
      }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
        }}>
          {isFree == 'Yes' && 'Play Now'}
          {isFree == 'No' && 'Closed'}
        </Text>
      </TouchableOpacity>
    </View>
    <Text style={{backgroundColor: '#3333', fontSize: 1, marginTop: 10, marginRight: 8, marginLeft: 8}}></Text>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
        <Text style={{
          color: '#333',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
        }}>Open: {open}</Text>
        <Text style={{
          color: isFree == 'Yes'? 'green' : 'red',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 18,
        }}>{isFree == 'Yes' && 'RUNNING'}
          {isFree == 'No' && 'CLOSED'}</Text>
        <Text style={{
          color: '#333',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
        }}>Close: {close}</Text>
    </View>
    </View>
  );
}
