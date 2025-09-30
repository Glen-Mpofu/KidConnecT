import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThemedButton = ({style, children, ...props}) => {
  return (
    <Pressable style = {[styles.button, style]} {...props}>
      {children}
    </Pressable>
  )
}

export default ThemedButton

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        
    }
})