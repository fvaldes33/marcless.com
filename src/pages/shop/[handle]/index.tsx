/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import client from '@/src/utils/apollo';
import { useQuery } from '@apollo/client';
import { PlusIcon, RefreshIcon } from '@heroicons/react/outline';
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
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductHero from '@/src/components/ProductHero';
import { getStaticProductDetails } from '@/src/static';
import { Pagination } from 'swiper';

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
  const [loading2, setLoading2] = useState(false);
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
  const productDetails = getStaticProductDetails(product.id);

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

  const addAndContinueShopping = async () => {
    setLoading2(true);

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
      openCartDrawer();
    } catch (error) {

    } finally {
      setTimeout(() => {
        setLoading2(false);
      }, 500);
    }
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
          <ProductHero product={product} />
        </div>

        {/* title & description */}
        <div className="text-gray-800 mt-8 flex flex-col items-start">
          <span className="block text-primary text-base mb-1">On Sale</span>

          <h1 className="relative font-sans font-bold text-4xl lg:text-6xl mb-4">
            <span className="relative z-10">{product.title}</span>
            {/* <span className="bg-primary bg-opacity-50 absolute h-6 w-full bottom-0 left-0"></span> */}
          </h1>

          <div className="flex items-center w-full mb-8">
            <div className="flex relative">
              <label className="sr-only">price</label>
              <p className="text-xl font-bold">{formatPrice(variant.priceV2.amount)}</p>
              {variant.compareAtPriceV2 && (
                <span className="text-red-600 text-xl line-through ml-4">
                  {formatPrice(variant.compareAtPriceV2.amount)}
                </span>
              )}
            </div>

            <div className="ml-auto">
              <YoptoStarRating product={product} />
            </div>
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

          <div className="flex flex-col items-start md:flex-row md:items-center w-full mt-4">
            <div className="">
              <QtySelector defaultValue={qty} onChange={(num: number) => setQty(num)} />
            </div>

            <div className="flex items-center mt-4 md:mt-0 md:ml-8">
              <span className="text-xs uppercase mr-4">Pay With:</span>
              <ul className="flex items-center space-x-4">
                <li>
                  <svg className="icon icon--full-color" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" x="0" y="0" width="38" height="24" viewBox="0 0 165.521 105.965" xmlSpace="preserve" aria-labelledby="pi-apple_pay"><title id="pi-apple_pay">Apple Pay</title><path fill="#000" d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"></path><path fill="#FFF" d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"></path><g><g><path fill="#000" d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"></path><path fill="#000" d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"></path></g><g><path fill="#000" d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"></path><path fill="#000" d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"></path><path fill="#000" d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"></path></g></g></svg>
                </li>
                <li>
                  <svg className="icon icon--full-color" width="38" height="24" role="img" aria-labelledby="pi-facebook_pay" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><title id="pi-facebook_pay">Facebook Pay</title><path xmlns="http://www.w3.org/2000/svg" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path xmlns="http://www.w3.org/2000/svg" fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.29 5.672h.035v.874H8.29c-2.256 0-4.165 1.46-4.8 3.472l-.849-.265c.75-2.365 2.995-4.081 5.649-4.081z" fill="url(#pi-paint0_linear)"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.325 6.546v-.874H8.29c2.662 0 4.914 1.728 5.656 4.105l-.848.266c-.624-2.014-2.523-3.482-4.773-3.497z" fill="url(#pi-paint1_linear)"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.243 15.478l.523.708a5.96 5.96 0 01-3.476 1.108 5.96 5.96 0 01-3.43-1.075l.524-.708c.82.573 1.823.91 2.906.91 1.104 0 2.124-.35 2.953-.943z" fill="url(#pi-paint2_linear)"></path><path fillRule="evenodd" clipRule="evenodd" d="M2.642 9.753l.848.265a4.856 4.856 0 00-.225 1.465c0 1.663.836 3.134 2.119 4.028l-.523.708c-1.453-1.017-2.417-2.663-2.483-4.532v-.407c.019-.53.11-1.042.264-1.527z" fill="url(#pi-paint3_linear)"></path><path fillRule="evenodd" clipRule="evenodd" d="M14.205 11.483c0 1.934-.96 3.646-2.44 4.703l-.523-.707a4.904 4.904 0 002.073-3.996c0-.502-.076-.987-.218-1.443l.848-.266c.17.54.26 1.114.26 1.71z" fill="url(#pi-paint4_linear)"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.06 12.218c0-.308-.215-.446-.692-.446H9.193v.89h1.175c.485 0 .692-.133.692-.444zm-.857-1.866h-1.01v.89h1.01c.457 0 .664-.138.664-.443 0-.306-.21-.447-.664-.447zm1.474 1.922c0 .594-.474.932-1.31.932H8.64c-.03 0-.05-.02-.05-.049v-3.3c0-.029.02-.048.05-.048h1.575c.813 0 1.26.313 1.26.878 0 .335-.15.604-.583.733.548.114.77.437.785.854zM7.872 9.857v.461c0 .03-.02.049-.05.049h-2v.861h1.66c.03 0 .049.02.049.049v.46c0 .03-.02.05-.05.05H5.823v1.37c0 .03-.02.049-.05.049H5.27c-.03 0-.05-.02-.05-.049v-3.3c0-.029.02-.048.05-.048h2.553c.03 0 .05.02.05.048z" fill="#64717D"></path><path fillRule="evenodd" clipRule="evenodd" d="M31.214 9.82a49.278 49.278 0 001.688 4.454l1.55-4.454h1.239l-2.221 5.754c-.284.737-.621 1.305-1.011 1.705-.39.4-.913.6-1.568.6-.163 0-.317-.013-.46-.039v-1.005c.12.019.227.028.317.028.398 0 .722-.11.972-.332.25-.221.47-.546.659-.974a45.905 45.905 0 01-1.312-2.824 80.59 80.59 0 01-1.17-2.913h1.317zm-4.6-.134c.696 0 1.256.197 1.68.591.425.395.637.985.637 1.77V15.4h-1.09v-.91c-.22.328-.503.58-.847.757a2.542 2.542 0 01-1.176.265c-.599 0-1.064-.152-1.395-.455-.331-.303-.497-.703-.497-1.197 0-.491.187-.903.56-1.234.373-.33.968-.497 1.786-.497h1.545v-.016c0-.938-.439-1.407-1.317-1.407-.368 0-.677.065-.93.196-.251.13-.455.312-.61.547l-.778-.62c.242-.368.561-.651.957-.848a2.985 2.985 0 011.35-.296h.124zM20.16 7.588c.996 0 1.74.233 2.232.7.492.467.739 1.1.739 1.9 0 .797-.247 1.43-.739 1.898-.492.469-1.236.703-2.232.703h-2.136v2.612H16.83V7.588h3.329zm7.657 5.419h-1.5c-.446 0-.765.07-.957.21a.665.665 0 00-.286.566c0 .49.33.736.994.736.439 0 .804-.097 1.096-.293.292-.195.51-.46.653-.795v-.424zm-7.77-4.326h-2.023v3.014h2.022c.648 0 1.12-.125 1.418-.377.297-.25.445-.627.445-1.13 0-.502-.148-.879-.445-1.13-.298-.251-.77-.377-1.418-.377z" fill="#1B2529"></path><defs><linearGradient id="pi-paint0_linear" x1="8.325" y1="6.803" x2="3.828" y2="10.121" gradientUnits="userSpaceOnUse"><stop stopColor="#24D365"></stop><stop offset="1" stopColor="#139DBD"></stop></linearGradient><linearGradient id="pi-paint1_linear" x1="8.29" y1="6.774" x2="12.8" y2="10.111" gradientUnits="userSpaceOnUse"><stop stopColor="#23D068"></stop><stop offset=".52" stopColor="#EACD36"></stop><stop offset="1" stopColor="#FF6C5C"></stop></linearGradient><linearGradient id="pi-paint2_linear" x1="5.121" y1="15.876" x2="11.496" y2="15.876" gradientUnits="userSpaceOnUse"><stop stopColor="#266FF3"></stop><stop offset="1" stopColor="#C439D6"></stop></linearGradient><linearGradient id="pi-paint3_linear" x1="4.135" y1="15.894" x2="2.281" y2="10.39" gradientUnits="userSpaceOnUse"><stop stopColor="#266FF3"></stop><stop offset="1" stopColor="#149FBA"></stop></linearGradient><linearGradient id="pi-paint4_linear" x1="12.899" y1="9.913" x2="11.041" y2="15.394" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6C5C"></stop><stop offset="1" stopColor="#C439D6"></stop></linearGradient></defs></svg>
                </li>
                <li>
                  <svg className="icon icon--full-color" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-google_pay"><title id="pi-google_pay">Google Pay</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><path d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368"></path><path d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4"></path><path d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853"></path><path d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04"></path><path d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335"></path></svg>
                </li>
                <li>
                  <svg className="icon icon--full-color" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-shopify_pay"><title id="pi-shopify_pay">Shop Pay</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#5A31F4"></path><path d="M21.382 9.713c0 1.668-1.177 2.858-2.821 2.858h-1.549a.133.133 0 00-.12.08.127.127 0 00-.01.049v2.192a.129.129 0 01-.13.129h-1.084a.13.13 0 01-.13-.13V6.986a.127.127 0 01.08-.12.129.129 0 01.05-.01h2.9c1.637 0 2.814 1.19 2.814 2.858v-.001zm-1.352 0c0-.958-.658-1.658-1.55-1.658h-1.468a.13.13 0 00-.13.13v3.05a.127.127 0 00.038.092.129.129 0 00.092.038h1.468c.892.005 1.55-.695 1.55-1.652zm1.674 3.791a1.527 1.527 0 01.647-1.317c.423-.316 1.084-.48 2.055-.514l1.033-.036v-.303c0-.607-.41-.863-1.068-.863-.658 0-1.075.231-1.17.61a.127.127 0 01-.125.09h-1.022a.13.13 0 01-.126-.092.125.125 0 01-.004-.055c.152-.898.904-1.58 2.494-1.58 1.692 0 2.303.783 2.303 2.276v3.172a.13.13 0 01-.132.129h-1.03a.13.13 0 01-.13-.13v-.236a.096.096 0 00-.061-.091.1.1 0 00-.107.022c-.31.334-.808.575-1.607.575-1.175 0-1.95-.607-1.95-1.657zm3.735-.687v-.246l-1.339.07c-.705.036-1.115.326-1.115.816 0 .444.376.69 1.034.69.893 0 1.42-.48 1.42-1.33zm2.316 4.6v-.919a.13.13 0 01.049-.1.132.132 0 01.108-.027c.158.029.318.044.479.044a1.229 1.229 0 001.245-.876l.067-.211a.133.133 0 000-.088l-2.145-5.471a.13.13 0 01.06-.165.13.13 0 01.062-.015h1.04a.132.132 0 01.123.085l1.456 3.859a.131.131 0 00.125.088.133.133 0 00.125-.088l1.265-3.848a.13.13 0 01.126-.09h1.076a.134.134 0 01.132.116.134.134 0 01-.008.063l-2.295 6.076c-.528 1.413-1.433 1.773-2.43 1.773a1.959 1.959 0 01-.561-.066.132.132 0 01-.1-.14h.001zM8.57 6.4a5.363 5.363 0 00-3.683 1.427.231.231 0 00-.029.31l.618.839a.236.236 0 00.362.028 3.823 3.823 0 012.738-1.11c2.12 0 3.227 1.584 3.227 3.15 0 1.7-1.163 2.898-2.835 2.921-1.292 0-2.266-.85-2.266-1.974a1.908 1.908 0 01.713-1.48.231.231 0 00.033-.324l-.65-.815a.236.236 0 00-.339-.034 3.43 3.43 0 00-.942 1.183 3.39 3.39 0 00-.337 1.47c0 1.935 1.655 3.452 3.775 3.464h.03c2.517-.032 4.337-1.884 4.337-4.415 0-2.247-1.667-4.64-4.752-4.64z" fill="#fff"></path></svg>
                </li>
                <li className="border border-black rounded-sm h-6 flex items-center justify-center w-9">
                  <PlusIcon className="text-black w-3 h-3" />
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full mt-8">
            {/* <Button disabled={loading2} onClick={() => addAndContinueShopping()}>
              {loading2 ? (
                <RefreshIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
              ) : (
                <>Add to Cart</>
              )}
            </Button> */}
            <Button variant="dark" block disabled={loading} onClick={() => createCheckout()}>
              {loading ? (
                <RefreshIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
              ) : (
                <>Buy Now</>
              )}
            </Button>
          </div>
          <div className="prose py-8" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>
      </section>

      {productDetails && productDetails.box && (
        <section className="container max-w-screen-xl mx-auto pt-24">
          <h1 className="text-4xl text-center mb-8">{`What's in the Box`}</h1>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              768: {
                slidesPerView: productDetails.box.length
              }
            }}
          >
            {productDetails.box.map((boxItem: any) => (
              <SwiperSlide key={boxItem.image}>
                <div className="text-center w-full mb-8">
                  <figure className="bg-gray-100 h-96">
                    <img src={boxItem.image} alt="" className="h-full mx-auto" />
                  </figure>
                  <p className="mt-4">{boxItem.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <FeatureList
        eyebrow={<Eyebrow className="mb-2">why marc<i>less</i></Eyebrow>}
        heading={
          <h2 className="font-sans text-3xl md:text-5xl font-bold mb-6 md:mb-12">
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
        <section className="container max-w-screen-xl mx-auto px-4 xl:px-0 pt-16 md:pt-32">
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-12 text-center">Related Products</h2>
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
