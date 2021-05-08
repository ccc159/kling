import dayjs from 'dayjs';
import { ITest } from '../types';

/**
 * Generate an unique 6 character number/letter id
 */
export function GenerateID(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * return now date
 */
export function Now(): Date {
  return new Date();
}

/**
 * create a dummy test to form UI
 */
export function CreateDummyTest(): ITest {
  return { id: 'empty', tester: '', timestamp: {} };
}

/**
 * Check if a test is a dummy test
 */
export function IsTestDummy(test: ITest): boolean {
  return test.id === 'empty';
}

/**
 * create a add test to form UI
 */
export function CreateAddTestPlaceHolder(): ITest {
  return { id: 'add', tester: '', timestamp: {} };
}

/**
 * Check if a test is a add test
 */
export function IsTestAddPlaceHolder(test: ITest): boolean {
  return test.id === 'add';
}

/**
 * helper function to get percentage of remaining time
 * @param countDownMinutes
 * @param from
 * @returns
 */
export function CounterToShow(countDownMinutes: number, from: Date) {
  const dayFrom = dayjs(from);
  const dayCurrent = dayjs();
  const diffSeconds = dayCurrent.diff(dayFrom, 'seconds');
  const totalSeconds = countDownMinutes * 60;

  const remainingSeconds = Math.max(totalSeconds - diffSeconds, 0);

  const minutes = (remainingSeconds - (remainingSeconds % 60)) / 60;
  const seconds = remainingSeconds % 60;
  const sign = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  const percentage = Math.floor((1 - remainingSeconds / totalSeconds) * 100);
  return { sign, percentage };
}

export function IsTimeUp(countDownMinutes: number, from: Date) {
  const dayFrom = dayjs(from);
  const dayCurrent = dayjs();
  const diffSeconds = dayCurrent.diff(dayFrom, 'seconds');
  const totalSeconds = countDownMinutes * 60;

  return diffSeconds >= totalSeconds;
}
