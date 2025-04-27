import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Expertise from '../components/sections/Expertise';
import CaseStudies from '../components/sections/CaseStudies';
import ProcessMethodology from '../components/sections/ProcessMethodology';
import TechnologyVision from '../components/sections/TechnologyVision';
import Contact from '../components/sections/Contact';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Novastra | Sports Innovation Consultancy</title>
        <meta name="description" content="Novastra helps sports organizations transform through technology and innovation. We deliver measurable results across performance, fan engagement, and commercial operations." />
        <meta property="og:title" content="Novastra | Sports Innovation Consultancy" />
        <meta property="og:description" content="Transforming sports organizations through innovative technology solutions." />
        <meta property="og:image" content="/images/novastra-social.jpg" />
        <meta property="og:url" content="https://novastra.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <Hero />
        <Services />
        <Expertise />
        <CaseStudies />
        <ProcessMethodology />
        <TechnologyVision />
        <Contact />
      </main>
    </Layout>
  );
};

export default Home;