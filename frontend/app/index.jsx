import { StyleSheet, Text, View, TextInput, Image, useColorScheme, Pressable, TouchableOpacity, Platform, BackHandler } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import ThemedText from '../components/ThemedText'
import ThemedView from '../components/ThemedView'
import ThemedTextInput from '../components/ThemedTextInput'
import ThemedButton  from '../components/ThemedButton'
import { Colors } from '../constants/Colors'

// api for communicating with the server
import axios from 'axios'
import { Link, useRouter } from 'expo-router'
import { Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ThemedLink from '../components/ThemedLink'

//toast 
import {Toast} from 'toastify-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  // disabling the back button when the user is in the login screen
  useEffect(() => {
    const backAction = () => {
      Toast.show({
        type: "success",
        text1: "back removed",
        useModal: false
      })
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress', backAction,
    );

    return () => backHandler.remove();
  }, [])


 const [email,setEmail]=React.useState('');
 const [password,setPassword]=React.useState('');

 const [showPassword, setShowPassword] = React.useState(true)
//theme
const colorScheme = useColorScheme();
const theme = Colors[colorScheme] ?? Colors.light;

const [pTaBorderColor, setPasswordBorderColor] = React.useState(theme.tiBorderColor)
const [eTaBorderColor, setEmailBorderColor] = React.useState(theme.tiBorderColor)

const router = useRouter()
async function handleLogin(){

  const loginData={
    email: email,
    password: password,
  };

  const baseUrl = Platform.OS === "web" ? "http://localhost:5000/login" : "http://192.168.137.1:5000/login"

  //https://www.youtube.com/watch?v=hsNlz7-abd0
  axios.post(baseUrl, loginData, {withCredentials: true}).
  then(async res => {
    console.log(loginData)
    if(res.data.status === "ok"){
      Toast.show({
        type: "success",
        text1: res.data.data,
        useModal: false
      })

      setEmailBorderColor(theme.tiBorderColor)
      setPasswordBorderColor(theme.tiBorderColor)

      //Setting the token
        await AsyncStorage.setItem("userToken", res.data.token)

      router.replace("/(protected)/(dashboard)/dashboard")
    }
    else if(res.data.status === "account error"){
      setEmailBorderColor(Colors.error)
      Toast.show({
        type: "error",
        text1: res.data.data,
        useModal: false
      })
    }
    else if(res.data.status === "password error"){
      setPasswordBorderColor(Colors.error)
      Toast.show({
        type: "error",
        text1: res.data.data,
        useModal: false
      })      
    }     
  }).catch((e)=> console.log(e))
}

async function handlePasswordChange(){
  const changePasswordData = {email: email}
  if(email == "" || email == null){
    Toast.show({
        type: "error",
        text1: "Please enter your email address",
        useModal: false
      })
    return;
  }

  axios.post("http://192.168.137.1:5000/forgot-password", changePasswordData).
  then(res => {
    if(res.data.status === "error"){
      Toast.show({
        type: "error",
        text1: res.data.data,
        useModal: false
      })
    }
  })
  
}

//Modal
const [modalVisible, setModalVisible] = useState(false)
const openForgotPasswordModal = () =>{
  setModalVisible(true);
}

const closeForgotPasswordModal = () =>{
  setModalVisible(false);
}

return (
    <ThemedView style={styles.container}> 
    <Image source={require("../assets/images/bg.jpg")} style={styles.bgImage}/>
      <ThemedText style={[styles.heading]}> Login</ThemedText>
      <ThemedText style={[styles.paraText]}>Welcome back to KidConnecT!</ThemedText>

        <ThemedTextInput value={email} onChangeText={setEmail} label = {"Email"} placeholder = {"Email"} keyboardType='email-address' style={[styles.textStyle, {borderColor: eTaBorderColor}]} />

        <View style={styles.passwordContainer}>
          <ThemedTextInput value={password} onChangeText = {setPassword} placeholder = {"Password"} secureTextEntry = {showPassword} style={[styles.textStyle, {borderColor: pTaBorderColor, width: 260, margin: 0}]}/>        
          <Pressable onPress={()=>setShowPassword(!showPassword)}>
            <Ionicons style = {styles.icon} name={showPassword ? "eye" : "eye-off" } size={30} color={"white"}/>
          </Pressable>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Pressable onPress={openForgotPasswordModal}>
            <ThemedText style={styles.forgotPassword}>Forgot Password</ThemedText>
          </Pressable>
        </View>

        <ThemedButton onPress={()=> handleLogin()}>  
          <ThemedText style={styles.btnText}>Log in</ThemedText>
        </ThemedButton>

        <ThemedLink href = {"/register"}>
          <ThemedText style={styles.linkText}>New to KidConnecT? Create Account</ThemedText>
        </ThemedLink>

        <ThemedLink href = {"/child_track"} style={{marginTop: 0}}>
          <ThemedText style={styles.linkText}>I am a Child?</ThemedText>
        </ThemedLink>

        <Modal 
          transparent={true}
          animationType='fade'
          visible={modalVisible}
        >
          <ThemedView style={styles.modalThemeContainer}>
            <ThemedText style={[styles.heading]}>Forgot Password</ThemedText>
            <ThemedTextInput value={email} onChangeText={setEmail} label = {"Email"} placeholder = {"Email"} keyboardType='email-address' style={[styles.textStyle, {borderColor: eTaBorderColor}]} />
            
            <ThemedButton onPress={()=> 
              handlePasswordChange()
            } style={{backgroundColor: "brown"}}>  
              <ThemedText style={styles.btnText}>Request Reset Code</ThemedText>
            </ThemedButton>

            <TouchableOpacity onPress={closeForgotPasswordModal} style={styles.backIcon}>
              <Ionicons name="arrow-back" size={35} color={'brown'} />
            </TouchableOpacity>
          </ThemedView>
        </Modal>
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
  },
  paraText:{
    zIndex: 1,
    fontSize: 20,
    fontStyle: "italic"
  },
  forgotPassword: {
    fontSize: 13,
    color: "red",
    position: "absolute",
    alignSelf: "flex-end",
  },
  forgotPasswordContainer:{
    height: 30,
    width: 300, 
    marginTop: 30
  },
  passwordContainer:{
    height: 30,
    width: 300, 
    flexDirection: "row",
    marginTop: 8
  },
  modalThemeContainer: {
    flex: 1,
    backgroundColor: "rgba(187, 240, 192, 0.9)",
    justifyContent: "center",
    alignItems: "center"
  },
  backIcon: {
    position: "absolute",
    top: 50,
    alignSelf: "flex-start",
    padding: 50,
    height: 35,
    width: 35
  }, 
  icon:{
    alignSelf:"center",
    margin: 10
  },
  linkText: {
    color: "black",
    fontStyle: "italic"
  },
  btnText: {
    color: "black",
  }
})