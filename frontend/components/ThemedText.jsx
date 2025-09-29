import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThemedText = ({style, children, ...props}) => {
  return (
    <Text style = {[styles.text, {style}]} {...props}>{children}</Text>
  )
}

export default ThemedText

const styles = StyleSheet.create({
    text: {
        fontFamily: "AlanSans"
    }
})