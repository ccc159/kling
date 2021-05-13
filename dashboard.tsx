import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppContext } from './store';
import PagerView from 'react-native-pager-view';
import { ITest } from './types';
import { TestPage } from './pages/TestPage';

export const Dashboard = function () {
  const { state, task } = AppContext();

  useEffect(() => {
    // load local storage
    loadLocalData();
  }, []);

  async function loadLocalData() {
    try {
      const jsonValue = await AsyncStorage.getItem('tests');
      const tests = jsonValue !== null ? (JSON.parse(jsonValue) as ITest[]) : [];
      task.LoadData(tests);
    } catch (e) {
      // error reading value
    }
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <TestPage {...{ state, task }} />
        <View key='2'>
          <Text>Second page</Text>
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#202B37',
  },
  pagerView: {
    flex: 1,
  },
});
