import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar as TopBar, Platform, AppState, Vibration } from 'react-native';
import { AppContext } from './store';
import PagerView from 'react-native-pager-view';
import { ITest } from './types';
import { TestPage } from './pages/TestPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AboutPage } from './pages/AboutPage';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import { PlayExpired, PlayReady } from './components/Sounds';

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
      Vibration.vibrate();
      console.log(state);
      if (state === 'ready') PlayReady();
      else if (state === 'expired') PlayExpired();
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    }
  },
});

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

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
      <StatusBar style='light' backgroundColor='#202B37' />
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

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
