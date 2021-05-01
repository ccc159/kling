import { IAction, IState } from '../types';
import { initialState } from './state';

export const reducer: React.Reducer<IState, IAction> = (state: IState = initialState, action: IAction): IState => {
  const { type, payload } = action;

  if (type === 'ADD_TEST') {
    return { ...state, tests: [...state.tests, payload] };
  }

  return state;
};
