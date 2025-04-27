import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Image from 'next/image';

interface TechCategory {
  id: string;
  name: string;
  description: string;
  technologies: Technology[];
}

interface Technology {
  id: string;
  name: string;
  icon: string;
  description: string;
  useCases: string[];
  level: 'core' | 'emerging' | 'experimental';
}

// Sample technology stack data
const techCategories: TechCategory[] = [
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Transforming raw information into actionable intelligence through advanced analytics and visualization.',
    technologies: [
      {
        id: 'python',
        name: 'Python',
        icon: '/images/tech/python.svg',
        description: 'Our primary language for data processing, analytics, and machine learning implementations.',
        useCases: [
          'Athlete performance prediction models',
          'Injury risk assessments',
          'Automated video analysis'
        ],
        level: 'core'
      },
      {
        id: 'tensorflow',
        name: 'TensorFlow',
        icon: '/images/tech/tensorflow.svg',
        description: 'Deep learning framework used for complex pattern recognition and predictive modeling.',
        useCases: [
          'Movement pattern analysis',
          'Game strategy optimization',
          'Computer vision for technique analysis'
        ],
        level: 'core'
      },
      {
        id: 'tableau',
        name: 'Tableau',
        icon: '/images/tech/tableau.svg',
        description: 'Interactive data visualization tool enabling stakeholders to explore insights intuitively.',
        useCases: [
          'Performance dashboards',
          'Scouting reports',
          'Executive KPI tracking'
        ],
        level: 'core'
      },
      {
        id: 'snowflake',
        name: 'Snowflake',
        icon: '/images/tech/snowflake.svg',
        description: 'Cloud data platform providing scalable storage and processing capabilities for large datasets.',
        useCases: [
          'Centralized data warehousing',
          'Cross-team data sharing',
          'High-performance analytics queries'
        ],
        level: 'core'
      },
      {
        id: 'dbt',
        name: 'dbt',
        icon: '/images/tech/dbt.svg',
        description: 'Data transformation tool that enables analytics engineers to transform data in their warehouse efficiently.',
        useCases: [
          'Standardizing metrics definitions',
          'Data quality testing',
          'Modular analytics workflows'
        ],
        level: 'emerging'
      }
    ]
  },
  {
    id: 'app-development',
    name: 'Application Development',
    description: 'Building robust, scalable, and user-friendly applications that deliver insights to users across the organization.',
    technologies: [
      {
        id: 'react',
        name: 'React',
        icon: '/images/tech/react.svg',
        description: 'JavaScript library for building interactive user interfaces with reusable components.',
        useCases: [
          'Coaching staff dashboards',
          'Athlete monitoring interfaces',
          'Fan engagement platforms'
        ],
        level: 'core'
      },
      {
        id: 'flutter',
        name: 'Flutter',
        icon: '/images/tech/flutter.svg',
        description: 'Cross-platform UI toolkit for building natively compiled applications from a single codebase.',
        useCases: [
          'Athlete mobile apps',
          'In-venue staff tools',
          'Real-time event management'
        ],
        level: 'core'
      },
      {
        id: 'node',
        name: 'Node.js',
        icon: '/images/tech/nodejs.svg',
        description: 'JavaScript runtime for building scalable network applications and APIs.',
        useCases: [
          'Real-time data processing',
          'Microservices architecture',
          'API gateways and middleware'
        ],
        level: 'core'
      },
      {
        id: 'graphql',
        name: 'GraphQL',
        icon: '/images/tech/graphql.svg',
        description: 'API query language enabling clients to request exactly the data they need.',
        useCases: [
          'Customizable analytics APIs',
          'Data federation across systems',
          'Efficient mobile app data loading'
        ],
        level: 'emerging'
      }
    ]
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    description: 'Leveraging cloud technologies to create scalable, secure, and high-performance systems.',
    technologies: [
      {
        id: 'aws',
        name: 'AWS',
        icon: '/images/tech/aws.svg',
        description: 'Comprehensive cloud platform with a wide range of services for building sophisticated applications.',
        useCases: [
          'Scalable infrastructure',
          'Machine learning workloads',
          'Global content delivery'
        ],
        level: 'core'
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: '/images/tech/kubernetes.svg',
        description: 'Container orchestration system for automating application deployment, scaling, and management.',
        useCases: [
          'Microservices deployment',
          'Auto-scaling during live events',
          'Multi-region availability'
        ],
        level: 'core'
      },
      {
        id: 'terraform',
        name: 'Terraform',
        icon: '/images/tech/terraform.svg',
        description: 'Infrastructure as code tool for building, changing, and versioning infrastructure safely and efficiently.',
        useCases: [
          'Consistent environments',
          'Reproducible deployments',
          'Compliance as code'
        ],
        level: 'core'
      }
    ]
  },
  {
    id: 'emerging-tech',
    name: 'Emerging Technologies',
    description: 'Exploring cutting-edge solutions to solve complex challenges and create new opportunities.',
    technologies: [
      {
        id: 'ar-vr',
        name: 'AR/VR',
        icon: '/images/tech/ar-vr.svg',
        description: 'Immersive technologies that blend digital content with the physical world or create fully virtual environments.',
        useCases: [
          'Tactical visualization for coaches',
          'Immersive training simulations',
          'Enhanced fan experiences'
        ],
        level: 'emerging'
      },
      {
        id: 'computer-vision',
        name: 'Computer Vision',
        icon: '/images/tech/computer-vision.svg',
        description: 'AI systems that can analyze and understand visual information from cameras and videos.',
        useCases: [
          'Automated performance analysis',
          'Real-time tactical insights',
          'Injury prevention monitoring'
        ],
        level: 'emerging'
      },
      {
        id: 'wearable-tech',
        name: 'Wearable Tech',
        icon: '/images/tech/wearable.svg',
        description: 'Devices that can be worn to collect biometric data and provide real-time feedback.',
        useCases: [
          'Load management systems',
          'Recovery monitoring',
          'Real-time performance tracking'
        ],
        level: 'core'
      },
      {
        id: 'blockchain',
        name: 'Blockchain',
        icon: '/images/tech/blockchain.svg',
        description: 'Distributed ledger technology enabling secure, transparent, and tamper-proof record-keeping.',
        useCases: [
          'Fan token ecosystems',
          'Intellectual property protection',
          'Supply chain verification'
        ],
        level: 'experimental'
      }
    ]
  }
];

const TechnologyVision: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(techCategories[0]);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [showModal, setShowModal] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // SVG animation refs
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const linksRef = useRef<SVGGElement>(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Set up the tech stack visualization
  useEffect(() => {
    if (!svgRef.current || !nodesRef.current || !linksRef.current) return;
    
    // This would be a D3.js force simulation in a real implementation
    // Here we're doing a simple static layout for demonstration
    
    // Clear existing nodes and links
    while (nodesRef.current.firstChild) {
      nodesRef.current.removeChild(nodesRef.current.firstChild);
    }
    while (linksRef.current.firstChild) {
      linksRef.current.removeChild(linksRef.current.firstChild);
    }
    
    const centerX = 500;
    const centerY = 300;
    const radius = 200;
    
    // Create central node for category
    const centerNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerNode.setAttribute('cx', centerX.toString());
    centerNode.setAttribute('cy', centerY.toString());
    centerNode.setAttribute('r', '40');
    centerNode.setAttribute('fill', 'url(#orangeGradient)');
    nodesRef.current.appendChild(centerNode);
    
    // Create central node text
    const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerText.setAttribute('x', centerX.toString());
    centerText.setAttribute('y', centerY.toString());
    centerText.setAttribute('text-anchor', 'middle');
    centerText.setAttribute('dominant-baseline', 'middle');
    centerText.setAttribute('fill', 'white');
    centerText.setAttribute('font-weight', 'bold');
    centerText.textContent = activeCategory.name;
    nodesRef.current.appendChild(centerText);
    
    // Create nodes and links for technologies
    const techs = activeCategory.technologies;
    const angleStep = (2 * Math.PI) / techs.length;
    
    techs.forEach((tech, i) => {
      const angle = i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Create node
      const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      node.setAttribute('cx', x.toString());
      node.setAttribute('cy', y.toString());
      node.setAttribute('r', tech.level === 'core' ? '30' : tech.level === 'emerging' ? '25' : '20');
      node.setAttribute('fill', tech.level === 'core' ? 'rgba(255, 69, 0, 0.8)' : 
                             tech.level === 'emerging' ? 'rgba(255, 140, 0, 0.7)' : 
                             'rgba(255, 215, 0, 0.6)');
      node.setAttribute('cursor', 'pointer');
      node.dataset.tech = tech.id;
      node.addEventListener('click', () => {
        setSelectedTech(tech);
        setShowModal(true);
      });
      
      const nodeStroke = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      nodeStroke.setAttribute('cx', x.toString());
      nodeStroke.setAttribute('cy', y.toString());
      nodeStroke.setAttribute('r', (tech.level === 'core' ? 30 : tech.level === 'emerging' ? 25 : 20).toString());
      nodeStroke.setAttribute('fill', 'none');
      nodeStroke.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
      nodeStroke.setAttribute('stroke-width', '1');
      
      // Create node text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x.toString());
      text.setAttribute('y', y.toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '12');
      text.setAttribute('pointer-events', 'none');
      text.textContent = tech.name;
      
      // Create link
      const link = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      link.setAttribute('x1', centerX.toString());
      link.setAttribute('y1', centerY.toString());
      link.setAttribute('x2', x.toString());
      link.setAttribute('y2', y.toString());
      link.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
      link.setAttribute('stroke-width', '2');
      
      // Add to SVG
      linksRef.current.appendChild(link);
      linksRef.current.appendChild(nodeStroke);
      nodesRef.current.appendChild(node);
      nodesRef.current.appendChild(text);
    });
    
    // Add animation
    const nodes = nodesRef.current.querySelectorAll('circle, text');
    const links = linksRef.current.querySelectorAll('line, circle');
    
    // Reset opacity
    nodes.forEach(node => {
      node.style.opacity = '0';
    });
    links.forEach(link => {
      link.style.opacity = '0';
    });
    
    // Animate in
    setTimeout(() => {
      links.forEach((link, i) => {
        setTimeout(() => {
          link.style.transition = 'opacity 0.5s ease-out';
          link.style.opacity = '1';
        }, i * 50);
      });
      
      setTimeout(() => {
        nodes.forEach((node, i) => {
          setTimeout(() => {
            node.style.transition = 'opacity 0.5s ease-out';
            node.style.opacity = '1';
          }, i * 100);
        });
      }, 300);
    }, 300);
  }, [activeCategory]);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const handleCategoryChange = (category: TechCategory) => {
    setActiveCategory(category);
    setSelectedTech(null);
    setShowModal(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  // Helper function to get the color class based on technology level
  const getLevelColor = (level: 'core' | 'emerging' | 'experimental') => {
    switch (level) {
      case 'core':
        return 'bg-orange-600 text-white';
      case 'emerging':
        return 'bg-amber-500 text-white';
      case 'experimental':
        return 'bg-yellow-400 text-gray-900';
    }
  };

  const getLevelText = (level: 'core' | 'emerging' | 'experimental') => {
    switch (level) {
      case 'core':
        return 'Core Technology';
      case 'emerging':
        return 'Emerging Solution';
      case 'experimental':
        return 'Experimental';
    }
  };

  return (
    <section id="technology" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Our Technology Vision" 
          subtitle="Integrating cutting-edge technologies to create innovative solutions tailored to the unique challenges of the sports industry."
        />
        
        {/* Technology Category Selector */}
        <div className="mt-12 mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {techCategories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory.id === category.id 
                    ? 'bg-gradient-to-r from-orange-600 to-yellow-400 text-white shadow-lg' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                }`}
                onClick={() => handleCategoryChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          
          <GlassCard>
            <motion.p 
              className="text-center text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={activeCategory.id}
            >
              {activeCategory.description}
            </motion.p>
            
            {/* Interactive Tech Stack Visualization */}
            <div className="relative h-[600px] w-full">
              <svg 
                ref={svgRef}
                className="w-full h-full" 
                viewBox="0 0 1000 600" 
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Background grid */}
                <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#tech-grid)" />
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                
                {/* Links group */}
                <g ref={linksRef}></g>
                
                {/* Nodes group */}
                <g ref={nodesRef}></g>
              </svg>
              
              <div className="absolute bottom-4 left-4 bg-gray-900/80 p-4 rounded-lg border border-gray-800">
                <div className="text-sm text-white font-medium mb-2">Technology Level</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-orange-600 mr-2"></div>
                    <span className="text-xs text-gray-300">Core</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-xs text-gray-300">Emerging</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
                    <span className="text-xs text-gray-300">Experimental</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 text-sm text-gray-400">
                Click on a technology to view details
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Technology Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={controls}
        >
          {activeCategory.technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="cursor-pointer"
              onClick={() => {
                setSelectedTech(tech);
                setShowModal(true);
              }}
            >
              <GlassCard className="h-full flex flex-col overflow-hidden">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600/20 to-yellow-400/20 flex items-center justify-center mr-3">
                    <div className="text-orange-500 text-xl">[Icon]</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(tech.level)}`}>
                      {getLevelText(tech.level)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{tech.description}</p>
                
                <div className="mt-auto">
                  <div className="text-sm font-medium text-gray-400 mb-2">Key Use Cases:</div>
                  <ul className="text-sm text-gray-300">
                    {tech.useCases.slice(0, 2).map((useCase, i) => (
                      <li key={i} className="flex items-start mb-1">
                        <svg className="w-4 h-4 text-orange-500 mt-0.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{useCase}</span>
                      </li>
                    ))}
                    {tech.useCases.length > 2 && (
                      <li className="text-orange-400 text-xs mt-1">+ {tech.useCases.length - 2} more use cases</li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                  <button className="text-orange-400 text-sm flex items-center">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Tech Readiness Assessment CTA */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="p-8 border border-orange-500/20">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-12">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Technology Readiness Assessment</h3>
                <p className="text-gray-300 mb-6">
                  How prepared is your organization to leverage emerging technologies in sports? Our comprehensive
                  assessment evaluates your current capabilities across data, infrastructure, and innovation readiness.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">Identify technology gaps and opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">Benchmark against industry leaders</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">Receive a customized roadmap for technological advancement</span>
                  </li>
                </ul>
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-400 text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Request Your Assessment
                </button>
              </div>
              <div className="lg:w-1/3">
                <div className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                  <div className="h-full w-full rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                    <div className="text-center mb-4">
                      <div className="inline-block rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 p-1">
                        <div className="bg-gray-900 rounded-full p-2">
                          <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-2">Assessment Score</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Data Infrastructure</span>
                          <span className="text-xs text-white">65%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-orange-600 to-yellow-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Analytics Capabilities</span>
                          <span className="text-xs text-white">42%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-orange-600 to-yellow-400 h-2 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Innovation Readiness</span>
                          <span className="text-xs text-white">78%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-orange-600 to-yellow-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">User Adoption</span>
                          <span className="text-xs text-white">53%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-orange-600 to-yellow-400 h-2 rounded-full" style={{ width: '53%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Overall Score</span>
                        <span className="text-lg font-bold text-gradient">59%</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Based on industry average of 48%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
        
        {/* Technology Detail Modal */}
        <AnimatePresence>
          {showModal && selectedTech && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div 
                className="bg-gray-900 rounded-xl overflow-hidden max-w-3xl w-full max-h-[80vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6 bg-gradient-to-r from-orange-600 to-yellow-400 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">{selectedTech.name}</h3>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-600/20 to-yellow-400/20 flex items-center justify-center mr-4">
                      <div className="text-orange-500 text-2xl">[Icon]</div>
                    </div>
                    <div>
                      <span className={`text-sm px-3 py-1 rounded-full ${getLevelColor(selectedTech.level)}`}>
                        {getLevelText(selectedTech.level)}
                      </span>
                      <p className="text-gray-300 mt-2">{selectedTech.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Use Cases</h4>
                    <ul className="space-y-2">
                      {selectedTech.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-300">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Implementation Considerations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Time to Value</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-white">
                            {selectedTech.level === 'core' ? 'Short (1-3 months)' : 
                             selectedTech.level === 'emerging' ? 'Medium (3-6 months)' : 
                             'Long (6+ months)'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Integration Complexity</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                          <span className="text-white">
                            {selectedTech.level === 'core' ? 'Low to Medium' : 
                             selectedTech.level === 'emerging' ? 'Medium to High' : 
                             'High'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">ROI Potential</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                          <span className="text-white">
                            {selectedTech.level === 'core' ? 'Proven' : 
                             selectedTech.level === 'emerging' ? 'Promising' : 
                             'Speculative'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-end">
                    <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300">
                      Download Info Sheet
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-400 text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300">
                      Schedule a Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechnologyVision;