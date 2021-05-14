import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PageTitle } from '../components/Title';
import IconSvg from '../assets/svg/icon.svg';
import { windowWidth } from '../components/styles';

export const AboutPage = function () {
  return (
    <View key='statistics'>
      <ScrollView>
        <View style={styles.container}>
          <PageTitle text='About'></PageTitle>
          <IconSvg width={windowWidth / 2} height={windowWidth / 2} />
          <Text style={[styles.smallText, { marginBottom: 30, padding: 10 }]}>
            This app is developed to help making batch quick tests easier. It is totally free and open source. It does not access or track any of your
            personal data. If you find this app helpful, please recommend it to others who might need it. Thanks! ❤️
          </Text>
          <Text style={styles.smallText}>version: 0.1.0</Text>
          <Text style={styles.smallText}>
            website:{' '}
            <Text style={{ color: '#4d8dc3' }} onPress={() => Linking.openURL('https://kling-app.com')}>
              https://kling-app.com
            </Text>
          </Text>
          <Text style={styles.smallText}>
            <Text style={{ color: '#fb8c00' }} onPress={() => Linking.openURL('https://kling-app.com/privatepolicy')}>
              private policy
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
    // width: '100%',
    // textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
});
