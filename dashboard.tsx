import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar as TopBar, AppState, Vibration } from 'react-native';
import { AppContext } from './store';
import PagerView from 'react-native-pager-view';
import { IConfig, ITest } from './types';
import { TestPage } from './pages/TestPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AboutPage } from './pages/AboutPage';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { PlayExpired, PlayReady } from './components/Sounds';
import { FakeTestsData } from './components/helper';
import { defaultConfig } from './store/state';

export const Dashboard = function () {
  const { state, task } = AppContext();
  const [isReady, setIsReady] = useState<boolean>(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token || ''));

    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    registerNotificationHandler();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function loadLocalData() {
    setIsReady(false);
    const jsonValue = await AsyncStorage.getItem('tests');
    // const tests = jsonValue !== null ? (JSON.parse(jsonValue) as ITest[]) : [];
    const tests = FakeTestsData();

    const configValue = await AsyncStorage.getItem('config');
    const config = configValue !== null ? (JSON.parse(configValue) as IConfig) : defaultConfig;

    task.LoadData(tests, config);

    setIsReady(true);
  }

  function registerNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        if (AppState.currentState === 'background') {
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        } else {
          const state = notification.request.content.data.state;
          const test = notification.request.content.data.test as ITest;
          Vibration.vibrate();
          if (state === 'ready') {
            PlayReady();
            cancelNotificationByTestID(test.id);
          } else if (state === 'expired') PlayExpired();
          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
        }
      },
    });
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
      <StatusBar style='light' backgroundColor='#202B37' />
      <PagerView style={styles.pagerView} initialPage={0}>
        <TestPage {...{ state, task }} />
        <StatisticsPage {...{ state, task }} />
        <AboutPage {...{ task, state }} />
      </PagerView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: TopBar.currentHeight || 0,
    backgroundColor: '#202B37',
  },
  pagerView: {
    flex: 1,
  },
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

async function cancelNotificationByTestID(testID: string) {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  const forCurrentTest = notifications.find((n) => n.content.data.test && (n.content.data.test as ITest).id === testID);
  if (forCurrentTest) await Notifications.cancelScheduledNotificationAsync(forCurrentTest.identifier);
}
