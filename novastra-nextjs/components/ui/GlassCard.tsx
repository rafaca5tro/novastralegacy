import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  interactive = true,
  delay = 0
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    },
    hover: interactive ? { 
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 69, 0, 0.2)',
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 20
      } 
    } : {}
  };

  return (
    <motion.div 
      className={`glass-card p-6 rounded-xl ${className} ${interactive ? 'cursor-pointer' : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;