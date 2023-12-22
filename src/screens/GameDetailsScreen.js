import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

const GameDetailsScreen = ({navigation, route}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Game Details Screen</Text>
      <Text>{route.params?.title}</Text>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Single Digit', {
          title: route.params?.title,
          id: route.params?.id,
        }); }}><Text style={{color: '#666', marginTop: 20, borderColor: '#666', borderWidth: 1}}>Single Digit</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Single Panna', {
          title: route.params?.title,
          id: route.params?.id,
        }); }}><Text style={{color: '#666', marginTop: 20, borderColor: '#666', borderWidth: 1}}>Single Panna</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Double Panna', {
          title: route.params?.title,
          id: route.params?.id,
        }); }}><Text style={{color: '#666', marginTop: 20, borderColor: '#666', borderWidth: 1}}>Double Panna</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Triple Panna', {
          title: route.params?.title,
          id: route.params?.id,
        }); }}><Text style={{color: '#666', marginTop: 20, borderColor: '#666', borderWidth: 1}}>Triple Panna</Text></TouchableOpacity>
    </View>
  )
}

export default GameDetailsScreen
