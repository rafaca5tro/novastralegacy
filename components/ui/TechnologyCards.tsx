import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface TechnologyCardProps {
  name: string;
  iconUrl: string;
  description: string;
  level: 'Core Technology' | 'Emerging Solution';
  useCases: string[];
  onClick: () => void;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  iconUrl,
  description,
  level,
  useCases,
  onClick
}) => {
  // Level styling
  const getLevelStyle = () => {
    return level === 'Core Technology' 
      ? 'bg-orange-600 text-white'
      : 'bg-amber-500 text-white';
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <GlassCard className="h-full flex flex-col overflow-hidden">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600/20 to-yellow-400/20 flex items-center justify-center mr-3">
            {/* Icon from public CDN */}
            <img src={iconUrl} alt={`${name} icon`} className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelStyle()}`}>
              {level}
            </span>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="mt-auto">
          <div className="text-sm font-medium text-gray-400 mb-2">Key Use Cases:</div>
          <ul className="text-sm text-gray-300">
            {useCases.slice(0, 2).map((useCase, i) => (
              <li key={i} className="flex items-start mb-1">
                <svg className="w-4 h-4 text-orange-500 mt-0.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{useCase}</span>
              </li>
            ))}
            {useCases.length > 2 && (
              <li className="text-orange-400 text-xs mt-1">+ {useCases.length - 2} more use cases</li>
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
  );
};

// Data for the technology cards
const technologies = [
  {
    id: 'python',
    name: 'Python',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description: 'Our primary language for data processing, analytics, and machine learning implementations.',
    level: 'Core Technology',
    useCases: [
      'Athlete performance prediction models',
      'Injury risk assessments',
      'Automated video analysis'
    ]
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    description: 'Deep learning framework used for complex pattern recognition and predictive modeling.',
    level: 'Core Technology',
    useCases: [
      'Movement pattern analysis',
      'Game strategy optimization',
      'Computer vision for technique analysis'
    ]
  },
  {
    id: 'tableau',
    name: 'Tableau',
    iconUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tableau.svg',
    description: 'Interactive data visualization tool enabling stakeholders to explore insights intuitively.',
    level: 'Core Technology',
    useCases: [
      'Performance dashboards',
      'Scouting reports',
      'Executive KPI tracking'
    ]
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    iconUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snowflake.svg',
    description: 'Cloud data platform providing scalable storage and processing capabilities for large datasets.',
    level: 'Core Technology',
    useCases: [
      'Centralized data warehousing',
      'Cross-team data sharing',
      'High-performance analytics queries'
    ]
  },
  {
    id: 'dbt',
    name: 'dbt',
    iconUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dbt.svg',
    description: 'Data transformation tool that enables analytics engineers to transform data in their warehouse efficiently.',
    level: 'Emerging Solution',
    useCases: [
      'Standardizing metrics definitions',
      'Data quality testing',
      'Modular analytics workflows'
    ]
  }
];

const TechnologyCards: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const handleCardClick = (techId: string) => {
    setSelectedTech(techId);
    // You can implement a modal or details view here
    console.log(`Technology selected: ${techId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          name={tech.name}
          iconUrl={tech.iconUrl}
          description={tech.description}
          level={tech.level as 'Core Technology' | 'Emerging Solution'}
          useCases={tech.useCases}
          onClick={() => handleCardClick(tech.id)}
        />
      ))}
    </div>
  );
};

export default TechnologyCards;