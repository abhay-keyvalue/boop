import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import MapScreen from '../screens/map';


export type BottomTabParamList = {
  Home: undefined;
  MapScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen options={{headerShown: false}} name='Home' component={Home} />
      <Tab.Screen options={{headerShown: false}} name='MapScreen' component={MapScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontFamily: 'Inter-Regular',
  },
  tabBar: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    paddingTop: 0,
    paddingBottom: 10,
    borderWidth: 0,
  },
  iconContainer: {
    paddingTop: 5,
    width: 75,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'transparent'
  }
});

export default BottomTabs;
