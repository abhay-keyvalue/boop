import React from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./style";

const sampleLocations = [
  {
    id: 1,
    title: "Felix Trattoria",
    description: "A famous Italian restaurant",
    latitude: 45.4375,
    longitude: 12.3358,
  },
  {
    id: 2,
    title: "Ponte di Rialto",
    description: "Iconic bridge in Venice",
    latitude: 45.4380,
    longitude: 12.3343,
  },
  {
    id: 3,
    title: "Piazza San Marco",
    description: "Main public square of Venice",
    latitude: 45.4341,
    longitude: 12.3380,
  },
];

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Use Google Maps
        initialRegion={{
          latitude: 45.4375, // Centered in Venice
          longitude: 12.3358,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsCompass
        showsUserLocation
      >
        {sampleLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            description={location.description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
