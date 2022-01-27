/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';

import { Context } from '@/src/state';
import { brandFeatures, defaultDescription } from '@/src/utils/constants';
import FeatureList from '../components/FeatureList';
import Button from '../components/Button';
import { Eyebrow, LargeLead } from '../components/Typography';

import heroImage from '@/src/assets/tech/onur-binay-mVcTLcRAknM-unsplash.jpg';

const AboutPage: NextPage = () => {
  const { state: { store } } = useContext(Context);
  const controls = useAnimation();

  return (
    <>
      <Head>
        <title>About | marcless.com</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <section className="py-12 [ md:py-24 ] relative">
        <img
          className="absolute inset-0 z-0 w-full h-full object-cover"
          alt="hero image of iphone"
          src={heroImage.src} />

        <motion.div
          className="relative container max-w-screen-md mx-auto flex flex-col items-start px-4 [ lg:px-0 ] z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
        >
          <Eyebrow>About Marcless</Eyebrow>
          <h1 className="mb-8 text-white font-sans font-bold text-3xl md:text-4xl">We are a group of tech enthusiasts who have a passion for developing the products of tomorrow.</h1>
          <p className="text-gray-200 mb-8 leading-loose">
            {`We know how time-consuming and expensive it is to find and buy new cables or chargers that don't even last that long until you need a new one. That's another reason we decided to launch Evolved Chargers and focus mainly on product quality and sustainability. We're glad that you found us, and hope you'll enjoy our products as we do!`}
          </p>
          <Button href="/shop" variant="primary">
            Browse Products
          </Button>
        </motion.div>
      </section>

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
