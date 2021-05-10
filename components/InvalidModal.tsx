import React from 'react';
import { Text } from 'react-native';
import { MyButton } from './Button';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';

interface IInvalidModal {
  show: boolean;
  setShow: (s: boolean) => void;
  title?: string;
  description?: string;
}

export const InvalidModal = ({ show, setShow, title, description }: IInvalidModal) => {
  function closeModal() {
    setShow(false);
  }

  return (
    <MyModal visible={show} setVisible={setShow}>
      {title && <MyTitle text={title} />}
      <Text>{description}</Text>
      <MyButton title={'Close'} onPress={closeModal} />
    </MyModal>
  );
};
