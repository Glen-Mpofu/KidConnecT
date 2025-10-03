import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const position = [-23.8494, 29.4480];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const Dashboard = () => {
  return (
   
     <MapContainer
      center={position}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
 
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={position}>
        <Popup>Hello! This is Johannesburg.</Popup>
      </Marker>
    </MapContainer>
      
        

  )
}
export default Dashboard

const styles = StyleSheet.create({
  box: {
    width: 400,
    height: 400,
    backgroundColor: 'blue',
    
    
  }
})