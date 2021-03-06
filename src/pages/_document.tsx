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
      <Html lang="en" className="overflow-x-hidden">
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
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />

          {/* open graph */}
          <meta property="og:site_name" content="Marcless" />
          <meta property="og:url" content="https://www.marcless.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/open-graph-logo.jpg" />
          <meta property="og:image:secure_url" content="/images/open-graph-logo.jpg" />

          {/* twitter */}
          <meta name="twitter:card" content="summary_large_image" />

          <meta name="facebook-domain-verification" content="k9luujjcfq96m0r88lxfxhdzo2mxd7" />
          <noscript>
            <img height="1" width="1" alt="" style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=654936088922063&ev=PageView&noscript=1" />
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
