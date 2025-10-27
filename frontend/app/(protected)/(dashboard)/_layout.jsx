import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { useFonts } from 'expo-font';
import ToastManager, { Toast } from "toastify-react-native"
import {Drawer} from "expo-router/drawer"
import LogoutDrawer from '../../../components/LogoutDrawer';
import { Ionicons } from '@expo/vector-icons';

const DashboardLayout = () => {
    const router = useRouter(); 

    const toastConfig = {
      success: (props) => (
        <View style={{ backgroundColor: 'transparent', padding: 16, borderRadius: 10, position: "absolute", top: 500 }}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>{props.text1}</Text>
          {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
        </View>        
      ),
      error: (props) => (
        <View style={{ backgroundColor: 'transparent', padding: 16, borderRadius: 10, position: "absolute", top: 500 }}>
          <Text style={{ color: '#af0606ff', fontWeight: 'bold' }}>{props.text1}</Text>
          {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
        </View> 
      )
    }
  return ( 
    <Drawer
    drawerContent={(props) => <LogoutDrawer {...props}/>}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {fontStyle: "AlanSans"}
      }}
    >
      <Drawer.Screen name="dashboard" options={{drawerLabel: "Home", title: "Home",
        drawerIcon: ({ color, size }) => (
          <Ionicons name='home-outline' size={size} color={color}/>
        )
      }} 
      />
      
      <Drawer.Screen name="settings" options={{drawerLabel: "Settings", title: "Settings", 
      drawerIcon: ({ color, size }) => (
        <Ionicons name='person-outline' size={size} color={color}/>
        )
      }} 
      />
    </Drawer>
  )
}

export default DashboardLayout

const styles = StyleSheet.create({})