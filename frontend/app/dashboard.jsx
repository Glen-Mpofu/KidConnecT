import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native'
import React, {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L, { icon } from "leaflet"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import ThemedView from '../components/ThemedView'
import Geolocation, { getCurrentPosition } from "react-native-geolocation-service"
import ThemedText from '../components/ThemedText'

//const position = [-23.8494, 29.4480]

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});
// npm install react-native-geolocation-service

const Dashboard = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(Platform.OS === "web"){
      getWebLocation();
    } 
    else{ 
      requestLocationPermission();
    }
  }, []);

  const getWebLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => setError(err.message),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      )
    }
    else{
      setError("Geolocation not supported in this browser")
    }
  }

  const requestLocationPermission = async () => {
    if(Platform.OS === "ios"){
      Geolocation.requestAuthorization("whenInUse");
      getCurrentLocation();
    }
    else{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "Ok"
          },
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          getCurrentLocation();
        }
        else{
          setError("Location permission denied")
        }
      }
      catch(err){
        setError(err)
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    )
  }

  if(!location){
    return(
      <ThemedView>
        <ThemedText>Fetching location...</ThemedText>
      </ThemedView>
    )    
  }

const position = [location.latitude, location.longitude]

  return (
    <ThemedView>
      <MapContainer
        center={position}
        zoom={12}
        style={{height: "400px", width: "100%"}}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker title='Limpopo' position={position}>
          <Popup>Hello! This is Your Location</Popup>
        </Marker>
      </MapContainer>
    </ThemedView>
  )
}

export default Dashboard

const styles = StyleSheet.create({})