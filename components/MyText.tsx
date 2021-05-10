import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type IText = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export const MyText = ({ style, children }: IText) => <Text style={[style, styles.text]}>{children}</Text>;

type IKeyedText = {
  textkey: string;
  value: string;
};

export const MyKeyedText = ({ textkey, value }: IKeyedText) => (
  <Text style={styles.itemText}>
    <Text>{textkey}</Text>: <Text style={styles.itemTextContent}>{value}</Text>
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: 'grey',
  },
  itemText: {
    marginTop: 5,
    marginBottom: 5,
    color: '#1d475e',
  },
  itemTextContent: {
    fontWeight: 'bold',
  },
});
