import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dashboard } from './dashboard';
import { ContextProvider } from './store';
import { useKeepAwake } from 'expo-keep-awake';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import dayjs from 'dayjs';

dayjs.extend(dayOfYear);

export default function App() {
  useKeepAwake();
  return (
    <ContextProvider>
      <View style={styles.container}>
        <Dashboard />
      </View>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
