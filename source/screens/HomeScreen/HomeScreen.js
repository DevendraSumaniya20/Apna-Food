import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {fetchApiData} from '../../store/ApiSlice';
import ImagePath from '../../constant/ImagePath';
import {Rating} from 'react-native-ratings';
import styles from './style';
import navigationStrings from '../../constant/navigationStrings';
import {moderateScale, scale} from 'react-native-size-matters';

import CustomHeaderComponents from '../../components/CustomHeaderComponents';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const myData = useSelector(state => state.ApiSlice);

  const renderItem = ({item}) => {
    return (
      <View style={styles.main}>
        <View style={styles.subMain}>
          <Image style={styles.image} source={ImagePath.FoodIcon} />
          <View>
            <Text style={styles.imageTitile}>{item.title}</Text>

            <View
              style={{
                marginTop: moderateScale(10),
              }}>
              <Rating
                startingValue={item.rating}
                readonly={true}
                imageSize={15}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.MAP, {
                longitude: item.longitude,
                latitude: item.latitude,
                title: item.title,
                rating: item.rating,
                image: item.image,
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
      <TouchableOpacity>
        <CustomHeaderComponents
          label={'Restaurant List'}
          onPress={() => {
            navigation.navigate(navigationStrings.LOGIN);
          }}
        />
      </TouchableOpacity>
      {myData?.isLoading && <ActivityIndicator color="#005566" />}
      {myData?.error && <Text>{myData?.error}</Text>}
      {!myData?.isLoading && !myData?.error && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default HomeScreen;
