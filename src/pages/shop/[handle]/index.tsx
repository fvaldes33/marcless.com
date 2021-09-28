import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import client from '@/src/utils/apollo';
import { GetSingleProduct, GetSingleProductVariables } from '@/src/queries/__generated__/GetSingleProduct';
import { SINGLE_PRODUCT_QUERY } from '@/src/queries';

const ProductDetail: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>marcless.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        product detail page {router.query.handle}
      </>
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
  const product = data.products.edges[0].node;

  return {
    props: {
      product,
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
