
import { gql } from 'apollo-boost';

export type { Store, Store_shop } from './__generated__/Store';
export const STORE_QUERY = gql`
  query Store {
    shop {
      name
      description
      moneyFormat
      primaryDomain {
        url
      }
      privacyPolicy {
        title
        handle
        url
        body
      }
      shippingPolicy {
        title
        handle
        url
        body
      }
      refundPolicy {
        title
        handle
        url
        body
      }
      termsOfService {
        title
        handle
        url
        body
      }
      shipsToCountries
    }
  }
`;
