import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login';
import {setTopLevelNavigator} from './navigationUtils';
import BottomTabs from './tabNavigator';
import MapScreen from '../screens/map';

export type RootStackParamList = {
  Initializing: undefined;
  Login: undefined;
  HomeTabs: any;
  MapScreen: any
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => (
  <NavigationContainer
    ref={(navigatorRef: any) => {
      setTopLevelNavigator(navigatorRef);
    }}
  >
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
      <Stack.Screen name='HomeTabs' component={BottomTabs} options={{headerShown: false}} />
      <Stack.Screen name='MapScreen' component={MapScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Root;
