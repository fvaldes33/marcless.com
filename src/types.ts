import type { Store, Store_shop } from '@/src/queries';
import type { Client, Cart } from 'shopify-buy';
export type { Store, Store_shop };

export interface MainMenuItem {
  label: string;
  href: string;
  children?: MainMenuItem[]
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

export type ContainerType = 'normal' | 'thin' | 'wide' | 'full' | string;
export enum ContainerTypeEnum {
  Normal = 'normal',
  Thin = 'thin',
  Full = 'full',
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
  offerDismissed?: boolean;
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
  SetDismissed = 'set-dismissed'
}

export interface ActionTypes {
  [Action.SetReady]: { ready: boolean };
  [Action.SetNav]: { navOpen: boolean };
  [Action.SetCartOpen]: { cartOpen: boolean };
  [Action.SetCustomer]: { customer: BasicCustomer };
  [Action.SetCheckout]: { checkout: Cart };
  [Action.SetDismissed]: { offerDismissed: boolean };
}

export type AppAction = ActionMap<ActionTypes>[keyof ActionMap<ActionTypes>];
