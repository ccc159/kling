import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { ITask } from '../store/task';
import { ITest } from '../types';
import { MyButton } from './Button';
import { GenerateID, Now } from './helper';
import { MyModal } from './MyModal';
import { MyTextInput } from './MyTextInput';
import { Styles } from './styles';
import { MyTitle } from './Title';

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
    closeModal();
  }

  return (
    <View style={[Styles.circleStyle, styles.centeredView]}>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <MyTitle text={'Name of the test person?'} />
        <MyTextInput value={tester} placeholder={'name'} onChangeText={(v) => (v ? setTester(v) : setTester(''))} />
        <MyButton title={'OK'} onPress={addTest} />
      </MyModal>

      <Pressable onPress={showModal}>
        <Text style={styles.add}>Add Test</Text>
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  add: {
    color: '#fff',
  },
});
