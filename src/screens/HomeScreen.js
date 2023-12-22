import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';

import { freeGames, paidGames, sliderData } from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const {userToken} = useContext(AuthContext);
  const [gamesTab, setGamesTab] = useState(1);
  const carouselRef = useRef(null);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="menu"
              size={30}
              color='#333'
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', marginTop: 1, color: '#333' }}>
            Ratan khatri matka
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet Statement')}>
            <View
              style={{
                // marginVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Ionicons
                name="wallet"
                size={30}
                color='#333'
              />
              <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', textAlign: 'center', margin: 5, color: '#333' }}>
                {userToken?.coins ? userToken?.coins : 0}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            // paddingVertical: 8,
            alignItems: 'center',
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5}}
          />
          <TextInput placeholder="Search" />
        </View> */}

        {/* <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Upcoming Games
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: '#0aada8'}}>See all</Text>
          </TouchableOpacity>
        </View> */}

        <Carousel
          ref={carouselRef}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
        />

        <View style={{
          marginVertical: 20, flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Add Fund');}} style={{
            backgroundColor: '#6a0028',
            padding: 10,
            width: 130,
            borderRadius: 10,
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}>Add Points</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} style={{
            backgroundColor: '#6a0028',
            padding: 10,
            width: 130,
            borderRadius: 10,
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}>Withdraw Money</Text>
          </TouchableOpacity>
          {/* <CustomSwitch
            selectionMode={1}
            option1="Free to play"
            option2="Paid games"
            onSelectSwitch={onSelectSwitch}
          /> */}
        </View>

        {freeGames.map(item => (
          <ListItem
            key={item.id}
            photo={item.poster}
            title={item.title}
            subTitle={item.subtitle}
            isFree={item.isFree}
            open={item.open}
            close={item.close}
            onPress={() =>
              navigation.navigate('Game', {
                title: item.title,
                id: item.id,
              })
            }
          />
        ))}
        {/* {gamesTab === 2 &&
          paidGames.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))} */}
      </ScrollView>
    </SafeAreaView>
  );
}
