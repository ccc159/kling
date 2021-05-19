import React from 'react';
import { Text, View } from 'react-native';
import { MyButton } from './Button';
import { CounterToShow } from './helper';
import { MyModal } from './MyModal';
import { SvgWrapper } from './SvgWrapper';
import { MyTitle } from './Title';
import CoffeeSvg from '../assets/svg/coffee.svg';
import { MyKeyedText, MyText } from './MyText';
import { t } from '../i18n';

interface IInProgressModal {
  show: boolean;
  setShow: (s: boolean) => void;
  countDownMinutes: number;
  from: Date;
  tester: string;
  description?: string;
}

export const InProgressModal = ({ show, setShow, countDownMinutes, from, tester, description }: IInProgressModal) => {
  const { sign, percentage } = CounterToShow(countDownMinutes, from);

  function closeModal() {
    setShow(false);
  }

  return (
    <MyModal visible={show} setVisible={setShow}>
      <MyTitle text={t('WAIT_A_MOMENT')} />
      <SvgWrapper Svg={CoffeeSvg} />
      <View style={{ minHeight: 100, justifyContent: 'center' }}>
        <MyText style={{ marginBottom: 8 }}>{percentage < 100 ? t('NOT_READY_YET') : t('READY_TO_PROCEED')}</MyText>
        <MyKeyedText textkey={t('NAME')} value={tester} />
        <MyKeyedText textkey={t('REMAINING_TIME')} value={sign} />
      </View>
      <MyButton title={t('OK')} onPress={closeModal} />
    </MyModal>
  );
};
