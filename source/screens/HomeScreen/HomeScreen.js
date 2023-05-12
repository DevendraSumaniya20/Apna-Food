import {View, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import SQLite from 'react-native-sqlite-storage';
import {useTranslation} from 'react-i18next';

const HomeScreen = ({navigation}) => {
  const [isAr, setIsAr] = useState(false);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const {t} = useTranslation();

  // Create a new SQLite database
  const db = SQLite.openDatabase(
    {
      name: 'myDB.db',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  const addUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        ['Jane Doe', 'jane.doe@example.com'],
        () => {
          console.log('User added successfully');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const getUsers = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (tx, results) => {
          if (results.rows) {
            console.log(results.rows.raw());
          } else {
            console.log('No rows found');
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const updateUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET email = ? WHERE name = ?',
        ['jane.doe@example.com', 'Jane Doe'],
        () => {
          console.log('User updated successfully');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const deleteUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE name = ?',
        ['Jane Doe'],
        () => {
          console.log('User deleted successfully');
        },
        error => {
          console.log(error);
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
          back={t('common:Back')}
          label={t('common:RestaurantList')}
          onPress={() => {
            navigation.navigate(navigationStrings.LOGIN);
          }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add User" onPress={addUser} />
          <Button title="Get Users" onPress={getUsers} />
          <Button title="Update User" onPress={updateUser} />
          <Button title="Delete User" onPress={deleteUser} />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
