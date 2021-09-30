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
          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/20789650.js"></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/yy9WUacB03VCmmsa1SQlo8zSb0Tulq2vsbwjchCk/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
          ` }}></script>
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
