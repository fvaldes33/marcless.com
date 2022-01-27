import { gql } from '@apollo/client';

export * from './__generated__/GetCollection';

export const COLLECTION_QUERY = gql`
  query GetCollection($handle: String) {
    collection(handle: $handle) {
      id
      title
      products(first: 4) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              transformedSrc
              altText
            }
          }
        }
      }
    }
  }
`;
