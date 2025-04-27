import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/poppins-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Novastra',
              url: 'https://novastra.com',
              logo: 'https://novastra.com/images/novastra-logo.png',
              sameAs: [
                'https://twitter.com/novastra',
                'https://linkedin.com/company/novastra',
                'https://facebook.com/novastra'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-305-555-8765',
                contactType: 'customer service',
                email: 'info@novastra.com'
              },
              description: 'Novastra is a sports innovation consultancy helping organizations transform through technology and data-driven solutions.'
            })
          }}
        />
      </body>
    </Html>
  );
}