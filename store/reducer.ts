import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAction, IState } from '../types';
import { initialState } from './state';

export const reducer: React.Reducer<IState, IAction> = (state: IState = initialState, action: IAction): IState => {
  const { type, payload } = action;

  if (type === 'LOAD_DATA') {
    return { ...state, tests: payload.tests, config: payload.config };
  } else if (type === 'ADD_TEST') {
    const newTests = [...state.tests, payload];
    const jsonValue = JSON.stringify(newTests);
    AsyncStorage.setItem('tests', jsonValue);
    return { ...state, tests: newTests };
  } else if (type === 'UPDATE_TEST') {
    const newTests = state.tests.map((t) => (t.id === payload.id ? payload : t));
    const jsonValue = JSON.stringify(newTests);
    AsyncStorage.setItem('tests', jsonValue);
    return { ...state, tests: newTests };
  } else if (type === 'UPDATE_CONFIG') {
    const jsonValue = JSON.stringify(payload);
    AsyncStorage.setItem('config', jsonValue);
    return { ...state, config: payload };
  } else if (type === 'RESET_APP') {
    const jsonValue = JSON.stringify([]);
    AsyncStorage.setItem('tests', jsonValue);
    return { ...state, tests: [] };
  }

  return state;
};
