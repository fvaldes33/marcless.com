import type { NextPage } from 'next';
import Head from 'next/head';
import HeroWithProduct from '@/src/components/HeroProduct';
import FeatureList from '@/src/components/FeatureList';
import Banner from '@/src/components/Banner';
import ContentMedia from '@/src/components/ContentMedia';
import ProductGrid from '@/src/components/ProductGrid';
import FeaturedProduct from '@/src/components/FeaturedProduct';
import TestimonialGrid from '@/src/components/TestimonialGrid';
import Button from '@/src/components/Button';
import { GetProducts, GetProductsVariables, PRODUCTS_QUERY } from '../queries';
import client from '../utils/apollo';
import manShaving from '@/src/assets/man-shaving.jpeg';
import womanShaving from '@/src/assets/woman-shaving.jpg';
import womanShavingPits from '@/src/assets/woman-shaving-pits.jpg';
import brightSilverInStand from '@/src/assets/bright-silver-in-stand.jpg';
import goldWhiteOnDish from '@/src/assets/gold-white-on-dish.jpg';

const Home: NextPage<GetProducts> = ({ products }) => {
  return (
    <>
      <Head>
        <title>marcless.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <HeroWithProduct />
        <ContentMedia
          eyebrow="irreplaceable"
          heading="Made for a lifetime"
          body="Most razors you'll find today are designed to be replaced. The Marc Razor is sustainable, made from clean materials that last."
          image={brightSilverInStand}
          cta={
            <Button href="/shop" variant="primary">
              shop razors
            </Button>
          }
        />

        <FeatureList />

        <ContentMedia
          imagePosition="left"
          eyebrow="no more lies"
          heading="Say goodbye to irritation, nicks, and bumps"
          body="More is not always good. Say goodbye to the 3+ blades Big Razor companies are telling you to buy. One blade is truly all you need. No more irritation, nicks, or red bumps."
          image={womanShaving}
          cta={
            <Button href="/shop" variant="primary">
              shop razors
            </Button>
          }
        />

        <TestimonialGrid />

        <Banner
          heading="Guaranteed to eliminate cuts, nicks, and irritation."
          image={goldWhiteOnDish}
          cta={
            <Button href="/shop" variant="primary">
              shop razors
            </Button>
          }
        />

        {/* <FeaturedProduct product={products.edges[0].node} /> */}
        {/* <ProductGrid products={products}/> */}
        {/* <Banner
          heading="High-performance products for personal grooming."
          image={womanShaving}
        /> */}
        {/* <ContentMedia
          heading="Your closest shave yet!"
          body="Sustainable, luxury safety razors eliminate razor burn and ingrown hairs for your closest shave yet! They are suitable for men, women and anyone in-between and outside of that. Switching to a safety razor will save you hundreds of dollars in the long run!"
          image={manShaving}
          cta={
            <Button href="/shop" variant="primary">
              shop
            </Button>
          }
        /> */}

        <div className="my-24"></div>
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
