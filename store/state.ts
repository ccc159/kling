import { IConfig, IState } from '../types';

export const defaultConfig: IConfig = {
  PHASE1_READY_MITUTES: 1,
  PHASE1_EXPIRE_MITUTES: 60,
  PHASE2_READY_MITUTES: 15,
  PHASE2_EXPIRE_MITUTES: 30,
};

export const initialState: IState = {
  tests: [],
  config: defaultConfig,
};
