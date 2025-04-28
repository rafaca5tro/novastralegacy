import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Image from 'next/image';

type ServiceCategory = 'digital' | 'revenue' | 'legacy';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ServiceCategory;
}

const serviceData: ServiceItem[] = [
  {
    id: 'ai-strategy',
    title: 'AI Implementation',
    description: 'Harness the power of artificial intelligence to transform your sports operations, athlete performance analytics, and decision-making processes.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    category: 'digital'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Integration',
    description: 'Implement secure, transparent blockchain solutions for ticketing, digital collectibles, and smart contract management.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    category: 'digital'
  },
  {
    id: 'data-transformation',
    title: 'Data Transformation',
    description: 'Convert raw sports data into actionable insights through advanced analytics platforms and visualization dashboards.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    category: 'digital'
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Experiences',
    description: 'Create engaging digital collectibles and experiences that connect fans with athletes and teams in unprecedented ways.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    category: 'revenue'
  },
  {
    id: 'fan-engagement',
    title: 'Fan Engagement Platforms',
    description: 'Deploy innovative digital platforms that deepen fan relationships through personalized content, gamification, and interactive experiences.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    category: 'revenue'
  },
  {
    id: 'smart-venues',
    title: 'Smart Venue Technology',
    description: 'Transform physical spaces with IoT, contactless solutions, and immersive technologies that enhance the fan experience while generating new revenue streams.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5L12 20.5M12 8.5L12 12.5" />
      </svg>
    ),
    category: 'revenue'
  },
  {
    id: 'brand-architecture',
    title: 'Brand Architecture',
    description: 'Develop comprehensive brand frameworks that position athletes and organizations for long-term recognition and commercial success.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    category: 'legacy'
  },
  {
    id: 'legacy-planning',
    title: 'Career Legacy Planning',
    description: 'Create roadmaps for athletes and executives that secure their influence, financial future, and impact well beyond their active careers.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    category: 'legacy'
  },
  {
    id: 'metaverse',
    title: 'Metaverse Strategy',
    description: 'Establish meaningful presence in virtual environments that create new engagement opportunities and future-proof your sports brand.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    category: 'legacy'
  }
];

// Category metadata
const categories = [
  { 
    id: 'digital', 
    title: 'Digital Transformation Strategy', 
    description: 'Comprehensive frameworks for adopting cutting-edge technologies that revolutionize sports operations and experiences.',
    image: 'https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/digital-transformation.jpg',
    color: 'from-blue-500/20 to-novastra-orange/20'
  },
  { 
    id: 'revenue', 
    title: 'Revenue & Fan Engagement', 
    description: 'Innovative platforms and experiences that deepen audience connections while creating sustainable commercial growth.',
    image: 'https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/fan-engagement.jpg',
    color: 'from-novastra-orange/20 to-purple-500/20'
  },
  { 
    id: 'legacy', 
    title: 'Legacy & Brand Development', 
    description: 'Strategic approaches to building enduring sports brands that transcend traditional boundaries and timelines.',
    image: 'https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/legacy-development.jpg',
    color: 'from-novastra-gold/20 to-novastra-orange/20'
  }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('digital');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  const filteredServices = serviceData.filter(service => service.category === activeCategory);
  const currentCategory = categories.find(cat => cat.id === activeCategory);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const serviceCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <section id="services" className="py-24 bg-deep-black relative">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-radial ${currentCategory?.color} opacity-30 blur-3xl`} />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Our Premium Services"
          subtitle="Comprehensive solutions tailored to transform your sports business through innovative technology and strategic guidance."
        />
        
        {/* Category Selection */}
        <div className="flex flex-col md:flex-row justify-center mb-16 space-y-4 md:space-y-0 md:space-x-6">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full transition-all duration-300 relative overflow-hidden ${
                activeCategory === category.id
                  ? 'bg-gradient-novastra text-white font-medium'
                  : 'bg-novastra-dark-gray text-novastra-beige hover:bg-novastra-gray'
              }`}
              onClick={() => {
                setActiveCategory(category.id as ServiceCategory);
                setExpandedService(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.title}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-white"
                  layoutId="activeCategory"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Category Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h3 className="text-2xl font-playfair mb-4 text-gradient">{currentCategory?.title}</h3>
            <p className="opacity-80">{currentCategory?.description}</p>
          </motion.div>
        </AnimatePresence>
        
        {/* Service Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={serviceCardVariants}
              className="relative"
              layoutId={`service-${service.id}`}
              onClick={() => setExpandedService(service.id)}
            >
              <GlassCard 
                className="h-full flex flex-col cursor-pointer" 
                delay={index * 0.1}
              >
                <div className="text-novastra-orange mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="opacity-70 text-sm">{service.description}</p>
                <div className="mt-4 text-novastra-orange text-sm flex items-center justify-end">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Expanded Service Modal */}
        <AnimatePresence>
          {expandedService && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/80 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedService(null)}
              />
              
              <motion.div
                layoutId={`service-${expandedService}`}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-card p-8 rounded-2xl z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {(() => {
                  const service = serviceData.find(s => s.id === expandedService);
                  if (!service) return null;
                  
                  return (
                    <>
                      <button 
                        className="absolute top-4 right-4 text-novastra-beige hover:text-novastra-orange"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedService(null);
                        }}
                        aria-label="Close modal"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      <div className="flex items-start mb-6">
                        <div className="text-novastra-orange mr-4 flex-shrink-0">{service.icon}</div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                      </div>
                      
                      <p className="opacity-80 mb-6">{service.description}</p>
                      
                      {/* Service-specific content */}
                      {service.id === 'ai-strategy' && (
                        <div className="bg-gradient-to-r from-black/50 to-black/30 rounded-xl p-6">
                          <h4 className="font-bold mb-4 text-xl">AI Implementation Journey</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-black/30 rounded-lg">
                              <div className="text-2xl font-bold text-novastra-orange mb-2">1</div>
                              <p className="text-sm">Assessment & Strategy</p>
                            </div>
                            <div className="text-center p-4 bg-black/30 rounded-lg">
                              <div className="text-2xl font-bold text-novastra-orange mb-2">2</div>
                              <p className="text-sm">Implementation & Integration</p>
                            </div>
                            <div className="text-center p-4 bg-black/30 rounded-lg">
                              <div className="text-2xl font-bold text-novastra-orange mb-2">3</div>
                              <p className="text-sm">Optimization & Scale</p>
                            </div>
                          </div>
                          <Image
                            src="https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/AIService.png"
                            alt="AI Implementation Framework"
                            width={600}
                            height={300}
                            className="rounded-lg w-full object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      
                      {service.id === 'nft-marketplace' && (
                        <div className="bg-gradient-to-r from-black/50 to-black/30 rounded-xl p-6">
                          <h4 className="font-bold mb-4 text-xl">NFT Showcase Examples</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rounded-lg overflow-hidden relative group">
                              <Image
                                src="https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/nft-example-1.png"
                                alt="Sports NFT Example"
                                width={300}
                                height={300}
                                className="w-full object-cover transform transition-transform group-hover:scale-110"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                <span className="text-sm font-medium">Athlete Collectible Series</span>
                              </div>
                            </div>
                            <div className="rounded-lg overflow-hidden relative group">
                              <Image
                                src="https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/nft-example-2.png"
                                alt="Sports NFT Example"
                                width={300}
                                height={300}
                                className="w-full object-cover transform transition-transform group-hover:scale-110"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                <span className="text-sm font-medium">Exclusive Access Tokens</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {service.id === 'brand-architecture' && (
                        <div className="bg-gradient-to-r from-black/50 to-black/30 rounded-xl p-6">
                          <h4 className="font-bold mb-4 text-xl">Brand Architecture Framework</h4>
                          <Image
                            src="https://raw.githubusercontent.com/rafaca5tro/novastralegacy/main/images/brand-architecture.jpg"
                            alt="Brand Architecture Framework"
                            width={600}
                            height={400}
                            className="rounded-lg w-full object-cover mb-4"
                            unoptimized
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="p-3 bg-black/30 rounded-lg">
                              <h5 className="font-bold text-novastra-orange">Core Identity</h5>
                              <p className="opacity-70">The foundational elements that define the brand</p>
                            </div>
                            <div className="p-3 bg-black/30 rounded-lg">
                              <h5 className="font-bold text-novastra-orange">Brand Extensions</h5>
                              <p className="opacity-70">Strategic expansion into complementary areas</p>
                            </div>
                            <div className="p-3 bg-black/30 rounded-lg">
                              <h5 className="font-bold text-novastra-orange">Commercial Assets</h5>
                              <p className="opacity-70">Monetizable properties within the brand portfolio</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-8 flex justify-end">
                        <button 
                          className="btn-primary text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedService(null);
                            const contactSection = document.getElementById('contact');
                            contactSection?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Discuss Your Requirements
                        </button>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;