import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type ITextInput = {
  value?: string;
  onChangeText?: (text?: string) => void;
  placeholder?: string;
};

export const MyTextInput = ({ value, onChangeText, placeholder }: ITextInput) => (
  <TextInput placeholder={placeholder} placeholderTextColor={'#33aad4'} style={styles.input} onChangeText={onChangeText} value={value} />
);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f3f8fb',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 20,
    minWidth: '48%',
    textAlign: 'center',
    width: '100%',
  },
});
