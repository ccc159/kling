import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ITask } from '../store/task';
import { IConfig, ITest } from '../types';
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
import { MyText } from './MyText';
import { t } from '../i18n';

interface IAddTestModal {
  config: IConfig;
  task: ITask;
}

export const AddTestModal = ({ task, config }: IAddTestModal) => {
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
        title: t('TIME_UP'),
        body: `${test.tester}: ${t('TEST_IS_READY_TO_PROCEED')}`,
        data: { test, state: 'ready' },
        sound: true,
      },
      trigger: { seconds: config.PHASE1_READY_MITUTES * 60 },
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
      trigger: { seconds: config.PHASE1_EXPIRE_MITUTES * 60 },
    });
  }

  return (
    <View style={[Styles.circleStyle]}>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <MyTitle text={t('NAME_OF_THE_TEST_PERSON')} />
        <SvgWrapper Svg={Phase1Start} />
        <MyText style={{ marginBottom: 5 }}>{t('MAKE_SURE_TO_PUT_INTO_TUBE')}</MyText>
        <MyTextInput value={tester} placeholder={t('NAME')} onChangeText={(v) => (v ? setTester(v) : setTester(''))} />
        <MyButton disabled={tester === ''} title={t('OK')} onPress={addTest} />
      </MyModal>

      <Pressable onPress={showModal}>
        <NewTest width={CircleSize} height={CircleSize} />
      </Pressable>
    </View>
  );
};
