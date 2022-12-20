import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <title></title>
          <meta name={"description"} content={"Site description"} />
          <meta name={"viewport"} content={"width=device-width, initial-scale=1.0"}/>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
