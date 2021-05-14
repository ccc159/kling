import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AppContext } from './store';
import PagerView from 'react-native-pager-view';
import { ITest } from './types';
import { TestPage } from './pages/TestPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AboutPage } from './pages/AboutPage';
import AppLoading from 'expo-app-loading';

export const Dashboard = function () {
  const { state, task } = AppContext();
  const [isReady, setIsReady] = useState<boolean>(false);

  // useEffect(() => {
  //   loadLocalData();
  // }, []);

  async function loadLocalData() {
    setIsReady(false);
    const jsonValue = await AsyncStorage.getItem('tests');
    const tests = jsonValue !== null ? (JSON.parse(jsonValue) as ITest[]) : [];
    task.LoadData(tests);
    setIsReady(true);
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadLocalData}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }
  // if (!isReady) return null;

  return (
    <SafeAreaView style={styles.safearea}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <TestPage {...{ state, task }} />
        <StatisticsPage {...{ state, task }} />
        <AboutPage {...{ task }} />
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
