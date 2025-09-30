import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const ThemedLink = ({style, children, ...props}) => {
  return (
    <Link style={[styles.link, style]} {...props}>{children}</Link>
  )
}

export default ThemedLink

const styles = StyleSheet.create({
    link:{
        margin: 10
    }
})