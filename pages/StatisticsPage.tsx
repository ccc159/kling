import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GetTestCountByDays, GetTestCountByMonth } from '../components/helper';
import { IState, ITest } from '../types';
import { ITask } from '../store/task';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import { windowWidth } from '../components/styles';
import { PageTitle } from '../components/Title';
import dayjs, { Dayjs } from 'dayjs';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface IStatisticsPageProps {
  state: IState;
  task: ITask;
}

interface RenderItemProps {
  item: string;
  index: number;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec'];

export const StatisticsPage = function ({ state, task }: IStatisticsPageProps) {
  const tests = state.tests;

  const carouselItems = ['7day', 'year'];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<number>(dayjs().dayOfYear());

  const renderItem = useCallback(({ item, index }: RenderItemProps) => {
    if (item === 'year') return <TestsPerYear {...{ tests }} />;
    else return <TestsPer7Days {...{ tests }} />;
  }, []);

  const ref = useRef(null);

  return (
    <View key='statistics'>
      <ScrollView>
        <View style={styles.container}>
          <PageTitle text='Statistics'></PageTitle>
          <Carousel
            layout={'default'}
            ref={ref}
            data={carouselItems}
            sliderWidth={windowWidth - 40}
            itemWidth={windowWidth - 40}
            renderItem={renderItem}
            onSnapToItem={(index: number) => setActiveIndex(index)}
          />
          <Pagination
            tappableDots
            carouselRef={ref as any}
            dotsLength={carouselItems.length}
            activeDotIndex={activeIndex}
            containerStyle={{ position: 'relative', top: -20 }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <HeatmapChart {...{ tests, activeDay, setActiveDay }} />
          <Text>{activeDay}</Text>
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
  const data = last7Days.map((d) => testCounts[d.dayOfYear().toString()]);
  const last7DaysLabels = last7Days.map((d) => d.format('DD.MM'));

  function getLast7Days() {
    const days: Dayjs[] = [];
    const today = dayjs();
    days.unshift(today);
    for (let i = 1; i < 7; i++) {
      days.unshift(today.subtract(i, 'd'));
    }
    return days;
  }

  return <MyLineChart labels={last7DaysLabels} datasets={[{ data }]} />;
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

const HeatmapChart = function ({ tests, activeDay, setActiveDay }: { tests: ITest[]; activeDay: number; setActiveDay: (n: number) => void }) {
  function getLast100Days() {
    const days: Dayjs[] = [];
    const today = dayjs();
    days.unshift(today);
    for (let i = 1; i < 100; i++) {
      days.unshift(today.subtract(i, 'd'));
    }
    return days;
  }

  const last100Days = getLast100Days();

  const testCounts = GetTestCountByDays(tests, last100Days);
  const count = last100Days.map((d) => testCounts[d.dayOfYear().toString()]);

  const data: { date: string; count: number }[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({ date: last100Days[i].format('YYYY-MM-DD'), count: count[i] });
  }

  return (
    <ContributionGraph
      onDayPress={({ count, date }) => setActiveDay(dayjs(date).dayOfYear())}
      tooltipDataAttrs={(v) => ({})}
      values={data}
      endDate={new Date()}
      numDays={100}
      width={windowWidth - 40}
      height={220}
      chartConfig={{
        decimalPlaces: 0,
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
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
