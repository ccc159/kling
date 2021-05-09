import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { ITask } from '../store/task';
import { ITest } from '../types';
import { MyButton } from './Button';
import { CounterToShow, GenerateID, Now } from './helper';
import { MyTextInput } from './MyTextInput';
import { Styles } from './styles';

interface IInProgressModal {
  show: boolean;
  setShow: (s: boolean) => void;
  countDownMinutes: number;
  from: Date;
}

export const InProgressModal = ({ show, setShow, countDownMinutes, from }: IInProgressModal) => {
  const { sign, percentage } = CounterToShow(countDownMinutes, from);

  function closeModal() {
    setShow(false);
  }

  return (
    <Modal animationType='fade' transparent={true} visible={show}>
      <View style={styles.centeredView}>
        <View style={Styles.boxStyle}>
          <Text>{percentage < 100 ? 'wait a moment' : 'ready to proceed!'}</Text>
          <Text>{sign}</Text>
          <MyButton title={'OK'} onPress={closeModal} />
        </View>
      </View>
    </Modal>
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
