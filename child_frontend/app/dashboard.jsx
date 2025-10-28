import { StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';

const Dashboard = () => {
  const intervalRef = useRef(null);
  const baseUrl = "http://192.168.137.1:5000";

  useEffect(() => {
    const sendLocation = async () => {
      try {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log("Sending location:", latitude, longitude);

        const res = await axios.post(`${baseUrl}/setCurrentLocation`, { latitude, longitude });
        if (res.data.status === "ok") {
          Toast.show({ type: "success", text1: res.data.data, useModal: false });
        } else {
          Toast.show({ type: "error", text1: res.data.data, useModal: false });
        }
      } catch (error) {
        console.error("Location send failed:", error.message);
        Toast.show({ type: "error", text1: "Location send failed", useModal: false });
      }
    };

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied. Allow location to send updates.");
        return;
      }

      // Send immediately
      await sendLocation();

      // Start interval every 1 minute
      intervalRef.current = setInterval(sendLocation, 60000);
    };

    startTracking();

    // Cleanup when component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <ThemedView>
      <ThemedText>Tracking device location every minute...</ThemedText>
    </ThemedView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
