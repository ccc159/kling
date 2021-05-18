import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dashboard } from './dashboard';
import { ContextProvider } from './store';
import { useKeepAwake } from 'expo-keep-awake';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import dayjs from 'dayjs';
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { en } from './i18n/en';
import { de } from './i18n/de';

dayjs.extend(dayOfYear);

// Set the key-value pairs for the different languages you want to support.
i18n.translations = { en, de };
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = 'en';

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
