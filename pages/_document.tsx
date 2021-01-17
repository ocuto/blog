import Document, { Html, Head, Main, NextScript } from "next/document";
// @ts-ignore
import bundleCss from "!raw-loader!../style/output.css"
import { ServerStyleSheet } from "styled-components";
import ssgConfig from "../amdxg.config";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    try {
      const page = ctx.renderPage((App) => (props) =>
        sheet.collectStyles(<App {...props} />)
      );
      const initialProps: any = await Document.getInitialProps(ctx);
      return {
        ...page,
        styles: [
          ...initialProps.styles,
          <style
            key="custom"
            dangerouslySetInnerHTML={{
              __html: bundleCss,
            }}
          />,
          ...sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={ssgConfig.lang || "en-US"}>
        <Head>
          {/*<Analytics />*/}
          <link
            rel="alternate"
            type="application/rss+xml"
            title={ssgConfig.siteName}
            href="/rss.xml"
          />
          {/* <link
            rel="alternate"
            type="application/rss+xml"
            title={ssgConfig.siteName}
            href="sitemap.xml"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
