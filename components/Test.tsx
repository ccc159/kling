import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useInterval } from '../hooks/useInterval';
import { ITask } from '../store/task';
import { ITest } from '../types';
import { Styles } from './styles';

interface ITestProps {
  test: ITest;
  task: ITask;
}

export const Test = ({ test, task }: ITestProps) => {
  const [name, setName] = useState<number>(0);
  // fetch mutations every 5 seconds, if the project is saving, then pause fetching
  useInterval(() => setName(name + 1), 1000);

  function onPress() {
    console.log('pressed');
  }

  return (
    <View style={[Styles.circleStyle]}>
      <Pressable>
        <Text style={styles.itemText}>
          {test.tester}
          {name}
        </Text>
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
