import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, View, Modal } from 'react-native';
import { useInterval } from '../hooks/useInterval';
import { ITask } from '../store/task';
import { ITest, Result } from '../types';
import { MyButton } from './Button';
import { CounterToShow, IsTimeUp } from './helper';
import { InProgressModal } from './InProgressModal';
import { TitledModal } from './TitledModal';
import { CircleSize, Styles } from './styles';
import { Timer } from './Timer';
import Phase1WaitSvg from '../assets/svg/phase1_wait.svg';
import Phase1ReadySvg from '../assets/svg/phase1_ready.svg';
import Phase2StartSvg from '../assets/svg/phase2_start.svg';
import Phase2WaitSvg from '../assets/svg/phase2_wait.svg';
// import Phase2ReadySvg from '../assets/svg/phase2_ready.svg';
import ResultInvalidSvg from '../assets/svg/result_invalid.svg';
import ResultFillSvg from '../assets/svg/result_fill.svg';
import ResultPositiveSvg from '../assets/svg/result_positive.svg';
import ResultNegativeSvg from '../assets/svg/result_negative.svg';
import dayjs from 'dayjs';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';
import { SvgWrapper } from './SvgWrapper';
import { MyKeyedText, MyText } from './MyText';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

interface ITestProps {
  test: ITest;
  task: ITask;
}

export const Test = ({ test, task }: ITestProps) => {
  const [seed, setSeed] = useState<number>(0);

  useInterval(() => setSeed(seed + 1), 1000);

  if (test.result) return <TestResult {...{ task, test }} />;

  if (!test.timestamp.intermediate) return <TestPhase1 {...{ task, test }} />;
  else if (!test.timestamp.end) return <TestPhase2 {...{ task, test }} />;

  return null;
};

const TestPhase1 = ({ test, task }: ITestProps) => {
  const readyMinutes = 0.1;
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
    const updateTest: ITest = { ...test, timestamp: { ...test.timestamp, intermediate: new Date() } };
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
  const readyMinutes = 0.2;
  const expireMinutes = 30;
  const fromDate = new Date(test.timestamp.intermediate!);
  const [showFillResultModal, setShowFillResultModal] = useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
  const [result, setResult] = useState<Result | null>(null);

  const isReady = IsTimeUp(readyMinutes, fromDate);
  const isExpired = IsTimeUp(expireMinutes, fromDate);

  useEffect(() => {
    if (!isExpired) return;
    const updateTest: ITest = { ...test, result: Result.Invalid };
    task.UpdateTest(updateTest);
  }, [isExpired]);

  function onPress() {
    if (!isReady) {
      setShowProgressModal(true);
    } else {
      setResult(null);
      setShowFillResultModal(true);
    }
  }

  function closeModal() {
    setShowFillResultModal(false);
  }

  function fillResult() {
    if (result === null) return;
    const updateTest: ITest = { ...test, timestamp: { ...test.timestamp, end: new Date() }, result };
    task.UpdateTest(updateTest);
    closeModal();
  }

  return (
    <View style={Styles.circleStyle}>
      <MyModal visible={showFillResultModal} setVisible={setShowFillResultModal}>
        <MyTitle text={'Fill result'} />
        <MyText>What's the result?</MyText>
        <SvgWrapper Svg={ResultFillSvg} />
        <View style={{ marginBottom: 10 }}>
          <RadioGroup
            radioButtons={Object.keys(Result).map((v) => ({ id: v, value: v, label: v, selected: v === result }))}
            onPress={(r) => {
              const selected = r.find((i) => i.selected);
              if (selected) setResult(selected.value as Result);
            }}
          />
        </View>
        <MyButton disabled={result === null} title={'Confirm'} onPress={fillResult} />
      </MyModal>
      <InProgressModal tester={test.tester} show={showProgressModal} setShow={setShowProgressModal} countDownMinutes={readyMinutes} from={fromDate} />
      {!isReady && <Timer onPress={onPress} color='black' countDownMinutes={readyMinutes} from={fromDate} />}
      <Pressable onPress={onPress}>
        {isReady ? <Phase2WaitSvg width={CircleSize} height={CircleSize} /> : <Phase2WaitSvg width={CircleSize - 14} height={CircleSize - 14} />}
      </Pressable>
    </View>
  );
};

const TestResult = ({ test, task }: ITestProps) => {
  const [showInvalidModal, setShowInvalidModal] = useState<boolean>(false);
  const [showExpiredModal, setShowExpiredModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  function onPress() {
    if (test.result === Result.Invalid) {
      if (!test.timestamp.intermediate || !test.timestamp.end) setShowExpiredModal(true);
      else setShowInvalidModal(true);
      return;
    }
    setShowResultModal(true);
  }

  return (
    <View>
      <TitledModal
        show={showExpiredModal}
        setShow={setShowExpiredModal}
        title={'Expired Test'}
        description={"This test is not valid because it's expired."}
      >
        <MyKeyedText textkey={'Name'} value={test.tester} />
        <MyKeyedText textkey={'Started'} value={dayjs(new Date(test.timestamp.start!)).format('HH:mm')} />
      </TitledModal>
      <TitledModal
        show={showInvalidModal}
        setShow={setShowInvalidModal}
        title={'Invalid Test'}
        description={'This test is not valid according to the read.'}
      >
        <MyKeyedText textkey={'Name'} value={test.tester} />
        <MyKeyedText textkey={'Started'} value={dayjs(new Date(test.timestamp.start!)).format('HH:mm')} />
        <MyKeyedText textkey={'Ended'} value={dayjs(new Date(test.timestamp.end!)).format('HH:mm')} />
      </TitledModal>
      <TitledModal show={showResultModal} setShow={setShowResultModal} title={'Result'}>
        {test.result === Result.Positive && <ResultPositiveSvg width={50} height={50} />}
        {test.result === Result.Negative && <ResultNegativeSvg width={50} height={50} />}
        <MyKeyedText textkey={'Name'} value={test.tester} />
        <MyKeyedText textkey={'Result'} value={test.result!} />
        <MyKeyedText textkey={'Started'} value={dayjs(new Date(test.timestamp.start!)).format('HH:mm')} />
        <MyKeyedText textkey={'Ended'} value={dayjs(new Date(test.timestamp.end!)).format('HH:mm')} />
      </TitledModal>
      <View style={Styles.circleStyle}>
        <Pressable onPress={onPress}>
          {test.result === Result.Positive && <ResultPositiveSvg width={CircleSize} height={CircleSize} />}
          {test.result === Result.Negative && <ResultNegativeSvg width={CircleSize} height={CircleSize} />}
          {test.result === Result.Invalid && <ResultInvalidSvg width={CircleSize} height={CircleSize} />}
        </Pressable>
      </View>
    </View>
  );
};
