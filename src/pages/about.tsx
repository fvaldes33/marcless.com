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
import bodyDadShaving from '@/src/assets/dad-boy-shaving@1x.jpg';
import { Eyebrow, H1, LargeLead, Paragraph } from '../components/Typography';
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

      <div className="mt-4 py-24 px-4 [ md:py-48 ] [ lg:px-0 ] relative text-gray-800 overflow-hidden">
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
            {/* <Button href="/shop" variant="light">
              Learn More
            </Button> */}
          </div>
        </div>
      </div>

      <section className="pt-12 [ md:pt-24 ]">
        <div className="container max-w-screen-md mx-auto flex flex-col items-start px-4 [ lg:px-0 ]">
          <Eyebrow>About</Eyebrow>
          <H1 className="mb-4">Better shave, fewer dollars. It’s that simple.</H1>
          <Paragraph>
            Our selection of meticulously crafted single blade razors are a product of our dissatisfaction with Big Razor companies. Against popular belief, multiple blades cause bumps, redness and irritation. They also come at a high and recurring cost. We wanted a clean, simple shave without the added hassle and that is what we’ve curated. It is important to us to offer only high quality products at an affordable price.
          </Paragraph>
          <Button href="/shop" variant="primary">
            shop razors
          </Button>
        </div>
      </section>

      <Gallery images={productDetails.gallery} />

      <FeatureList
        eyebrow={<Eyebrow>why marc<i>less</i></Eyebrow>}
        heading={<H1 className="mb-4">Say good bye to the <b>BrandTax</b>.</H1>}
        body={
          <LargeLead className="mb-12 max-w-screen-md mx-auto">
            We’ve curated a thoughtful selection of quality razors and shaving accessories you reach for every day.
          </LargeLead>
        }
        items={brandFeatures}
      />

    </>
  )
}

export default AboutPage
