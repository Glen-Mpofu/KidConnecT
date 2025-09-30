import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ThemedTextInput = ({style, ...props}) => {
  return (
    <TextInput style = {[styles.textInput, style]} {...props} />
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        padding: 25,
        margin: 5,
        borderColor: "green",
        color: "brown",
        fontFamily: "AlanSans",
        fontWeight: "600",
        backgroundColor: "#ffffffff"
    }
})