import { IDispatch, IState, ITest } from '../types';

export interface ITask {
  AddTest: (test: ITest) => void;
}

export function useTask(state: IState, dispatch: IDispatch): ITask {
  const AddTest = (test: ITest) => {
    dispatch({ type: 'ADD_TEST', payload: test });
  };

  return { AddTest };
}
