import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, View, Modal } from 'react-native';
import { useInterval } from '../hooks/useInterval';
import { ITask } from '../store/task';
import { ITest, Result } from '../types';
import { MyButton } from './Button';
import { CounterToShow, IsTimeUp } from './helper';
import { InProgressModal } from './InProgressModal';
import { InvalidModal } from './InvalidModal';
import { CircleSize, Styles } from './styles';
import { Timer } from './Timer';
import Phase1WaitSvg from '../assets/svg/phase1_wait.svg';
import ResultInvalidSvg from '../assets/svg/result_invalid.svg';

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

  // console.log(test);

  if (test.result) return <TestResult {...{ task, test }} />;

  if (!test.timestamp.phase1) return <TestPhase1 {...{ task, test }} />;
  else if (!test.timestamp.phase2) return <TestPhase2 {...{ task, test }} />;

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
  const readyMinutes = 3;
  const expireMinutes = 20;
  const fromDate = new Date(test.timestamp.start!);
  const [showNextPhaseModal, setShowNextPhaseModal] = useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);

  const isReady = IsTimeUp(readyMinutes, fromDate);
  const isExpired = IsTimeUp(expireMinutes, fromDate);

  useEffect(() => {
    if (!isExpired) return;
    const updateTest: ITest = { ...test, result: Result.Invalid };
    task.UpdateTest(updateTest);
  }, [isExpired]);

  function onPress() {
    if (!isReady) setShowProgressModal(true);
    else setShowNextPhaseModal(true);
  }

  function closeModal() {
    setShowNextPhaseModal(false);
  }

  function startNextPhase() {
    const updateTest: ITest = { ...test, timestamp: { ...test.timestamp, phase1: new Date() } };
    task.UpdateTest(updateTest);
    closeModal();
  }

  return (
    <View style={Styles.circleStyle}>
      <Modal animationType='fade' transparent={true} visible={showNextPhaseModal}>
        <View style={styles.centeredView}>
          <View style={Styles.boxStyle}>
            <Text>Are you ready for next phase?</Text>
            <MyButton title={'No'} onPress={closeModal} />
            <MyButton title={'Ready'} onPress={startNextPhase} />
          </View>
        </View>
      </Modal>
      <InvalidModal title={test.tester} description={'This test is already expired.'} show={showProgressModal} setShow={setShowProgressModal} />
      <InProgressModal title={test.tester} show={showProgressModal} setShow={setShowProgressModal} countDownMinutes={readyMinutes} from={fromDate} />
      {!isReady && <Timer color='black' countDownMinutes={readyMinutes} from={fromDate} />}
      <Pressable onPress={onPress}>
        <Phase1WaitSvg width={CircleSize - 14} height={CircleSize - 14} />
        {/* <Text style={styles.itemText}>{isReady ? 'phase1 ready' : test.tester}</Text> */}
      </Pressable>
    </View>
  );
};

const TestPhase2 = ({ test, task }: ITestProps) => {
  const readyMinutes = 1.5;
  const expireMinutes = 3;
  const fromDate = new Date(test.timestamp.phase1!);
  const [showModal, setShowModal] = useState<boolean>(false);

  const isReady = IsTimeUp(readyMinutes, fromDate);
  const isExpired = IsTimeUp(expireMinutes, fromDate);

  useEffect(() => {
    if (!isExpired) return;
    const updateTest: ITest = { ...test, result: Result.Invalid };
    task.UpdateTest(updateTest);
  }, [isExpired]);

  function onPress() {
    if (!isReady) return;
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
            <Text>Give the result.</Text>
            <MyButton title={'No'} onPress={closeModal} />
            <MyButton title={'Ready'} onPress={startNextPhase} />
          </View>
        </View>
      </Modal>
      {!isReady && <Timer color='black' countDownMinutes={readyMinutes} from={fromDate} />}
      <Pressable onPress={onPress}>
        <Text style={styles.itemText}>{isReady ? 'ready' : test.tester}</Text>
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
        {test.result === Result.Invalid && <ResultInvalidSvg width={CircleSize} height={CircleSize} />}
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
