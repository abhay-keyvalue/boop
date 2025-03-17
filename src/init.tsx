import React, { use, useEffect, useState } from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import GetLocation from 'react-native-get-location';
import { useDispatch, useSelector } from 'react-redux';

// import type {RootState} from './src/store';
import Root from './navigation/root';
import NetworkLogs from './components/networkLogs';
import { addNewRouteCoordinate, resetLocation, setLocation } from './screens/home/locationSlice';
import Geolocation from '@react-native-community/geolocation';

function Init(): React.JSX.Element {
  const dispatch = useDispatch();
  const {currentLocation, routeCoordinates} = useSelector(
    (state: any) => state.location,
  );

  const [watchId, setWatchId] = useState<number | null>(null);

  const themeStyle = {
    container: {
      backgroundColor: '#000',
    },
  };

  useEffect(() => {
    configureBackgroundFetch();
    startLocationTracking();
    return () => {
      if (watchId) {Geolocation.clearWatch(watchId);}
    };
  }, []);

  const updateRouteCoordinates = (newLocation: {latitude: number, longitude: number}) => {
    if(newLocation?.latitude === 0 && newLocation?.longitude === 0) {return;}
    dispatch(setLocation(newLocation));
    if(routeCoordinates?.length < 10000) {
      dispatch(addNewRouteCoordinate(newLocation));
    } else {
      dispatch(resetLocation());
    }
  };

  const startLocationTracking = () => {
    const id = Geolocation.watchPosition(
      (position) => {
        updateRouteCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
    );
    setWatchId(id);
  };

  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      updateRouteCoordinates({latitude: location.latitude, longitude: location.longitude});
    } catch (error) {
      console.warn('Location error:', error);
    }
  };

  const configureBackgroundFetch = async () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 1,
        stopOnTerminate: false,
        startOnBoot: true,
      },
      async (taskId) => {
        await getCurrentLocation();
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.error('[BackgroundFetch] Failed to configure', error);
      }
    );

    BackgroundFetch.start();
  };

  const renderLocationCoordinates = () => {
    return (
      <View style={styles.locationContainer}>
        <Text style={styles.location}>{`Latitude: ${currentLocation.latitude?.toFixed(6) || 0.0}`}</Text>
        <Text style={styles.location}>{`Longitude: ${currentLocation.longitude?.toFixed(6) || 0.0}`}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, themeStyle.container]}>
      <SafeAreaView style={styles.container}>
        <Root />
        <NetworkLogs />
      </SafeAreaView>
      <SafeAreaView style={styles.bottom} />
      {renderLocationCoordinates()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottom: {
    flex: 0,
  },
  locationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 5,
    paddingBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  location: {
    fontSize: 12,
    color: '#fff',
    paddingRight: 10,
  },
});

export default Init;
