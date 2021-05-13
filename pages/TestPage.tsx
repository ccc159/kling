import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AddTestModal } from '../components/AddTestModal';
import { CreateAddTestPlaceHolder, CreateDummyTest, IsTestAddPlaceHolder, IsTestDummy } from '../components/helper';
import { Styles } from '../components/styles';
import { Test } from '../components/Test';
import { IState, ITest } from '../types';
import { ITask } from '../store/task';

const numColumns = 3;

interface ITestPageProps {
  state: IState;
  task: ITask;
}

export const TestPage = function ({ state, task }: ITestPageProps) {
  const tests = state.tests;

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
    <View key='test'>
      <ScrollView>
        <View style={styles.container}>
          {fillTestsTo3Times(tests).map((test, index) => (
            <ListItem test={test} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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