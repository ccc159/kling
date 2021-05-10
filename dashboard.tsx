import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AddTestModal } from './components/AddTestModal';
import { CreateAddTestPlaceHolder, CreateDummyTest, IsTestAddPlaceHolder, IsTestDummy } from './components/helper';
import { Styles } from './components/styles';
import { Test } from './components/Test';
import { AppContext } from './store';
import { ITest } from './types';

const numColumns = 3;

export const Dashboard = function () {
  const { state, task } = AppContext();
  const tests = state.tests;

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

  const ListItem = ({ test }: { test: ITest }) => {
    if (IsTestAddPlaceHolder(test)) {
      return <AddTestModal task={task} />;
    }

    if (IsTestDummy(test)) {
      return <View style={[Styles.circleStyle, styles.itemInvisible]} />;
    }
    return <Test {...{ test, task }} />;
  };

  const fillTestsTo3Times = (tests: ITest[]) => {
    const data = [...tests, CreateAddTestPlaceHolder()];
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push(CreateDummyTest());
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <View style={styles.container}>
          {fillTestsTo3Times(tests).map((test, index) => (
            <ListItem test={test} key={index} />
          ))}
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
    alignItems: 'flex-start',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
