import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import colors from '../../assets/color/colors';
import ImagePath from '../../constant/ImagePath';

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
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // console.log(region);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{latitude, longitude, title, rating, image}}
          image={ImagePath.ShopIcon}
          title={title}
          tappable={true}>
          <Callout>
            <View>
              <View>
                <Image
                  resizeMode="contain"
                  style={styles.MapTopscreen}
                  source={ImagePath.mapShopTitleImg}
                />
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
