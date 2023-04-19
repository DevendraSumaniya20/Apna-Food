import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import DeviceInfo from 'react-native-device-info';

import {fetchApiData} from '../../store/ApiSlice';
import ImagePath from '../../constant/ImagePath';

import styles from './style';
import navigationStrings from '../../constant/navigationStrings';

import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import colors from '../../assets/color/colors';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();

  const myData = useSelector(state => state.ApiSlice);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => console.log(error),
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
          source={ImagePath.startFillIcon}
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

  const renderItem = ({item}) => {
    const ratingStars = generateRatingStars(item);

    return (
      <View style={styles.main}>
        <View style={styles.subMain}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={ImagePath.FoodIcon} />
          </View>
          <View style={styles.titleAndRatingContainer}>
            <View>
              <Text style={styles.imageTitile}>{item.title}</Text>

              <View style={styles.ratingContainer}>{ratingStars}</View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.MAP, {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  title: item.title,
                  rating: item.rating,
                  image: item.image,
                  location,
                });
              }}>
              <View style={styles.imageView}>
                <Image
                  resizeMode="contain"
                  source={ImagePath.locationIcon}
                  style={styles.locationIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchApiData());
  }, []);

  useEffect(() => {
    if (myData?.data?.data) {
      setData(myData?.data?.data);
    }
  }, [myData]);

  return (
    <View style={styles.main}>
      <CustomHeaderComponents
        label={'Restaurant List'}
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
      />

      <View style={styles.FlatListDataStyle}>
        {!myData?.isLoading && !myData?.error && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
        {myData?.isLoading && (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color={colors.color1Home} size={'large'} />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
