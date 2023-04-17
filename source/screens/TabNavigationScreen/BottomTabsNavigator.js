import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {moderateScale, scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/color/colors';
import HomeScreen from '../HomeScreen';
import MapScreen from '../MapScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={colors.mainThemesColor}
      inactiveColor={colors.blackOpacity50}
      barStyle={{
        backgroundColor: '#fff',
        height: moderateScale(70),
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Tab.Screen
        name="TabHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="map" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
