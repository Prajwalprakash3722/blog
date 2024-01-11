import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

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
        <body className="selection:bg-[#1D2433] selection:text-[#5686F5] bg-[#16181D]">
          <Main />
          <NextScript />
          <Script id="smooth-scroll" strategy="lazyOnload">
            {`
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
 function onLoad() {
        var elements = document.querySelectorAll(".gist > .gist-file > .gist-meta");
        elements.forEach(function (element) {
          element.parentElement.removeChild(element);
        });
    }
    onLoad();
            `}
          </Script>
        </body>
      </Html>
    );
  }
}
