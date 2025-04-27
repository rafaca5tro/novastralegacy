import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

// Import Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </>
  );
}

export default MyApp;