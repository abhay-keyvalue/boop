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
    title: 'Kakkanad',
    description: 'Starting point',
    latitude: 10.0159,
    longitude: 76.3419,
  },
  {
    id: 2,
    title: 'Munnar',
    description: 'Tea gardens',
    latitude: 10.0889,
    longitude: 77.0595,
  },
  {
    id: 3,
    title: 'Dhanushkodi',
    description: 'Road to nowhere',
    latitude: 9.1784,
    longitude: 79.4166,
  },
  {
    id: 4,
    title: 'Chennai',
    description: 'Main city of Tamil Nadu',
    latitude: 13.0843,
    longitude: 80.2705,
  },
  {
    id: 5,
    title: 'Bangalore',
    description: 'Silicon Valley of India',
    latitude: 12.9716,
    longitude: 77.5946,
  },
];

const MapScreen = () => {
  const mapRef = useRef<MapView | null>(null);
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
        key={directionsKey}
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
        {sampleLocations.slice(1, sampleLocations?.length).map(location => (
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
          <>
            <MapViewDirections
              key={directionsKey}
              origin={{
                latitude: sampleLocations[0].latitude,
                longitude: sampleLocations[0].longitude,
              }}
              destination={{
                latitude: sampleLocations[sampleLocations.length - 1].latitude,
                longitude:
                  sampleLocations[sampleLocations.length - 1].longitude,
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
                  setTimeout(() => {
                    if (mapRef.current) {
                      mapRef.current.fitToCoordinates(result.coordinates, {
                        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                        animated: true,
                      });
                    }
                  }, 1000);
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
            {/* <Polyline
              coordinates={sampleLocations.map(loc => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
              }))}
              strokeWidth={6}
              strokeColor="red"
            /> */}
          </>
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
