import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Run header entrance animation only once
  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Expertise', path: '/#expertise' },
    { name: 'Case Studies', path: '/#case-studies' },
    { name: 'Process', path: '/#process' },
    { name: 'Contact', path: '/#contact' },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-deep-black bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={navItemVariants} className="relative z-10">
          <Link href="/" className="block">
            <Image 
              src="https://raw.githubusercontent.com/rafaca5tro/images/main/novastra-logo.png" 
              alt="Novastra Legacy" 
              width={160} 
              height={48} 
              className="h-12 w-auto object-contain transition-opacity hover:opacity-80"
              priority
              unoptimized
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <motion.div key={link.name} variants={navItemVariants}>
              <Link 
                href={link.path}
                className="font-medium text-novastra-beige hover:text-novastra-orange relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-novastra-orange after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={navItemVariants}>
            <Link href="/#contact" className="btn-primary ml-6">
              Start Your Journey
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          variants={navItemVariants}
          className="md:hidden z-30 w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-6 h-0.5 rounded-full bg-novastra-beige mb-1.5 transition-all transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 rounded-full bg-novastra-beige transition-opacity ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-0.5 rounded-full bg-novastra-beige mt-1.5 transition-all transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-deep-black bg-opacity-95 backdrop-filter backdrop-blur-lg z-20 md:hidden flex flex-col"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col h-full justify-center items-center space-y-8 px-4">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={mobileNavItemVariants}>
                    <Link 
                      href={link.path}
                      className="text-2xl font-medium text-novastra-beige hover:text-novastra-orange font-playfair"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={mobileNavItemVariants} className="mt-8">
                  <Link 
                    href="/#contact" 
                    className="btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Your Journey
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;