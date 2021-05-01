import React, { useState } from 'react';
import { Button, Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AddTestModal } from './components/AddTestModal';
import { CreateDummyTest, IsTestDummy } from './components/helper';
import { Test } from './components/Test';
import { AppContext } from './store';
import { StatusBar as Status } from 'expo-status-bar';
import { ITest } from './types';

const numColumns = 3;

export const Dashboard = function () {
  const { state, task } = AppContext();
  const tests = state.tests;

  const renderItem = ({ item }: { item: ITest }) => {
    if (IsTestDummy(item)) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.tester}</Text>
      </View>
    );
  };

  const fillTestsTo3Times = (tests: ITest[]) => {
    const data = [...tests];
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
      <FlatList data={fillTestsTo3Times(tests)} style={styles.container} renderItem={renderItem} numColumns={numColumns} />
      <AddTestModal task={task} />
      <Status animated />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: Dimensions.get('window').width / numColumns / 2,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
