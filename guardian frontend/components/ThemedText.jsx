import { StyleSheet, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';

const ThemedText = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Text style={[{ color: theme.text }, styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "AlanSans",
  },
});
