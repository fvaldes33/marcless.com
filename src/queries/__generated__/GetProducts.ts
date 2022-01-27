/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_edges_node_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetProducts_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetProducts_products_edges_node_priceRange_minVariantPrice;
}

export interface GetProducts_products_edges_node_compareAtPriceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetProducts_products_edges_node_compareAtPriceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetProducts_products_edges_node_compareAtPriceRange_minVariantPrice;
}

export interface GetProducts_products_edges_node_images_edges_node {
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

export interface GetProducts_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: GetProducts_products_edges_node_images_edges_node;
}

export interface GetProducts_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: GetProducts_products_edges_node_images_edges[];
}

export interface GetProducts_products_edges_node_variants_edges_node_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetProducts_products_edges_node_variants_edges_node_image {
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

export interface GetProducts_products_edges_node_variants_edges_node {
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
  priceV2: GetProducts_products_edges_node_variants_edges_node_priceV2;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: GetProducts_products_edges_node_variants_edges_node_image | null;
}

export interface GetProducts_products_edges_node_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: GetProducts_products_edges_node_variants_edges_node;
}

export interface GetProducts_products_edges_node_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: GetProducts_products_edges_node_variants_edges[];
}

export interface GetProducts_products_edges_node {
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
   * A categorization that a product can be tagged with, commonly used for filtering and searching.
   */
  productType: string;
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
  priceRange: GetProducts_products_edges_node_priceRange;
  /**
   * The compare at price of the product across all variants.
   */
  compareAtPriceRange: GetProducts_products_edges_node_compareAtPriceRange;
  /**
   * List of images associated with the product.
   */
  images: GetProducts_products_edges_node_images;
  /**
   * List of the product’s variants.
   */
  variants: GetProducts_products_edges_node_variants;
}

export interface GetProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: GetProducts_products_edges_node;
}

export interface GetProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: GetProducts_products_edges[];
}

export interface GetProducts {
  /**
   * List of the shop’s products.
   */
  products: GetProducts_products;
}

export interface GetProductsVariables {
  first?: number | null;
  query?: string | null;
}
