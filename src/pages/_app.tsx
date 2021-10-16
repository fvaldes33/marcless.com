import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/src/styles/main.css';
import App from 'next/app';
import Script from "next/script";
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import AppProvider from '@/src/state';
import client from '@/src/utils/apollo';
import { STORE_QUERY } from '@/src/queries';
import { Store, Store_shop } from '@/src/types';
import Alert from '@/src/components/Alert';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useEffect, useState } from 'react';
import { pageview } from '@/src/utils/helpers';

type AppPropsWithGlobals = AppProps & { store: Store_shop };

function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps, store }: AppPropsWithGlobals) {
  const router = useRouter();
  const [gtag, setGtag] = useState<boolean>();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (gtag) {
        pageview(url)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [gtag, router.events])

  return (
    <AppProvider initialState={{ ready: true, active: true, store }}>
      <Script
        id="gtag"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        onLoad={() => {
          setGtag(true);
          // initial page load
          pageview(window.location.pathname)
        }}
      />
      <Script
        id="hs-script-loader"
        strategy="lazyOnload"
        src="//js.hs-scripts.com/20789650.js"
      />
      <Script id="analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            'page_path': window.location.pathname,
            'linker': {
              'domains': ['checkout.marcless.com']
            }
          });
        `}
      </Script>
      <Script id="fbook" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '225449046285735');
          fbq('track', 'PageView');
        `}
      </Script>
      {/* Yopto */}
      <Script id="yopto" strategy="lazyOnload">{`
        (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/yy9WUacB03VCmmsa1SQlo8zSb0Tulq2vsbwjchCk/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
      `}</Script>

      <Body>
        <Alert />
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
