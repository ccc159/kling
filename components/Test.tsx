import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Modal } from 'react-native';
import { useInterval } from '../hooks/useInterval';
import { ITask } from '../store/task';
import { ITest, Result } from '../types';
import { MyButton } from './Button';
import { CounterToShow, IsTimeUp } from './helper';
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
  const [showModal, setShowModal] = useState<boolean>(false);
  function onPress() {
    const isTimeUp = IsTimeUp(1, new Date(test.timestamp.start!));
    if (!isTimeUp) return;
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function startNextPhase() {
    const updateTest: ITest = { ...test, timestamp: { ...test.timestamp, phase1: new Date() } };
    task.UpdateTest(updateTest);
    closeModal();
  }

  return (
    <View style={Styles.circleStyle}>
      <Modal animationType='fade' transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={Styles.boxStyle}>
            <Text>Are you ready for next phase?</Text>
            <MyButton title={'No'} onPress={closeModal} />
            <MyButton title={'Ready'} onPress={startNextPhase} />
          </View>
        </View>
      </Modal>
      <Timer color='black' countDownMinutes={1} from={test.timestamp.start!} />
      <Pressable onPress={onPress}>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
