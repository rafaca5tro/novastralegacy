import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

// Process step interface
interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  subSteps: {
    title: string;
    description: string;
  }[];
}

// SVG Icons for each step
const DiscoveryIcon = () => (
  <svg 
    className="w-12 h-12 text-gradient-orange" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const AnalysisIcon = () => (
  <svg 
    className="w-12 h-12 text-gradient-orange" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
    <polyline points="7.5 19.79 7.5 14.6 3 12" />
    <polyline points="21 12 16.5 14.6 16.5 19.79" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const DesignIcon = () => (
  <svg 
    className="w-12 h-12 text-gradient-orange" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ImplementationIcon = () => (
  <svg 
    className="w-12 h-12 text-gradient-orange" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const MeasurementIcon = () => (
  <svg 
    className="w-12 h-12 text-gradient-orange" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

// Process steps data
const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    description: "We begin with a deep dive into your organization's current state, challenges, and aspirations. Our discovery phase establishes the foundation for all subsequent work.",
    icon: <DiscoveryIcon />,
    subSteps: [
      {
        title: "Stakeholder Interviews",
        description: "Conducting in-depth conversations with key personnel across departments to understand perspectives and pain points."
      },
      {
        title: "Data Landscape Assessment",
        description: "Mapping your existing data ecosystem to identify gaps, redundancies, and opportunities for integration."
      },
      {
        title: "Competitive Analysis",
        description: "Researching industry best practices and competitor approaches to establish benchmarks and identify opportunities."
      },
      {
        title: "Cultural Assessment",
        description: "Understanding the organizational culture to ensure solutions align with your team's values and working style."
      }
    ]
  },
  {
    id: 2,
    title: "Analysis",
    description: "Through rigorous analysis, we transform raw data into actionable insights. This phase identifies the highest-impact opportunities for innovation.",
    icon: <AnalysisIcon />,
    subSteps: [
      {
        title: "Gap Analysis",
        description: "Identifying critical disparities between current capabilities and desired outcomes."
      },
      {
        title: "ROI Modeling",
        description: "Calculating potential return on investment for various innovation pathways."
      },
      {
        title: "Barrier Identification",
        description: "Pinpointing technological, organizational, or cultural obstacles that must be addressed."
      },
      {
        title: "Opportunity Prioritization",
        description: "Ranking potential initiatives based on impact, feasibility, and alignment with organizational goals."
      }
    ]
  },
  {
    id: 3,
    title: "Design",
    description: "We create comprehensive, tailored solutions that address your specific challenges while maintaining flexibility for future evolution.",
    icon: <DesignIcon />,
    subSteps: [
      {
        title: "Solution Architecture",
        description: "Designing the technical foundation for innovative solutions that integrate with existing systems."
      },
      {
        title: "Process Engineering",
        description: "Developing new workflows that optimize efficiency and effectiveness."
      },
      {
        title: "User Experience Design",
        description: "Creating intuitive interfaces that encourage adoption and maximize utility."
      },
      {
        title: "Roadmap Development",
        description: "Building a phased implementation plan with clear milestones and success metrics."
      }
    ]
  },
  {
    id: 4,
    title: "Implementation",
    description: "Our implementation approach emphasizes collaboration, knowledge transfer, and sustainable adoption to ensure long-term success.",
    icon: <ImplementationIcon />,
    subSteps: [
      {
        title: "Agile Deployment",
        description: "Utilizing iterative implementation cycles to deliver value quickly and adapt to feedback."
      },
      {
        title: "Change Management",
        description: "Supporting organizational transition through training, communication, and stakeholder engagement."
      },
      {
        title: "System Integration",
        description: "Seamlessly connecting new solutions with existing platforms and data sources."
      },
      {
        title: "Quality Assurance",
        description: "Rigorously testing all aspects of the solution to ensure reliability and performance."
      }
    ]
  },
  {
    id: 5,
    title: "Measurement",
    description: "We establish robust measurement frameworks to track progress, quantify impact, and identify opportunities for continuous improvement.",
    icon: <MeasurementIcon />,
    subSteps: [
      {
        title: "KPI Tracking",
        description: "Monitoring key performance indicators to measure success against predefined goals."
      },
      {
        title: "ROI Validation",
        description: "Calculating actual return on investment to validate the business case and inform future decisions."
      },
      {
        title: "User Feedback Collection",
        description: "Gathering insights from end-users to identify improvement opportunities and measure satisfaction."
      },
      {
        title: "Continuous Improvement Planning",
        description: "Developing action plans to address identified issues and further enhance performance."
      }
    ]
  }
];

const ProcessMethodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState<ProcessStep>(processSteps[0]);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Connected line animation for process steps
  const lineRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    // Animate the progress line when in view
    if (inView && lineRef.current) {
      const length = lineRef.current.getTotalLength();
      
      lineRef.current.style.strokeDasharray = `${length} ${length}`;
      lineRef.current.style.strokeDashoffset = `${length}`;
      
      // Trigger the animation
      setTimeout(() => {
        if (lineRef.current) {
          lineRef.current.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
          lineRef.current.style.strokeDashoffset = '0';
        }
      }, 500);
    }
  }, [inView]);

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Our Methodology" 
          subtitle="A systematic approach to sports innovation that consistently delivers measurable results and lasting impact."
        />
        
        <div className="mt-12 mb-20 relative">
          {/* Process Steps */}
          <div 
            className="flex flex-wrap justify-between relative z-10 px-4"
            ref={ref}
          >
            {/* Connection line */}
            <svg 
              className="absolute top-8 left-0 w-full h-2 hidden md:block" 
              viewBox="0 0 1000 10" 
              preserveAspectRatio="none"
            >
              <path
                ref={lineRef}
                d="M0,5 L1000,5"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
            </svg>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="flex flex-wrap md:flex-nowrap justify-between w-full"
            >
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  variants={itemVariants}
                  className={`process-step relative flex flex-col items-center mb-8 md:mb-0 w-1/2 md:w-auto ${
                    activeStep.id === step.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  } transition-opacity duration-300`}
                  onClick={() => setActiveStep(step)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    activeStep.id === step.id 
                      ? 'bg-gradient-to-r from-orange-600 to-yellow-400 shadow-glow' 
                      : 'bg-gray-800 border border-gray-700'
                  } transition-all duration-500`}>
                    {step.icon}
                    
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 border-2 border-orange-500 flex items-center justify-center text-xs font-bold">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className={`mt-4 text-lg font-bold ${
                    activeStep.id === step.id ? 'text-gradient' : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Active Step Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <GlassCard className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">{activeStep.icon}</div>
                      <h3 className="text-2xl font-bold text-gradient">{activeStep.title}</h3>
                    </div>
                    <p className="text-gray-300">{activeStep.description}</p>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeStep.subSteps.map((subStep, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-800/50 p-5 rounded-lg border border-gray-700"
                        >
                          <h4 className="text-lg font-semibold mb-2 text-white">{subStep.title}</h4>
                          <p className="text-gray-300 text-sm">{subStep.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Process Diagram */}
              <div className="mt-16">
                <h3 className="text-xl font-bold mb-6 text-center text-gradient">Process Flow Visualization</h3>
                
                <div className="relative h-64 md:h-96 mb-8">
                  <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
                    {/* Background grid */}
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Process flow based on active step */}
                    {activeStep.id === 1 && (
                      <g>
                        <motion.circle 
                          cx="200" cy="200" r="60" 
                          fill="url(#orangeGradient)" 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.text 
                          x="200" y="200" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="16"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Discovery
                        </motion.text>
                        <motion.path 
                          d="M260 200 C 350 200, 400 100, 500 100" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        />
                        <motion.text 
                          x="400" y="80" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="14"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          Insights
                        </motion.text>
                        <motion.path 
                          d="M260 200 C 350 200, 400 300, 500 300" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        />
                        <motion.text 
                          x="400" y="320" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="14"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          Requirements
                        </motion.text>
                      </g>
                    )}
                    
                    {activeStep.id === 2 && (
                      <g>
                        <motion.rect 
                          x="150" y="150" 
                          width="100" height="100" 
                          rx="10"
                          fill="url(#orangeGradient)" 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.text 
                          x="200" y="200" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="16"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Analysis
                        </motion.text>
                        
                        <motion.path 
                          d="M250 175 L 350 175 L 350 125 L 450 125" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        />
                        <motion.circle 
                          cx="500" cy="125" r="40" 
                          fill="rgba(255,69,0,0.2)" 
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 1 }}
                        />
                        <motion.text 
                          x="500" y="125" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          Gap Analysis
                        </motion.text>
                        
                        <motion.path 
                          d="M250 200 L 350 200 L 350 200 L 450 200" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                        />
                        <motion.circle 
                          cx="500" cy="200" r="40" 
                          fill="rgba(255,69,0,0.2)" 
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 1.1 }}
                        />
                        <motion.text 
                          x="500" y="200" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.3 }}
                        >
                          ROI Modeling
                        </motion.text>
                        
                        <motion.path 
                          d="M250 225 L 350 225 L 350 275 L 450 275" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        />
                        <motion.circle 
                          cx="500" cy="275" r="40" 
                          fill="rgba(255,69,0,0.2)" 
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 1.2 }}
                        />
                        <motion.text 
                          x="500" y="275" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.4 }}
                        >
                          Prioritization
                        </motion.text>
                        
                        <motion.path 
                          d="M540 200 L 650 200" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          strokeDasharray="10 5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                        />
                        <motion.path 
                          d="M650 160 L 800 160 L 800 240 L 650 240 Z" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="2" 
                          fill="rgba(255,215,0,0.1)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.7 }}
                        />
                        <motion.text 
                          x="725" y="200" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="14"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          Strategic Roadmap
                        </motion.text>
                      </g>
                    )}
                    
                    {activeStep.id === 3 && (
                      <g>
                        <motion.path 
                          d="M150,150 L350,150 L350,250 L150,250 Z" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="rgba(255,69,0,0.1)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                        <motion.text 
                          x="250" y="200" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="16"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Design
                        </motion.text>
                        
                        <motion.path 
                          d="M350 200 L 400 200" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 1 }}
                        />
                        
                        <motion.rect
                          x="400" y="100" 
                          width="200" height="200" 
                          rx="10"
                          fill="rgba(255,215,0,0.1)"
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        />
                        
                        <motion.line 
                          x1="400" y1="150" x2="600" y2="150" 
                          stroke="rgba(255,255,255,0.3)" 
                          strokeWidth="1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        />
                        <motion.line 
                          x1="400" y1="200" x2="600" y2="200" 
                          stroke="rgba(255,255,255,0.3)" 
                          strokeWidth="1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.6 }}
                        />
                        <motion.line 
                          x1="400" y1="250" x2="600" y2="250" 
                          stroke="rgba(255,255,255,0.3)" 
                          strokeWidth="1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.7 }}
                        />
                        
                        <motion.text 
                          x="500" y="130" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                        >
                          Solution Architecture
                        </motion.text>
                        <motion.text 
                          x="500" y="180" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.9 }}
                        >
                          Process Engineering
                        </motion.text>
                        <motion.text 
                          x="500" y="230" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          User Experience
                        </motion.text>
                        <motion.text 
                          x="500" y="280" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.1 }}
                        >
                          Implementation Plan
                        </motion.text>
                        
                        <motion.path 
                          d="M600 200 L 650 200 L 700 150 L 750 250 L 800 150 L 850 250" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 2.2 }}
                        />
                      </g>
                    )}
                    
                    {activeStep.id === 4 && (
                      <g>
                        <motion.path 
                          d="M100,200 Q250,100 400,200 Q550,300 700,200 Q850,100 900,200" 
                          stroke="url(#orangeGradient)" 
                          strokeWidth="4" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5 }}
                        />
                        
                        <motion.circle 
                          cx="100" cy="200" r="15" 
                          fill="#FF4500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        />
                        <motion.text 
                          x="100" y="240" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Start
                        </motion.text>
                        
                        <motion.circle 
                          cx="300" cy="150" r="40" 
                          fill="rgba(255,69,0,0.2)"
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 }}
                        />
                        <motion.text 
                          x="300" y="150" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="14"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          Sprint 1
                        </motion.text>
                        
                        <motion.circle 
                          cx="500" cy="250" r="40" 
                          fill="rgba(255,69,0,0.2)"
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9 }}
                        />
                        <motion.text 
                          x="500" y="250" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="14"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1 }}
                        >
                          Sprint 2
                        </motion.text>
                        
                        <motion.circle 
                          cx="700" cy="150" r="40" 
                          fill="rgba(255,69,0,0.2)"
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.2 }}
                        />
                        <motion.text 
                          x="700" y="150" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="14"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.4 }}
                        >
                          Launch
                        </motion.text>
                        
                        <motion.circle 
                          cx="900" cy="200" r="15" 
                          fill="#FFD700"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5 }}
                        />
                        <motion.text 
                          x="900" y="240" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          Complete
                        </motion.text>
                      </g>
                    )}
                    
                    {activeStep.id === 5 && (
                      <g>
                        <motion.rect 
                          x="100" y="100" 
                          width="800" height="200" 
                          rx="15"
                          fill="rgba(255,69,0,0.05)"
                          stroke="url(#orangeGradient)"
                          strokeWidth="2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        <motion.path 
                          d="M200,250 L200,150 L300,200 L400,100 L500,170 L600,130 L700,180 L800,150" 
                          stroke="#FFD700" 
                          strokeWidth="3" 
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        
                        <motion.path 
                          d="M200,250 L200,200 L300,230 L400,190 L500,240 L600,210 L700,260 L800,220" 
                          stroke="#FF4500" 
                          strokeWidth="3" 
                          fill="none"
                          strokeDasharray="5,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        
                        <motion.text 
                          x="150" y="280" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          Baseline
                        </motion.text>
                        
                        <motion.text 
                          x="300" y="280" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.6 }}
                        >
                          Week 4
                        </motion.text>
                        
                        <motion.text 
                          x="500" y="280" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.7 }}
                        >
                          Week 8
                        </motion.text>
                        
                        <motion.text 
                          x="700" y="280" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                        >
                          Week 12
                        </motion.text>
                        
                        <motion.text 
                          x="850" y="170" 
                          textAnchor="start" 
                          fill="#FFD700" 
                          fontSize="12"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.9 }}
                        >
                          Actual Results
                        </motion.text>
                        
                        <motion.text 
                          x="850" y="220" 
                          textAnchor="start" 
                          fill="#FF4500" 
                          fontSize="12"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          Target KPIs
                        </motion.text>
                        
                        <motion.text 
                          x="500" y="130" 
                          textAnchor="middle" 
                          fill="white" 
                          fontSize="16"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Continuous Performance Monitoring
                        </motion.text>
                      </g>
                    )}
                    
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF4500" />
                        <stop offset="100%" stopColor="#FFD700" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Process Details */}
                <GlassCard className="mb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-gradient">Key Benefits</h4>
                      <ul className="space-y-3">
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">Accelerated innovation cycles with measurable outcomes</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">Sustained adoption through comprehensive change management</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">Solutions aligned with your organization's unique culture and capabilities</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">Clear ROI metrics that demonstrate value to all stakeholders</span>
                        </motion.li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-gradient">How We're Different</h4>
                      <ul className="space-y-3">
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-300">Sports-specific expertise with deep understanding of the unique challenges in the industry</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-300">Human-centered design approach that balances technological capability with usability</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-300">Knowledge transfer focus that builds internal capabilities alongside external solutions</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-300">Outcome-oriented partner with incentives aligned to your success metrics</span>
                        </motion.li>
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProcessMethodology;