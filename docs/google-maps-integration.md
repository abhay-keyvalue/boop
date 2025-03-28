# Google Maps Integration Guide

This document outlines the steps to integrate Google Maps, location tracking, and direction plotting features in the React Native app.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Location Tracking Implementation](#location-tracking-implementation)
5. [Direction Plotting](#direction-plotting)
6. [Background Location Updates](#background-location-updates)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- React Native project
- Google Maps API key
- iOS and Android development environment
- Required permissions for location services

## Installation Steps

### 1. Install Required Dependencies

```bash
npm install @react-native-community/geolocation
npm install react-native-maps
npm install react-native-background-fetch
npm install react-native-maps-directions
```

### 2. iOS Setup

1. Run pod install:
```bash
cd ios && pod install && cd ..
```

2. Create a bridging header file:
   - In Xcode, right-click on your project's iOS folder
   - Select "New File" and choose "Header File"
   - Name it `YourApp-Bridging-Header.h`
   - Add the following content:
```objective-c
#import <GoogleMaps/GoogleMaps.h>
```

3. Configure the bridging header:
   - In Xcode, select your project in the navigator
   - Select your target
   - Go to "Build Settings"
   - Search for "bridging header"
   - Set "Objective-C Bridging Header" to `YourApp/YourApp-Bridging-Header.h`

4. Update `ios/YourApp/AppDelegate.swift`:
```swift
import UIKit
import GoogleMaps

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Initialize Google Maps
    GMSServices.provideAPIKey("YOUR_API_KEY")
    
    return true
  }
  // ... rest of AppDelegate implementation
}
```

5. In `ios/YourApp/Info.plist`, add:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to show you on the map</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>We need your location to track your route</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need your location to track your route</string>
<key>UIBackgroundModes</key>
<array>
    <string>location</string>
</array>
```

### 3. Android Setup

1. Add Google Maps API key to `android/app/src/main/AndroidManifest.xml`:
```xml
<application>
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_API_KEY"/>
</application>
```

2. Add permissions to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

## Configuration

### 1. Initialize Google Maps

In your main app component (`src/init.tsx`), the app is already configured to handle location tracking and background updates.

### 2. Location Tracking Implementation

The app uses the following components for location tracking:

- `@react-native-community/geolocation` for location services
- `react-native-background-fetch` for background updates
- Redux for state management of location data

Key features implemented:
- High accuracy location tracking
- Background location updates
- Route coordinate storage
- Location state management

## Location Tracking Implementation

### Current Implementation

The app tracks location using the following components:

1. **Location State Management**:
```typescript
const {currentLocation, routeCoordinates} = useSelector(
  (state: any) => state.location,
);
```

2. **Location Tracking Setup**:
```typescript
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
```

3. **Background Updates**:
```typescript
const configureBackgroundFetch = async () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 1,
      stopOnTerminate: false,
      startOnBoot: true,
    },
    async (taskId) => {
      startLocationTracking();
      BackgroundFetch.finish(taskId);
    }
  );
  BackgroundFetch.start();
};
```

## Direction Plotting

To implement direction plotting, you'll need to:

1. Add the Google Maps Directions API to your project
2. Implement the direction plotting logic using react-native-maps-directions
3. Handle route visualization

### Example Implementation

```typescript
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MapWithDirections = () => {
  const origin = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
  };
  
  const destination = {
    latitude: 37.78825, // Example destination
    longitude: -122.4324,
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey="YOUR_API_KEY"
        strokeWidth={3}
        strokeColor="#0000FF"
        mode="DRIVING"
        onReady={result => {
          console.log(`Distance: ${result.distance} km`);
          console.log(`Duration: ${result.duration} min`);
        }}
        onError={(errorMessage) => {
          console.log('Directions API Error:', errorMessage);
        }}
      />
      <Marker coordinate={origin} title="Start" />
      <Marker coordinate={destination} title="End" />
    </MapView>
  );
};
```

Key features of react-native-maps-directions:
- Automatic route calculation
- Multiple transportation modes (DRIVING, BICYCLING, WALKING, TRANSIT)
- Customizable route styling
- Distance and duration information
- Error handling
- Support for waypoints

## Background Location Updates

The app implements background location updates using `react-native-background-fetch`. This allows the app to:

1. Track location even when the app is in the background
2. Update route coordinates continuously
3. Maintain location accuracy with high precision settings

## Troubleshooting

### Common Issues

1. **Location Permission Issues**
   - Ensure all required permissions are added to both iOS and Android manifests
   - Check if location services are enabled on the device

2. **Background Updates Not Working**
   - Verify background modes are properly configured
   - Check if the app has necessary permissions
   - Ensure the device's battery optimization is not affecting the app

3. **Google Maps Not Loading**
   - Verify API key is correctly configured
   - Check if billing is enabled for the Google Maps API
   - Ensure all required dependencies are installed

### Debugging Tips

1. Use console logs to track location updates:
```typescript
console.log('Location Update:', position);
```

2. Monitor background fetch events:
```typescript
BackgroundFetch.configure({
  // ... configuration
}, async (taskId) => {
  console.log('[BackgroundFetch] Event received:', taskId);
  // ... implementation
});
```

3. Check Redux state for location updates:
```typescript
console.log('Current Location:', currentLocation);
console.log('Route Coordinates:', routeCoordinates);
```

## Best Practices

1. Always handle location permission requests gracefully
2. Implement error handling for location services
3. Use appropriate accuracy settings based on your needs
4. Clean up location watchers when components unmount
5. Handle background/foreground state transitions
6. Implement proper error boundaries for map components
7. Use appropriate caching strategies for route data 