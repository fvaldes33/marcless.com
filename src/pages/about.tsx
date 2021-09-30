import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import { Context } from '@/src/state';
import { defaultDescription } from '@/src/utils/constants';
import ContentMedia from '../components/ContentMedia';
import FeatureList from '../components/FeatureList';
import Button from '../components/Button';
import roseGoldBathroom from '@/src/assets/rose-gold-bathroom.jpg';
import { CashIcon, CheckIcon, ShieldCheckIcon } from '@heroicons/react/outline';

const AboutPage: NextPage = () => {
  const { state: { store } } = useContext(Context);

  return (
    <>
      <Head>
        <title>About | marcless.com</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <ContentMedia
        eyebrow="About"
        heading="Better stuff, fewer dollars. It’s that simple."
        body="<p><b>BrandTax™</b> is the hidden costs you pay for a national brand. We’ve been trained to believe these costs increase quality, but they rarely do. We estimate the average person pays at least 40% more for products of comparable quality as ours. And sometimes up to 370% more for beauty products like face cream. We’re here to eliminate BrandTax™ once and for all."
        image={roseGoldBathroom}
        cta={
          <Button href="/shop" variant="primary">
            explore products
          </Button>
        }
      />

      <FeatureList
        eyebrow="why marc<i>less</i>"
        heading="Say good bye to the <b>BrandTax™</b>."
        body="We’ve created a thoughtful selection of quality razors and shaving accessories you reach for every day."
        items={[
          {
            name: 'Affordability',
            description:
              'Better stuff, fewer dollars. It’s that simple.',
            icon: CashIcon,
          },
          {
            name: 'Quality',
            description:
              'Built from the highest quality materials in the industry.',
            icon: CheckIcon,
          },
          {
            name: 'Clean and sustainable',
            description:
              'Durable and recyclable, while free of nasty chemicals.',
            icon: ShieldCheckIcon,
          },
        ]}
      />

      {/* <ContentMedia
        imagePosition="left"
        eyebrow="About"
        heading="Better stuff, fewer dollars. It’s that simple."
        body="<p><b>BrandTax™</b> is the hidden costs you pay for a national brand. We’ve been trained to believe these costs increase quality, but they rarely do. We estimate the average person pays at least 40% more for products of comparable quality as ours. And sometimes up to 370% more for beauty products like face cream. We’re here to eliminate BrandTax™ once and for all."
        image={brightSilverInStand}
        cta={
          <Button href="/shop" variant="primary">
            explore products
          </Button>
        }
      /> */}
    </>
  )
}

export default AboutPage
