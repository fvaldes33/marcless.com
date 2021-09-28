import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import client from '@/src/utils/apollo';
import { GetSingleProduct, GetSingleProductVariables, GetSingleProduct_products_edges_node } from '@/src/queries/__generated__/GetSingleProduct';
import { SINGLE_PRODUCT_QUERY } from '@/src/queries';
import { useEffect } from 'react';
import { defaultDescription } from '@/src/utils/constants';

interface PageProps {
  product: GetSingleProduct_products_edges_node;
}

const ProductDetail: NextPage<PageProps> = ({ product }) => {
  const router = useRouter();

  useEffect(() => {
    const defaultVariant = product.variants.edges.shift()?.node;
    if (defaultVariant) {
      router.push(`/shop/${product.handle}/${defaultVariant.sku}`);
    }
  }, [product, router])

  return (
    <>
      <Head>
        <title>{product.seo.title || `${product.title} | marcless`}</title>
        <meta name="description" content={product.seo.description || defaultDescription} />
        <script type="application/json+ld" dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "name": product.title,
              "offers": {
                "@type": "Offer",
                "availability": "http://schema.org/InStock",
                "price": product.priceRange.minVariantPrice.amount,
                "priceCurrency": "USD"
              }
            }
          )
        }} />
      </Head>

      <>
        Loading...
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
