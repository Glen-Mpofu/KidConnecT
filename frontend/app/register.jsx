import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'
import {Link} from "expo-router"
import ThemedButton from '../components/ThemedButton'

const Register = () => {
const [name, onNameChange] = React.useState('');
const [surname, onSurnameChange] = React.useState('');
const [age, onAgeChange] = React.useState(0);
const [email, onEmailChange] = React.useState('');
const [password, onPasswordChange] = React.useState('');

  return (
    <ThemedView>
      <ThemedText>Sign Up!</ThemedText>

      <ThemedTextInput label = {"Name"} value = {name} onChangeText={onNameChange} placeholder = {"Name"}/>
      <ThemedTextInput label = {"Surname"} value = {surname} onChangeText={onSurnameChange} placeholder = {"Surname"}/>
      <ThemedTextInput label = {"Age"} value = {age} onChangeText={onAgeChange} placeholder = {"Age"}/>
      <ThemedTextInput label = {"Email"} value = {email} onChangeText={onEmailChange} placeholder = {"Email"} keyboardType='email-address'/>
      <ThemedTextInput label = {"Password"} value = {password} onChangeText={onPasswordChange} placeholder = {"Password"}/>
        
        <Link href = {"/"} asChild>
          <ThemedButton>
            <ThemedText>Sign Up</ThemedText> 
          </ThemedButton>
        </Link>

    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({})