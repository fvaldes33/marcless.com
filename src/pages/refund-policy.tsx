import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '@/src/state';
import { defaultDescription } from '@/src/utils/constants';

const PolicyPage: NextPage = () => {
  const { state: { store } } = useContext(Context);

  return (
    <>
      <Head>
        <title>Refund Policy | Marcless</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <section className="py-12 [ mg:py-24 ]">
        <div className="container mx-auto px-4 [ lg:px-0 ]">
          <h1 className="text-4xl font-serif mb-12 text-center">{store?.refundPolicy?.title}</h1>

          <div className="prose mx-auto mb-12 [ lg:prose-lg ]" dangerouslySetInnerHTML={{ __html: store?.refundPolicy?.body || '' }} />
        </div>
      </section>
    </>
  )
}

export default PolicyPage
