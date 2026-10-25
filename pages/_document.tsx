import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "e51b7f6db46e4c0894b5b34befeeb154"}'></script>
        </Head>
        <body className="bg-surface-base text-text-body font-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
