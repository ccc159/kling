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
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'steelblue',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
