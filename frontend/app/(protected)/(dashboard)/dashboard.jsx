import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemedView from '../../../components/ThemedView';
import ThemedText from '../../../components/ThemedText';
import ThemedButton from '../../../components/ThemedButton';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Default Marker Config ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/map_markers/marker-icon-2x.png',
  iconUrl: '/map_markers/marker-icon.png',
  shadowUrl: '/map_markers/marker-shadow.png',
});

const Dashboard = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const { BaseLayer, Overlay } = LayersControl;

  useEffect(() => {
    getWebLocation();
  }, []);

  const getWebLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => setError(err.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setError('Geolocation not supported in this browser');
    }
  };

  if (!location) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText style={styles.loadingText}>Fetching location...</ThemedText>
        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <div style={styles.mapContainer}>
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          worldCopyJump={false}
          maxBounds={[[-90, -180], [90, 180]]}
          maxBoundsViscosity={1.0}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </BaseLayer>

            <BaseLayer name="Cycle Map">
              <TileLayer
                url="https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
                attribution="&copy; OpenCycleMap contributors"
              />
            </BaseLayer>

            <BaseLayer name="Satellite">
              <TileLayer
                url="https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=ea475f2daa824ad58be14ced221de964"
                attribution="&copy; Thunderforest contributors"
              />
            </BaseLayer>

            <Overlay checked name="Your Location">
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>Your location</Popup>
              </Marker>
            </Overlay>
          </LayersControl>
        </MapContainer>

      </div>

      <ThemedButton style={styles.trackButton}>
        <ThemedText style={styles.trackText}>Track Child</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f4f9f4',
    paddingVertical: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2E7D32', // deep green
    textAlign: 'center',
    fontFamily: 'AlanSans',
  },
  mapContainer: {
    height: '450px',
    width: '85%',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    border: '2px solid #A5D6A7',
  },
  trackButton: {
    marginTop: 25,
    backgroundColor: '#81C784',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    boxShadow: '0 3px 10px rgba(20, 69, 204, 0.2)',
  },
  trackText: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  loadingText: {
    fontSize: 20,
    color: '#2E7D32',
  },
  errorText: {
    color: '#D32F2F',
    marginTop: 10,
  },
});
