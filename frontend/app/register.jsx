import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'
import {Link} from "expo-router"
import ThemedButton from '../components/ThemedButton'
import { Ionicons } from '@expo/vector-icons';
import {Colors} from '../constants/Colors'

//api access
import axios from "axios"

const Register = () => {
const [name, onNameChange] = React.useState('');
const [surname, onSurnameChange] = React.useState('');
const [age, onAgeChange] = React.useState();
const [email, onEmailChange] = React.useState('');

const [password, onPasswordChange] = React.useState('');
const [showPassword, setShowPassword] = React.useState(false);

//Colors
const colorScheme = useColorScheme();
const theme = Colors[colorScheme] ?? Colors.light

//sending data to my server

function handleSubmit(){
  const guardianData={
    name: name,
    surname: surname,
    age: age,
    email: email,
    password: password,
  };

  axios.post("http://192.168.137.1:5000/register", guardianData).
  then(res => {
    console.log(res.data);
    if(res.data.status == 'ok'){
      alert("Registration Successful");
    }
    else{
      alert("Registration unsuccessful. Guardian Already has an Account");
    }
  }).catch((e) => console.log(e))
}

  return (
    <ThemedView style={styles.container}>
      <Image source={require("../assets/images/bg.jpg")} style = {styles.bgImage}/>

      <ThemedView style={styles.card}>
        <ThemedText style={[styles.heading, {color: theme.text}]}>Sign Up!</ThemedText>

        <ThemedView style={styles.nameWrapper}>
          <ThemedTextInput label = {"Name"} value = {name} onChangeText={onNameChange} placeholder = {"Name"} style={styles.nameTI}/>
          <ThemedTextInput label = {"Surname"} value = {surname} onChangeText={onSurnameChange} placeholder = {"Surname"} style={styles.nameTI}/>
        </ThemedView>

        <ThemedTextInput label = {"Age"} value = {age} onChangeText={onAgeChange} placeholder = {"Age"}/>
        <ThemedTextInput label = {"Email"} value = {email} onChangeText={onEmailChange} placeholder = {"Email"} keyboardType='email-address'/>

        <ThemedView style={styles.passwordWrapper}>
          <ThemedTextInput label = {"Password"} value = {password} onChangeText={onPasswordChange} placeholder = {"Password"} secureTextEntry = {true} style={{padding: 20}} />
       </ThemedView>

          <Link href = {"/"} onPress={console.log("we outside")} asChild>
            <ThemedButton onPress={()=> handleSubmit()}>
              <ThemedText style={{color: "black"}}>Sign Up</ThemedText> 
            </ThemedButton>
          </Link>
      </ThemedView>
    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {

  },
  heading: {
    fontSize: 50,
    fontWeight: "700"
  },
  icon: {
    width: 50,
    height: 50,
    position: "relative",
    bottom: 30,
    left: 110,
    zIndex: 1
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    flex: 1,
  },
  passwordWrapper: {
    flex: 0,
    //backgroundColor: "red",
    position: "relative",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center", 
    padding: 25,
  },
  nameWrapper: {
    flex: 0,
    //backgroundColor: "red",
    position: "static",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center", 
    padding: 25,
    flexDirection: "row"
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },
  nameTI: {
    width: 150
  }
})