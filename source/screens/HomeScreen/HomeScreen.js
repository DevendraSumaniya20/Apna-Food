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
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {useTranslation} from 'react-i18next';
import {openDatabase} from 'react-native-sqlite-storage';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import {moderateScale} from 'react-native-size-matters';

const db = openDatabase({
  name: 'user',
});

const HomeScreen = ({navigation}) => {
  const [isAr, setIsAr] = useState(false);
  const [value, setValue] = useState();

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
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS userDetils (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
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

  const addDetails = value => {
    if (!value) {
      Alert.alert('Please Enter a valid value');
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO userDetils(name) VALUES (?)`,
        [value.toString()],
        (sqlTxn, res) => {
          console.log('Data is added');
        },
        error => {
          console.log('error while inserting data: ' + error.message);
        },
      );
    });
  };

  const getDetalis = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM userDetails ORDER BY id AESC`,
        [],
        (sqlTxn, res) => {
          console.log('Data is fetched successfully');
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

        <View>
          <TextinputWithLabel
            paddingTop={moderateScale(10)}
            onChangeText={value => {
              setValue(value);
            }}
            value={value}
          />
        </View>
        <View style={{paddingTop: moderateScale(20), paddingHorizontal: '3%'}}>
          <ButtonCustomComponents buttonText={'Add'} onPress={addDetails} />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
