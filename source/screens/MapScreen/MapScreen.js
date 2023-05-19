import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import {moderateScale, scale} from 'react-native-size-matters';
import ImagePath from '../../constant/ImagePath';
import styles from './styles';
import colors from '../../assets/color/colors';

import Geolocation from '@react-native-community/geolocation';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import navigationStrings from '../../constant/navigationStrings';

const MapScreen = ({navigation}) => {
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapRef = useRef(null);
  const {t} = useTranslation();

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

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

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  });

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
      <View
        style={[
          styles.container,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        {isLoading ? (
          <View
            style={[
              styles.container,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <ActivityIndicator style={styles.loading} size="large" />
          </View>
        ) : (
          <View
            style={[
              styles.container,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            <CustomHeaderComponents
              paddingTop={moderateScale(34)}
              back={t('common:Back')}
              label={t('common:MapView')}
              onPress={() => {
                navigation.goBack();
              }}
            />

            <MapView
              mapType="standard"
              ref={mapRef}
              provider="google"
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

              <Circle
                center={DwarkaLocation}
                radius={10}
                strokeWidth={1}
                fillColor={colors.color1Home}
                strokeColor={colors.mainThemesColor}
              />
              <Circle
                center={currentLocation}
                radius={10}
                strokeWidth={5}
                fillColor={colors.color1Home}
                strokeColor={colors.mainThemesColor}
              />
            </MapView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => goToDwarka()}
                style={[
                  styles.button,
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    isDarkMode ? darkStyles.container : lightStyles.container,
                  ]}>
                  {t('common:GotoDwarka')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default MapScreen;
