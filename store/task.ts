import { IConfig, IDispatch, IState, ITest } from '../types';

export interface ITask {
  LoadData: (tests: ITest[], config: IConfig) => void;
  AddTest: (test: ITest) => void;
  UpdateTest: (test: ITest) => void;
  UpdateConfig: (config: IConfig) => void;
  ResetApp: () => void;
}

export function useTask(state: IState, dispatch: IDispatch): ITask {
  const LoadData = (tests: ITest[], config: IConfig) => {
    dispatch({ type: 'LOAD_DATA', payload: { tests, config } });
  };
  const AddTest = (test: ITest) => {
    dispatch({ type: 'ADD_TEST', payload: test });
  };
  const UpdateTest = (test: ITest) => {
    dispatch({ type: 'UPDATE_TEST', payload: test });
  };
  const UpdateConfig = (config: IConfig) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  };
  const ResetApp = () => {
    dispatch({ type: 'RESET_APP' });
  };

  return { LoadData, AddTest, UpdateTest, UpdateConfig, ResetApp };
}
