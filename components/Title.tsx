import React from 'react';
import { StyleSheet, Text } from 'react-native';

type ITitle = {
  text: string;
};

export const MyTitle = ({ text }: ITitle) => <Text style={styles.textStyle}>{text}</Text>;

export const PageTitle = ({ text }: ITitle) => <Text style={styles.pageTitle}>{text}</Text>;

const styles = StyleSheet.create({
  textStyle: {
    color: '#1d475e',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  pageTitle: {
    color: 'white',
    width: '100%',
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    letterSpacing: 1,
  },
});
