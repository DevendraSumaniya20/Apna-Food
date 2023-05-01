import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Text} from 'react-native-paper';

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const newYorkLocation = {
    latitude: 40.7128,
    longitude: -74.006,
  };

  const coordinate = currentLocation ? [currentLocation, newYorkLocation] : [];

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
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
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
        <Text>Fetching the currentLocation Please Wait.... </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1, height: '100%', width: '100%'}}
        region={region}
        onRegionChange={setRegion}>
        <Circle
          center={currentLocation}
          radius={500}
          fillColor="rgba(255, 0, 0, 0.2)"
          strokeColor="red"
        />
        <Polyline coordinates={coordinate} strokeColor="blue" strokeWidth={3} />
        <Marker coordinate={newYorkLocation} />
        <Marker coordinate={currentLocation} />
      </MapView>
    </View>
  );
};

export default MapScreen;
