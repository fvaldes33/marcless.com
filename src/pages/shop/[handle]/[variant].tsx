/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-fetch';
import client from '@/src/utils/apollo';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon, RefreshIcon } from '@heroicons/react/outline';
import { GetSingleProduct, GetSingleProductVariables, GetSingleProduct_products_edges, GetSingleProduct_products_edges_node, GetSingleProduct_products_edges_node_variants_edges_node } from '@/src/queries/__generated__/GetSingleProduct';
import { GetProducts, GetProductsVariables, PRODUCTS_QUERY, SINGLE_PRODUCT_QUERY } from '@/src/queries';
import Button from '@/src/components/Button';
import QtySelector from '@/src/components/QtySelector';
import { classNames, formatPrice, viewItem, transformToGoogleItem, addToCart } from '@/src/utils/helpers';
import { getStaticProductDetails } from '@/src/static';
import { brandFeatures, defaultDescription } from '@/src/utils/constants';
import { Context } from '@/src/state';
import { Action } from '@/src/types';
import FeatureList from '@/src/components/FeatureList';
import { Eyebrow, LargeLead } from '@/src/components/Typography';

interface PageProps {
  product: GetSingleProduct_products_edges_node;
  variant: GetSingleProduct_products_edges_node_variants_edges_node;
  relatedProducts: GetSingleProduct_products_edges[];
}

const ProductVariantDetail: NextPage<PageProps> = ({ product, variant, relatedProducts }) => {
  const { state: { checkout, shopifyClient }, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [imageShown, setImageShown] = useState(() => {
    return variant.image!;
  });

  useEffect(() => {
    setImageShown(variant.image!);

    // send to ga
    viewItem({
      items: [{
        ...transformToGoogleItem(product, variant),
        list_position: 1,
      }]
    });
  }, [product, variant]);

  const openCartDrawer = () => {
    dispatch({ type: Action.SetCartOpen, payload: { cartOpen: true } });
  }

  const createCheckout = async () => {
    setLoading(true);

    const items = [
      {
        variantId: variant.id,
        quantity: qty,
      }
    ];

    try {
      const newCheckout = await shopifyClient.checkout.addLineItems(
        checkout.id,
        items
      );
      dispatch({ type: Action.SetCheckout, payload: { checkout: newCheckout } });
      addToCart({
        items: [{
          ...transformToGoogleItem(product, variant),
          quantity: qty,
        }]
      })
      setTimeout(() => {
        window.location.href = newCheckout.webUrl;
      })
    } catch (error) {

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  return (
    <>
      <Head>
        <title>{product.seo.title || `${product.title} | Marcless`}</title>
        <meta name="description" content={product.seo.description || defaultDescription} />

        <meta property="og:title" content={product.seo.title || `${product.title} | Marcless`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={product.seo.description || defaultDescription} />
        <meta property="og:image" content={variant.image?.transformedSrc} />
        <meta property="og:image:secure_url" content={variant.image?.transformedSrc} />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.seo.title || `${product.title} | Marcless`} />
        <meta name="twitter:description" content={product.seo.description || defaultDescription} />

        <script type="application/json+ld" dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "name": product.title,
              "offers": {
                "@type": "Offer",
                "availability": "http://schema.org/InStock",
                "price": variant.priceV2.amount,
                "priceCurrency": "USD"
              }
            }
          )
        }} />
      </Head>

      <section className="container max-w-screen-xl mx-auto px-6 xl:px-0 flex flex-col md:flex-row mt-12 [ md:mt-16 ]">
        {/* image */}
        <div className="w-full md:w-1/2 flex-shrink-0 self-start md:sticky md:top-0">
          <figure className="aspect-w-4 aspect-h-4 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-center object-cover transition duration-150 hover:scale-110"
              src={imageShown.transformedSrc}
              alt={imageShown.altText || 'product image'} />
          </figure>

          <div className="relative">
            <div className="flex space-x-2 mt-4 overflow-auto scrollbar-hide mr-12">
              {product.images.edges.map(({ node }, index: number) => {
                return (
                  <figure
                    key={`thumbnail-${index}`}
                    className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setImageShown(node)}
                  >
                    <img
                      className="w-full h-full object-top object-cover"
                      src={node.transformedSrc}
                      alt={node.altText || `product-thumbail-${product.title}`} />
                  </figure>
                );
              })}
            </div>
            <div className="absolute flex items-center justify-end bg-gradient-to-l from-white h-full pr-4 w-12 top-0 bottom-0 right-0">
              <ChevronRightIcon className="h-6 w-6" aria-label="" />
            </div>
          </div>
        </div>

        {/* title & description */}
        <div className="text-gray-800 mt-8 flex flex-col items-start">
          <span className="block text-primary text-base mb-1">On Sale</span>

          <h1 className="relative font-sans font-bold text-4xl lg:text-6xl mb-4">
            <span className="relative z-10">{product.title}</span>
            <span className="bg-primary bg-opacity-50 absolute h-6 w-full bottom-0 left-0"></span>
          </h1>

          <div className="flex relative mb-8">
            <label className="invisible absolute">price</label>
            {variant.compareAtPriceV2 && (
              <span className="text-red-600 text-xl line-through mr-4">
                {formatPrice(variant.compareAtPriceV2.amount)}
              </span>
            )}
            <p className="text-xl">{formatPrice(variant.priceV2.amount)}</p>
          </div>

          <div className="">
            <label className="font-sans block mb-4 font-bold uppercase">Colors / <span className="text-gray-600">{variant.title}</span></label>
            <div className="flex flex-wrap space-x-4 mb-6">
              {product.variants.edges.map(({ node }) => {
                return (
                  <Link key={node.id} href={`/shop/${product.handle}/${node.sku}`} passHref>
                    <a title={node.title} className={classNames(
                      'py-2 px-8 mb-4 flex items-center justify-center border-2 overflow-hidden',
                      node.sku === variant.sku ? 'border-gray-700' : 'border-gray-200'
                    )}>
                      <div className="relative">
                        {node.title}
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="">
              {/* quantity selector */}
              <QtySelector defaultValue={qty} onChange={(num: number) => setQty(num)} />
            </div>
            <div className="">
              <Button disabled={loading} onClick={() => createCheckout()}>
                {loading ? (
                  <RefreshIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
                ) : (
                  <>Buy Now</>
                )}
              </Button>
            </div>
          </div>
          <div className="prose py-8" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>
      </section>


      <FeatureList
        eyebrow={<Eyebrow className="mb-2">why marc<i>less</i></Eyebrow>}
        heading={
          <h2 className="font-sans text-4xl md:text-6xl font-bold mb-6 md:mb-12">
            Our commitment to you.
          </h2>
        }
        body={
          <LargeLead className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, distinctio modi. Maiores nostrum adipisci quibusdam tenetur asperiores sed cumque odit doloribus, provident dignissimos dicta? Tempore, quo. Accusamus, necessitatibus similique! Labore!
          </LargeLead>
        }
        items={brandFeatures}
      />

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 xl:px-0 pt-16 md:pt-32">
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-12 text-center">Related Products</h2>
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map(({ node }) => {
              const productImage = node.images.edges[0].node;
              const variant = node.variants.edges[0].node;
              const regularPrice = node.compareAtPriceRange.minVariantPrice.amount;
              const salePrice = node.priceRange.minVariantPrice.amount;
              const onSale = +regularPrice > +salePrice;

              return (
                <div key={node.id} className="flex flex-col group relative rounded-xl shadow-xl overflow-hidden mb-8 md:mb-0">
                  <div className="flex-shrink-0 w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden transition-opacity duration-200 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={productImage.transformedSrc}
                      alt={productImage.altText ?? ''}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col h-full justify-between p-8">
                    <h3 className="text-base text-gray-800 mb-4">
                      <span className="block text-primary text-sm mb-1">New</span>
                      <Link href={`/shop/${encodeURIComponent(node.handle)}/${variant.sku}`} passHref>
                        <a href={node.handle} className="font-bold">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {node.title}
                        </a>
                      </Link>
                    </h3>
                    <p className="mt-auto text-sm text-gray-800 flex space-x-4">
                      {onSale && <span className="line-through text-gray-400">{formatPrice(regularPrice)}</span>}
                      <span>{formatPrice(salePrice)}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* <Gallery images={productDetails.gallery} /> */}

      {/* <section className="container max-w-screen-lg mx-auto px-4 font-sans">
        <div className="yotpo yotpo-main-widget"
          data-product-id={product.id}
          data-name={product.title}
          data-url={`/shop/${product.handle}/${variant.sku}`}
          data-image-url={variant.image?.transformedSrc}>
        </div>
      </section> */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle, variant: sku } = params!;
  const { data } = await client.query<GetSingleProduct, GetSingleProductVariables>({
    query: SINGLE_PRODUCT_QUERY,
    variables: {
      handle: handle as string
    }
  });
  const product = data.products.edges[0].node;
  const variant = product.variants.edges.find(({ node }) => node.sku === sku);

  const { data: relatedProducts } = await client.query<GetProducts, GetProductsVariables>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 5,
      query: `type:${product.productType}`
    }
  });

  return {
    props: {
      product,
      variant: variant?.node,
      relatedProducts: relatedProducts.products.edges.filter(({ node }) => node.id !== product.id)
    },
  }
}

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/products.json?fields=id,title,handle,variants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_ADMIN_TOKEN!
    }
  });

  const { products } = await response.json();
  const paths = [];
  for (let product of products) {
    for (let variant of product.variants) {
      paths.push({
        params: { handle: product.handle, variant: variant.sku },
      });
    }
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export default ProductVariantDetail;
