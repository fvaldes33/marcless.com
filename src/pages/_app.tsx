import 'tailwindcss/tailwind.css';

import App from 'next/app';
import type { AppProps } from 'next/app';
import AppProvider from '@/src/state';
import client from '@/src/utils/apollo';
import { STORE_QUERY } from '@/src/queries';
import { Store } from '@/src/types';
import Header from '@/src/components/Header';

type AppPropsWithGlobals = AppProps & { store: Store };

function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps, store }: AppPropsWithGlobals) {
  return (
    <AppProvider initialState={{ ready: true, store }}>
      <Body>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </Body>
    </AppProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  const { data } = await client.query<Store>({
    query: STORE_QUERY,
  });

  return {
    ...appProps,
    store: data.shop
  }
}

export default MyApp
