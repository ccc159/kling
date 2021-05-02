import React from 'react';
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AddTestModal } from './components/AddTestModal';
import { CreateAddTestPlaceHolder, CreateDummyTest, IsTestAddPlaceHolder, IsTestDummy } from './components/helper';
import { Styles } from './components/styles';
import { AppContext } from './store';
import { ITest } from './types';

const numColumns = 3;

export const Dashboard = function () {
  const { state, task } = AppContext();
  const tests = state.tests;

  const ListItem = ({ test }: { test: ITest }) => {
    if (IsTestAddPlaceHolder(test)) {
      return (
        <View style={Styles.circleStyle}>
          <AddTestModal task={task} />
        </View>
      );
    }

    if (IsTestDummy(test)) {
      return <View style={[Styles.circleStyle, styles.itemInvisible]} />;
    }
    return (
      <View style={[Styles.circleStyle]}>
        <Pressable>
          <Text style={styles.itemText}>{test.tester}</Text>
        </Pressable>
      </View>
    );
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
      <View style={styles.container}>
        {fillTestsTo3Times(tests).map((test, index) => (
          <ListItem test={test} key={index} />
        ))}
      </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    margin: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
