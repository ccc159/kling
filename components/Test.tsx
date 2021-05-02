import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { ITask } from '../store/task';
import { ITest } from '../types';
import { Styles } from './styles';

interface ITestProps {
  test: ITest;
  task: ITask;
}

export const Test = ({ test, task }: ITestProps) => {
  function onPress() {
    console.log('pressed');
  }

  return (
    <View style={[Styles.circleStyle]}>
      <Pressable>
        <Text style={styles.itemText}>{test.tester}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  itemText: {
    color: '#fff',
  },
});
