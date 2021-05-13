import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AddTestModal } from '../components/AddTestModal';
import {
  CreateAddTestPlaceHolder,
  CreateDummyTest,
  GetTestCountByDays,
  GetTestCountByMonth,
  IsTestAddPlaceHolder,
  IsTestDummy,
} from '../components/helper';
import { Styles } from '../components/styles';
import { Test } from '../components/Test';
import { IState, ITest } from '../types';
import { ITask } from '../store/task';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import { windowWidth } from '../components/styles';
import { PageTitle } from '../components/Title';
import dayjs, { Dayjs } from 'dayjs';

interface IStatisticsPageProps {
  state: IState;
  task: ITask;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec'];

export const StatisticsPage = function ({ state, task }: IStatisticsPageProps) {
  const tests = state.tests;

  return (
    <View key='statistics'>
      <ScrollView>
        <View style={styles.container}>
          <PageTitle text='Statistics'></PageTitle>
          <TestsPerYear tests={tests} />
          <TestsPer7Days tests={tests} />
        </View>
      </ScrollView>
    </View>
  );
};

const TestsPerYear = function ({ tests }: { tests: ITest[] }) {
  return <MyLineChart labels={months} datasets={[{ data: GetTestCountByMonth(tests) }]} />;
};

const TestsPer7Days = function ({ tests }: { tests: ITest[] }) {
  const last7Days = getLast7Days();
  const testCounts = GetTestCountByDays(tests, last7Days);
  const last7DaysLabels = last7Days.map((d) => d.format('DD.MM'));
  console.log(testCounts);

  function getLast7Days() {
    const days: Dayjs[] = [];
    const today = dayjs();
    days.unshift(today);
    for (let i = 1; i < 7; i++) {
      days.unshift(today.subtract(i, 'd'));
    }
    return days;
  }

  return <MyLineChart labels={last7DaysLabels} datasets={[{ data: testCounts }]} />;
};

const MyLineChart = function ({ labels, datasets }: { labels: string[]; datasets: { data: number[] }[] }) {
  return (
    <LineChart
      data={{ labels, datasets }}
      width={windowWidth - 40} // from react-native
      height={200}
      yAxisLabel={'Test: '}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
          margin: 5,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
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
});
