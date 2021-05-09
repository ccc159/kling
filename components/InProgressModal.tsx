import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { MyButton } from './Button';
import { CounterToShow, GenerateID, Now } from './helper';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';

interface IInProgressModal {
  show: boolean;
  setShow: (s: boolean) => void;
  countDownMinutes: number;
  from: Date;
  title?: string;
  description?: string;
}

export const InProgressModal = ({ show, setShow, countDownMinutes, from, title, description }: IInProgressModal) => {
  const { sign, percentage } = CounterToShow(countDownMinutes, from);

  function closeModal() {
    setShow(false);
  }

  return (
    <MyModal visible={show} setVisible={setShow}>
      {title && <MyTitle text={title} />}
      <Text>{percentage < 100 ? 'wait a moment' : 'ready to proceed!'}</Text>
      <Text>{sign}</Text>
      <MyButton title={'OK'} onPress={closeModal} />
    </MyModal>
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
