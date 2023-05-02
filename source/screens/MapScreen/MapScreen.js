import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {moderateScale, scale} from 'react-native-size-matters';

import colors from '../../assets/color/colors';

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const ahmedabadLocation = {
    latitude: 23.0225,
    longitude: 72.5714,
  };

  const coordinate = currentLocation
    ? [currentLocation, ahmedabadLocation]
    : [];

  console.log('this is the Map ', coordinate);

  useEffect(() => {
    let watchId;
    try {
      watchId = Geolocation.watchPosition(
        position => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: region ? region.latitudeDelta : 100,
            longitudeDelta: region ? region.longitudeDelta : 100,
          });
          if (!region) {
            setRegion({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              latitudeDelta: 100,
              longitudeDelta: 100,
            });
          }
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          distanceFilter: 500,
        },
      );
    } catch (e) {
      console.log('Error while watching position: ', e);
    }
    return () => Geolocation.clearWatch(watchId);
  }, [region]);

  if (!region) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.mainThemesColor} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Text>Black clover</Text>
      <MapView
        style={{
          height: '100%',
          width: '100%',
        }}
        initialRegion={region}
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        onRegionChange={setRegion}>
        <Circle
          center={currentLocation}
          radius={moderateScale(500)}
          fillColor="rgba(255, 0, 0, 0.2)"
          strokeColor="red"
        />
        <Polyline
          coordinates={coordinate}
          strokeColor="blue"
          strokeWidth={moderateScale(3)}
        />
        <Marker coordinate={ahmedabadLocation} />
        <Marker coordinate={currentLocation} />
      </MapView>
    </View>
  );
};

export default MapScreen;
