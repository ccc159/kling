import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PageTitle } from '../components/Title';
import IconSvg from '../assets/svg/icon.svg';
import { windowWidth } from '../components/styles';
import { ITask } from '../store/task';
import { t } from '../i18n';

export const AboutPage = function ({ task }: { task: ITask }) {
  const resetAlert = () =>
    Alert.alert(
      t('RESET'),
      t('ARE_YOU_SURE_TO_RESET_APP'),
      [
        {
          text: t('CANCEL'),
          style: 'cancel',
        },
        { text: t('RESET'), onPress: task.ResetApp, style: 'destructive' },
      ],
      { cancelable: false }
    );

  return (
    <View key='about'>
      <ScrollView>
        <View style={styles.container}>
          <PageTitle text={t('ABOUT')}></PageTitle>
          <IconSvg width={windowWidth / 2} height={windowWidth / 2} />
          <Text style={styles.smallText}>{t('VERSION')}: 1.0.2</Text>
          <Text style={styles.smallText}>
            {t('WEBSITE')}:{' '}
            <Text style={{ color: '#4d8dc3' }} onPress={() => Linking.openURL('https://kling-app.com')}>
              https://kling-app.com
            </Text>
          </Text>
          <Text style={styles.smallText}>
            <Text style={{ color: '#fb8c00' }} onPress={() => Linking.openURL('https://kling-app.com/privacypolicy')}>
              {t('PRIVACY_POLICY')}
            </Text>
          </Text>
          <Text style={styles.smallText}>
            <Text style={{ color: '#eb4034' }} onPress={resetAlert}>
              {t('RESET_APP')}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    color: 'white',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 8,
  },
});
