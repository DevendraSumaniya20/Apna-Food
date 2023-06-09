import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './style';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {useTranslation} from 'react-i18next';
import {openDatabase} from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale, scale} from 'react-native-size-matters';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const db = openDatabase({
  name: 'user',
});

const HomeScreen = ({navigation}) => {
  const [isAr, setIsAr] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isOfflineDataAvailable, setIsOfflineDataAvailable] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const {t} = useTranslation();

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
      borderColor: '#ffffff',
    },
  });

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchApiData();
    } catch (error) {
      console.log('Error refreshing data:', error);
    }
    setIsRefreshing(false);
  };

  const getDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('apiData');
      if (data) {
        setApiData(JSON.parse(data));
        setIsOfflineDataAvailable(true);
      }
    } catch (error) {
      console.log('Error fetching data from storage:', error);
    }
  };

  const saveDataToStorage = async data => {
    try {
      await AsyncStorage.setItem('apiData', JSON.stringify(data));
    } catch (error) {
      console.log('Error saving data to storage:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await createTable();
      checkInternetConnection();
      getDataFromStorage();
    };
    fetchData();
  }, []);

  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);

    if (netInfoState.isConnected) {
      setShowOfflineMessage(false);
      if (!showOnlineMessage) {
        setShowOnlineMessage(true);
        fetchApiData();

        setTimeout(() => {
          setShowTimeoutMessage(false);
          setShowOnlineMessage(false);
        }, 2000);
      }
    } else {
      setShowOnlineMessage(false);
      setShowOfflineMessage(true);

      setTimeout(() => {
        setShowOfflineMessage(false);
      }, 2000);
    }
  };

  const fetchApiData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.data && response.data.length > 0) {
        setApiData(response.data);
        saveDataToStorage(response.data);
      } else {
        console.log('Empty API response');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50))`,
        [],
        (sqlTxn, res) => {
          console.log('table created successfully');
        },
        error => {
          console.log(
            'error occurred while creating a table: ' + error.message,
          );
        },
      );
    });
  };

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View
          style={[
            styles.main,
            isAr && styles.arSliderTextAlign,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <CustomHeaderComponents
            paddingTop={moderateScale(32)}
            back={t('common:Back')}
            label={t('common:ShopList')}
            onPress={() => {
              navigation.navigate(navigationStrings.LOGIN);
            }}
          />

          <View
            style={{
              borderColor: isDarkMode ? '#fff' : '#000',
              borderWidth: 0.3,
            }}
          />

          <View
            style={[isDarkMode ? darkStyles.container : lightStyles.container]}>
            <TouchableOpacity
              style={[
                isDarkMode ? darkStyles.container : lightStyles.container,
                styles.iconContainer,
              ]}
              onPress={() => navigation.openDrawer()}>
              <MaterialIcons
                name="menu-open"
                size={24}
                color={isDarkMode ? '#fff' : '#000'}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              isDarkMode ? darkStyles.container : lightStyles.container,
              styles.dataMainView,
            ]}>
            {isConnected ? (
              <View
                style={[
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                <FlatList
                  onRefresh={onRefresh}
                  refreshing={isRefreshing}
                  contentContainerStyle={{paddingBottom: moderateScale(150)}}
                  showsVerticalScrollIndicator={false}
                  contentInsetAdjustmentBehavior="automatic"
                  data={apiData}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                          styles.flatlistFlext,
                        ]}>
                        <View
                          style={[
                            isDarkMode
                              ? darkStyles.container
                              : lightStyles.container,
                            styles.flatlistSubMain,
                          ]}>
                          <Image
                            resizeMode="contain"
                            source={{uri: item.image}}
                            style={[styles.flatListImage]}
                          />
                        </View>
                        <View
                          style={[
                            isDarkMode
                              ? darkStyles.container
                              : lightStyles.container,
                          ]}>
                          <Text
                            style={[
                              isDarkMode
                                ? darkStyles.container
                                : lightStyles.container,
                              styles.flatListTitle,
                            ]}>
                            {item.title}
                          </Text>

                          <View
                            style={[
                              styles.flatListAddView,
                              isDarkMode
                                ? darkStyles.container
                                : lightStyles.container,
                            ]}>
                            <View
                              style={[
                                isDarkMode
                                  ? darkStyles.container
                                  : lightStyles.container,
                                styles.flatListMainTitle,
                              ]}>
                              <Text
                                style={[
                                  isDarkMode
                                    ? darkStyles.container
                                    : lightStyles.container,
                                  styles.flatListPrice,
                                ]}>
                                ${item.price}
                              </Text>
                            </View>
                            <View
                              style={[
                                isDarkMode
                                  ? darkStyles.container
                                  : lightStyles.container,
                              ]}>
                              <TouchableOpacity
                                style={[
                                  styles.addtocartTouchable,
                                  isDarkMode
                                    ? darkStyles.container
                                    : lightStyles.container,
                                  {
                                    borderColor: isDarkMode ? '#fff' : '#000',
                                  },
                                ]}
                                onPress={() => {
                                  navigation.navigate(
                                    navigationStrings.CHECKOUT,
                                    {
                                      itemTitle: item.title,
                                      itemPrice: item.price,
                                      itemImage: item.image,
                                    },
                                  );
                                }}>
                                <Text
                                  style={[
                                    styles.addtocartText,
                                    isDarkMode
                                      ? darkStyles.container
                                      : lightStyles.container,
                                  ]}>
                                  Add to Cart
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            ) : (
              <>
                {!isConnected && isOfflineDataAvailable && (
                  <>
                    {showOfflineMessage ? (
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                          styles.offlineText,
                        ]}>
                        No internet connection. Displaying offline data:
                      </Text>
                    ) : null}
                    <FlatList
                      onRefresh={onRefresh}
                      refreshing={isRefreshing}
                      contentContainerStyle={{
                        paddingBottom: moderateScale(150),
                      }}
                      showsVerticalScrollIndicator={false}
                      data={apiData}
                      renderItem={({item}) => {
                        return (
                          <View
                            style={[
                              isDarkMode
                                ? darkStyles.container
                                : lightStyles.container,
                              styles.flatlistFlext,
                            ]}>
                            <View
                              style={[
                                isDarkMode
                                  ? darkStyles.container
                                  : lightStyles.container,
                                styles.flatlistSubMain,
                              ]}>
                              <Image
                                resizeMode="contain"
                                source={{uri: item.image}}
                                style={[styles.flatListImage]}
                              />
                            </View>
                            <View
                              style={[
                                isDarkMode
                                  ? darkStyles.container
                                  : lightStyles.container,
                              ]}>
                              <Text
                                style={[
                                  isDarkMode
                                    ? darkStyles.container
                                    : lightStyles.container,
                                  styles.flatListTitle,
                                ]}>
                                {item.title}
                              </Text>

                              <View
                                style={[
                                  isDarkMode
                                    ? darkStyles.container
                                    : lightStyles.container,
                                  styles.flatListMainTitle,
                                ]}>
                                <Text
                                  style={[
                                    isDarkMode
                                      ? darkStyles.container
                                      : lightStyles.container,
                                    styles.flatListPrice,
                                  ]}>
                                  ${item.price}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      }}
                      keyExtractor={item => item.id.toString()}
                    />
                  </>
                )}
              </>
            )}
          </View>
        </View>
        {showOfflineMessage && !showTimeoutMessage && (
          <View
            style={[
              styles.offlineMessageContainer,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            <Text
              style={[
                styles.offlineMessageText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              You are offline
            </Text>
          </View>
        )}
        {showOnlineMessage && !showTimeoutMessage && (
          <View
            style={[
              styles.onlineMessageContainer,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            <Text
              style={[
                styles.onlineMessageText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              You are Online
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default HomeScreen;
