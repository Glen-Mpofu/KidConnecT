import { StyleSheet, Text, View, TextInput, Image, useColorScheme } from 'react-native'
import React, { use, useState } from 'react'
import ThemedText from '../components/ThemedText'
import ThemedView from '../components/ThemedView'
import ThemedTextInput from '../components/ThemedTextInput'
import ThemedButton  from '../components/ThemedButton'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import {view} from 'react-native'
const Login = () => {
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
//theme
const colorScheme = useColorScheme();
const theme = Colors[colorScheme] ?? Colors.light;



  return (
    <ThemedView style={styles.container}> 
    <Image source={require("../assets/images/bg.jpg")} style={styles.bgImage}/>
      <ThemedText style={[styles.heading, {color: theme.text}]}> Login</ThemedText>
        <ThemedTextInput value={email} onChangeText={setEmail} label = {"Email"} placeholder = {"Email"} keyboardType='email-address' style={styles.textStyle} />
        <ThemedTextInput value={password} onChangeText = {setPassword} placeholder = {"Password"} secureTextEntry = {true} style={styles.textStyle}/>
        <ThemedButton>  
        <ThemedText>Log in</ThemedText>
        </ThemedButton>
    </ThemedView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage:{
    ...StyleSheet.absoluteFillObject,
    width:"100%",
    height:"100%",
    opacity: 1,

  },
  textStyle:{
    zIndex: 1,
  },
  heading:{
    zIndex: 1,
    fontSize: 50
  }

})