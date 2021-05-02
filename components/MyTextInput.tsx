import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type ITextInput = {
  value?: string;
  onChangeText?: (text?: string) => void;
};

export const MyTextInput = ({ value, onChangeText }: ITextInput) => <TextInput style={styles.input} onChangeText={onChangeText} value={value} />;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
});
