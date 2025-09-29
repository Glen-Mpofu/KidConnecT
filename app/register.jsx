import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'

const Register = () => {
const [name, onNameChange] = React.useState('');

  return (
    <ThemedView>
      <ThemedText>Register</ThemedText>
      <ThemedTextInput label = {"Name"} value = {name} onChangeText={onNameChange}/>

      <ThemedText>{name}</ThemedText>
    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({})