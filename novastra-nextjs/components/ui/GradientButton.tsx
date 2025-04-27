import { motion } from 'framer-motion';
import Link from 'next/link';

interface GradientButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  animated?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  href,
  onClick,
  children,
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  animated = true,
  external = false,
  icon,
  ariaLabel
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-8 text-base',
    lg: 'py-4 px-10 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-novastra-beige text-novastra-beige hover:bg-novastra-beige hover:text-deep-black'
  };
  
  // Common classes
  const commonClasses = `
    rounded-full font-medium transition-all duration-300 transform 
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${icon ? 'flex items-center justify-center' : ''}
    ${className}
  `;
  
  // Animation variants
  const buttonVariants = {
    initial: {},
    hover: animated ? { 
      scale: 1.05,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10
      } 
    } : {},
    tap: animated ? { 
      scale: 0.98,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10
      } 
    } : {}
  };
  
  // If it's a link
  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <Link href={href} {...linkProps} aria-label={ariaLabel}>
        <motion.span
          className={commonClasses}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </motion.span>
      </Link>
    );
  }
  
  // If it's a button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={commonClasses}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      aria-label={ariaLabel}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default GradientButton;