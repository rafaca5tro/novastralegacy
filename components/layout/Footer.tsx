import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };
  
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

  return (
    <motion.footer 
      className="bg-deep-black border-t border-gray-800 pt-16 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/novastra-logo.png"
                alt="Novastra Legacy" 
                width={180} 
                height={50} 
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-novastra-beige opacity-80 max-w-md">
              Strategic digital transformation for sports innovators. We combine AI, blockchain, and cutting-edge technology to elevate athletes, clubs, and federations into the future of sports.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.linkedin.com/company/novastralegacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-novastra-dark-gray flex items-center justify-center hover:bg-novastra-orange transition-colors duration-300"
                aria-label="Novastra Legacy on LinkedIn"
              >
                <svg className="w-5 h-5 text-novastra-beige" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.223 0h.002z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/novastralegacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-novastra-dark-gray flex items-center justify-center hover:bg-novastra-orange transition-colors duration-300"
                aria-label="Novastra Legacy on Instagram"
              >
                <svg className="w-5 h-5 text-novastra-beige" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-playfair font-bold mb-4 pb-2 border-b border-gray-800">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-novastra-orange transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-novastra-orange transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#expertise" className="hover:text-novastra-orange transition-colors duration-300">
                  Expertise
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="hover:text-novastra-orange transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-novastra-orange transition-colors duration-300">
                  Process
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-playfair font-bold mb-4 pb-2 border-b border-gray-800">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 text-novastra-orange">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a href="mailto:consulting@novastra.ae" className="hover:text-novastra-orange transition-colors duration-300">
                  consulting@novastra.ae
                </a>
              </li>
              <li>
                <Link href="/#contact" className="btn-secondary text-sm mt-4">
                  Schedule a Strategy Session
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Copyright & Legal */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-novastra-beige opacity-70">
            © {currentYear} Novastra Legacy℠. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm text-novastra-beige opacity-70 hover:text-novastra-orange hover:opacity-100 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-novastra-beige opacity-70 hover:text-novastra-orange hover:opacity-100 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;