import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/src/styles/main.css';
import App from 'next/app';
import type { AppProps } from 'next/app';
import AppProvider from '@/src/state';
import client from '@/src/utils/apollo';
import { STORE_QUERY } from '@/src/queries';
import { Store, Store_shop } from '@/src/types';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

type AppPropsWithGlobals = AppProps & { store: Store_shop };

function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps, store }: AppPropsWithGlobals) {
  return (
    <AppProvider initialState={{ ready: true, active: true, store }}>
      <Body>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
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
