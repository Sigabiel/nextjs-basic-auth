import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
    <head>
        <title></title>
        <meta name={"description"} content={"Site description"} />
        <meta name={"viewport"} content={"width=device-width, initial-scale=1.0"}/>
        <link href="/styles/globals.css" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
    </head>
      <body>{children}</body>
    </html>
  )
}
