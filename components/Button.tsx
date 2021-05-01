import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Pressable } from 'react-native';

type IButton = {
  title: string;
  onPress: () => void;
};

export const MyButton = ({ title, onPress }: IButton) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#2196F3',
  },
});
