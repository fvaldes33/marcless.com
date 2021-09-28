import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState } from '../types';
import { reducer } from './reducers';

export interface ProductPageStateContext {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const defaultState: AppState = {
  ready: false,
  navOpen: false,
};

const Context = createContext<ProductPageStateContext>({
  state: defaultState,
  dispatch: () => undefined,
});

const { Consumer, Provider } = Context;

const AppContextProvider: React.FC<{
  initialState?: Partial<AppState>;
  children: ReactNode;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initialState,
  });
  const value = { state, dispatch };

  return <Provider value={value}>{children}</Provider>;
};

export default AppContextProvider;
export { Consumer, Context, Provider };
