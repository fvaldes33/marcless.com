
import { gql } from 'apollo-boost';

export type { Store } from './__generated__/Store';
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
        url
      }
      shippingPolicy {
        url
      }
      refundPolicy {
        url
      }
      termsOfService {
        url
      }
      shipsToCountries
    }
  }
`;
