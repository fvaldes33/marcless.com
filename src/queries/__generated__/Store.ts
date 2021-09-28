/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Store
// ====================================================

export interface Store_shop_primaryDomain {
  __typename: "Domain";
  /**
   * The URL of the domain (eg: `https: // example.com`).
   */
  url: any;
}

export interface Store_shop_privacyPolicy {
  __typename: "ShopPolicy";
  /**
   * Policy’s title.
   */
  title: string;
  /**
   * Policy’s handle.
   */
  handle: string;
  /**
   * Public URL to the policy.
   */
  url: any;
  /**
   * Policy text, maximum size of 64kb.
   */
  body: string;
}

export interface Store_shop_shippingPolicy {
  __typename: "ShopPolicy";
  /**
   * Policy’s title.
   */
  title: string;
  /**
   * Policy’s handle.
   */
  handle: string;
  /**
   * Public URL to the policy.
   */
  url: any;
  /**
   * Policy text, maximum size of 64kb.
   */
  body: string;
}

export interface Store_shop_refundPolicy {
  __typename: "ShopPolicy";
  /**
   * Policy’s title.
   */
  title: string;
  /**
   * Policy’s handle.
   */
  handle: string;
  /**
   * Public URL to the policy.
   */
  url: any;
  /**
   * Policy text, maximum size of 64kb.
   */
  body: string;
}

export interface Store_shop_termsOfService {
  __typename: "ShopPolicy";
  /**
   * Policy’s title.
   */
  title: string;
  /**
   * Policy’s handle.
   */
  handle: string;
  /**
   * Public URL to the policy.
   */
  url: any;
  /**
   * Policy text, maximum size of 64kb.
   */
  body: string;
}

export interface Store_shop {
  __typename: "Shop";
  /**
   * The shop’s name.
   */
  name: string;
  /**
   * A description of the shop.
   */
  description: string | null;
  /**
   * A string representing the way currency is formatted when the currency isn’t specified.
   */
  moneyFormat: string;
  /**
   * The shop’s primary domain.
   */
  primaryDomain: Store_shop_primaryDomain;
  /**
   * The shop’s privacy policy.
   */
  privacyPolicy: Store_shop_privacyPolicy | null;
  /**
   * The shop’s shipping policy.
   */
  shippingPolicy: Store_shop_shippingPolicy | null;
  /**
   * The shop’s refund policy.
   */
  refundPolicy: Store_shop_refundPolicy | null;
  /**
   * The shop’s terms of service.
   */
  termsOfService: Store_shop_termsOfService | null;
  /**
   * Countries that the shop ships to.
   */
  shipsToCountries: CountryCode[];
}

export interface Store {
  /**
   * The shop associated with the storefront access token.
   */
  shop: Store_shop;
}
