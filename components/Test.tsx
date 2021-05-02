import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useInterval } from '../hooks/useInterval';
import { ITask } from '../store/task';
import { ITest, Result } from '../types';
import { CounterToShow } from './helper';
import { Styles } from './styles';
import { Timer } from './Timer';

interface ITestProps {
  test: ITest;
  task: ITask;
}

export const Test = ({ test, task }: ITestProps) => {
  const [seed, setSeed] = useState<number>(0);

  useInterval(() => setSeed(seed + 1), 1000);

  function onPress() {
    console.log('pressed');
  }

  if (test.result) return <TestResult {...{ task, test }} />;

  if (!test.timestamp.phase1) return <TestPhase1 {...{ task, test }} />;

  return (
    <View style={Styles.circleStyle}>
      {/* <Timer color='black' from={test.timestamp.start!} current={new Date()} /> */}
      <Pressable>
        <Text style={styles.itemText}>{test.tester}</Text>
      </Pressable>
    </View>
  );
};

const TestPhase1 = ({ test, task }: ITestProps) => {
  function onPress() {
    console.log('pressed');
  }

  return (
    <View style={Styles.circleStyle}>
      <Timer color='black' countDownMinutes={1} from={test.timestamp.start!} />
      <Pressable>
        <Text style={styles.itemText}>{test.tester}</Text>
      </Pressable>
    </View>
  );
};

const TestResult = ({ test, task }: ITestProps) => {
  function onPress() {
    console.log('pressed');
  }

  return (
    <View style={Styles.circleStyle}>
      <Pressable>
        {test.result === Result.Positive && <Text style={styles.itemText}>positive</Text>}
        {test.result === Result.Negative && <Text style={styles.itemText}>negative</Text>}
        {test.result === Result.Invalid && <Text style={styles.itemText}>invalid</Text>}
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
