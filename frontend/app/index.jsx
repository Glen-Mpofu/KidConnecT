import { StyleSheet, Text, View, TextInput, Image, useColorScheme, Pressable, TouchableOpacity } from 'react-native'
import React, { use, useState } from 'react'
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

const Login = () => {
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [newPassord,setNewPassword]=useState('');
//theme
const colorScheme = useColorScheme();
const theme = Colors[colorScheme] ?? Colors.light;

const [pTaBorderColor, setPasswordBorderColor] = React.useState(theme.tiBorderColor)
const [eTaBorderColor, setEmailBorderColor] = React.useState(theme.tiBorderColor)

const router = useRouter()
function handleLogin(){

  const loginData={
    email: email,
    password: password,
  };

  //https://www.youtube.com/watch?v=hsNlz7-abd0
  axios.post("http://192.168.137.1:5000/login", loginData).
  then(res => {
    console.log(loginData)
    if(res.data.status === "ok"){
      alert(res.data.data)
      setEmailBorderColor(theme.tiBorderColor)
      setPasswordBorderColor(theme.tiBorderColor)
      router.push("/dashboard")
    }
    else if(res.data.status === "account error"){
      setEmailBorderColor(Colors.error)
      alert(res.data.data);
    }
    else if(res.data.status === "password error"){
      setPasswordBorderColor(Colors.error)
      alert(res.data.data);      
    }     

  }).catch((e)=> console.log(e))
}

function handlePasswordChange(){
  alert("Password Change")
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
      <ThemedText style={[styles.heading, {color: theme.text}]}> Login</ThemedText>
        <ThemedTextInput value={email} onChangeText={setEmail} label = {"Email"} placeholder = {"Email"} keyboardType='email-address' style={[styles.textStyle, {borderColor: eTaBorderColor}]} />
        <ThemedTextInput value={password} onChangeText = {setPassword} placeholder = {"Password"} secureTextEntry = {true} style={[styles.textStyle, {borderColor: pTaBorderColor}]}/>

        <View style={styles.forgotPasswordContainer}>
          <Pressable onPress={openForgotPasswordModal}>
            <ThemedText style={styles.forgotPassword}>Forgot Password</ThemedText>
          </Pressable>
        </View>

        <ThemedButton onPress={()=> handleLogin()}>  
          <ThemedText>Log in</ThemedText>
        </ThemedButton>

        <Modal 
          transparent={true}
          animationType='fade'
          visible={modalVisible}
        >
          <ThemedView style={styles.modalThemeContainer}>
            <ThemedTextInput value={email} onChangeText={setEmail} label = {"Email"} placeholder = {"Email"} keyboardType='email-address' style={[styles.textStyle, {borderColor: eTaBorderColor}]} />
            <ThemedTextInput value={newPassord} onChangeText = {setNewPassword} placeholder = {"New Password"} secureTextEntry = {true} style={[styles.textStyle, {borderColor: pTaBorderColor}]}/>

            <ThemedButton onPress={()=> handlePasswordChange()} style={{backgroundColor: "brown"}}>  
              <ThemedText>Change</ThemedText>
            </ThemedButton>

            <TouchableOpacity onPress={closeForgotPasswordModal}>
              <Ionicons name="arrow-back" size={35} color={'brown'} style={styles.backIcon}/>
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
  forgotPassword: {
    fontSize: 13,
    color: "red",
    position: "absolute",
    alignSelf: "flex-end",
  },
  forgotPasswordContainer:{
    height: 30,
    width: 300, 
  },
  modalThemeContainer: {
    flex: 1,
    backgroundColor: "rgba(187, 240, 192, 0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  backIcon: {
    position: "absolute",
    top: 50,
    alignSelf: "flex-start",
    padding: 50
  }
})