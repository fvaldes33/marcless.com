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
import Button from '@/src/components/Button';
import { defaultDescription } from '@/src/utils/constants';
import { useEffect } from 'react';

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
        <title>Products | Marcless</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <div ref={ref} className="py-12 px-4 [ md:py-24 ] [ lg:px-0 ] relative bg-white">
        <motion.div
          className="container mx-auto overflow-visible [ md:grid md:grid-cols-3 md:gap-x-10 ]"
          variants={staggered}
          initial="hidden"
          animate={controls}
        >
          {products?.edges.map(({ node }) => {
            return node.variants.edges.map((variant) => {
              const variantImage = variant.node.image;
              return (
                <motion.article variants={fadeInUp} key={variant.node.id} className="group mb-12 [ md:mb-8 ]">
                  <figure className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                    <Link href={`/shop/${encodeURIComponent(node.handle)}/${variant.node.sku}`} passHref>
                      <a className="block">
                        <img
                          className="w-full h-full object-center object-cover transition duration-150 hover:scale-110"
                          src={variantImage?.transformedSrc}
                          alt={variantImage?.altText || 'product image'} />
                      </a>
                    </Link>
                  </figure>
                  <div className="py-4 flex flex-col items-center">
                    <h1 className="font-serif text-2xl mb-0">
                      {node.title.toLowerCase()}
                    </h1>
                    <h2 className="font-sans mb-4">
                      {variant.node.title.toLowerCase()}
                    </h2>
                    <p className="font-sans text-base mb-4">
                      {formatPrice(node.priceRange.minVariantPrice.amount)}

                      {node.compareAtPriceRange && (
                        <span className="text-red-600 line-through ml-2">
                          {formatPrice(node.compareAtPriceRange.minVariantPrice.amount)}
                        </span>
                      )}
                    </p>
                    <Button href={`/shop/${encodeURIComponent(node.handle)}/${variant.node.sku}`}>
                      buy now
                    </Button>
                  </div>
                </motion.article>
              )
            });
          })}
        </motion.div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query<GetProducts, GetProductsVariables>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 2,
    }
  });

  return {
    props: {
      ...data
    },
  }
}

export default Shop
