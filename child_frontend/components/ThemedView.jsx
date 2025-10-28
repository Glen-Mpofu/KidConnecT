import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThemedView = ({style, children, ...props}) => {
  return (
    <View style = {[styles.container, style]} {...props}>{children}</View>
  )
}

export default ThemedView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    }
})