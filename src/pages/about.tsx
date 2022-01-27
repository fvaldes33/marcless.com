/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext } from 'react';
import { CashIcon, CheckIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import { Context } from '@/src/state';
import { brandFeatures, defaultDescription } from '@/src/utils/constants';
import ContentMedia from '../components/ContentMedia';
import FeatureList from '../components/FeatureList';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import { getStaticProductDetails } from '@/src/static';
import roseGoldBathroom from '@/src/assets/rose-gold-bathroom.jpg';
import blackWhiteMarble from '@/src/assets/marble-black-white.jpg';
import heroImage from '@/src/assets/tech/onur-binay-mVcTLcRAknM-unsplash.jpg';
import { Display, Eyebrow, H1, LargeLead, Paragraph } from '../components/Typography';
import ContentMediaLayout from '../components/ContentMediaLayout';

const AboutPage: NextPage = () => {
  const { state: { store } } = useContext(Context);
  const productDetails = getStaticProductDetails('the-marc-razor');

  return (
    <>
      <Head>
        <title>About | marcless.com</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      {/* <div className="mt-4 py-24 px-4 [ md:py-48 ] [ lg:px-0 ] relative text-gray-800 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-4/5 [ md:w-2/3 ]">
          <div className="relative h-full w-full">
            <Image src={roseGoldBathroom} alt="razor on black and white marble countertop" layout="fill" objectFit="cover" />
          </div>
        </div>

        <div className="container mx-auto relative z-10 flex items-center justify-start h-full">
          <div className="max-w-screen-md flex flex-col items-start justify-start">
            <h1 className="text-4xl font-serif mb-12 [ md:text-6xl md:leading-tight ]">
              It&apos;s a better shave,<br />for fewer dollars.
            </h1>
          </div>
        </div>
      </div> */}

      <section className="py-12 [ md:py-24 ] relative">
        <img
          className="absolute inset-0 z-0 w-full h-full object-cover"
          alt="hero image of iphone"
          src={heroImage.src} />
        <div className="relative container max-w-screen-md mx-auto flex flex-col items-start px-4 [ lg:px-0 ] z-10">
          <Eyebrow>About Marcless</Eyebrow>
          <H1 className="mb-4 text-white">We are a group of tech enthusiasts who have a passion for developing the products of tomorrow.</H1>
          <Paragraph className="text-gray-200 mb-8">
            {`We know how time-consuming and expensive it is to find and buy new cables or chargers that don't even last that long until you need a new one. That's another reason we decided to launch Evolved Chargers and focus mainly on product quality and sustainability. We're glad that you found us, and hope you'll enjoy our products as we do!`}
          </Paragraph>
          <Button href="/shop" variant="primary">
            Browse Products
          </Button>
        </div>
      </section>

      {/* <Gallery images={productDetails.gallery} /> */}

      <FeatureList
        eyebrow={<Eyebrow className="mb-2">why marc<i>less</i></Eyebrow>}
        heading={
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6 md:mb-12">
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

    </>
  )
}

export default AboutPage
