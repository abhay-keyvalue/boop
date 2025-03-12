import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { styles } from './style';
import { useSelector } from 'react-redux';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDfFYWhi2O4ChKAlo8kyMi-i7ZGVSSIX_0';
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

const locationDelta = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface Stop {
  location: Location;
  duration: string;
}

interface Itinerary {
  tripName: string;
  startLocation: Location;
  endLocation: Location;
  stops: Stop[];
}

const sampleMapData: Itinerary = {
  tripName: 'Kochi to Hyderabad Trip',
  startLocation: {
    name: 'Kochi',
    latitude: 10.2427,
    longitude: 76.2962,
  },
  endLocation: {
    name: 'Hyderabad',
    latitude: 17.4052,
    longitude: 78.9625,
  },
  stops: [
    {
      location: {
        name: 'Bangalore',
        latitude: 12.9716,
        longitude: 77.5946,
      },
      duration: '4 hours',
    },
    {
      location: {
        name: 'Chennai',
        latitude: 13.0843,
        longitude: 80.2705,
      },
      duration: '2 hours',
    },
  ],
};


const MapScreen: React.FC<any> = () => {
  const mapRef = useRef<MapView | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [directionsKey, setDirectionsKey] = useState(0);

  const {itinerary} = useSelector((state: {latestItinerary: {itinerary: Itinerary}}) => state.latestItinerary);
  console.log('itinerary', itinerary);
  console.log('sampleMapData', sampleMapData);

  const mapData = itinerary || sampleMapData;

  const allLocations = [
    mapData.startLocation,
    ...mapData.stops.map(stop => stop.location),
    mapData.endLocation,
  ];

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
          latitude: Number(mapData.startLocation.latitude?.toFixed(4)),
          longitude: Number(mapData.startLocation.longitude?.toFixed(4)),
          ...locationDelta,
        }}
        zoomEnabled
        showsCompass
        showsUserLocation
        onMapReady={() => setMapReady(true)}
      >
        {allLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude:  Number(location.latitude?.toFixed(4)),
              longitude: Number(location.longitude?.toFixed(4)),
            }}
            title={location.name}
          />
        ))}

        {/* Render Directions Only When Map is Ready */}
        {mapReady && (
          <MapViewDirections
            key={directionsKey}
            origin={{
              latitude:  Number(mapData.startLocation.latitude?.toFixed(4)),
              longitude: Number(mapData.startLocation.longitude?.toFixed(4)),
            }}
            destination={{
              latitude:  Number(mapData.endLocation.latitude?.toFixed(4)),
              longitude: Number(mapData.endLocation.longitude?.toFixed(4)),
            }}
            waypoints={mapData.stops.map(stop => ({
              latitude:  Number(stop.location.latitude?.toFixed(4)),
              longitude: Number(stop.location.longitude?.toFixed(4)),
            }))}
            apikey={GOOGLE_PLACES_API_KEY}
            strokeWidth={6}
            strokeColor="blue"
            precision="high"
            mode="DRIVING"
            onReady={result => {
              console.log('Route distance:', result.distance, 'km');
              console.log('Estimated duration:', result.duration, 'minutes');

              if (result.coordinates.length > 0 && mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }
            }}
            onError={errorMessage => console.log('Directions API Error:', errorMessage)}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
