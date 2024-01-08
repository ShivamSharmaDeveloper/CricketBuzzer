import React from 'react';
import {View, Image} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function BannerSlider({data}) {
  return (
    <View>
      <Image
        source={data.image}
        style={{height: responsiveHeight(20.5), width: responsiveWidth(83.5), borderRadius: responsiveWidth(3)}}
      />
    </View>
  );
}
