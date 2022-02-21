
import { gql } from '@apollo/client';
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
    product(handle: $handle) {
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
      options {
        name
        values
      }
      variants(first: 20) {
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
            selectedOptions {
              name
              value
            }
          }
        }
      }
      images(first: 20) {
        edges {
          node {
            transformedSrc: url
            transformedZoomSrc: url(transform: { scale: 2 })
            altText
          }
        }
      }
      media(first: 1, reverse: true) {
        edges {
          node {
            mediaContentType
            previewImage {
              transformedSrc: url
              transformedZoomSrc: url(transform: { scale: 2 })
              altText
            }
            ...on Video {
              id
              sources {
                format
                url
              }
            }
            ...on MediaImage {
              id
              image {
                altText
                transformedSrc: url
                transformedZoomSrc: url(transform: { scale: 2 })
              }
            }
          }
        }
      }
    }
  }
`
