
import { gql } from 'apollo-boost';
import type { GetProducts, GetProductsVariables } from './__generated__/GetProducts';

export type { GetProducts, GetProductsVariables };
export const PRODUCTS_QUERY = gql`
  query GetProducts($first: Int, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          productType
          description
          descriptionHtml
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
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                priceV2 {
                  amount
                }
                image {
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SINGLE_PRODUCT_QUERY = gql`
  query GetSingleProduct($handle: String!) {
    products(first:1, query: $handle) {
      edges {
        node {
          id
          title
          handle
          productType
          description
          descriptionHtml
          seo {
            title
            description
          }
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
          description
          descriptionHtml
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                priceV2 {
                  amount
                }
                compareAtPriceV2 {
                  amount
                }
                image {
                  transformedSrc
                  altText
                }
              }
            }
          }
          images(first: 20) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`
