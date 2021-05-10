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
import Phase1ReadySvg from '../assets/svg/phase1_ready.svg';
import Phase2StartSvg from '../assets/svg/phase2_start.svg';
import ResultInvalidSvg from '../assets/svg/result_invalid.svg';
import dayjs from 'dayjs';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';
import { SvgWrapper } from './SvgWrapper';
import { MyKeyedText, MyText } from './MyText';

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
        <Text>{test.tester}</Text>
      </Pressable>
    </View>
  );
};

const TestPhase1 = ({ test, task }: ITestProps) => {
  const readyMinutes = 15;
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
      <MyModal visible={showNextPhaseModal} setVisible={setShowNextPhaseModal}>
        <MyTitle text={'Readt to make drops'} />
        <MyText>Have 4 drops in the test case.</MyText>
        <SvgWrapper Svg={Phase2StartSvg} />
        <MyButton title={'Done'} onPress={startNextPhase} />
      </MyModal>
      <InProgressModal tester={test.tester} show={showProgressModal} setShow={setShowProgressModal} countDownMinutes={readyMinutes} from={fromDate} />
      {!isReady && <Timer onPress={onPress} color='black' countDownMinutes={readyMinutes} from={fromDate} />}
      <Pressable onPress={onPress}>
        {isReady ? <Phase1ReadySvg width={CircleSize} height={CircleSize} /> : <Phase1WaitSvg width={CircleSize - 14} height={CircleSize - 14} />}
      </Pressable>
    </View>
  );
};

const TestPhase2 = ({ test, task }: ITestProps) => {
  const readyMinutes = 15;
  const expireMinutes = 30;
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
            <MyText>Give the result.</MyText>
            <MyButton title={'No'} onPress={closeModal} />
            <MyButton title={'Ready'} onPress={startNextPhase} />
          </View>
        </View>
      </Modal>
      {!isReady && <Timer color='black' countDownMinutes={readyMinutes} from={fromDate} />}
      <Pressable onPress={onPress}>
        {isReady ? <Phase1ReadySvg width={CircleSize} height={CircleSize} /> : <Phase1WaitSvg width={CircleSize - 14} height={CircleSize - 14} />}
      </Pressable>
    </View>
  );
};

const TestResult = ({ test, task }: ITestProps) => {
  const [showInvalidModal, setShowInvalidModal] = useState<boolean>(false);
  const [showExpiredModal, setShowExpiredModal] = useState<boolean>(false);

  function onPress() {
    console.log('pressed');
    if (test.result === Result.Invalid) {
      if (!test.timestamp.phase1 || !test.timestamp.phase2 || !test.timestamp.end) setShowExpiredModal(true);
      else setShowInvalidModal(true);
      return;
    }
  }

  return (
    <View>
      <InvalidModal
        show={showExpiredModal}
        setShow={setShowExpiredModal}
        title={'Expired Test'}
        description={"This test is not valid because it's expired."}
      >
        <MyKeyedText textkey={'Name'} value={test.tester} />
        <MyKeyedText textkey={'Started'} value={dayjs(new Date(test.timestamp.start!)).format('HH:mm')} />
      </InvalidModal>
      <View style={Styles.circleStyle}>
        <Pressable onPress={onPress}>
          {test.result === Result.Positive && <Text>positive</Text>}
          {test.result === Result.Negative && <Text>negative</Text>}
          {test.result === Result.Invalid && <ResultInvalidSvg width={CircleSize} height={CircleSize} />}
        </Pressable>
      </View>
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
});
