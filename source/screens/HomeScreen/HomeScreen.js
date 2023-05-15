import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  Text,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './style';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {useTranslation} from 'react-i18next';
import {openDatabase} from 'react-native-sqlite-storage';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import {moderateScale} from 'react-native-size-matters';
import axios from 'axios';

const db = openDatabase({
  name: 'user',
});

const HomeScreen = ({navigation}) => {
  const [isAr, setIsAr] = useState(false);
  const [value, setValue] = useState('');
  const [values, setValues] = useState([]);
  const [apiData, setApiData] = useState([]);

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
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setApiData(response.data);
        createTable();
        getDetails();
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await createTable();
      await getDetails();
    };
    fetchData();
  }, []);

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

  const addDetails = () => {
    if (!value) {
      Alert.alert('Please Enter a valid value');
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO USER(name) VALUES (?)`,
        [value.toString()],
        (sqlTxn, res) => {
          console.log('Data is added successfully');
          getDetails();
          setValue('');
        },
        error => {
          console.log('error while inserting data: ' + error.message);
        },
      );
    });
  };

  const DeleteDetails = () => {
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM USER`,
        [],
        (sqlTxn, res) => {
          console.log('Data is deleted');
          getDetails();
        },
        error => {
          console.log('error while deleting data: ' + error.message);
        },
      );
    });
  };

  const insertData = data => {
    db.transaction(txn => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        txn.executeSql(
          `INSERT INTO USER (id, name, email) VALUES (?, ?, ?)`,
          [item.id, item.name, item.email],
          (sqlTxn, res) => {
            console.log('Data inserted successfully');
          },
          error => {
            console.log('Error inserting data:', error.message);
          },
        );
      }
    });
  };

  const getDetails = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM USER`,
        [],
        (sqlTxn, res) => {
          console.log('Data is fetched successfully');
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({id: item.id, name: item.name, email: item.email});
            }
            setValues(results);
          } else {
            setValues([]);
          }
        },
        error => {
          console.log(' error while getting data: ' + error.message);
        },
      );
    });
  };

  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? 'black' : 'white'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View
        style={[
          styles.main,
          isAr && styles.arSliderTextAlign,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <CustomHeaderComponents
          paddingTop={moderateScale(50)}
          back={t('common:Back')}
          label={t('common:RestaurantList')}
          onPress={() => {
            navigation.navigate(navigationStrings.LOGIN);
          }}
        />

        <View style={{paddingTop: moderateScale(20), paddingHorizontal: '3%'}}>
          <FlatList
            data={apiData}
            renderItem={({item}) => (
              <View>
                <Text
                  style={[
                    isDarkMode ? darkStyles.container : lightStyles.container,
                  ]}>
                  {item.id}
                </Text>
                <Text
                  style={[
                    isDarkMode ? darkStyles.container : lightStyles.container,
                  ]}>
                  {item.name}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
