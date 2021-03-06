import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type IButton = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const MyButton = ({ title, onPress, disabled }: IButton) => (
  <TouchableOpacity disabled={disabled} style={[styles.button, { backgroundColor: disabled ? '#bbb' : '#33aad4' }]} onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    width: '100%',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
