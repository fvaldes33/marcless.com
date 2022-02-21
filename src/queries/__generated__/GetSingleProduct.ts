/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaContentType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSingleProduct
// ====================================================

export interface GetSingleProduct_product_seo {
  __typename: "SEO";
  /**
   * The SEO title.
   */
  title: string | null;
  /**
   * The meta description.
   */
  description: string | null;
}

export interface GetSingleProduct_product_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_product_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetSingleProduct_product_priceRange_minVariantPrice;
}

export interface GetSingleProduct_product_compareAtPriceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_product_compareAtPriceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetSingleProduct_product_compareAtPriceRange_minVariantPrice;
}

export interface GetSingleProduct_product_options {
  __typename: "ProductOption";
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The corresponding value to the product option name.
   */
  values: string[];
}

export interface GetSingleProduct_product_variants_edges_node_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_product_variants_edges_node_compareAtPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface GetSingleProduct_product_variants_edges_node_image {
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

export interface GetSingleProduct_product_variants_edges_node_selectedOptions {
  __typename: "SelectedOption";
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The product option’s value.
   */
  value: string;
}

export interface GetSingleProduct_product_variants_edges_node {
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
  priceV2: GetSingleProduct_product_variants_edges_node_priceV2;
  /**
   * The compare at price of the variant. This can be used to mark a variant as on
   * sale, when `compareAtPriceV2` is higher than `priceV2`.
   */
  compareAtPriceV2: GetSingleProduct_product_variants_edges_node_compareAtPriceV2 | null;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: GetSingleProduct_product_variants_edges_node_image | null;
  /**
   * List of product options applied to the variant.
   */
  selectedOptions: GetSingleProduct_product_variants_edges_node_selectedOptions[];
}

export interface GetSingleProduct_product_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: GetSingleProduct_product_variants_edges_node;
}

export interface GetSingleProduct_product_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: GetSingleProduct_product_variants_edges[];
}

export interface GetSingleProduct_product_images_edges_node {
  __typename: "Image";
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedSrc: any;
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedZoomSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface GetSingleProduct_product_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: GetSingleProduct_product_images_edges_node;
}

export interface GetSingleProduct_product_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: GetSingleProduct_product_images_edges[];
}

export interface GetSingleProduct_product_media_edges_node_ExternalVideo_previewImage {
  __typename: "Image";
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedSrc: any;
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedZoomSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface GetSingleProduct_product_media_edges_node_ExternalVideo {
  __typename: "ExternalVideo" | "Model3d";
  /**
   * The media content type.
   */
  mediaContentType: MediaContentType;
  /**
   * The preview image for the media.
   */
  previewImage: GetSingleProduct_product_media_edges_node_ExternalVideo_previewImage | null;
}

export interface GetSingleProduct_product_media_edges_node_Video_previewImage {
  __typename: "Image";
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedSrc: any;
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedZoomSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface GetSingleProduct_product_media_edges_node_Video_sources {
  __typename: "VideoSource";
  /**
   * The format of the video source.
   */
  format: string;
  /**
   * The URL of the video.
   */
  url: string;
}

export interface GetSingleProduct_product_media_edges_node_Video {
  __typename: "Video";
  /**
   * The media content type.
   */
  mediaContentType: MediaContentType;
  /**
   * The preview image for the media.
   */
  previewImage: GetSingleProduct_product_media_edges_node_Video_previewImage | null;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The sources for a video.
   */
  sources: GetSingleProduct_product_media_edges_node_Video_sources[];
}

export interface GetSingleProduct_product_media_edges_node_MediaImage_previewImage {
  __typename: "Image";
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedSrc: any;
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedZoomSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface GetSingleProduct_product_media_edges_node_MediaImage_image {
  __typename: "Image";
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedSrc: any;
  /**
   * The location of the image as a URL.
   * 
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   * 
   * All transformation options are considered "best-effort". Any transformation
   * that the original image type doesn't support will be ignored.
   * 
   * If you need multiple variations of the same image, then you can use [GraphQL
   * aliases](https: // graphql.org/learn/queries/#aliases).
   */
  transformedZoomSrc: any;
}

export interface GetSingleProduct_product_media_edges_node_MediaImage {
  __typename: "MediaImage";
  /**
   * The media content type.
   */
  mediaContentType: MediaContentType;
  /**
   * The preview image for the media.
   */
  previewImage: GetSingleProduct_product_media_edges_node_MediaImage_previewImage | null;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The image for the media.
   */
  image: GetSingleProduct_product_media_edges_node_MediaImage_image | null;
}

export type GetSingleProduct_product_media_edges_node = GetSingleProduct_product_media_edges_node_ExternalVideo | GetSingleProduct_product_media_edges_node_Video | GetSingleProduct_product_media_edges_node_MediaImage;

export interface GetSingleProduct_product_media_edges {
  __typename: "MediaEdge";
  /**
   * The item at the end of MediaEdge.
   */
  node: GetSingleProduct_product_media_edges_node;
}

export interface GetSingleProduct_product_media {
  __typename: "MediaConnection";
  /**
   * A list of edges.
   */
  edges: GetSingleProduct_product_media_edges[];
}

export interface GetSingleProduct_product {
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
   * The product's SEO information.
   */
  seo: GetSingleProduct_product_seo;
  /**
   * The price range.
   */
  priceRange: GetSingleProduct_product_priceRange;
  /**
   * The compare at price of the product across all variants.
   */
  compareAtPriceRange: GetSingleProduct_product_compareAtPriceRange;
  /**
   * List of product options.
   */
  options: GetSingleProduct_product_options[];
  /**
   * List of the product’s variants.
   */
  variants: GetSingleProduct_product_variants;
  /**
   * List of images associated with the product.
   */
  images: GetSingleProduct_product_images;
  /**
   * The media associated with the product.
   */
  media: GetSingleProduct_product_media;
}

export interface GetSingleProduct {
  /**
   * Fetch a specific `Product` by one of its unique attributes.
   */
  product: GetSingleProduct_product | null;
}

export interface GetSingleProductVariables {
  handle: string;
}
