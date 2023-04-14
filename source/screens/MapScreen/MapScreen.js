import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Circle, Marker, Polyline} from 'react-native-maps';
import colors from '../../assets/color/colors';
import ImagePath from '../../constant/ImagePath';
import styles from './styles';

import {Rating} from 'react-native-ratings';

const MapScreen = ({route}) => {
  const {longitude, latitude, rating, title, image} = route.params
    ? route.params
    : {};

  const region = {
    latitude,
    longitude,
    title,
    rating,
    image,
    latitudeDelta: 0.144,
    longitudeDelta: 0.144,
  };

  // console.log(region);

  const coordinate = [
    {latitude: 23.0122822, longitude: 72.5059498},
    {
      latitude,
      longitude,
    },
  ];

  return (
    <View style={styles.main}>
      <MapView style={styles.map} initialRegion={region}>
        <Circle
          center={{latitude: 23.0122822, longitude: 72.5059498}}
          radius={10}
          // fillColor={colors.mainThemesColor}
          strokeColor={colors.color2Home}
        />

        <Polyline
          coordinates={coordinate}
          strokeColor={colors.mainThemesColor}
          strokeWidth={5}
        />
        <Marker
          coordinate={{latitude, longitude, title, rating, image}}
          image={ImagePath.ShopIcon}
          title={title}
          tappable={true}>
          <Callout tooltip>
            <View>
              <View style={styles.MapTopscreen}>
                <Image
                  resizeMode="contain"
                  style={styles.MapShopImg}
                  source={ImagePath.mapShopTitleImg}
                />
                <View style={styles.MapTopscreenSecondView}>
                  <Text style={styles.TextTopTitle}>{title}</Text>
                  <View style={styles.ratingStyle}>
                    <Rating
                      startingValue={rating}
                      readonly={true}
                      imageSize={15}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.CalloutArrow} />
          </Callout>
        </Marker>
        <Circle
          center={{latitude, longitude}}
          radius={10}
          strokeColor={colors.mainThemesColor}
          fillColor={colors.color1Home}
          strokeWidth={1}
          lineCap={'square'}
          lineJoin={'bevel'}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
