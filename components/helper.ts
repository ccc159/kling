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
