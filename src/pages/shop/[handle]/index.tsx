/* eslint-disable @next/next/no-img-element */
import React, { ComponentClass, useCallback, useContext, useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import client from '@/src/utils/apollo';
import { useQuery } from '@apollo/client';
import { ChevronRightIcon, PlayIcon, RefreshIcon } from '@heroicons/react/outline';
import { GetSingleProduct, GetSingleProductVariables, GetSingleProduct_product, GetSingleProduct_product_variants, GetSingleProduct_product_options, GetSingleProduct_product_variants_edges_node, GetSingleProduct_product_media_edges_node_Video_sources } from '@/src/queries/__generated__/GetSingleProduct';
import { GetProducts, PRODUCTS_QUERY, SINGLE_PRODUCT_QUERY } from '@/src/queries';
import Button from '@/src/components/Button';
import QtySelector from '@/src/components/QtySelector';
import { classNames, formatPrice, viewItem, transformToGoogleItem, addToCart } from '@/src/utils/helpers';
import { brandFeatures, defaultDescription } from '@/src/utils/constants';
import { Context } from '@/src/state';
import { Action } from '@/src/types';
import FeatureList from '@/src/components/FeatureList';
import { Eyebrow, LargeLead } from '@/src/components/Typography';
import { useRouter } from 'next/router';

const YoptoReviews = dynamic(
  () => import('@/src/components/YoptoReviews'),
  {
    ssr: false
  }
)

const YoptoStarRating = dynamic(
  () => import('@/src/components/YoptoStarRating'),
  {
    ssr: false
  }
)

interface PageProps {
  product: GetSingleProduct_product;
  defaultVariant: GetSingleProduct_product_variants_edges_node;
}

const colorMap: { [key: string]: string } = {
  'purple': '#6d6fa7',
  'brown': '#cf7233',
  'green': '#2d3637',
  'crimson': '#3c2c3d',
  'black': '#000000',
  'white': '#ffffff',
  'blue': '#40506f',
  'orange': '#fd8b47'
}

const ProductDetail: NextPage<PageProps> = ({ product, defaultVariant }) => {
  const router = useRouter();

  const { state: { checkout, shopifyClient }, dispatch } = useContext(Context);
  const { variant: variantSku } = router.query;

  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<GetSingleProduct_product_variants_edges_node>(defaultVariant);
  const [imageShown, setImageShown] = useState(() => {
    return defaultVariant ? defaultVariant.image! : product.images.edges[0].node;
  });
  const [media, setMedia] = useState<GetSingleProduct_product_media_edges_node_Video_sources>();
  const { data: relatedProductsQuery } = useQuery<GetProducts>(PRODUCTS_QUERY, {
    variables: {
      first: 5,
      query: `product_type:${product.productType}`
    }
  });

  // const selectableOptions = product.variants.edges.reduce((acc, { node }) => {

  //   return {
  //     ...acc,
  //     []: node.selectedOptions
  //   }
  // }, {});

  useEffect(() => {
    if (variantSku) {
      const v = product.variants.edges.find(({ node }) => node.sku === variantSku);
      if (v) {
        setVariant(v.node);
      }
    }
  }, [product, variantSku])

  useEffect(() => {
    if (!variant) {
      return;
    }

    setImageShown(variant.image!);

    // send to ga
    viewItem({
      items: [{
        ...transformToGoogleItem(product, variant),
        list_position: 1,
      }]
    });
  }, [product, variant]);

  const selectVariant = useCallback(
    (variant) => {
      router.push(`/shop/${product.handle}?variant=${variant.sku}`, undefined, { shallow: true });
      setVariant(variant);
    },
    [router, product]
  )

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

  if (!variant) {
    return (
      <>Loading...</>
    )
  }

  const description = product.seo.description || defaultDescription;

  return (
    <>
      <Head>
        <title>{product.seo.title || product.title} | Marcless</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={product.seo.title || `${product.title} | Marcless`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={variant.image?.transformedSrc} />
        <meta property="og:image:secure_url" content={variant.image?.transformedSrc} />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.seo.title || `${product.title} | Marcless`} />
        <meta name="twitter:description" content={description} />

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
        <div className="w-full md:w-1/2 flex-shrink-0 self-start md:sticky md:top-0 md:pr-16">
          <figure className="aspect-w-4 aspect-h-4 rounded-lg overflow-hidden">
            {!media ? (
              <img
                className="w-full h-full object-center object-cover transition duration-150 hover:scale-110"
                src={imageShown.transformedSrc}
                alt={imageShown.altText || 'product image'} />
            ) : (
              <video controls autoPlay muted>
                <source type={`video/${media.format}`} src={media.url} />
              </video>
            )}
          </figure>

          <div className="relative">
            <div className="flex space-x-2 mt-4 overflow-auto scrollbar-hide mr-12">
              {product.images.edges.map(({ node }, index: number) => {
                return (
                  <figure
                    key={`thumbnail-${index}`}
                    className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => {
                      setMedia(undefined);
                      setImageShown(node)
                    }}
                  >
                    <img
                      className="w-full h-full object-top object-cover"
                      src={node.transformedSrc}
                      alt={node.altText || `product-thumbail-${product.title}`} />
                  </figure>
                );
              })}

              {product.media.edges.map(({ node }) => {
                if (node.__typename !== 'Video') {
                  return null;
                }

                return (
                  <figure
                    key={node.id}
                    className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer relative"
                    onClick={() => setMedia(node.sources.find(s => s.format === 'mp4'))}
                  >
                    <img
                      className="w-full h-full object-top object-cover"
                      src={node.previewImage?.transformedSrc}
                      alt={node.previewImage?.altText || `product-thumbail-${product.title}`} />

                    <PlayIcon className="text-gray-800 h-12 w-12 absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2" />
                  </figure>
                )
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

          <div className="flex relative mb-2">
            <label className="invisible absolute">price</label>
            {variant.compareAtPriceV2 && (
              <span className="text-red-600 text-xl line-through mr-4">
                {formatPrice(variant.compareAtPriceV2.amount)}
              </span>
            )}
            <p className="text-xl">{formatPrice(variant.priceV2.amount)}</p>
          </div>

          <div className="mb-8">
            <YoptoStarRating product={product} />
          </div>

          <VariantSelect
            variant={variant}
            options={product.options}
            onVariantChange={(selections) => {
              const v = product.variants.edges.find(({ node }) => {
                return node.selectedOptions.every(o => Object.values(selections).includes(o.value));
              })
              if (v) {
                selectVariant(v.node);
              }
            }}
          />

          <div className="flex justify-between w-full mt-4">
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
            We sell directly to customers, cutting unnecessary costs and crazy markups that make products overly expensive. We pass on the savings to you, so you get the same quality at a fraction of the cost.
          </LargeLead>
        }
        items={brandFeatures}
      />

      {relatedProductsQuery && relatedProductsQuery.products.edges.length > 0 && (
        <section className="container mx-auto px-4 xl:px-0 pt-16 md:pt-32">
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-12 text-center">Related Products</h2>
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProductsQuery.products.edges.filter(({ node }) => node.id !== product.id).map(({ node }) => {
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
                </div>
              );
            })}
          </div>
        </section>
      )}

      <YoptoReviews product={product} variant={variant} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params!;

  const { data } = await client.query<GetSingleProduct, GetSingleProductVariables>({
    query: SINGLE_PRODUCT_QUERY,
    variables: {
      handle: handle as string
    }
  });
  const product = data.product;
  const variant = product?.variants.edges[0].node;

  return {
    revalidate: 10,
    props: {
      product,
      defaultVariant: variant
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
    paths.push({
      params: { handle: product.handle },
    });
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export default ProductDetail;

function VariantSelect({
  options,
  variant,
  onVariantChange,
}: {
    options: GetSingleProduct_product_options[],
    variant: GetSingleProduct_product_variants_edges_node,
    onVariantChange: (selections: { [key: string]: null | string }) => void
}) {
  const [selected, setSelected] = useState<{ [key: string]: null | string }>(() => {
    return options.reduce((acc, o) => {
      const s = variant.selectedOptions.find(s => s.name === o.name);
      return {
        ...acc,
        [o.name.toLowerCase()]: s ? s.value : o.values[0]
      };
    }, {})
  });

  const updateSelection = (name: string, value: string) => {
    onVariantChange({
      ...selected,
      [name]: value
    })
  }

  useEffect(() => {
    setSelected((prev) => {
      return variant.selectedOptions.reduce((acc, o) => {
        return {
          ...acc,
          [o.name.toLowerCase()]: o.value
        }
      }, prev)
    })
  }, [variant])

  return (
    <>
      {options.map(({ name, values }) => (
        <div className="" key={name}>
          <label className="font-sans block mb-2 font-bold uppercase">{name}</label>
          <div className="flex flex-wrap space-x-4 mb-6">
            {name === 'Color' ? (
              <>
                {values.map((value) => {
                  const background = colorMap[value.toLowerCase()];
                  return (
                    <button
                      key={`${name}-${value}`}
                      className={classNames(
                        'cursor-pointer border-2 rounded-full p-1',
                        selected[name.toLowerCase()] === value ? 'border-gray-900' : 'border-gray-300'
                      )}
                      onClick={() => updateSelection(name.toLowerCase(), value)}
                    >
                      <div className="h-8 w-8 rounded-full" style={{ background }}></div>
                      <span className="sr-only">{value}</span>
                    </button>
                  )
                })}
              </>
            ) : (
              <select
                value={selected[name.toLowerCase()] ?? ''}
                onChange={(e) => updateSelection(name.toLowerCase(), e.target.value)}
              >
                {values.map((value) => {
                  return (
                    <option key={`${name}-${value}`} value={value}>{value}</option>
                  )
                })}
              </select>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
