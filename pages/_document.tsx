import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className='selection:bg-[#1D2433] selection:text-[#5686F5] bg-[#16181D]'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
