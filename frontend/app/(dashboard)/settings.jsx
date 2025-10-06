import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import axios from 'axios'
import { Toast } from 'toastify-react-native'

const Settings = () => {
  const [guardian, setGuardian] = useState(null) // <-- moved inside component

  useEffect(() => {
    const baseURL = Platform.OS === "web" 
      ? "http://localhost:5000/session" 
      : "http://192.168.137.1:5000/session";

    axios.get(baseURL, { withCredentials: true })
      .then((res) => {
        if(res.data.status === "ok"){
          Toast.show({
            type: "success", 
            text1: "Session is there",
            useModal: false
          })
          setGuardian(res.data.data)
        } else {
          Toast.show({
            type: "error", 
            text1: "No Session",
            useModal: false
          })
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <ThemedView>
      <ThemedText>{guardian?.name || "Loading..."}</ThemedText>
    </ThemedView>
  )
}

export default Settings

const styles = StyleSheet.create({})
