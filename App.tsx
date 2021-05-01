import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dashboard } from './dashboard';
import { ContextProvider } from './store';

export default function App() {
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
