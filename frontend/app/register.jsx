import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'
import {Link} from "expo-router"
import ThemedButton from '../components/ThemedButton'
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
const [name, onNameChange] = React.useState('');
const [surname, onSurnameChange] = React.useState('');
const [age, onAgeChange] = React.useState(0);
const [email, onEmailChange] = React.useState('');

const [password, onPasswordChange] = React.useState('');
const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ThemedView style={styles.container}>

      <ThemedView style={styles.card}>
        <ThemedText>Sign Up!</ThemedText>

        <ThemedTextInput label = {"Name"} value = {name} onChangeText={onNameChange} placeholder = {"Name"}/>
        <ThemedTextInput label = {"Surname"} value = {surname} onChangeText={onSurnameChange} placeholder = {"Surname"}/>
        <ThemedTextInput label = {"Age"} value = {age} onChangeText={onAgeChange} placeholder = {"Age"}/>
        <ThemedTextInput label = {"Email"} value = {email} onChangeText={onEmailChange} placeholder = {"Email"} keyboardType='email-address'/>

        <ThemedView style={styles.passwordWrapper}>
          
          <ThemedTextInput label = {"Password"} value = {password} onChangeText={onPasswordChange} placeholder = {"Password"} secureTextEntry = {true} style={{padding: 20}} />

          <TouchableOpacity onPress={{}}>
            <Ionicons name='eye' size={20} style={styles.icon}/>
          </TouchableOpacity>  

        </ThemedView>

          <Link href = {"/"} asChild>
            <ThemedButton>
              <ThemedText>Sign Up</ThemedText> 
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
    padding: 25
  }
})