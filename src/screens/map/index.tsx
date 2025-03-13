import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {Itinerary} from '../../types';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDfFYWhi2O4ChKAlo8kyMi-i7ZGVSSIX_0';
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

const locationDelta = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapScreen: React.FC<any> = () => {
  const mapRef = useRef<MapView | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [directionsKey, setDirectionsKey] = useState(0);

  const {itinerary} = useSelector(
    (state: {latestItinerary: {itinerary: Itinerary}}) => state.latestItinerary,
  );

  const mapData = itinerary || {startLocation: null, stops: [], endLocation: null};

  const allLocations = [
    mapData?.startLocation,
    ...mapData?.stops?.map(stop => stop?.location),
    mapData?.endLocation,
  ];

  useEffect(() => {
    if (mapReady) {
      setDirectionsKey(prevKey => prevKey + 1);
    }
  }, [mapReady]);

  const renderHeader = () => {
    if (!mapData?.startLocation) {
      return null;
    }
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{`${ mapData?.startLocation?.name || 'Itinerary'} to ${ mapData?.endLocation?.name || 'Itinerary'}`}</Text>
      </View>
    );
  };

  try {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {mapData.startLocation ? (
          <MapView
            key={directionsKey}
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: Number(mapData.startLocation?.latitude?.toFixed(4)),
              longitude: Number(mapData.startLocation?.longitude?.toFixed(4)),
              ...locationDelta,
            }}
            zoomEnabled
            showsCompass
            showsUserLocation
            mapType="satelliteFlyover"
            //mapTypes available:  'hybrid' | 'mutedStandard' | 'none' | 'satellite' | 'standard' | 'terrain' | 'satelliteFlyover' | 'hybridFlyover'
            onMapReady={() => setMapReady(true)}>
            {allLocations?.map((location, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(location?.latitude?.toFixed(4)),
                  longitude: Number(location?.longitude?.toFixed(4)),
                }}
                title={location?.name}
              />
            ))}

            {/* Render Directions Only When Map is Ready */}
            {mapReady && (
              <MapViewDirections
                key={directionsKey}
                origin={{
                  latitude: Number(mapData.startLocation?.latitude?.toFixed(4)),
                  longitude: Number(
                    mapData.startLocation?.longitude?.toFixed(4),
                  ),
                }}
                destination={{
                  latitude: Number(mapData.endLocation?.latitude?.toFixed(4)),
                  longitude: Number(mapData.endLocation?.longitude?.toFixed(4)),
                }}
                waypoints={mapData?.stops?.map(stop => ({
                  latitude: Number(stop.location?.latitude?.toFixed(4)),
                  longitude: Number(stop.location?.longitude?.toFixed(4)),
                }))}
                apikey={GOOGLE_PLACES_API_KEY}
                strokeWidth={6}
                strokeColor="blue"
                precision="high"
                mode="DRIVING"
                onReady={result => {
                  if (result.coordinates.length > 0 && mapRef.current) {
                    setTimeout(() => {
                      mapRef?.current?.fitToCoordinates(result.coordinates, {
                        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                        animated: true,
                      });
                    }, 100);
                  }
                }}
                onError={errorMessage =>
                  console.log('Directions API Error:', errorMessage)
                }
              />
            )}
          </MapView>
        ) :
        <Text style={styles.errorText}>No Itinerary data available</Text>
        }
      </View>
    );
  } catch (error) {
    console.log('error while parsing', error);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to render map</Text>
      </View>
    );
  }
};

export default MapScreen;
