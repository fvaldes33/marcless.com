/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollection
// ====================================================

export interface GetCollection_collection_products_edges_node_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetCollection_collection_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetCollection_collection_products_edges_node_priceRange_minVariantPrice;
}

export interface GetCollection_collection_products_edges_node_compareAtPriceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetCollection_collection_products_edges_node_compareAtPriceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetCollection_collection_products_edges_node_compareAtPriceRange_minVariantPrice;
}

export interface GetCollection_collection_products_edges_node_featuredImage {
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

export interface GetCollection_collection_products_edges_node {
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
   * The price range.
   */
  priceRange: GetCollection_collection_products_edges_node_priceRange;
  /**
   * The compare at price of the product across all variants.
   */
  compareAtPriceRange: GetCollection_collection_products_edges_node_compareAtPriceRange;
  /**
   * The featured image for the product.
   * 
   * This field is functionally equivalent to `images(first: 1)`.
   */
  featuredImage: GetCollection_collection_products_edges_node_featuredImage | null;
}

export interface GetCollection_collection_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: GetCollection_collection_products_edges_node;
}

export interface GetCollection_collection_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: GetCollection_collection_products_edges[];
}

export interface GetCollection_collection {
  __typename: "Collection";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * List of products in the collection.
   */
  products: GetCollection_collection_products;
}

export interface GetCollection {
  /**
   * Fetch a specific `Collection` by one of its unique attributes.
   */
  collection: GetCollection_collection | null;
}

export interface GetCollectionVariables {
  handle?: string | null;
}
