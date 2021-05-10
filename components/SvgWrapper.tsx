import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

type ISvgWrapper = {
  Svg: React.FC<SvgProps>;
};

export const SvgWrapper = ({ Svg }: ISvgWrapper) => <Svg style={styles.svg} width={120} height={120} />;

const styles = StyleSheet.create({
  svg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 60,
    margin: 20,
  },
});
