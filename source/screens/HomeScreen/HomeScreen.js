import {View, StyleSheet, FlatList, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './style';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {useTranslation} from 'react-i18next';
import {openDatabase} from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';

import {moderateScale} from 'react-native-size-matters';
import axios from 'axios';

const db = openDatabase({
  name: 'user',
});

const HomeScreen = ({navigation}) => {
  const [isAr, setIsAr] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const {t} = useTranslation();

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

  useEffect(() => {
    const fetchData = async () => {
      await createTable();
      checkInternetConnection();
    };
    fetchData();
  }, []);

  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);
    if (netInfoState.isConnected) {
      fetchApiData();
    } else {
      getDataFromDatabase();
    }
  };

  const getDataFromDatabase = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM USER',
        [],
        (sqlTxn, res) => {
          const rows = res.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setApiData(data);
        },
        error => {
          console.log('Error fetching data from table:', error.message);
        },
      );
    });
  };

  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setApiData(response.data);
      saveDataToDatabase(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const saveDataToDatabase = async data => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)',
        [],
        () => {
          txn.executeSql(
            'DELETE FROM USER',
            [],
            () => {
              data.forEach(item => {
                txn.executeSql(
                  'INSERT INTO USER (name, email) VALUES (?, ?)',
                  [item.name, item.email],
                  (_, result) => {
                    console.log('Data saved to database:', result);
                  },
                  error => {
                    console.log(
                      'Error saving data to database:',
                      error.message,
                    );
                  },
                );
              });
            },
            error => {
              console.log('Error clearing table:', error.message);
            },
          );
        },
        error => {
          console.log('Error creating table:', error.message);
        },
      );
    });
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
      <View
        style={[
          styles.main,
          isAr && styles.arSliderTextAlign,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <CustomHeaderComponents
          paddingTop={moderateScale(35)}
          back={t('common:Back')}
          label={t('common:RestaurantList')}
          onPress={() => {
            navigation.navigate(navigationStrings.LOGIN);
          }}
        />

        <View
          style={[
            isDarkMode ? darkStyles.container : lightStyles.container,
            styles.dataMainView,
          ]}>
          {isConnected ? (
            <View style={styles.flatlistInnerView}>
              <FlatList
                data={apiData}
                renderItem={({item}) => {
                  return (
                    <View>
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                        ]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                        ]}>
                        {item.username}
                      </Text>
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                        ]}>
                        {item.email}
                      </Text>
                    </View>
                  );
                }}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          ) : (
            <>
              <Text
                style={[
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                No internet connection. Displaying offline data:
              </Text>
              <FlatList
                data={apiData}
                renderItem={({item}) => {
                  return (
                    <View>
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                        ]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                        ]}>
                        {item.username}
                      </Text>
                      <Text
                        style={[
                          isDarkMode
                            ? darkStyles.container
                            : lightStyles.container,
                        ]}>
                        {item.email}
                      </Text>
                    </View>
                  );
                }}
                keyExtractor={item => item.id.toString()}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
