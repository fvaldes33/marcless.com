import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&family=Montserrat:wght@300;500&display=swap" rel="stylesheet" />
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
