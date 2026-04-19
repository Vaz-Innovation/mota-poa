import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR" className="scroll-smooth">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <meta name="theme-color" content="#1a2b3c" />
      </Head>
      <body className="antialiased text-foreground bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

