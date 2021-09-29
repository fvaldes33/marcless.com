import React, { createContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Action, AppState, BasicCustomer } from '@/src/types';
import shopify from '@/src/utils/shopify';
import { fromLocalStorage } from '@/src/utils/helpers';
import { reducer } from './reducers';

export interface ProductPageStateContext {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const defaultState: AppState = {
  ready: false,
  shopifyClient: shopify,
  navOpen: false,
  cartOpen: false,
  checkout: {
    id: '',
    checkoutUrl: '',
    lineItemCount: 0,
    subtotalPrice: '',
    completedAt: '',
    lineItems: [],
    webUrl: '',
    totalTax: '',
    totalPrice: '',
  }
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
  const [init, setInit] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initialState,
  });
  const value = { state, dispatch };

  useEffect(() => {
    // get customer from local storage
    if (init === false) {
      const startInit = async () => {
        const customer = fromLocalStorage<BasicCustomer>('customer', {} as BasicCustomer);
        dispatch({ type: Action.SetCustomer, payload: { customer } });

        const existingCheckoutId = fromLocalStorage<string>('checkoutId', '');
        if (existingCheckoutId) {
          // get checkout from api
          const existingCheckout = await shopify.checkout.fetch(existingCheckoutId);
          // if (existingCheckout.lineItems.some((lineItem) => !lineItem.variant)) {
          //   throw new Error(
          //     'Invalid item in checkout. This variant was probably deleted from Shopify.'
          //   )
          // }
          if (!existingCheckout.completedAt) {
            dispatch({ type: Action.SetCheckout, payload: { checkout: existingCheckout } });
            return
          }
        } else {
          // create new checkout
          const newCheckout = await shopify.checkout.create();
          dispatch({ type: Action.SetCheckout, payload: { checkout: newCheckout } });
        }
      }
      startInit();
      setInit(true);
    }
  }, [init])

  return <Provider value={value}>{children}</Provider>;
};

export default AppContextProvider;
export { Consumer, Context, Provider };
