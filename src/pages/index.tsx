/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import HeroFullWidth from '@/src/components/HeroFullWidth';
import FeatureList from '@/src/components/FeatureList';
import Banner from '@/src/components/Banner';
import { Eyebrow, Display, H1, H2, LargeLead, Paragraph } from '@/src/components/Typography';
import TestimonialGrid from '@/src/components/TestimonialGrid';
import Button from '@/src/components/Button';
import NewsletterForm from '@/src/components/NewsletterForm';
import ContentMediaLayout from '@/src/components/ContentMediaLayout';
import { GetProducts, GetProductsVariables, PRODUCTS_QUERY } from '@/src/queries';
import client from '@/src/utils/apollo';
import { Context } from '@/src/state';
import { brandFeatures, defaultTitle, defaultDescription, testimonials } from '@/src/utils/constants';
import womanShaving from '@/src/assets/woman-shaving-armpit.jpg';
import goldWhiteOnDish from '@/src/assets/gold-white-on-dish.jpg';
import bodyDadShaving from '@/src/assets/dad-boy-shaving@1x.jpg';
import allRazors from '@/src/assets/all-razor-colors@1.jpg';
import marcOneRoseGold from '@/src/assets/marcone-rosegold-exloded.png';
import whiteDeviceGroup from '@/src/assets/tech/white-grouped.png';
import devicesUnsplash from '@/src/assets/tech/devices-light-2-unsplash.jpg';
import heroChargerModern from '@/src/assets/tech/hero-charger-modern.png';
import travelerBlack from '@/src/assets/tech/traveler-black.png';
import standardBlack from '@/src/assets/tech/standard-black.png';
import architectBlack from '@/src/assets/tech/architect-black.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { classNames, formatPrice } from '../utils/helpers';

const images = [
  { src: '/images/chargers/with-devices-transparent.png', alt: 'standard wireless charger' },
  { src: '/images/chargers/with-devices-transparent.png', alt: 'standard wireless charger' },
  { src: '/images/chargers/with-devices-transparent.png', alt: 'standard wireless charger' }
];

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

const Home: NextPage<GetProducts> = ({ products }) => {
  const { state: { active } } = useContext(Context);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!active) {
    return (
      <>
        <Head>
          <title>{defaultTitle}</title>
          <meta name="description" content={defaultDescription} />

          <script type="application/json+ld" dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "name": "Marcless",
                "alternateName": "Marlcess - Homepage",
                "url": "https://www.marcless.com/"
              }
            )
          }} />
          <script type="application/json+ld" dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "Marcless",
                "url": "https://www.marcless.com/",
                "logo": "https://cdn.shopify.com/s/files/1/0598/5393/0649/files/logo.png?v=1632937802",
                "image": "https://cdn.shopify.com/s/files/1/0598/5393/0649/files/open-graph-logo_256x256_crop_center.jpg?v=1633378498",
                "sameAs": [
                  "https://www.facebook.com/shopmarcless",
                  "https://www.instagram.com/shopmarcless"
                ]
              }
            )
          }} />
        </Head>

        <section className="h-screen w-screen flex items-center">
          <div className="container mx-auto px-4 flex flex-col items-center [ lg:px-0 ]">
            <div>
              <h1 className="font-serif block text-7xl tracking-wide mb-1 [ md:text-8xl ]">
                marc<span className="bg-primary text-white">less</span>
              </h1>
              <h2 className="text-base">Better shave, fewer dollars.</h2>
            </div>
            <div className="mt-12 flex flex-col justify-center items-center">
              {signupSuccess ? (
                <p>Thank you for signing up!</p>
              ) : (
                <>
                  <p className="mb-4 text-center">Enter your email below to get notified when we go live.</p>
                  <NewsletterForm
                    centered
                    onSubmitForm={() => setSignupSuccess(true)}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <>
        {/* New Huge Hero */}
        <div className="h-screen w-screen bg-white -mt-20 md:mt-0 lg:-mt-20">
          <div className="container mx-auto text-gray-800 flex flex-col h-full w-full justify-center lg:items-center lg:flex-row px-6 xl:px-0">
            <div className="flex flex-col items-start flex-shrink-0 w-full lg:w-1/2 xl:w-auto">
              <h1 className="text-5xl md:text-8xl font-sans font-bold mb-8">
                The New<br />Standard
                <span className="mt-4 block text-xl md:text-4xl">In Wireless Charging</span>
              </h1>
              <Button href="/shop" variant="primary">
                Buy Now
              </Button>
            </div>

            <img
              className="w-full md:w-2/3 md:ml-auto xl:ml-[initial] lg:w-1/2 xl:w-[600px] max-w-full mt-8 md:mt-0"
              // src="/images/chargers/with-devices-transparent.png"
              src={heroChargerModern.src}
              alt="Standard Wireless Charger with three devices" />
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
                className="w-full"
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, distinctio modi. Maiores nostrum adipisci quibusdam tenetur asperiores sed cumque odit doloribus, provident dignissimos dicta? Tempore, quo. Accusamus, necessitatibus similique! Labore!
            </LargeLead>
          }
          items={brandFeatures}
        />

        <section className="container mx-auto px-4 xl:px-0 pt-16 md:pt-32">
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-12 text-center">Featured Products</h2>
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.edges.map(({ node }) => {
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
      </>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query<GetProducts, GetProductsVariables>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 4,
      query: 'tag:wireless AND featured'
    }
  });

  return {
    props: {
      ...data
    },
  }
}

export default Home
