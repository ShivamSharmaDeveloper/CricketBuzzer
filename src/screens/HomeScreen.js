import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  Linking
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
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment-timezone';
import { requestUserPermission } from '../components/NotificationService';
import telegramIcon from '../assets/images/telegram.png';
import whatsAppIcon from '../assets/images/whatsapp.png';
import BackgroundTimer from 'react-native-background-timer';

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const { userToken, setIsLoadingGlobal, setUserToken } = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const [whatsApp, setWhatsApp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [slider, setSlider] = useState(null);
  const carouselRef = useRef(null);

  const updateIsPlayStatus = (events) => {
    const currentTime = moment();
    const updatedEvents = events.map((event) => {
      const openTime = moment(event.open, 'hh:mm A');
      const closeTime = moment(event.close, 'hh:mm A');
      event.isPlay = closeTime.isBefore(currentTime) ? 'No' : 'Yes';
      event.openTime = openTime;
      return event;
    });

    const sortedEvents = updatedEvents.sort((a, b) => a.openTime - b.openTime);

    return sortedEvents;
  };
  function updateSubtitles() {
    if (events) {
      const updatedEvents = events.map((event) => {
        event.subtitle = '***-**-***';
        return event;
      });

      updateAllEventsSubtitles();
      setEvents(updatedEvents);
    }
  }
  const updateAllEventsSubtitles = async () => {
    try {
      const querySnapshot = await firestore().collection('Events').get();
      const batch = firestore().batch();

      querySnapshot.docs.forEach((doc) => {
        const eventRef = doc.ref;
        batch.update(eventRef, { subtitle: '***-**-***' });
      });
      await batch.commit();
      console.log('Batch update successful');
    } catch (error) {
      console.error('Error updating batch:', error);
    }
  };
  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const handleEventList = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Events')
        .where('isActive', '==', 'Yes')
        // .orderBy('isPlay', 'asc')
        .get();
      const userDataArray = querySnapshot.docs.map(doc => doc.data());
      const updatedEvents = updateIsPlayStatus(userDataArray);
      setEvents(updatedEvents);
      handleUserData();
      // console.log(userDataArray, "snapshot");
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleUserData = async () => {
    try {
      // setIsLoadingGlobal(true);
      const querySnapshot = await firestore()
        .collection('Users')
        .where('phone', '==', userToken?.phone)
        .get();
      if (querySnapshot.size > 0) {
        setUserToken(querySnapshot.docs[0].data());
      } else {
        console.warn('User not found.');
      }
    } catch (error) {
      console.log(error, "error");
    }
    // setIsLoadingGlobal(false);
  };
  function handlePress(path) {
    let url =
      "whatsapp://send?&phone=91" +
      whatsApp;
    if (path === 'whatsApp') {
      Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Opened successfully " + data);
        })
        .catch(() => {
          alert("Make sure WhatsApp installed on your device");
        });
    } else {
      Linking.openURL(telegram)
        .then(data => {
          console.log("Telegram Opened successfully " + data);
        })
        .catch(() => {
          alert("No Links found!");
        });
    }
  }

  useEffect(() => {
    if (isFocused) {
      try {
        // Example usage
        handleEventList();
        // console.log(freeGames);
        // setEvents(freeGames);
      } catch (error) {

      }
    }
  }, [isFocused]);
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
        // console.log('permsion', res);
        requestUserPermission();
        // For forground messages
        // notificationListner();
      }).catch(error => {
        console.warn("somthing went wrong");
      });
    }
    setIsLoadingGlobal(true);
    setTimeout(() => {
      setIsLoadingGlobal(false);
    }, 5000);
  }, []);
  useEffect(() => {
    // Get current time in India timezone
    const now = moment.tz('Asia/Kolkata');

    // Check if the current time is exactly 4 AM
    const is4AM = now.hours() === 4 && now.minutes() === 0;

    // Schedule the task at 4 AM in India timezone
    const scheduledTime = moment.tz('Asia/Kolkata').set({ hour: 4, minute: 0, second: 0, millisecond: 0 });

    // If the current time is already past 4 AM, schedule it for the next day
    if (scheduledTime.isBefore(now)) {
      scheduledTime.add(1, 'day');
    }

    // Calculate the time difference
    const timeDiff = scheduledTime.diff(now);

    // Schedule the task to run at 4 AM in India timezone
    BackgroundTimer.setTimeout(() => {
      // Call your updateSubtitles function here
      updateSubtitles();
    }, timeDiff);

    console.log(scheduledTime.toString(), 'time', now.toString());
    console.log(timeDiff, "timediff");

    // If the current time is exactly 4 AM, call the function immediately
    if (is4AM) {
      updateSubtitles();
    }
  }, []);
  useEffect(() => {
    const handleAdmin = async () => {
      try {
        const userCollection = firestore().collection('admin');
        const userQuery = userCollection.where('name', '==', 'admin');
        const userSnapshot = await userQuery.get();
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const data = userDoc.data();
          const sliderDetails = [];
          // Iterate over the sliderData objects in the admin document
          for (let i = 1; i <= 10; i++) {
            if (data[`sliderData${i}`]?.status) {
              const sliderItem = {
                title: data[`sliderData${i}`].title,
                image: data[`sliderData${i}`].image,
              };
              sliderDetails.push(sliderItem);
            }
          }

          // Now sliderData array contains the formatted slider data
          console.log(sliderDetails);
          setSlider(sliderDetails);
          const whatsAppNumber = userDoc.get('whatsapp');
          const telegramNumber = userDoc.get('telegram');
          setWhatsApp(whatsAppNumber);
          setTelegram(telegramNumber);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
    handleAdmin();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: responsiveHeight(2),
          backgroundColor: '#6a0028'
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons
            name="menu"
            size={responsiveWidth(8.5)}
            color='white'
          />
        </TouchableOpacity>
        <Text style={{ fontSize: responsiveFontSize(2.7), fontFamily: 'Roboto-Medium', marginTop: responsiveWidth(0.5), color: 'white' }}>
          Kalyan Satta Matka
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
              color='white'
            />
            <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: 'Roboto-Medium', textAlign: 'center', margin: responsiveWidth(1), color: 'white' }}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: responsiveWidth(5.5), marginTop: responsiveHeight(2) }}>
          <Carousel
            ref={carouselRef}
            data={slider}
            renderItem={renderBanner}
            sliderWidth={responsiveWidth(90)}
            itemWidth={responsiveWidth(85)}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
          />
        </View>

        <View style={{
          marginVertical: responsiveWidth(5.5), flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: responsiveWidth(5.5)
        }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Add Fund'); }} style={{
            backgroundColor: '#6a0028',
            padding: 10,
            width: responsiveWidth(26),
            borderRadius: responsiveWidth(3),
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: responsiveFontSize(2),
            }}>Add Points</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handlePress('telegram'); }} style={{
            // backgroundColor: '#6a0028',
            padding: 10,
            width: responsiveWidth(14),
            borderRadius: responsiveWidth(3),
          }}>
            <Image
              source={telegramIcon}
              style={{ width: responsiveWidth(9), height: responsiveHeight(4), borderRadius: responsiveWidth(3) }}
            />
            {/* <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: responsiveFontSize(2),
            }}>Telegram</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handlePress('whatsApp'); }} style={{
            // backgroundColor: '#6a0028',
            padding: 10,
            width: responsiveWidth(14),
            borderRadius: responsiveWidth(3),
          }}>
            <Image
              source={whatsAppIcon}
              style={{ width: responsiveWidth(9), height: responsiveHeight(4), borderRadius: responsiveWidth(3) }}
            />
            {/* <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: responsiveFontSize(2),
            }}>WhatsApp</Text> */}
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

        <View style={{ paddingHorizontal: responsiveWidth(5.5) }}>
          {events && events.map(item => (
            <ListItem
              key={item.open}
              navigation={navigation}
              // photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isPlay={item.isPlay}
              open={item.open}
              close={item.close}
              onPress={() => {
                userToken?.Betting ? navigation.navigate('Game', {
                  title: item.title,
                  id: item.id,
                  open: item.open,
                  close: item.close,
                }) : alert('Please contact admin for playing')
              }
              }
            />
          ))}
        </View>
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
