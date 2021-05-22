import React, { useEffect, useState } from 'react';
import { Pressable, View, Animated, Text } from 'react-native';
import { useInterval } from '../hooks/useInterval';
import { ITask } from '../store/task';
import { IConfig, ITest, Result } from '../types';
import { MyButton } from './Button';
import { IsTimeUp } from './helper';
import { InProgressModal } from './InProgressModal';
import { TitledModal } from './TitledModal';
import { CircleSize, SmallCircleSize, Styles } from './styles';
import { Timer } from './Timer';
import Phase1WaitSvg from '../assets/svg/phase1_wait.svg';
import Phase1ReadySvg from '../assets/svg/phase1_ready.svg';
import Phase2StartSvg from '../assets/svg/phase2_start.svg';
import Phase2WaitSvg from '../assets/svg/phase2_wait.svg';
import Phase2ReadySvg from '../assets/svg/phase2_ready.svg';
import ResultInvalidSvg from '../assets/svg/result_invalid.svg';
import ResultFillSvg from '../assets/svg/result_fill.svg';
import ResultPositiveSvg from '../assets/svg/result_positive.svg';
import ResultNegativeSvg from '../assets/svg/result_negative.svg';
import dayjs from 'dayjs';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';
import { SvgWrapper } from './SvgWrapper';
import { MyKeyedText, MyText } from './MyText';
import RadioGroup from 'react-native-radio-buttons-group';
import { usePulse } from '../hooks/usePulse';
import * as Notifications from 'expo-notifications';
import { PlayExpired, PlayNegative, PlayPositive } from './Sounds';
import { t } from '../i18n';

interface ITestProps {
  config: IConfig;
  test: ITest;
  task: ITask;
}

export const Test = ({ test, task, config }: ITestProps) => {
  const [seed, setSeed] = useState<number>(0);

  useInterval(() => setSeed(seed + 1), 1000);

  let content: JSX.Element = <View></View>;

  if (test.result) content = <TestResult {...{ task, test, config }} />;
  else if (!test.timestamp.intermediate) content = <TestPhase1 {...{ task, test, config }} />;
  else if (!test.timestamp.end) content = <TestPhase2 {...{ task, test, config }} />;

  return (
    <View>
      {content}
      <Text style={{ position: 'absolute', width: '100%', textAlign: 'center', color: 'white', fontSize: 13, bottom: -13, height: 30 }}>
        {test.tester}
      </Text>
    </View>
  );
};

const TestPhase1 = ({ test, task, config }: ITestProps) => {
  const fromDate = new Date(test.timestamp.start!);
  const [showNextPhaseModal, setShowNextPhaseModal] = useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);

  const scale = usePulse();

  const isReady = IsTimeUp(config.PHASE1_READY_MINUTES, fromDate);
  const isExpired = IsTimeUp(config.PHASE1_EXPIRE_MINUTES, fromDate);

  useEffect(() => {
    if (!isExpired) return;
    const updateTest: ITest = { ...test, result: Result.Invalid };
    task.UpdateTest(updateTest);
    PlayExpired();
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
    scheduleReadyPushNotification(updateTest);
    scheduleExpirePushNotification(updateTest);
    closeModal();
  }

  async function scheduleReadyPushNotification(test: ITest) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: t('TIME_UP'),
        body: `${test.tester}: ${t('TEST_IS_READY_TO_PROCEED')}`,
        data: { test, state: 'ready' },
        sound: true,
      },
      trigger: { seconds: config.PHASE2_READY_MINUTES * 60 },
    });
  }

  async function scheduleExpirePushNotification(test: ITest) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: t('TEST_EXPIRED'),
        body: `${test.tester}: ${t('TEST_IS_EXPIRED')}`,
        data: { test, state: 'expired' },
        sound: true,
      },
      trigger: { seconds: config.PHASE2_EXPIRE_MINUTES * 60 },
    });
  }

  return (
    <View style={Styles.circleStyle}>
      <MyModal visible={showNextPhaseModal} setVisible={setShowNextPhaseModal}>
        <MyTitle text={t('READY_TO_MAKE_DROPS')} />
        <MyText>{t('SQUEEZE_4_DROPS_ON_WELL')}</MyText>
        <SvgWrapper Svg={Phase2StartSvg} />
        <MyButton title={t('DONE')} onPress={startNextPhase} />
      </MyModal>
      <InProgressModal
        tester={test.tester}
        show={showProgressModal}
        setShow={setShowProgressModal}
        countDownMinutes={config.PHASE1_READY_MINUTES}
        from={fromDate}
      />
      {!isReady && <Timer onPress={onPress} color='black' countDownMinutes={config.PHASE1_READY_MINUTES} from={fromDate} />}
      <Pressable onPress={onPress}>
        {isReady ? (
          <Animated.View style={{ transform: [{ scale }] }}>
            <Phase1ReadySvg width={CircleSize} height={CircleSize} />
          </Animated.View>
        ) : (
          <Phase1WaitSvg width={SmallCircleSize} height={SmallCircleSize} />
        )}
      </Pressable>
    </View>
  );
};

const TestPhase2 = ({ test, task, config }: ITestProps) => {
  const fromDate = new Date(test.timestamp.intermediate!);
  const [showFillResultModal, setShowFillResultModal] = useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
  const [result, setResult] = useState<Result | null>(null);

  const scale = usePulse();

  const isReady = IsTimeUp(config.PHASE2_READY_MINUTES, fromDate);
  const isExpired = IsTimeUp(config.PHASE2_EXPIRE_MINUTES, fromDate);

  useEffect(() => {
    if (!isExpired) return;
    const updateTest: ITest = { ...test, result: Result.Invalid };
    task.UpdateTest(updateTest);
    PlayExpired();
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

  async function fillResult() {
    if (result === null) return;
    const updateTest: ITest = { ...test, timestamp: { ...test.timestamp, end: new Date() }, result };
    task.UpdateTest(updateTest);
    if (result === Result.Negative) PlayNegative();
    else if (result === Result.Positive) PlayPositive();
    else if (result === Result.Invalid) PlayExpired();
    closeModal();
  }

  return (
    <View style={Styles.circleStyle}>
      <MyModal visible={showFillResultModal} setVisible={setShowFillResultModal}>
        <MyTitle text={t('FILL_RESULT')} />
        <MyText>{t('WAHT_IS_RESULT')}</MyText>
        <SvgWrapper Svg={ResultFillSvg} />
        <View style={{ marginBottom: 10 }}>
          <RadioGroup
            radioButtons={Object.keys(Result).map((v) => ({ id: v, value: v, label: t(v as any), selected: v === result }))}
            onPress={(r) => {
              const selected = r.find((i) => i.selected);
              if (selected) setResult(selected.value as Result);
            }}
          />
        </View>
        <MyButton disabled={result === null} title={t('CONFIRM')} onPress={fillResult} />
      </MyModal>
      <InProgressModal
        tester={test.tester}
        show={showProgressModal}
        setShow={setShowProgressModal}
        countDownMinutes={config.PHASE2_READY_MINUTES}
        from={fromDate}
      />
      {!isReady && <Timer onPress={onPress} color='black' countDownMinutes={config.PHASE2_READY_MINUTES} from={fromDate} />}
      <Pressable onPress={onPress}>
        {isReady ? (
          <Animated.View style={{ transform: [{ scale }] }}>
            <Phase2ReadySvg width={CircleSize} height={CircleSize} />
          </Animated.View>
        ) : (
          <Phase2WaitSvg width={SmallCircleSize} height={SmallCircleSize} />
        )}
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
        title={t('EXPIRED_TEST')}
        description={t('THIS_TEST_IS_NOT_VALID_BECAUSE_EXPIRED')}
      >
        <MyKeyedText textkey={t('NAME')} value={test.tester} />
        <MyKeyedText textkey={t('STARTED')} value={dayjs(new Date(test.timestamp.start!)).format('LT')} />
      </TitledModal>
      <TitledModal show={showInvalidModal} setShow={setShowInvalidModal} title={t('INVALID_TEST')} description={t('TEST_INVALID_ACCORDING_TO_READ')}>
        <MyKeyedText textkey={t('NAME')} value={test.tester} />
        <MyKeyedText textkey={t('STARTED')} value={dayjs(new Date(test.timestamp.start!)).format('LT')} />
        <MyKeyedText textkey={t('ENDED')} value={dayjs(new Date(test.timestamp.end!)).format('LT')} />
      </TitledModal>
      <TitledModal show={showResultModal} setShow={setShowResultModal} title={t('RESULT')}>
        {test.result === Result.Positive && <ResultPositiveSvg width={50} height={50} />}
        {test.result === Result.Negative && <ResultNegativeSvg width={50} height={50} />}
        <MyKeyedText textkey={t('NAME')} value={test.tester} />
        <MyKeyedText textkey={t('RESULT')} value={t(test.result! as any)} />
        <MyKeyedText textkey={t('STARTED')} value={dayjs(new Date(test.timestamp.start!)).format('LT')} />
        <MyKeyedText textkey={t('ENDED')} value={test.timestamp.end ? dayjs(new Date(test.timestamp.end)).format('LT') : t('NO_END_DATE')} />
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
