import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font';

const RootLayout = () => {
    const [fonts] = useFonts({
        AlanSans: require("../assets/fonts/AlanSans-VariableFont_wght.ttf")
    })

  return (   
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='register' options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})