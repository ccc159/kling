import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const usePulse = (startDelay = 500) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.03, useNativeDriver: false }),
      Animated.timing(scale, { toValue: 0.97, useNativeDriver: false }),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return scale;
};
