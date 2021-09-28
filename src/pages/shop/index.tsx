/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import client from '@/src/utils/apollo';
import { PRODUCTS_QUERY, GetProducts, GetProductsVariables } from '@/src/queries';
import { formatPrice } from '@/src/utils/helpers';
import Button from '@/src/components/Button';

const Shop: NextPage<GetProducts> = ({ products }) => {
  return (
    <>
      <Head>
        <title>marcless.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-12 px-4 [ md:py-24 ] [ lg:px-0 ] relative bg-white">
        <div className="container mx-auto overflow-visible [ md:grid md:grid-cols-3 md:gap-x-10 ]">
          {products?.edges.map(({ node }) => {
            return node.variants.edges.map((variant) => {
              const variantImage = variant.node.image;
              return (
                <article key={variant.node.id} className="group mb-12 [ md:mb-8 ]">
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
                </article>
              )
            });
          })}
        </div>
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
