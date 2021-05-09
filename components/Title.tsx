import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, View, Modal } from 'react-native';

type ITitle = {
  text: string;
};

export const MyTitle = ({ text }: ITitle) => <Text style={styles.textStyle}>{text}</Text>;

const styles = StyleSheet.create({
  textStyle: {
    color: '#1d475e',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
