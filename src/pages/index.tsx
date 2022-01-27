/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { motion } from "framer-motion";

import FeatureList from '@/src/components/FeatureList';
import { Eyebrow, LargeLead } from '@/src/components/Typography';
import Button from '@/src/components/Button';
import client from '@/src/utils/apollo';
import { brandFeatures, defaultTitle, defaultDescription } from '@/src/utils/constants';
import heroChargerModern from '@/src/assets/tech/hero-charger-modern.png';
import travelerBlack from '@/src/assets/tech/traveler-black.png';
import standardBlack from '@/src/assets/tech/standard-black.png';
import architectBlack from '@/src/assets/tech/architect-black.png';
import { classNames, formatPrice } from '../utils/helpers';
import {
  COLLECTION_QUERY,
  GetCollection,
  GetCollectionVariables,
  GetCollection_collection_products_edges
} from '@/src/queries';

const gridContent = [
  {
    color: 'bg-rose-100',
    heading: 'For The Home',
    subheading: 'Minimal. Unclutered.',
    link: {
      text: 'Shop',
      href: '/shop'
    },
    image: architectBlack.src
  },
  {
    color: 'bg-fuchsia-100',
    heading: 'In The Office',
    subheading: 'Productivity Maximized.',
    link: {
      text: 'Shop',
      href: '/shop'
    },
    image: standardBlack.src
  },
  {
    color: 'bg-emerald-100',
    heading: 'On The Road',
    subheading: 'Simply Compact.',
    link: {
      text: 'Shop',
      href: '/shop'
    },
    image: travelerBlack.src
  },
]

const Home: NextPage<{ products: GetCollection_collection_products_edges[] }> = ({ products }) => {
  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <>
        {/* New Huge Hero */}
        <div className="h-screen w-screen bg-white md:mt-0 lg:-mt-20">
          <div className="container mx-auto text-gray-800 flex flex-col h-full w-full justify-center lg:items-center lg:flex-row px-6 xl:px-0">
            <motion.div
              className="flex flex-col items-start flex-shrink-0 w-full lg:w-1/2 xl:w-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
            >
              <h1 className="text-5xl md:text-8xl font-sans font-bold mb-8">
                The New<br />Standard
                <span className="mt-4 block text-xl md:text-4xl">In Wireless Charging</span>
              </h1>
              <Button href="/shop" variant="primary">
                Shop Now
              </Button>
            </motion.div>

            <motion.div
              className="w-full md:w-2/3 md:ml-auto xl:ml-[initial] lg:w-1/2 xl:w-[600px] max-w-full mt-8 md:mt-0"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
            >
              <img
                className=""
                src={heroChargerModern.src}
                alt="Standard Wireless Charger with three devices" />
            </motion.div>
          </div>
        </div>

        <section className="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-4">
          {gridContent.map((grid, index: number) => (
            <article key={index} className={classNames(
              'h-96 mb-4 md:mb-0 md:h-full relative overflow-hidden',
              grid.color
            )}>
              <div className="text-center my-12">
                <h1 className="text-3xl md:text-5xl font-sans font-bold">
                  {grid.heading}
                  <span className="mt-4 block text-lg md:text-2xl">{grid.subheading}</span>
                </h1>
                <Link href={grid.link.href} passHref>
                  <a className="mt-2 flex justify-center">
                    <span className="flex items-center space-x-4">
                      {grid.link.text}
                      <ChevronRightIcon className="h-4 w-4" />
                    </span>
                  </a>
                </Link>
              </div>
              <img
                className="w-3/4 mx-auto md:w-full transform -translate-y-12 md:-translate-y-0"
                src={grid.image}
                alt={`${grid.heading} ${grid.subheading}`} />
            </article>
          ))}
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
              {`We sell directly to customers, cutting unnecessary costs and crazy markups that make products overly expensive. We pass on the savings to you, so you get the same quality at a fraction of the cost.`}
            </LargeLead>
          }
          items={brandFeatures}
        />

        {products && products.length > 0 && (
          <section className="container mx-auto px-4 xl:px-0 pt-16 md:pt-32">
            <h2 className="text-4xl md:text-6xl font-sans font-bold mb-12 text-center">Featured Products</h2>
            <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(({ node }) => {
                const productImage = node.featuredImage;
                const regularPrice = node.compareAtPriceRange.minVariantPrice.amount;
                const salePrice = node.priceRange.minVariantPrice.amount;
                const onSale = +regularPrice > +salePrice;

                return (
                  <div key={node.id} className="flex flex-col group relative rounded-xl shadow-xl overflow-hidden mb-8 md:mb-0">
                    <div className="flex-shrink-0 w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden transition-opacity duration-200 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      {productImage && (
                        <img
                          src={productImage.transformedSrc}
                          alt={productImage.altText ?? ''}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-transform duration-200 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-col h-full justify-between p-8">
                      <h3 className="text-base text-gray-800 mb-4">
                        <span className="block text-primary text-sm mb-1">New</span>
                        <Link href={`/shop/${encodeURIComponent(node.handle)}`} passHref>
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
      </>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query<GetCollection, GetCollectionVariables>({
    query: COLLECTION_QUERY,
    variables: {
      handle: "featured"
    }
  });

  let products: GetCollection_collection_products_edges[] = [];
  if (data.collection && data.collection.products) {
    products = data.collection.products.edges;
  }

  return {
    props: {
      products
    },
  }
}

export default Home
