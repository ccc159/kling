import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dashboard } from './dashboard';
import { ContextProvider } from './store';
import { useKeepAwake } from 'expo-keep-awake';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { en } from './i18n/en';
import { de } from './i18n/de';
import { zh } from './i18n/zh';
import 'dayjs/locale/de';
import 'dayjs/locale/zh';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = { en, de, zh };

let locale = Localization.locale;

if (locale.includes('zh-Hans')) locale = 'zh';
else if (locale === 'de-DE' || locale === 'de-CH') locale = 'de';

locale = ['en', 'de', 'zh'].includes(locale) ? locale : 'en';

i18n.locale = locale;
i18n.fallbacks = 'en';

console.log(Localization.locale, locale);

dayjs.extend(dayOfYear);
dayjs.extend(localizedFormat);
dayjs.locale(locale);

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
