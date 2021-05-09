import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { CounterToShow } from './helper';
import { CircleSize } from './styles';

interface ITimer {
  color?: string;
  countDownMinutes: number;
  from: Date;
}

const radius = CircleSize / 2 - 4;
const perimeter = Math.PI * radius * 2;

export const Timer = ({ color, countDownMinutes, from }: ITimer) => {
  const { sign, percentage } = CounterToShow(countDownMinutes, from);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.digitsContainer}>
        <Text style={styles.digits}>{sign}</Text>
      </View>
      <View style={styles.svgContainer}>
        <Svg width={CircleSize} height={CircleSize}>
          <Circle
            strokeDasharray={perimeter}
            strokeDashoffset={(percentage * perimeter) / 100}
            cx={CircleSize / 2}
            cy={CircleSize / 2}
            r={radius}
            stroke='#4d7bf3'
            strokeWidth='10'
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  svgContainer: {
    transform: [{ rotateX: '-180deg' }, { rotateZ: '90deg' }],
  },
  digitsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  digits: {
    color: '#fff',
  },
});
