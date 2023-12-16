import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { validatePoints } from '../components/validation';
import { TextInput } from 'react-native-gesture-handler';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddFundScreen = ({ navigation }) => {
  const [points, setPoints] = useState('');
  const [pointsError, setPointsError] = useState('');

  useEffect(() => {
    setPoints('');
  }, []);

  const validatePointsField = () => {
    const error = validatePoints(points);
    setPointsError(error);
    return !error;
  };
  const handleAddPoints = async () => {
    // Validate fields before proceeding
    if (!validatePointsField()) {
      // If any validation fails, return without proceeding
      return;
    } else {
      let upiUrl = `upi://pay?pa=shivamsharma7899@ybl&pn=Shivam%20Sharma&mc=0000&mode=02&purpose=00&am=${points}&cu=INR&tn=Kalyan%20Satta%20App`;
      try {
        await Linking.openURL(upiUrl);
        setTimeout(() => {
          setPoints('');
        }, 2000);
      } catch (error){
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', height: windowHeight - 705, width: windowWidth, flexDirection: 'row' }}>
        <MaterialIcons
          name="arrow-back"
          size={25}
          color="#333"
          style={{ margin: 15 }}
          onPress={()=>{navigation.navigate('Home');}}
        />
        <Text style={{ fontSize: 21, color: '#333', marginBottom: 10, fontWeight: 600, margin: 15 }}>Add Points</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20, width: windowWidth, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'column', marginBottom: pointsError ? 10 : 5 }}>
        <Text style={{ fontSize: 18, color: '#333', marginBottom: 10, fontWeight: 600 }}>Points</Text>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 50,
            borderColor: '#ccc',
            // borderBottomWidth: 1,
            borderWidth: 1,
            paddingBottom: 8,
            marginBottom: 5,
              width: windowWidth - 40,
            // backgroundColor: '#333',
            border: 10,
          }}>
          <TextInput
            placeholder={'Enter Points'}
            keyboardType={'phone-pad'}
            onChangeText={(text) => { setPoints(text); }}
            value={points}
            maxLength={5}
            placeholderTextColor="#666"
            style={{ flex: 1, paddingVertical: 2, color: '#666', fontSize: 16, paddingHorizontal: 15, paddingTop: 10 }}
          />
        </View>
          <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 10}}>{ pointsError }</Text>
      </View>
      <TouchableOpacity
        onPress={() => { handleAddPoints();}}
        style={{
          backgroundColor: '#3689b1',
          padding: 15,
          borderRadius: 60,
          marginBottom: 20,
          width: 320,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff',
          }}>
          Add Points
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 12, color: '#333', marginBottom: 10, fontWeight: 600 }}>Select Points Amount</Text>
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', maxWidth: windowWidth }}>
        <TouchableOpacity
          onPress={() => { setPoints('500'); } }
          style={{
            backgroundColor: '#3689b1',
            padding: 15,
            borderRadius: 30,
            paddingBottom: 20,
            width: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            500
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setPoints('1000'); } }
          style={{
            backgroundColor: '#3689b1',
            padding: 15,
            borderRadius: 30,
            paddingBottom: 20,
            width: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            1000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setPoints('2000'); } }
          style={{
            backgroundColor: '#3689b1',
            padding: 15,
            borderRadius: 30,
            paddingBottom: 20,
            width: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            2000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setPoints('5000'); } }
          style={{
            backgroundColor: '#3689b1',
            padding: 15,
            borderRadius: 30,
            paddingBottom: 20,
            width: 150,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            5000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setPoints('10000'); } }
          style={{
            backgroundColor: '#3689b1',
            padding: 15,
            borderRadius: 30,
            paddingBottom: 20,
            width: 150,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            10000
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: 320, marginTop: 20}}>
        <Text style={{ color: "#3689b1", fontSize: 14, fontWeight: 600, borderWidth: 1, borderColor:'#ccc', borderRadius: 50, padding: 6 }}>Thanks for choosing Kalyan Satta.</Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default AddFundScreen;
