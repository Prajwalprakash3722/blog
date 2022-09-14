import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
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
            `}
          </Script>
        </body>
      </Html>
    );
  }
}
