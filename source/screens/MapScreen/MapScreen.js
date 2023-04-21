import React, {useState, useEffect} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import MapView, {Callout, Circle, Marker, Polyline} from 'react-native-maps';
import colors from '../../assets/color/colors';
import ImagePath from '../../constant/ImagePath';
import styles from './styles';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';
import {moderateScale} from 'react-native-size-matters';

import Geolocation from '@react-native-community/geolocation';

const MapScreen = ({route, navigation}) => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  const {longitude, latitude, rating, title, image} = route.params
    ? route.params
    : {};

  const region = {
    latitude: latitude || userLatitude,
    longitude: longitude || userLongitude,
    title,
    rating,
    image,
    latitudeDelta: 105,
    longitudeDelta: 105,
  };

  const coordinate = [
    {latitude: userLatitude, longitude: userLongitude},
    {latitude, longitude},
  ];

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(
          'Current position:',
          position.coords.latitude,
          position.coords.longitude,
        );
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
      },
      error => setError(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const generateRatingStars = ({rating}) => {
    const filledStars = Math.floor(rating);
    const halfFilledStar = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfFilledStar;

    const ratingStars = [];

    for (let i = 0; i < filledStars; i++) {
      ratingStars.push(
        <Image
          key={i}
          source={ImagePath.startFillIcon}
          style={styles.starIcon}
        />,
      );
    }
    if (halfFilledStar) {
      ratingStars.push(
        <Image
          key={filledStars}
          source={ImagePath.startEmptyIcon}
          style={styles.starIcon}
        />,
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      ratingStars.push(
        <Image
          key={filledStars + halfFilledStar + i}
          source={ImagePath.startEmptyIcon}
          style={styles.starIcon}
        />,
      );
    }

    return ratingStars;
  };

  return (
    <View style={styles.CustomHeaderComponentsView}>
      <CustomHeaderComponents
        label={'Map View'}
        back={'Back'}
        onPress={() => {
          navigation.navigate(navigationStrings.TABHOME);
        }}
      />

      <View style={styles.main}>
        {latitude && longitude && (
          <MapView
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}>
            <Circle
              center={{latitude, longitude}}
              radius={moderateScale(10)}
              fillColor={colors.mainThemesColorOp}
              strokeWidth={moderateScale(0.01)}
              zIndex={moderateScale(0)}
            />
            <Circle
              center={{latitude, longitude}}
              radius={moderateScale(4)}
              fillColor={colors.white}
              strokeColor={colors.mainThemesColor}
              strokeWidth={moderateScale(30)}
              zIndex={moderateScale(2)}
            />
            <Polyline
              coordinates={coordinate}
              strokeColor={colors.mainThemesColor}
              strokeWidth={moderateScale(5)}
            />

            <Marker
              draggable={true}
              coordinate={{latitude, longitude, title, rating, image}}
              image={ImagePath.ShopIcon}
              title={title}
              rating={rating}
              tappable={true}>
              <Callout tooltip>
                <View style={styles.MapTopscreen}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={styles.MapShopImg}
                      source={ImagePath.mapShopTitleImg}
                    />
                  </View>
                  <View style={styles.MapTopscreenSecondView}>
                    <Text style={styles.TextTopTitle}>{title}</Text>
                    <View style={styles.ratingStyle}>
                      {generateRatingStars({rating})}
                    </View>
                  </View>
                </View>

                <View style={styles.CalloutArrow} />
              </Callout>
            </Marker>

            <Circle
              center={{latitude, longitude}}
              radius={moderateScale(10)}
              strokeColor={colors.mainThemesColor}
              fillColor={colors.color1Home}
              strokeWidth={moderateScale(1)}
              lineCap={'square'}
              lineJoin={'bevel'}
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

export default MapScreen;
