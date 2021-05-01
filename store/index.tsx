import React from 'react';
import { initialState } from './state';
import { reducer } from './reducer';
import { useTask, ITask } from './task';
import { IState } from '../types';

const Context: React.Context<any> = React.createContext(undefined);

function ContextProvider(props: any) {
  // init reducer
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const task = useTask(state, dispatch);

  const value: { state: IState; task: ITask } = { state, task };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

const AppContext = (): { state: IState; task: ITask } => React.useContext(Context);

export { AppContext, ContextProvider };
