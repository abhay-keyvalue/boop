import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {styles} from './style';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCqxOoNrZ8Mk7kQSjFEy83YDhH0xvCCxko';
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;
const locationDelta = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const sampleLocations = [
  {
    id: 1,
    title: 'Venice',
    description: 'Starting point',
    latitude: 45.4385,
    longitude: 12.3358,
  },
  {
    id: 2,
    title: 'Vicenza',
    description: 'Destination',
    latitude: 45.5462,
    longitude: 11.5414,
  },
  {
    id: 3,
    title: 'Padua',
    description: 'Main public square of Venice',
    latitude: 45.4105,
    longitude: 11.8782,
  },
  {
    id: 4,
    title: 'Treviso',
    description: 'Main public square of Venice',
    latitude: 45.6669,
    longitude: 12.2431,
  },
];

const MapScreen = () => {
  const mapRef: any = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [directionsKey, setDirectionsKey] = useState(0);

  useEffect(() => {
    if (mapReady) {
      setDirectionsKey(prevKey => prevKey + 1);
    }
  }, [mapReady]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: sampleLocations[0]?.latitude,
          longitude: sampleLocations[0]?.longitude,
          ...locationDelta,
        }}
        zoomEnabled
        showsCompass
        showsUserLocation
        onMapReady={() => {
          setMapReady(true);
        }} // Set mapReady to true when map is loaded
      >
        {sampleLocations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
          />
        ))}

        {/* Render Directions Only When Map is Ready */}
        {mapReady && (
          <MapViewDirections
            key={directionsKey}
            origin={{
              latitude: sampleLocations[0].latitude,
              longitude: sampleLocations[0].longitude,
            }}
            destination={{
              latitude: sampleLocations[sampleLocations.length - 1].latitude,
              longitude: sampleLocations[sampleLocations.length - 1].longitude,
            }}
            waypoints={sampleLocations.slice(1, -1).map(loc => ({
              latitude: loc.latitude,
              longitude: loc.longitude,
            }))}
            apikey={GOOGLE_PLACES_API_KEY}
            strokeWidth={6}
            strokeColor="blue"
            precision="high"
            mode="DRIVING"
            onReady={result => {
              console.log('Route distance:', result.distance, 'km');
              console.log('Estimated duration:', result.duration, 'minutes');

              if (result.coordinates.length > 0) {
                console.log('Fit to coordinates:', result.coordinates);
                mapRef.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                  animated: true,
                });
              }
            }}
            onStart={params =>
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              )
            }
            onError={errorMessage =>
              console.log('Directions API Error:', errorMessage)
            }
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
