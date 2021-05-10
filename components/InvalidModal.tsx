import React from 'react';
import { Text, View } from 'react-native';
import { MyButton } from './Button';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';

interface IInvalidModal {
  show: boolean;
  setShow: (s: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const InvalidModal = ({ show, setShow, title, description, children }: IInvalidModal) => {
  function closeModal() {
    setShow(false);
  }

  return (
    <MyModal visible={show} setVisible={setShow}>
      {title && <MyTitle text={title} />}
      <View style={{ minHeight: 100, justifyContent: 'center' }}>
        <Text style={{ marginBottom: 5 }}>{description}</Text>
        {children}
      </View>
      <MyButton title={'Close'} onPress={closeModal} />
    </MyModal>
  );
};
