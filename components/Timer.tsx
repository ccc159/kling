import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { CounterToShow } from './helper';
import { CircleSize } from './styles';

interface ITimer {
  color?: string;
  countDownMinutes: number;
  from: Date;
  onPress?: () => void;
}

const strokeWidth = 4;
const radius = CircleSize / 2 - 4 + strokeWidth / 2;
const perimeter = Math.PI * radius * 2;

export const Timer = ({ color, countDownMinutes, from, onPress }: ITimer) => {
  const { sign, percentage } = CounterToShow(countDownMinutes, from);

  return (
    <Pressable onPress={onPress} style={styles.timerContainer}>
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
            stroke='#ffffffc7'
            strokeWidth={strokeWidth}
          />
        </Svg>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 5,
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
    paddingTop: 62,
  },
  digits: {
    color: '#fff',
    fontSize: 11,
  },
});
