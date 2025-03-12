import React, { JSX } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import MapScreen from '../screens/map';
import ChatScreen from '../screens/chat';
import AlbumScreen from '../screens/album';
import HomeActive from '../assets/svg/homeActive.svg';
import HomeInactive from '../assets/svg/home.svg';
import ChatActive from '../assets/svg/chatActive.svg';
import ChatInactive from '../assets/svg/chat.svg';
import MapActive from '../assets/svg/mapActive.svg';
import MapInActive from '../assets/svg/map.svg';
import AlbumActive from '../assets/svg/albumActive.svg';
import AlbumInActive from '../assets/svg/album.svg';

interface icons {
  Home: JSX.Element;
  Chat: JSX.Element;
  Map: JSX.Element;
  Album: JSX.Element;
}


export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Chat: undefined;
  Album: undefined;
};

const renderTabBarIcon = (route: string, focused: boolean) => {
  const focusedIcons: icons = {
    Home: <HomeActive />,
    Chat: <ChatActive />,
    Map: <MapActive />,
    Album: <AlbumActive />
  };

  const unfocusedIcons: icons = {
    Home: <HomeInactive  />,
    Chat: <ChatInactive />,
    Map: <MapInActive/>,
    Album: <AlbumInActive />
  };

  return (
    <View style={styles.iconContainer}>
      {focused ? focusedIcons[route as keyof icons] : unfocusedIcons[route as keyof icons]}
    </View>
  );
};

const renderLabel = (route: string, focused: boolean) => {
  return (
    <Text style={[styles.tabText, {color: focused ? '#598ef7' : '#fff'}]}>
      {route}
    </Text>
  );
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => renderTabBarIcon(route.name, focused),
        tabBarLabel: ({focused}) => renderLabel(route.name, focused),
        headerShown: false,
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Chat"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Map"
        component={MapScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Album"
        component={AlbumScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontSize: 10,
  },
  tabBar: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    paddingTop: 0,
    paddingBottom: 10,
    borderWidth: 0,
    backgroundColor: '#000',
  },
  iconContainer: {
    paddingTop: 5,
    width: 75,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
});

export default BottomTabs;
