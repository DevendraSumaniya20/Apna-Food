import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const DemoSectionlist = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error while Fetching Data', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(filterData);
  }, [search, products]);

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#000000',
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#fff',
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <TextInput
        style={[
          styles.item,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={isDarkMode ? '#fff' : '#000'}
        placeholder="Search Details.."
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />

      {filteredData.length > 0 ? (
        <SectionList
          sections={[{data: filteredData}]}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={({item}) => (
            <View
              style={[
                styles.item,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              <View
                style={[
                  styles.imageMainView,
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                <Image
                  source={{uri: item.image}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={[
                  styles.data,
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.data,
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                {item.price}
              </Text>
            </View>
          )}
        />
      ) : (
        <View
          style={[
            styles.loadingContainer,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <Text>No data found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: moderateScale(16),

    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    alignItems: 'center',
  },
  data: {
    fontSize: scale(14),
    fontWeight: '400',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageMainView: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  image: {
    width: scale(60),
    height: scale(60),
    marginBottom: moderateScale(10),
  },
});

export default DemoSectionlist;
