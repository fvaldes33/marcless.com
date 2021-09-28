import type { Store, Store_shop } from '@/src/queries';

export type { Store, Store_shop };

export interface AppState {
  ready: boolean;
  navOpen: boolean;
  store?: Store_shop;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};

export enum Action {
  SetReady = 'set-ready',
  SetNav = 'set-nav',
}

export interface ActionTypes {
  [Action.SetReady]: { ready: boolean };
  [Action.SetNav]: { navOpen: boolean };
}

export type AppAction = ActionMap<ActionTypes>[keyof ActionMap<ActionTypes>];
