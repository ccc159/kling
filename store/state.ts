import { IConfig, IState } from '../types';

export const defaultConfig: IConfig = {
  PHASE1_READY_MINUTES: 1,
  PHASE1_EXPIRE_MINUTES: 60,
  PHASE2_READY_MINUTES: 15,
  PHASE2_EXPIRE_MINUTES: 30,
};

export const initialState: IState = {
  tests: [],
  config: defaultConfig,
};
