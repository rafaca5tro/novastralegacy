import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  alignment = 'center',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };
  
  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses[alignment]}`}>
      <motion.h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient ${titleClassName}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={`text-lg opacity-80 max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${subtitleClassName}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;