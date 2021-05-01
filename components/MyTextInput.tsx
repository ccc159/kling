import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type ITextInput = {
  value?: string;
  onChangeText?: (text?: string) => void;
};

export const MyTextInput = ({ value, onChangeText }: ITextInput) => <TextInput style={styles.input} onChangeText={onChangeText} value={value} />;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
