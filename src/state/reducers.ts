import { AppState, AppAction, Action } from '../types';
import { toLocalStorage } from '../utils/helpers';

export function reducer(state: AppState, action: AppAction) {
  let newState = {
    ...state
  };

  switch(action.type) {
    case Action.SetReady:
      newState = {
        ...newState,
        ready: true
      };
      break;
    case Action.SetNav:
      newState = {
        ...newState,
        ...action.payload
      };
      break;
    case Action.SetCartOpen:
      newState = {
        ...newState,
        ...action.payload
      };
      break;
    case Action.SetCustomer:
      newState = {
        ...newState,
        ...action.payload
      };
      toLocalStorage('customer', newState.customer);
      break;
    case Action.SetCheckout:
      newState = {
        ...newState,
        ...action.payload
      };
      toLocalStorage('checkoutId', newState.checkout.id);
      toLocalStorage('checkout', newState.checkout);
      break;
    default:
      break;
  }

  return newState;
}
