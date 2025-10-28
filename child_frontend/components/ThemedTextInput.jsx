import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ThemedTextInput = ({style, secureTextEntry = false, ...props}) => {
  return (
    <TextInput 
      style = {[styles.textInput, style]} 
      secureTextEntry={!!secureTextEntry}
      {...props} 
      />
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({
    textInput: {
        height: 60,
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 5,
        borderColor: "green",
        color: "brown",
        fontFamily: "AlanSans",
        fontWeight: "600",
        backgroundColor: "#ffffffff"
    }
})