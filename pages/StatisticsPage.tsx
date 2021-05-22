import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GetTestCountByDays, GetTestCountByMonth } from '../components/helper';
import { IState, ITest, Result } from '../types';
import { ITask } from '../store/task';
import { LineChart, BarChart, ContributionGraph } from 'react-native-chart-kit';
import { windowWidth } from '../components/styles';
import { PageTitle } from '../components/Title';
import dayjs, { Dayjs } from 'dayjs';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { t } from '../i18n';

interface IStatisticsPageProps {
  state: IState;
  task: ITask;
}

interface RenderItemProps {
  item: string;
  index: number;
}

const months = [t('JAN'), t('FEB'), t('MAR'), t('APR'), t('MAY'), t('JUN'), t('JUL'), t('AUG'), t('SEP'), t('OCT'), t('NOV'), t('DEC')];

export const StatisticsPage = function ({ state, task }: IStatisticsPageProps) {
  const tests = state.tests;

  const carouselItems = ['7day', 'year'];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<Dayjs>(dayjs());

  const renderItem = useCallback(({ item, index }: RenderItemProps) => {
    if (item === 'year') return <TestsPerYear {...{ tests }} />;
    else return <TestsPer7Days {...{ tests }} />;
  }, []);

  const ref = useRef(null);

  return (
    <View key='statistics'>
      <ScrollView>
        <View style={styles.container}>
          <PageTitle text={t('STATISTICS')}></PageTitle>
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
            containerStyle={{ position: 'absolute', top: 255 }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Text style={styles.currentDay}>{t('TEST_MAP')} </Text>
          <HeatmapChart {...{ tests, activeDay, setActiveDay }} />
          <Text style={styles.currentDay}>
            {t('TEST_RESULT_ON_DATE')} {activeDay.format('L')}
          </Text>
          <MyPercentageChart {...{ tests, activeDay }} />
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
  const last7DaysLabels = last7Days.map((d) => d.format('MMM D'));

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
      yAxisLabel={`${t('TEST_SHORT')}: `}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={{
        marginBottom: 18,
        borderRadius: 16,
      }}
    />
  );
};

const HeatmapChart = function ({ tests, activeDay, setActiveDay }: { tests: ITest[]; activeDay: Dayjs; setActiveDay: (n: Dayjs) => void }) {
  function getLast95Days() {
    const days: Dayjs[] = [];
    const today = dayjs();
    days.unshift(today);
    for (let i = 1; i < 95; i++) {
      days.unshift(today.subtract(i, 'd'));
    }
    return days;
  }

  const last95Days = getLast95Days();

  const testCounts = GetTestCountByDays(tests, last95Days);
  const count = last95Days.map((d) => testCounts[d.dayOfYear().toString()]);

  const data: { date: string; count: number }[] = [];

  for (let i = 0; i < 95; i++) {
    data.push({ date: last95Days[i].toString(), count: count[i] });
  }

  return (
    <ContributionGraph
      onDayPress={({ count, date }) => setActiveDay(dayjs(date))}
      tooltipDataAttrs={(v) => ({})}
      values={data}
      endDate={new Date()}
      numDays={95}
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

const MyPercentageChart = function ({ tests, activeDay }: { tests: ITest[]; activeDay: Dayjs }) {
  const testsOnDay = tests.filter((t) => {
    const testDate = dayjs(new Date(t.timestamp.start!));
    return testDate.isSame(activeDay, 'day');
  });

  const counts = [0, 0, 0];
  for (let test of testsOnDay) {
    if (test.result === Result.Negative) counts[0] += 1;
    if (test.result === Result.Positive) counts[1] += 1;
    if (test.result === Result.Invalid) counts[2] += 1;
  }

  const data = {
    labels: [t('NEGATIVE'), t('POSITIVE'), t('INVALID')],
    datasets: [{ data: counts }],
  };

  return (
    <BarChart
      style={{ borderRadius: 16, marginBottom: 30 }}
      data={data}
      width={windowWidth - 40}
      height={200}
      yAxisLabel={`${t('TEST_SHORT')}: `}
      yAxisSuffix=''
      yAxisInterval={1}
      showValuesOnTopOfBars
      chartConfig={{
        decimalPlaces: 0,
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
  currentDay: {
    color: 'white',
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 5,
  },
});
