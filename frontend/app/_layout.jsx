import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import ToastManager, { Toast } from "toastify-react-native"

const RootLayout = () => {
    const [fonts] = useFonts({
        AlanSans: require("../assets/fonts/AlanSans-VariableFont_wght.ttf")
    })

    const toastConfig = {
      success: (props) => (
        <View style={{ backgroundColor: 'transparent', padding: 16, borderRadius: 10, position: "absolute", top: 500 }}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>{props.text1}</Text>
          {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
        </View>        
      ),
      error: (props) => (
        <View style={{ backgroundColor: 'transparent', padding: 16, borderRadius: 10, position: "absolute", top: 500 }}>
          <Text style={{ color: '#af0606ff', fontWeight: 'bold' }}>{props.text1}</Text>
          {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
        </View> 
      )
    }
  return ( 
    <>  
      <Stack>
          <Stack.Screen name='index' options={{headerShown: false}}/>
          <Stack.Screen name='register' options={{headerShown: false}}/>
          <Stack.Screen name='/(dashboard)/' options={{headerShown: false}}/>
      </Stack>
      <ToastManager config={toastConfig}/>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})