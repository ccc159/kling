import React from 'react';
import { Text, View } from 'react-native';
import { t } from '../i18n';
import { MyButton } from './Button';
import { MyModal } from './MyModal';
import { MyTitle } from './Title';

interface ITitledModal {
  show: boolean;
  setShow: (s: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const TitledModal = ({ show, setShow, title, description, children }: ITitledModal) => {
  function closeModal() {
    setShow(false);
  }

  return (
    <MyModal visible={show} setVisible={setShow}>
      {title && <MyTitle text={title} />}
      <View style={{ minHeight: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginBottom: 5 }}>{description}</Text>
        {children}
      </View>
      <MyButton title={t('CLOSE')} onPress={closeModal} />
    </MyModal>
  );
};
