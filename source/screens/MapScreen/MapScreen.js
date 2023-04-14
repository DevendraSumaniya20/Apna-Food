import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import navigationStrings from '../../constant/navigationStrings';

const MapScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const myData = useSelector(state => state.ApiSlice);

  const renderItem = ({item}) => {
    return (
      <View style={styles.main}>
        <View style={styles.subMain}>
          <View>
            <Text>{item.latitude}</Text>
            <Text>{item.longitude}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (myData?.data?.data) {
      setData(myData?.data?.data);
    }
  }, [myData]);

  return (
    <View style={styles.main}>
      {/* {myData?.isLoading && <ActivityIndicator color="#005566" />}
        {myData?.error && <Text>{myData?.error}</Text>}
        {!myData?.isLoading && !myData?.error && ( */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {/* )} */}
    </View>
  );
};

export default MapScreen;
