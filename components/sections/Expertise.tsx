import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';
import Image from 'next/image';

// Expertise data
const expertiseAreas = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Transforming sports with machine learning, computer vision, and predictive analytics for performance optimization and fan experiences.',
    proficiency: 95, // out of 100
    image: '/images/expertise-ai.jpg',
    applications: [
      'Athlete Performance Analysis',
      'Fan Behavior Prediction',
      'Automated Content Generation',
      'Tactical Decision Support'
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain Technology',
    description: 'Pioneering decentralized solutions for ticketing, digital collectibles, loyalty programs, and transparent governance.',
    proficiency: 90,
    image: '/images/expertise-blockchain.jpg',
    applications: [
      'Smart Ticket Distribution',
      'NFT Strategy & Development',
      'Fan Token Ecosystems',
      'Transparent Revenue Sharing'
    ]
  },
  {
    id: 'fan',
    title: 'Fan Engagement',
    description: 'Creating immersive digital experiences that deepen audience connections through personalization, gamification, and interactive content.',
    proficiency: 97,
    image: '/images/expertise-fan.jpg',
    applications: [
      'Second Screen Experiences',
      'Augmented Reality Activation',
      'Community Building Platforms',
      'Personalized Content Delivery'
    ]
  },
  {
    id: 'data',
    title: 'Data Architecture',
    description: 'Designing comprehensive data ecosystems that convert information into actionable insights for strategic advantage.',
    proficiency: 93,
    image: '/images/expertise-data.jpg',
    applications: [
      'Performance Metrics Framework',
      'Centralized Data Warehousing',
      'Real-time Analytics Dashboards',
      'Predictive Modeling Systems'
    ]
  },
  {
    id: 'brand',
    title: 'Brand Architecture',
    description: 'Structuring sports properties to maximize recognition, loyalty, and commercial opportunity across diverse touchpoints.',
    proficiency: 98,
    image: '/images/expertise-brand.jpg',
    applications: [
      'Digital Identity Development',
      'Multi-channel Brand Strategy',
      'Legacy Planning Frameworks',
      'Brand Extension Modeling'
    ]
  }
];

const Expertise = () => {
  const [activeExpertise, setActiveExpertise] = useState(expertiseAreas[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  // Create refs for each expertise area
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Set up the intersection observer to detect which expertise area is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setActiveExpertise(id);
          }
        }
      });
    }, { threshold: 0.6 });
    
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);
  
  const currentExpertise = expertiseAreas.find(item => item.id === activeExpertise) || expertiseAreas[0];
  
  return (
    <section id="expertise" className="py-24 bg-gradient-to-b from-deep-black to-novastra-dark-gray relative">
      {/* Parallax background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-novastra-orange/20 to-novastra-gold/20 blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-80 h-80 rounded-full bg-gradient-to-r from-novastra-gold/20 to-novastra-orange/20 blur-3xl"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Our Areas of Expertise"
          subtitle="Specialized knowledge and capabilities that drive exceptional results in modern sports business transformation."
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12" ref={containerRef}>
          {/* Left side: Scrollable expertise areas */}
          <div className="space-y-24">
            {expertiseAreas.map((expertise, index) => (
              <div
                key={expertise.id}
                ref={el => itemRefs.current[index] = el}
                data-id={expertise.id}
                className={`relative ${activeExpertise === expertise.id ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    <span className={activeExpertise === expertise.id ? 'text-gradient' : 'text-novastra-beige'}>
                      {expertise.title}
                    </span>
                  </h3>
                  
                  <p className="mb-6 opacity-80 max-w-lg">{expertise.description}</p>
                  
                  {/* Proficiency bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Proficiency</span>
                      <span className="font-medium">{expertise.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-novastra"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${expertise.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  {/* Applications list */}
                  <h4 className="text-lg font-medium mb-3">Applications</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {expertise.applications.map((app, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                      >
                        <div className="mr-2 text-novastra-orange">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{app}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Right side: Sticky visualization */}
          <div className="relative lg:sticky lg:top-32 h-fit">
            <motion.div 
              className="rounded-2xl overflow-hidden glass-card p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Content changes based on active expertise */}
              <div className="relative h-80 mb-6 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/30 z-[5]"></div>
                {/* Images with crossfade effect */}
                {expertiseAreas.map((exp) => (
                  <motion.div
                    key={exp.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeExpertise === exp.id ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Image
                      src={exp.image || '/images/expertise-placeholder.jpg'}
                      alt={exp.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
                
                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentExpertise.title}
                  </h3>
                  <div className="flex items-center">
                    <div className="h-1 w-12 bg-gradient-novastra mr-3 rounded-full"></div>
                    <span className="text-sm text-white/80">Expertise Focus</span>
                  </div>
                </div>
              </div>
              
              {/* Interactive components specific to each expertise */}
              <motion.div
                key={currentExpertise.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-2"
              >
                {currentExpertise.id === 'ai' && (
                  <div className="bg-black/30 rounded-xl p-4">
                    <h4 className="text-lg font-medium mb-4">AI Implementation Journey</h4>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {['Assessment', 'Development', 'Integration', 'Optimization'].map((stage, i) => (
                        <motion.div
                          key={stage}
                          className="bg-black/30 rounded-lg p-3 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <span className="text-sm">{stage}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Timeline</span>
                      <span className="text-novastra-orange">3-6 Months</span>
                    </div>
                  </div>
                )}
                
                {currentExpertise.id === 'blockchain' && (
                  <div className="bg-black/30 rounded-xl p-4">
                    <h4 className="text-lg font-medium mb-4">Blockchain Technology Stack</h4>
                    <div className="space-y-3">
                      {['Smart Contracts', 'Digital Assets', 'Distributed Ledger', 'Tokenization'].map((tech, i) => (
                        <motion.div
                          key={tech}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-novastra-orange mr-3"></div>
                          <span>{tech}</span>
                          <div className="ml-auto text-novastra-beige/60 text-sm">Expertise Level</div>
                          <div className="w-16 bg-gray-700 h-1 rounded-full ml-2 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-novastra"
                              initial={{ width: 0 }}
                              animate={{ width: `${90 + i * 2}%` }}
                              transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentExpertise.id === 'fan' && (
                  <div className="bg-black/30 rounded-xl p-4">
                    <h4 className="text-lg font-medium mb-4">Fan Engagement Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Retention Rate', value: '94%' },
                        { label: 'Time Spent', value: '+127%' },
                        { label: 'Conversion', value: '38%' },
                        { label: 'Satisfaction', value: '4.8/5' }
                      ].map((metric, i) => (
                        <motion.div
                          key={metric.label}
                          className="bg-black/30 rounded-lg p-3"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <div className="text-sm opacity-70">{metric.label}</div>
                          <div className="text-xl font-medium text-novastra-orange">{metric.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {(currentExpertise.id === 'data' || currentExpertise.id === 'brand') && (
                  <div className="bg-black/30 rounded-xl p-4">
                    <h4 className="text-lg font-medium mb-4">
                      {currentExpertise.id === 'data' ? 'Data Strategy Components' : 'Brand Architecture Elements'}
                    </h4>
                    <ul className="space-y-2">
                      {(currentExpertise.id === 'data' ? 
                        ['Collection Strategy', 'Analysis Framework', 'Visualization System', 'Action Plan Development'] : 
                        ['Core Identity', 'Brand Extensions', 'Touchpoint Strategy', 'Legacy Planning']
                      ).map((item, i) => (
                        <motion.li
                          key={item}
                          className="flex items-center justify-between p-2 border-b border-gray-700"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <span>{item}</span>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-novastra-orange"></div>
                            <div className="w-2 h-2 rounded-full bg-novastra-orange mx-1"></div>
                            <div className="w-2 h-2 rounded-full bg-novastra-orange"></div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
              
              <div className="mt-6">
                <GradientButton href="#contact" fullWidth>
                  Discuss Your Requirements
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;