import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ITask } from '../store/task';
import { ITest } from '../types';
import { MyButton } from './Button';
import { GenerateID, Now } from './helper';
import { MyModal } from './MyModal';
import { MyTextInput } from './MyTextInput';
import { CircleSize, Styles } from './styles';
import { MyTitle } from './Title';
import Phase1Start from '../assets/svg/phase1_start.svg';
import NewTest from '../assets/svg/new_test.svg';
import { SvgWrapper } from './SvgWrapper';
import * as Notifications from 'expo-notifications';
import { PHASE1_EXPIRE_MITUTES, PHASE1_READY_MITUTES } from '../config';

interface IAddTestModal {
  task: ITask;
}

export const AddTestModal = ({ task }: IAddTestModal) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tester, setTester] = useState<string>('');

  function showModal() {
    setTester('');
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function addTest() {
    if (tester === '') return;
    const newTest: ITest = { id: GenerateID(), tester, timestamp: { start: Now() } };
    task.AddTest(newTest);
    scheduleReadyPushNotification(newTest);
    scheduleExpirePushNotification(newTest);
    closeModal();
  }

  async function scheduleReadyPushNotification(test: ITest) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Time up!',
        body: `${test.tester}'s test is ready to proceed.`,
        data: { test, state: 'ready' },
        sound: true,
      },
      trigger: { seconds: PHASE1_READY_MITUTES * 60 },
    });
  }

  async function scheduleExpirePushNotification(test: ITest) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⌛ Test expired!',
        body: `${test.tester}'s test is expired.`,
        data: { test, state: 'expired' },
        sound: true,
      },
      trigger: { seconds: PHASE1_EXPIRE_MITUTES * 60 },
    });
  }

  return (
    <View style={[Styles.circleStyle]}>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <MyTitle text={'Name of the test person?'} />
        <SvgWrapper Svg={Phase1Start} />
        <MyTextInput value={tester} placeholder={'name'} onChangeText={(v) => (v ? setTester(v) : setTester(''))} />
        <MyButton disabled={tester === ''} title={'OK'} onPress={addTest} />
      </MyModal>

      <Pressable onPress={showModal}>
        <NewTest width={CircleSize} height={CircleSize} />
      </Pressable>
    </View>
  );
};
