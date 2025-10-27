import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'
import {Link, useRouter} from "expo-router"
import ThemedButton from '../components/ThemedButton'
import { Ionicons } from '@expo/vector-icons';
import {Colors} from '../constants/Colors'

//api access
import axios from "axios"
import ThemedLink from '../components/ThemedLink'

import { Toast } from 'toastify-react-native'

const Register = () => {
const [name, onNameChange] = React.useState('');
const [surname, onSurnameChange] = React.useState('');
const [age, onAgeChange] = React.useState("21");
const [email, onEmailChange] = React.useState('');

const [password, onPasswordChange] = React.useState('');
const [confirmPassword, onConfirmPasswordChange] = React.useState('');
const [showPassword, setShowPassword] = React.useState(false);
const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

const passwordsMatch = password === confirmPassword
//Colors

const colorScheme = useColorScheme();
const theme = Colors[colorScheme] ?? Colors.light

const router = useRouter();

//sending data to my server
function handleSubmit(){
  if(password != confirmPassword){
    Toast.show({
      type: "error",
      text1: "Passwords don't match",
      useModal: false
    })
    return;
  }

  const guardianData={
    name: name,
    surname: surname,
    age: Number(age),
    email: email,
    password: confirmPassword,
  };

  axios.post("http://192.168.137.1:5000/register", guardianData, {withCredentials: true}).
  then(res => {
    console.log(res.data);
    if(res.data.status == 'ok'){
      Toast.show({
        type: "success",
        text1: res.data.data,
        useModal: false
      })
      router.push("/");
    }
    else{
      Toast.show({
        type: "error",
        text1: res.data.data,
        useModal: false
      });
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
          <View style={styles.passwordContainer}>      
            <ThemedTextInput label = {"Password"} value = {password} onChangeText={onPasswordChange} placeholder = {"Password"} secureTextEntry = {showPassword} style={{padding: 20, margin: 0}} />

            <Pressable onPress={()=>setShowPassword(!showPassword)}>
              <Ionicons style = {styles.eyeIcon} name={showPassword ? "eye" : "eye-off" } size={30} color={"white"}/>
            </Pressable>
          </View>
          
          <View style={styles.passwordContainer}> 
            <ThemedTextInput label = {"Confirm Password"} value = {confirmPassword} onChangeText={onConfirmPasswordChange} placeholder = {"Confirm Password"} secureTextEntry = {showConfirmPassword} style={{padding: 20, borderColor: passwordsMatch ? "green" : "red", margin: 0}} />
            <Pressable onPress={()=>setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons style = {styles.eyeIcon} name={showConfirmPassword ? "eye" : "eye-off" } size={30} color={"white"}/>
            </Pressable>
          </View>
       </ThemedView>

        <ThemedButton onPress={()=> handleSubmit()} style={{marginTop: 5}}>
          <ThemedText style={{color: "black"}}>Sign Up</ThemedText> 
        </ThemedButton>
       
        <ThemedLink href = {"/"}>
          <ThemedText>Already Have an Account? Sign In</ThemedText>
        </ThemedLink>

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
    padding: 50,
    
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
  },
  eyeIcon:{
    alignSelf:"center",
    margin: 10
  },
  passwordContainer:{
    height: 30,
    width: 300, 
    flexDirection: "row",
    marginBottom: 30,
    paddingTop: 5
  },
})