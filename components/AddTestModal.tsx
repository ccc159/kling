import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
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
    const newTest: ITest = { id: GenerateID(), tester, timestamp: { start: Now() }, firstCharm: false, secondCharm: false, thirdCharm: false };
    task.AddTest(newTest);
    closeModal();
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
