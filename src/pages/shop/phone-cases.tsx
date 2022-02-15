/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import client from '@/src/utils/apollo';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { fadeInUp, staggered } from "@/src/utils/constants";
import { PRODUCTS_QUERY, GetProducts, GetProductsVariables } from '@/src/queries';
import { formatPrice, viewItems, transformToGoogleItem } from '@/src/utils/helpers';
import { defaultDescription } from '@/src/utils/constants';
import { useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import heroImage from '@/src/assets/tech/phone-cases-compressed-5.jpg';

const Shop: NextPage<GetProducts> = ({ products }) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView])

  useEffect(() => {
    const allItems: any = [];
    products.edges.forEach(({ node }) => {
      node.variants.edges.forEach(({ node: variant }, index) => {
        allItems.push({
          ...transformToGoogleItem(node, variant),
          list_position: (index + 1),
        });
      })
    })
    viewItems(allItems);
  }, [products]);

  return (
    <>
      <Head>
        <title>Phone Cases | Shop | Marcless</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <section className="bg-primary bg-opacity-50 text-gray-900 container mx-auto flex flex-col md:flex-row justify-between xl:mt-8 py-24 lg:py-32 px-8 lg:px-24 relative">
        <img
          className="absolute inset-0 z-0 w-full h-full object-cover"
          alt="hero image of iphone"
          src={heroImage.src}
        />

        <div className="w-full md:w-1/2 flex-shrink-0 relative z-10">
          <span className="text-gray-700 text-base md:text-lg mb-1 flex items-center">
            Shop <ChevronRightIcon className="w-4 h-4 mx-2" />
            Phone Cases
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">
            Same Phone. New Look.
          </h1>
        </div>
      </section>

      <section ref={ref} className="py-12 px-4 [ xl:px-0 ] relative bg-white">
        <motion.div
          className="container mx-auto overflow-visible [ md:grid md:grid-cols-3 md:gap-x-10 ] [ xl:grid-cols-4 ]"
          variants={staggered}
          initial="hidden"
          animate={controls}
        >
          {products?.edges.map(({ node }) => {
            const productImage = node.images.edges[0].node;
            const variant = node.variants.edges[0].node;
            const regularPrice = node.compareAtPriceRange.minVariantPrice.amount;
            const salePrice = node.priceRange.minVariantPrice.amount;
            const onSale = +regularPrice > +salePrice;

            return (
              <motion.article variants={fadeInUp} key={node.id} className="flex flex-col group relative rounded-xl shadow-xl overflow-hidden mb-8">
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
                    <Link href={`/shop/${encodeURIComponent(node.handle)}?variant=${variant.sku}`} passHref>
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
              </motion.article>
            );
          })}
        </motion.div>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query<GetProducts, GetProductsVariables>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 10,
      query: 'product_type:\"Mobile Phone Cases\"'
    }
  });

  return {
    props: {
      ...data
    },
  }
}

export default Shop
