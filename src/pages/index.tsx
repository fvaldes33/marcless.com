import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { ShieldCheckIcon, CashIcon, CheckIcon } from '@heroicons/react/outline';
import HeroWithProduct from '@/src/components/HeroProduct';
import HeroFullWidth from '@/src/components/HeroFullWidth';
import FeatureList from '@/src/components/FeatureList';
import Banner from '@/src/components/Banner';
import { Eyebrow, Display, H1, H2, LargeLead, Paragraph } from '@/src/components/Typography';
import ContentMedia from '@/src/components/ContentMedia';
import TestimonialGrid from '@/src/components/TestimonialGrid';
import Button from '@/src/components/Button';
import NewsletterForm from '@/src/components/NewsletterForm';
import ContentMediaLayout from '@/src/components/ContentMediaLayout';
import { GetProducts, GetProductsVariables, PRODUCTS_QUERY } from '@/src/queries';
import client from '@/src/utils/apollo';
import { Context } from '@/src/state';
import womanShaving from '@/src/assets/woman-shaving-armpit.jpg';
import brightSilverInStand from '@/src/assets/bright-silver-in-stand.jpg';
import goldWhiteOnDish from '@/src/assets/gold-white-on-dish.jpg';
import bodyDadShaving from '@/src/assets/dad-boy-shaving@1x.jpg';
import allRazors from '@/src/assets/all-razor-colors@1.jpg';
import marcOneRoseGold from '@/src/assets/marcone-rosegold-exloded.png';
import { brandFeatures, defaultTitle, defaultDescription, testimonials } from '@/src/utils/constants';

const Home: NextPage<GetProducts> = ({ products }) => {
  const { state: { store, active }, dispatch } = useContext(Context);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!active) {
    return (
      <>
        <Head>
          <title>{defaultTitle}</title>
          <meta name="description" content={defaultDescription} />
        </Head>

        <section className="h-screen w-screen flex items-center">
          <div className="container mx-auto flex flex-col items-center">
            <div>
              <h1 className="font-serif block text-8xl tracking-wide mb-1">
                marc<span className="bg-primary text-white">less</span>
              </h1>
              <h2 className="text-base">Better stuff, fewer dollars.</h2>
            </div>
            <div className="mt-12 flex flex-col justify-center items-center">
              {signupSuccess ? (
                <p>Thank you for signing up!</p>
              ) : (
                <>
                  <p className="mb-4">Enter your email below to get notified when we go live.</p>
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
        <HeroFullWidth
          content={
            <>
              <Display className="text-white mb-12 drop-shadow-xl">
                Meticulously Crafted Shaving Products
              </Display>
              <Button href="/shop" variant="light">
                shop razors
              </Button>
            </>
          }
          media={
            <Image src={bodyDadShaving} alt="razor on black and white marble countertop" layout="fill" objectFit="cover" objectPosition="30% 35%" />
          }
        />

        <ContentMediaLayout
          spacing={'pt-16 [ md:pt-32 ]'}
          layout={'reverse'}
          content={
            <>
              <Eyebrow>Built to last</Eyebrow>
              <H1 className="mb-4">Personal care for all.</H1>
              <Paragraph>
                We believe that you shouldn’t have to over pay for everyday personal care. Our product are meticulously made with integrity and from clean materials. Our promise is simple, affordable products without compromise.
              </Paragraph>
              <Button href="/about" variant="primary">
                learn more
              </Button>
            </>
          }
          media={
            <Image src={allRazors} layout="fill" objectFit="cover" objectPosition="center" alt="Marc One" />
          }
        />

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

        <ContentMediaLayout
          spacing={'py-16 [ md:py-32 ]'}
          content={
            <>
              <Eyebrow>Just a better shave</Eyebrow>
              <H1 className="mb-4">Say goodbye to irritation, nicks, and bumps.</H1>
              <Paragraph>
                More is not always good. Say goodbye to the 3+ blades Big Razor companies are telling you to buy. One blade is truly all you need. No more irritation, nicks, or red bumps.
              </Paragraph>
              <Button href="/shop" variant="primary">
                shop razors
              </Button>
            </>
          }
          media={
            <Image src={womanShaving} layout="fill" objectFit="cover" objectPosition="center" alt="Marc One" />
          }
        />

        <section className="bg-primary px-4 relative text-gray-800 overflow-hidden [ md:bg-opacity-0 ] [ xl:px-0 ]">
          <div className="container mx-auto flex flex-col items-center [ md:flex-row md:justify-end ] z-10">
            <div className=" w-full flex flex-col items-start justify-end z-10 [ md:bg-white md:border-2 md:border-primary md:px-8 md:py-8 md:my-8 md:w-3/5 md:transform md:-translate-x-4 ] [ lg:px-12 lg:my-12 lg:w-1/3 lg:transform lg:-translate-x-12 ]">
              <Eyebrow>New release</Eyebrow>
              <Display className="mb-4">
                the marc <span className="underline">razor</span>
              </Display>
              <LargeLead className="mb-12">
                Try the world&apos;s safest single blade razor.
              </LargeLead>
              <Button href="/shop" variant="secondary">
                shop now
              </Button>
            </div>
            <div className="block mt-4 transform translate-y-12 md:hidden">
              <Image src={marcOneRoseGold} className="transform rotate-12" alt="razor on black and white marble countertop" objectFit="contain" objectPosition="bottom" />
            </div>
          </div>
          <div className="hidden bg-primary w-4/5 [ md:block md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0 md:z-0 ] [ lg:w-2/3 ]">
            <Image src={marcOneRoseGold} className="transform rotate-12 translate-y-6" alt="razor on black and white marble countertop" layout="fill" objectFit="contain" objectPosition="bottom" />
          </div>
        </section>

        <TestimonialGrid
          eyebrow={<Eyebrow>Testimonials</Eyebrow>}
          heading={<H1 className="mb-4">Don&apos;t take our word for it.</H1>}
          items={testimonials}
        />

        <Banner
          content={
            <>
              <H1 className="text-white mb-8 drop-shadow-xl">
                Guaranteed to eliminate cuts, nicks, and irritation.
              </H1>
              <Button href="/shop" variant="primary">
                shop razors
              </Button>
            </>
          }
          media={
            <>
              <Image className="object-cover object-right" layout="fill" src={goldWhiteOnDish} alt="man shaving" />
              <div className="absolute inset-0 w-full h-full bg-secondary opacity-50 z-50"></div>
            </>
          }
        />
      </>
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

export default Home
