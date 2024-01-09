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
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

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
      <ScrollView style={{ padding: responsiveWidth(5.5) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: responsiveWidth(5.5),
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="menu"
              size={responsiveWidth(8.5)}
              color='#333'
            />
          </TouchableOpacity>
          <Text style={{ fontSize: responsiveFontSize(2.7), fontFamily: 'Roboto-Medium', marginTop: responsiveWidth(0.5), color: '#333' }}>
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
                size={responsiveWidth(8.5)}
                color='#333'
              />
              <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: 'Roboto-Medium', textAlign: 'center', margin: responsiveWidth(1), color: '#333' }}>
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
          sliderWidth={responsiveWidth(90)}
          itemWidth={responsiveWidth(85)}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
        />

        <View style={{
          marginVertical: responsiveWidth(5.5), flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Add Fund');}} style={{
            backgroundColor: '#6a0028',
            padding: 10,
            width: responsiveWidth(36),
            borderRadius: responsiveWidth(3),
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: responsiveFontSize(2),
            }}>Add Points</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Withdraw Fund'); }} style={{
            backgroundColor: '#6a0028',
            padding: 10,
            width: responsiveWidth(36),
            borderRadius: responsiveWidth(3),
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: responsiveFontSize(2),
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
            // photo={item.poster}
            title={item.title}
            subTitle={item.subtitle}
            isPlay={item.isPlay}
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
