// components/NativeMap.js
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function NativeMap({ location }) {
  if (!location) return null;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="Your Location"
        description="This is where you are."
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 400,
    width: '100%',
  },
});
