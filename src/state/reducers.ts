import { AppState, AppAction, Action } from '../types';

export function reducer(state: AppState, action: AppAction) {
  switch(action.type) {
    case Action.SetReady:
      return {
        ...state,
        ready: true
      };
    case Action.SetNav:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
}
