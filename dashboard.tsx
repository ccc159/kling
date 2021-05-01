import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AddTestModal } from './components/AddTestModal';
import { AppContext } from './store';

export const Dashboard = function () {
  const { state, task } = AppContext();
  const tests = state.tests;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {tests.map((t) => (
          <Text key={t.id}>{t.tester}</Text>
        ))}
        <AddTestModal task={task} />
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
