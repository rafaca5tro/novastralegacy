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
    <Layout
      title="Novastra | Sports Innovation Consultancy"
      description="Novastra helps sports organizations transform through technology and innovation. We deliver measurable results across performance, fan engagement, and commercial operations."
      ogImage="/images/novastra-social.jpg"
    >
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