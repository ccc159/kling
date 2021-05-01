import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { ITask } from '../store/task';
import { ITest } from '../types';
import { MyButton } from './Button';
import { GenerateID, Now } from './helper';
import { MyTextInput } from './MyTextInput';

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
    const newTest: ITest = { id: GenerateID(), tester, timestamp: { start: Now() } };
    task.AddTest(newTest);
    closeModal();
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MyTextInput value={tester} onChangeText={(v) => (v ? setTester(v) : setTester(''))} />
            <MyButton title={'OK'} onPress={addTest} />
          </View>
        </View>
      </Modal>
      <MyButton title={'Add Test'} onPress={showModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
