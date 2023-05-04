import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {moderateScale, scale} from 'react-native-size-matters';
import ImagePath from '../../constant/ImagePath';
import styles from './styles';
import colors from '../../assets/color/colors';

import Geolocation from '@react-native-community/geolocation';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';

const MapScreen = () => {
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapRef = useRef(null);

  useEffect(() => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          setUserLocation &&
            setCurrentLocation({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          setIsLoading(false);
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  }, []);

  const DwarkaLocation = {
    latitude: 22.2376,
    longitude: 68.9674,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const goToDwarka = () => {
    mapRef.current.animateToRegion(DwarkaLocation, 3 * 1000);
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <View
            style={[
              styles.container,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <ActivityIndicator style={styles.loading} size="large" />
          </View>
        ) : (
          <View style={styles.container}>
            <CustomHeaderComponents
              back={'Back'}
              label={'Map view'}
              onPress={() => {
                navigation.navigate(navigationStrings.LOGIN);
              }}
            />
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={userLocation || currentLocation}
              onRegionChangeComplete={region => setRegion(region)}>
              <Marker
                coordinate={currentLocation}
                image={ImagePath.ShopIcon}
                style={{
                  height: moderateScale(10),
                  width: moderateScale(10),
                  borderRadius: moderateScale(50),
                }}
              />
              <Marker
                coordinate={DwarkaLocation}
                image={ImagePath.Dwarkadhish}
                style={{
                  height: moderateScale(10),
                  width: moderateScale(10),
                  borderRadius: moderateScale(50),
                }}
              />

              <Polyline
                coordinates={[DwarkaLocation, currentLocation]}
                strokeColor={colors.mainThemesColor}
                strokeWidth={3}
              />
            </MapView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => goToDwarka()}
                style={styles.button}>
                <Text style={styles.buttonText}>Let's go to Dwarka</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default MapScreen;
