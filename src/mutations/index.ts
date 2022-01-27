import { gql } from '@apollo/client';

export const CHECKOUT_MUTATION = gql`
  mutation CreateCheckout($variantId: ID!) {
    checkoutCreate(input: {
      lineItems: {
        variantId: $variantId,
        quantity: 1
      }
    }) {
      checkout {
        webUrl
      }
    }
  }
`;
