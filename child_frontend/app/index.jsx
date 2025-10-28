import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import ThemedTextInput from '../components/ThemedTextInput';
import ThemedButton from '../components/ThemedButton';
import axios from "axios"
import {Toast} from 'toastify-react-native'

const Home = () => {
  const [generatedCode, onGeneratedCodeChange] = useState('');
  const [names, onNamesChange] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const baseUrl = "http://192.168.137.1:5000"
  const onToggle = () => setIsSelected(prev => !prev);

  async function handleSubmit() {
    const childData = {
      names: names,
      code: generatedCode
    }

    await axios.post(`${baseUrl}/childAdd`, childData).then((res) => {
      if(res.data.status === "ok"){
        Toast.show({
          type: "success",
          text1: res.data.data,
          useModal: false
        })
        
      }
      else{
        Toast.show({
          type: "error",
          text1: res.data.data,
          useModal: false
        })
      }
    }).catch(err => {
      console.error("Something went wrong", err)
      Toast.show({
          type: "error",
          text1: "Something went wrong",
          useModal: false
      })
    })
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Please enter the generated tracking code from the Guardian</ThemedText>

      <ThemedTextInput
        placeholder="Names"
        value={names}
        onChangeText={onNamesChange}
      />

      <ThemedTextInput
        placeholder="Generated Track Code"
        value={generatedCode}
        onChangeText={onGeneratedCodeChange}
        maxLength={6}
      />

      <ThemedButton onPress={() => {
        handleSubmit()
      }}>
        <ThemedText style={styles.btnText}>Continue</ThemedText>
      </ThemedButton>

      <View style={styles.checkboxContainer}>
        <Pressable
          onPress={onToggle}
          style={[
            styles.checkbox,
            { backgroundColor: isSelected ? '#4CAF50' : 'transparent' },
          ]}
        >
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>
        <Text style={styles.label}>I confirm this code was issued by the Guardian and it'll be used to track your location and whereabouts</Text>
      </View>
      
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 8,
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    color: '#333',
  },
  btnText: {
    color: "black"
  }
});
