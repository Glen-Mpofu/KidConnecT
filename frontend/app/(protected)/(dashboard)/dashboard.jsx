import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native'
import React, {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L, { icon } from "leaflet"
import ThemedView from '../../../components/ThemedView'
import Geolocation, { getCurrentPosition } from "react-native-geolocation-service"
import ThemedText from '../../../components/ThemedText'
import ThemedButton from '../../../components/ThemedButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import axios from "axios"
import { Toast } from 'toastify-react-native'

//const position = [-23.8494, 29.4480]

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map_markers/marker-icon-2x.png",
  iconUrl: "/map_markers/marker-icon.png",
  shadowUrl: "/map_markers/marker-shadow.png",
});
// npm install react-native-geolocation-service

const Dashboard = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [userToken, setUserToken] = React.useState(null)
  const router = useRouter();
  const [loading, setLoading] = React.useState(true)

  /*
    qr code api: 
    https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example
  */
  useEffect(() => {
    const init = async () => {
      if(Platform.OS === "web"){
        getWebLocation();
      } 
      else{ 
        requestLocationPermission();
      }
    };
    init();
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

  async function generateTrackCode() {
    const baseUrl = Platform.OS === "android" ? "http://192.168.137.1:5000/generate-code" : "http://localhost:5000/generate-code"
    axios.get(baseUrl, {withCredentials: true}).then((res) => {
      if(res.data.status === "ok"){
        Toast.show({
          type: "success",
          text1: res.data.data,
          useModal: false
        })
      }else{
        Toast.show({
          type: "error",
          text1: res.data.data,
          useModal: false
        })
      }
    })
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

      <ThemedButton onPress={() => {
        generateTrackCode()
      }}>
        <ThemedText>Track my child</ThemedText>
      </ThemedButton>
    </ThemedView>
  )
}

export default Dashboard

const styles = StyleSheet.create({})