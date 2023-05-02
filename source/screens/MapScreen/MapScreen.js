import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentPosition({latitude, longitude});
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setPolylineCoordinates(coordinates => [
          ...coordinates,
          {latitude, longitude},
        ]);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentPosition && (
            <Marker coordinate={currentPosition} title="Current position" />
          )}
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="Static location"
            description="This is a static location"
          />
          {polylineCoordinates.length > 1 && (
            <Polyline
              coordinates={polylineCoordinates}
              strokeColor="#000"
              strokeWidth={3}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'red',
  },
});

export default MapScreen;
