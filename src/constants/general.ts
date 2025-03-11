import {Platform, Dimensions} from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const hitSlop = {top: 10, left: 10, right: 10, bottom: 10};

export const routes = {
  LOGIN: 'Login',
  HOME_TABS: 'HomeTabs',
  HOME: 'Home',
};