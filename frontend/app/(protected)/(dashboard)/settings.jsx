import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Toast } from 'toastify-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import ThemedView from '../../../components/ThemedView'
import ThemedText from '../../../components/ThemedText'

const Settings = () => {
  const router = useRouter();
  const [userToken, setUserToken] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const [guardian, setGuardian] = useState(null) // <-- moved inside component

useEffect(() => {
  const init = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      router.replace("/");
      return;
    }

    setUserToken(token);

    const baseURL = Platform.OS === "web"
      ? "http://localhost:5000/session"
      : "http://192.168.137.1:5000/session";

    try {
      const res = await axios.get(baseURL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === "ok") {
        setGuardian(res.data.data);
      } else {
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
      router.replace("/");
    }

    setLoading(false);
  };

  init();
}, []);

return (
    <ThemedView>
      <ThemedText>{guardian?.name || "Loading..."}</ThemedText>
    </ThemedView>
  )
}

export default Settings

const styles = StyleSheet.create({})
