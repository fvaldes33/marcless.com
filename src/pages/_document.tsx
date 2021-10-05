/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-img-element */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.marcless.com/" />

          <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&family=Montserrat:wght@300;500&display=swap" rel="stylesheet" />

          {/* open graph */}
          <meta property="og:site_name" content="Marcless" />
          <meta property="og:url" content="https://www.marcless.com/" />
          <meta property="og:title" content="Better shave, fewer dollars | Marcless" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="Inspired by a vintage safety razor, crafted from solid zinc alloy and built to give you the best shave you've ever had. Includes 20 blades." />
          <meta property="og:image" content="/images/open-graph-logo.jpg" />
          <meta property="og:image:secure_url" content="/images/open-graph-logo.jpg" />

          {/* twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Better shave, fewer dollars | Marcless" />
          <meta name="twitter:description" content="Inspired by a vintage safety razor, crafted from solid zinc alloy and built to give you the best shave you've ever had. Includes 20 blades." />

          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/20789650.js"></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/yy9WUacB03VCmmsa1SQlo8zSb0Tulq2vsbwjchCk/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
          ` }}></script>
          <meta name="facebook-domain-verification" content="xgghiaxp2avfcfq2gyfact2xcn6upm" />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                'page_path': window.location.pathname,
                'linker': {
                  'domains': ['checkout.marcless.com']
                }
              });
          `}}></script>
          <script
            dangerouslySetInnerHTML={{ __html: `
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
            `}}>
          </script>
          <noscript>
            <img height="1" width="1" alt="" style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=225449046285735&ev=PageView&noscript=1" />
          </noscript>
        </Head>
        <body className="font-sans font-normal">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
