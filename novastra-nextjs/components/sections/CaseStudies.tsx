"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Dynamic import for react-chartjs-2 to prevent SSR issues
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false
});

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Case study data structure
interface CaseStudy {
  id: string;
  title: string;
  client: string;
  clientLogo: string;
  category: string;
  sport: string;
  challenge: string;
  solution: string;
  timeframe: {
    start: string;
    end: string;
    milestones: Array<{
      date: string;
      title: string;
      description: string;
    }>;
  };
  metrics: {
    before: {
      [key: string]: number;
    };
    after: {
      [key: string]: number;
    };
    roi: number;
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  image: string;
}

// Sample case study data
const caseStudiesData: CaseStudy[] = [
  {
    id: 'performance-optimization',
    title: 'Elite Performance Optimization Program',
    client: 'European Elite Football Club',
    clientLogo: '/images/clients/fcb-logo.png',
    category: 'Performance',
    sport: 'Football',
    challenge: 'Declining player availability rate and increasing soft tissue injuries affecting team performance in critical matches.',
    solution: 'Implemented a custom data-driven load management system with real-time monitoring and predictive analytics to optimize training intensity and recovery protocols.',
    timeframe: {
      start: '2023-01',
      end: '2023-06',
      milestones: [
        {
          date: '2023-01',
          title: 'Initial Assessment',
          description: 'Comprehensive evaluation of current performance systems.'
        },
        {
          date: '2023-02',
          title: 'Data Integration',
          description: 'Connected disparate data sources into unified dashboard.'
        },
        {
          date: '2023-03',
          title: 'Model Development',
          description: 'Created predictive injury risk algorithms.'
        },
        {
          date: '2023-05',
          title: 'Staff Training',
          description: 'Comprehensive training on new systems and protocols.'
        },
        {
          date: '2023-06',
          title: 'Full Implementation',
          description: 'Complete rollout across first team and academy.'
        }
      ]
    },
    metrics: {
      before: {
        'Player Availability (%)': 72,
        'Soft Tissue Injuries per Month': 8.5,
        'Recovery Time (days)': 18,
        'High-Intensity Minutes per Game': 32
      },
      after: {
        'Player Availability (%)': 91,
        'Soft Tissue Injuries per Month': 3.2,
        'Recovery Time (days)': 12,
        'High-Intensity Minutes per Game': 41
      },
      roi: 312 // Percentage
    },
    testimonial: {
      quote: "Novastra's approach has transformed our performance department. The data integration and predictive models have given us capabilities we didn't know were possible.",
      author: "Performance Director",
      position: "European Football Club"
    },
    image: 'https://cdn.pixabay.com/photo/2014/11/17/13/17/crossfit-534615_1280.jpg'
  },
  {
    id: 'technology-transformation',
    title: 'Digital Transformation Initiative',
    client: 'Premier Motorsport Racing Team',
    clientLogo: '/images/clients/f1-logo.png',
    category: 'Technology',
    sport: 'Motorsport',
    challenge: 'Legacy systems causing data silos and inefficient workflows between race engineering and factory teams.',
    solution: 'Designed and implemented a cloud-based data ecosystem with real-time synchronization and ML-powered decision support tools.',
    timeframe: {
      start: '2022-09',
      end: '2023-04',
      milestones: [
        {
          date: '2022-09',
          title: 'System Architecture',
          description: 'Design of new cloud infrastructure.'
        },
        {
          date: '2022-11',
          title: 'Data Pipeline Development',
          description: 'Creation of real-time data pipelines.'
        },
        {
          date: '2023-01',
          title: 'ML Model Training',
          description: 'Development of predictive analytics models.'
        },
        {
          date: '2023-02',
          title: 'Winter Testing Integration',
          description: 'Initial deployment during pre-season testing.'
        },
        {
          date: '2023-04',
          title: 'Race Season Launch',
          description: 'Full deployment for race season operations.'
        }
      ]
    },
    metrics: {
      before: {
        'Data Processing Time (minutes)': 42,
        'Strategy Decision Time (seconds)': 85,
        'System Reliability (%)': 94.5,
        'Cross-department Collaboration Score': 6.2
      },
      after: {
        'Data Processing Time (minutes)': 3.5,
        'Strategy Decision Time (seconds)': 12,
        'System Reliability (%)': 99.8,
        'Cross-department Collaboration Score': 8.9
      },
      roi: 280 // Percentage
    },
    testimonial: {
      quote: "In a sport where milliseconds matter, Novastra delivered technology that has fundamentally changed how we operate. The ROI has exceeded our most optimistic projections.",
      author: "Chief Technical Officer",
      position: "Motorsport Organization"
    },
    image: 'https://cdn.pixabay.com/photo/2020/04/08/16/32/server-5017527_1280.jpg'
  },
  {
    id: 'fan-engagement',
    title: 'Next-Gen Fan Engagement Platform',
    client: 'Professional Basketball Franchise',
    clientLogo: '/images/clients/heat-logo.png',
    category: 'Fan Engagement',
    sport: 'Basketball',
    challenge: 'Declining in-arena attendance and digital engagement metrics among key demographic segments.',
    solution: 'Created an immersive fan experience platform combining AR/VR technology, gamification, and personalized content delivery.',
    timeframe: {
      start: '2022-11',
      end: '2023-08',
      milestones: [
        {
          date: '2022-11',
          title: 'Market Research',
          description: 'In-depth analysis of fan preferences and behaviors.'
        },
        {
          date: '2023-01',
          title: 'Platform Design',
          description: 'UX/UI design and technology framework development.'
        },
        {
          date: '2023-03',
          title: 'Beta Testing',
          description: 'Limited release testing with focus groups.'
        },
        {
          date: '2023-05',
          title: 'V1 Release',
          description: 'Initial public release with core features.'
        },
        {
          date: '2023-08',
          title: 'V2 Release',
          description: 'Full feature release with AR integration.'
        }
      ]
    },
    metrics: {
      before: {
        'Arena Attendance (% capacity)': 82,
        'App Engagement (minutes/user/week)': 12,
        'Merchandise Revenue ($/user)': 37,
        'Fan Satisfaction Score': 7.2
      },
      after: {
        'Arena Attendance (% capacity)': 97,
        'App Engagement (minutes/user/week)': 34,
        'Merchandise Revenue ($/user)': 58,
        'Fan Satisfaction Score': 9.1
      },
      roi: 246 // Percentage
    },
    testimonial: {
      quote: "Novastra understood our challenges from day one. Their innovative approach has created a fan experience that's become the envy of the league.",
      author: "VP of Fan Experience",
      position: "Professional Sports Team"
    },
    image: 'https://cdn.pixabay.com/photo/2015/09/02/12/25/basketball-917857_1280.jpg'
  }
];

// Filter categories
const categories = ['All', 'Performance', 'Technology', 'Fan Engagement', 'Commercial'];

const CaseStudies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string>('');
  const detailRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const filteredCases = activeCategory === 'All' 
    ? caseStudiesData 
    : caseStudiesData.filter(caseStudy => caseStudy.category === activeCategory);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isDetailView && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Set default active metric when a case is selected
    if (selectedCase && Object.keys(selectedCase.metrics.before).length > 0) {
      setActiveMetric(Object.keys(selectedCase.metrics.before)[0]);
    }
  }, [isDetailView, selectedCase]);

  const handleCaseClick = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setIsDetailView(true);
  };

  const handleBackClick = () => {
    setIsDetailView(false);
    setSelectedCase(null);
  };

  // Generate chart data for the selected metric
  const generateChartData = (metric: string) => {
    if (!selectedCase) return null;
    
    return {
      labels: ['Before', 'After'],
      datasets: [
        {
          label: metric,
          data: [selectedCase.metrics.before[metric], selectedCase.metrics.after[metric]],
          borderColor: 'rgba(255, 69, 0, 0.8)', // novastra-orange
          backgroundColor: 'rgba(255, 69, 0, 0.2)', // novastra-orange with opacity
          fill: true,
          tension: 0.4,
          pointBackgroundColor: ['#FFD700', '#FF4500'], // novastra-gold, novastra-orange
          pointBorderColor: ['#FFD700', '#FF4500'], // novastra-gold, novastra-orange
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          weight: 'bold' // Font weight as a valid enum value
        },
        bodyFont: {
          size: 14
        },
        padding: 10,
        cornerRadius: 6
      }
    }
  } as const; // Type assertion to ensure compatibility with Chart.js

  // Calculate improvement percentage
  const calculateImprovement = (metric: string) => {
    if (!selectedCase) return 0;
    
    const before = selectedCase.metrics.before[metric];
    const after = selectedCase.metrics.after[metric];
    
    // Some metrics are better when lower (like injury rates)
    const isBetterWhenLower = [
      'Soft Tissue Injuries per Month',
      'Recovery Time (days)',
      'Data Processing Time (minutes)',
      'Strategy Decision Time (seconds)'
    ].includes(metric);
    
    if (isBetterWhenLower) {
      return ((before - after) / before * 100).toFixed(1);
    } else {
      return ((after - before) / before * 100).toFixed(1);
    }
  };

  return (
    <section id="case-studies" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Success Stories & Impact" 
          subtitle="Real-world results from our innovative approaches. Each case study demonstrates measurable improvements and tangible ROI."
        />
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-400 text-white shadow-lg' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!isDetailView ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {filteredCases.map((caseStudy, index) => (
                <GlassCard 
                  key={caseStudy.id} 
                  interactive
                  delay={index * 0.1}
                  className="flex flex-col h-full overflow-hidden group"
                  onClick={() => handleCaseClick(caseStudy)}
                >
                  <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <motion.div 
                      className="h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Use a placeholder gradient background until images are available */}
                      <div className="w-full h-full bg-gradient-to-r from-novastra-orange/20 to-novastra-gold/20 flex items-center justify-center">
                        <span className="text-novastra-orange text-lg font-bold">[Case Study Image]</span>
                      </div>
                    </motion.div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3 py-1 bg-novastra-orange text-white text-xs font-medium rounded-full">
                        {caseStudy.category}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{caseStudy.title}</h3>
                  <div className="mb-3 text-sm text-gray-400">{caseStudy.client} • {caseStudy.sport}</div>
                  
                  <p className="text-gray-300 text-sm mb-4 flex-grow">{caseStudy.challenge}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gradient">ROI:</span>
                        <span className="text-green-400 font-bold">{caseStudy.metrics.roi}%</span>
                      </div>
                      <motion.span 
                        className="text-novastra-orange flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              ref={detailRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="case-study-detail"
            >
              {selectedCase && (
                <>
                  <button 
                    onClick={handleBackClick}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to case studies
                  </button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main information */}
                    <div className="lg:col-span-2">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">{selectedCase.title}</h2>
                      <div className="flex items-center mb-6">
                        <span className="px-3 py-1 bg-novastra-orange text-white text-sm font-medium rounded-full mr-3">
                          {selectedCase.category}
                        </span>
                        <span className="text-gray-400">{selectedCase.client} • {selectedCase.sport}</span>
                      </div>
                      
                      <GlassCard className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gradient">Challenge</h3>
                        <p className="text-gray-300">{selectedCase.challenge}</p>
                      </GlassCard>
                      
                      <GlassCard className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gradient">Solution</h3>
                        <p className="text-gray-300">{selectedCase.solution}</p>
                      </GlassCard>
                      
                      {/* Timeline */}
                      <GlassCard className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gradient">Implementation Timeline</h3>
                        <div className="relative pl-8">
                          {/* Timeline line */}
                          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-novastra-orange to-novastra-gold" />
                          
                          {selectedCase.timeframe.milestones.map((milestone, index) => (
                            <motion.div 
                              key={index}
                              className="mb-6 relative"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                              {/* Timeline dot */}
                              <div className="absolute -left-8 top-1.5 w-6 h-6 bg-gradient-to-r from-novastra-orange to-novastra-gold rounded-full flex items-center justify-center shadow-novastra">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                              
                              <div>
                                <div className="text-sm text-gray-400">{milestone.date}</div>
                                <h4 className="text-lg font-semibold text-white">{milestone.title}</h4>
                                <p className="text-gray-300 text-sm">{milestone.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </GlassCard>
                      
                      {/* Testimonial if available */}
                      {selectedCase.testimonial && (
                        <GlassCard className="mb-8 border border-novastra-orange/20">
                          <div className="relative">
                            <svg className="absolute -top-4 -left-4 w-10 h-10 text-novastra-orange/50" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-lg italic text-gray-300 mb-4">{selectedCase.testimonial.quote}</p>
                            <div className="flex items-center">
                              <div>
                                <div className="font-semibold text-white">{selectedCase.testimonial.author}</div>
                                <div className="text-sm text-gray-400">{selectedCase.testimonial.position}</div>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      )}
                    </div>
                    
                    {/* Metrics and ROI */}
                    <div className="lg:col-span-1">
                      <GlassCard className="sticky top-24">
                        <h3 className="text-xl font-semibold mb-6 text-gradient">Performance Metrics</h3>
                        
                        {/* Metrics Selector */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-400 mb-2">Select Metric:</label>
                          <select 
                            value={activeMetric}
                            onChange={(e) => setActiveMetric(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            {selectedCase && Object.keys(selectedCase.metrics.before).map(metric => (
                              <option key={metric} value={metric}>{metric}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Chart */}
                        {activeMetric && (
                          <div className="mb-6">
                            <div className="h-60">
                              {typeof window !== 'undefined' && (
                                <Line data={generateChartData(activeMetric) || { labels: ['Before', 'After'], datasets: [] }} options={chartOptions} />
                              )}
                            </div>
                            <div className="mt-4 text-center">
                              <span className="font-semibold">Improvement: </span>
                              <span className="text-green-400 font-bold">
                                {calculateImprovement(activeMetric)}%
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Metrics Table */}
                        <div className="overflow-hidden rounded-lg">
                          <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Metric
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Before
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  After
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-800">
                              {selectedCase && Object.keys(selectedCase.metrics.before).map((metric, index) => (
                                <tr key={`${metric}-${index}`} className={activeMetric === metric ? 'bg-gray-800/50' : ''}>
                                  <td className="px-4 py-2 text-sm font-medium text-white">
                                    {metric}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-300">
                                    {selectedCase.metrics.before[metric]}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-green-400 font-semibold">
                                    {selectedCase.metrics.after[metric]}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {/* ROI Calculator */}
                        <div className="mt-8 p-4 bg-gradient-to-r from-novastra-orange/20 to-novastra-gold/20 rounded-lg">
                          <h4 className="text-lg font-semibold mb-2 text-center">Return on Investment</h4>
                          <div className="flex items-center justify-center">
                            <svg className="w-12 h-12 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M15 15H9V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-3xl font-bold ml-2 text-green-400">{selectedCase.metrics.roi}%</span>
                          </div>
                          <p className="text-sm text-center mt-2 text-gray-300">
                            Calculated based on investment costs and resulting performance improvements.
                          </p>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;