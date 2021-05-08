import { IDispatch, IState, ITest } from '../types';

export interface ITask {
  LoadData: (tests: ITest[]) => void;
  AddTest: (test: ITest) => void;
  UpdateTest: (test: ITest) => void;
}

export function useTask(state: IState, dispatch: IDispatch): ITask {
  const LoadData = (tests: ITest[]) => {
    dispatch({ type: 'LOAD_DATA', payload: tests });
  };
  const AddTest = (test: ITest) => {
    dispatch({ type: 'ADD_TEST', payload: test });
  };
  const UpdateTest = (test: ITest) => {
    dispatch({ type: 'UPDATE_TEST', payload: test });
  };

  return { LoadData, AddTest, UpdateTest };
}
