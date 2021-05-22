import { Audio } from 'expo-av';

export enum Result {
  Negative = 'Negative',
  Positive = 'Positive',
  Invalid = 'Invalid',
}

export interface ITimestamp {
  start?: Date;
  intermediate?: Date;
  end?: Date;
}

export interface IReport {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  result: Result;
  remarks: string;
  createdDate: Date;
}

export interface ITest {
  id: string;
  tester: string;
  timestamp: ITimestamp;
  result?: Result;
  report?: IReport;
}

export interface IConfig {
  PHASE1_READY_MINUTES: number;
  PHASE1_EXPIRE_MINUTES: number;
  PHASE2_READY_MINUTES: number;
  PHASE2_EXPIRE_MINUTES: number;
}

export interface IState {
  tests: ITest[];
  config: IConfig;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IAction {
  type: string;
  payload?: any;
}
