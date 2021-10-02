/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-fetch';
import client from '@/src/utils/apollo';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon, LightningBoltIcon, RefreshIcon, ShieldCheckIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { GetSingleProduct, GetSingleProductVariables, GetSingleProduct_products_edges_node, GetSingleProduct_products_edges_node_variants_edges_node } from '@/src/queries/__generated__/GetSingleProduct';
import { SINGLE_PRODUCT_QUERY } from '@/src/queries';
import Button from '@/src/components/Button';
import FeatureList from '@/src/components/FeatureList';
import Gallery from '@/src/components/Gallery';
import QtySelector from '@/src/components/QtySelector';
import { classNames, formatPrice } from '@/src/utils/helpers';
import { getStaticProductDetails } from '@/src/static';
import { defaultDescription } from '@/src/utils/constants';
import { Context } from '@/src/state';
import { Action } from '@/src/types';
import { Eyebrow, H1, LargeLead } from '@/src/components/Typography';

interface PageProps {
  product: GetSingleProduct_products_edges_node;
  variant: GetSingleProduct_products_edges_node_variants_edges_node;
}

const ProductVariantDetail: NextPage<PageProps> = ({ product, variant }) => {
  const { state: { checkout, shopifyClient }, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [imageShown, setImageShown] = useState(() => {
    return variant.image!;
  });
  const productDetails = getStaticProductDetails(product.handle);

  useEffect(() => {
    setImageShown(variant.image!);
  }, [variant]);

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
      openCartDrawer();
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
        <title>{product.seo.title || `${product.title} | marcless`}</title>
        <meta name="description" content={product.seo.description || defaultDescription} />
        <link rel="icon" href="/favicon.ico" />
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

      <section className="mt-12 [ md:mt-16 ]">
        <div className="container max-w-screen-lg mx-auto px-4 [ md:grid md:grid-cols-2 ] [ lg:px-0 ]">
          <div className="col-span-1">
            <figure className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
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

          <article className="col-span-1 mt-12 [ md:mt-12 md:px-8 ]">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-4xl">
                  {product.title}
                </h1>
                <p>{productDetails.punchLine}</p>
              </div>
              <div className="flex flex-col text-right relative">
                <label className="invisible absolute">price</label>
                <p className="text-xl">{formatPrice(variant.priceV2.amount)}</p>
                {variant.compareAtPriceV2 && (
                  <span className="text-red-600 line-through">
                    {formatPrice(variant.compareAtPriceV2.amount)}
                  </span>
                )}
              </div>
            </header>

            <div className="prose py-8" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

            <div className="">
              <label className="font-serif block mb-2">Color / {variant.title}</label>
              <div className="flex flex-wrap mb-6">
                {product.variants.edges.map(({ node }) => {
                  const colorSwatch = productDetails.colors.find((color: any) => color.name === node.title.toLowerCase().replace(/ /g, '-'));
                  return (
                    <Link key={node.id} href={`/shop/${product.handle}/${node.sku}`} passHref>
                      <a title={node.title} className={classNames(
                        'h-8 w-8 mr-4 mb-4 rounded-full flex items-center justify-center border-2 overflow-hidden',
                        node.sku === variant.sku ? 'border-gray-700' : 'border-gray-200'
                      )}>
                        <div className="h-6 w-6 relative rounded-full overflow-hidden">
                          <Image objectFit="cover" src={colorSwatch.src} alt={colorSwatch.name} />
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              <div className="">
                {/* quantity selector */}
                <QtySelector defaultValue={qty} onChange={(num: number) => setQty(num)} />
              </div>
              <div className="">
                <Button disabled={loading} onClick={() => createCheckout()}>
                  {loading ? (
                    <RefreshIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
                  ) : (
                    <>add to cart</>
                  )}
                </Button>
              </div>
            </div>

            <div className="w-full mt-12">
              <h2 className="font-serif text-xl mb-4 text-center [ md:text-left ]">{productDetails.faq.heading}</h2>
              {productDetails.faq.items.map(({ question, answer }: { question: string, answer: string }, index: number) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <div className={classNames(
                      index === productDetails.faq.items.length - 1 ? '' : 'mb-4'
                    )}>
                      <Disclosure.Button className="flex w-full items-center justify-between bg-gray-100 rounded-lg px-6 py-4 text-left">
                        <span>{question}</span>
                        <ChevronRightIcon
                          className={`h-6 w-6 ${open ? "transform rotate-90" : ""}`}
                        />
                      </Disclosure.Button>

                      <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform -translate-y-1/2 opacity-0"
                        enterTo="transform translate-y-0 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform translate-y-0 opacity-100"
                        leaveTo="transform -translate-y-1/4 opacity-0"
                      >
                        <Disclosure.Panel className="px-6 py-4">
                          {answer}
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mt-12 [ md:mt-24 ]">
        <div className="container mx-auto px-4 [ md:grid md:grid-cols-5 ] [ lg:px-0 ]">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col [ md:px-8 ]">
              <h2 className="font-sans uppercase mb-6 text-primary tracking-widest font-bold">{productDetails.includes.eyebrow}</h2>
              <p className="text-3xl font-serif mb-4 text-gray-800">
                {productDetails.includes.heading}
              </p>
              <p className="mb-8 [ md:mb-16 ] max-w-2xl text-xl text-gray-600 lg:mx-auto">
                {productDetails.includes.copy}
              </p>

              <div className="">
                <h3 className="text-gray-800 font-bold mb-2">
                  {productDetails.includes.subheading}
                </h3>
                <ul>
                  {productDetails.includes.items.map((item: string, index: number) => (
                    <li className="py-1" key={index}>
                      <p className="text-gray-600">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-8 [ md:mt-0 ]">
            <figure className="aspect-w-4 aspect-h-4 [ md:aspect-w-3 md:aspect-h-4 ] rounded-lg overflow-hidden">
              <Image
                className="w-full h-full object-center object-cover transition duration-150 hover:scale-110"
                layout="fill"
                src={productDetails.includes.image}
                alt={'product image'}
              />
            </figure>
          </div>
        </div>
      </section>

      <FeatureList
        eyebrow={<Eyebrow>the marc razor</Eyebrow>}
        heading={<H1 className="mb-4">Fewer blades, less irritation, great design.</H1>}
        body={
          <LargeLead className="mb-12 max-w-screen-md mx-auto">
            Get a smooth, ultra-close shave without the aggressive, go-beneath-the-surface extra blades that cause razor burn and ingrown hairs.
          </LargeLead>
        }
        items={productDetails.features.items}
      />

      <Gallery images={productDetails.gallery} />

      <div className="yotpo yotpo-main-widget"
        data-product-id={product.id}
        data-name={product.title}
        data-url={`/shop/${product.handle}/${variant.sku}`}
        data-image-url={variant.image?.transformedSrc}
        data-description={product.description}>
      </div>
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

  return {
    props: {
      product,
      variant: variant?.node
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
