/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSingleProduct
// ====================================================

export interface GetSingleProduct_products_edges_node_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetSingleProduct_products_edges_node_priceRange_minVariantPrice;
}

export interface GetSingleProduct_products_edges_node_compareAtPriceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_products_edges_node_compareAtPriceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetSingleProduct_products_edges_node_compareAtPriceRange_minVariantPrice;
}

export interface GetSingleProduct_products_edges_node_variants_edges_node_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_products_edges_node_variants_edges_node_compareAtPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_products_edges_node_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the transformed image as a URL.
   * 
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type does not support will be ignored.
   */
  transformedSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface GetSingleProduct_products_edges_node_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku: string | null;
  /**
   * The product variant’s price.
   */
  priceV2: GetSingleProduct_products_edges_node_variants_edges_node_priceV2;
  /**
   * The compare at price of the variant. This can be used to mark a variant as on
   * sale, when `compareAtPriceV2` is higher than `priceV2`.
   */
  compareAtPriceV2: GetSingleProduct_products_edges_node_variants_edges_node_compareAtPriceV2 | null;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: GetSingleProduct_products_edges_node_variants_edges_node_image | null;
}

export interface GetSingleProduct_products_edges_node_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: GetSingleProduct_products_edges_node_variants_edges_node;
}

export interface GetSingleProduct_products_edges_node_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: GetSingleProduct_products_edges_node_variants_edges[];
}

export interface GetSingleProduct_products_edges_node_images_edges_node {
  __typename: "Image";
  /**
   * The location of the transformed image as a URL.
   * 
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type does not support will be ignored.
   */
  transformedSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface GetSingleProduct_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: GetSingleProduct_products_edges_node_images_edges_node;
}

export interface GetSingleProduct_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: GetSingleProduct_products_edges_node_images_edges[];
}

export interface GetSingleProduct_products_edges_node {
  __typename: "Product";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: any;
  /**
   * The price range.
   */
  priceRange: GetSingleProduct_products_edges_node_priceRange;
  /**
   * The compare at price of the product across all variants.
   */
  compareAtPriceRange: GetSingleProduct_products_edges_node_compareAtPriceRange;
  /**
   * List of the product’s variants.
   */
  variants: GetSingleProduct_products_edges_node_variants;
  /**
   * List of images associated with the product.
   */
  images: GetSingleProduct_products_edges_node_images;
}

export interface GetSingleProduct_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: GetSingleProduct_products_edges_node;
}

export interface GetSingleProduct_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: GetSingleProduct_products_edges[];
}

export interface GetSingleProduct {
  /**
   * List of the shop’s products.
   */
  products: GetSingleProduct_products;
}

export interface GetSingleProductVariables {
  handle: string;
}
