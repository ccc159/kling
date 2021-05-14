import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AppContext } from './store';
import PagerView from 'react-native-pager-view';
import { ITest } from './types';
import { TestPage } from './pages/TestPage';
import { StatisticsPage } from './pages/StatisticsPage';

export const Dashboard = function () {
  const { state, task } = AppContext();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // load local storage
    loadLocalData();
  }, []);

  async function loadLocalData() {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem('tests');
      const tests = jsonValue !== null ? (JSON.parse(jsonValue) as ITest[]) : [];
      task.LoadData(tests);
      setLoading(false);
    } catch (e) {
      // error reading value
    }
  }

  if (loading) return null;

  return (
    <SafeAreaView style={styles.safearea}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <TestPage {...{ state, task }} />
        <StatisticsPage {...{ state, task }} />
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
