import type { Store, Store_shop } from '@/src/queries';
import type { Client, Cart } from 'shopify-buy';
export type { Store, Store_shop };

export interface MainMenuItem {
  label: string;
  href: string;
}
export interface SocialLinkItems {
  label: string;
  href: string;
  svgPath: string;
}

export interface BasicCustomer {
  id: number;
  email: string;
  avatar?: string;
}

export interface AppState {
  ready: boolean;
  active: boolean;
  shopifyClient: Client;
  navOpen: boolean;
  cartOpen: boolean;
  store?: Store_shop;
  customer?: BasicCustomer;
  checkout: Cart;
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
  SetCheckout = 'set-checkout',
  SetCartOpen = 'set-cart-open',
  SetCustomer = 'set-customer',
}

export interface ActionTypes {
  [Action.SetReady]: { ready: boolean };
  [Action.SetNav]: { navOpen: boolean };
  [Action.SetCartOpen]: { cartOpen: boolean };
  [Action.SetCustomer]: { customer: BasicCustomer };
  [Action.SetCheckout]: { checkout: Cart };
}

export type AppAction = ActionMap<ActionTypes>[keyof ActionMap<ActionTypes>];
