import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GradientButton from '../ui/GradientButton';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Particle animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      hue: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.hue = Math.random() > 0.5 ? 33 : 20; // Orange or Gold colors
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.hue === 33 ? 
          `rgba(255, 69, 0, ${this.size * 0.05})` :
          `rgba(255, 215, 0, ${this.size * 0.05})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particle array
    const particlesArray: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
    
    // Animation function
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles with lines
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 140, 0, ${0.2 - distance/500})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, []);
  
  // Staggered text animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom right, #0A0A0A, #1A1A1A)' }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <motion.div 
            className="lg:w-3/5 text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variants={item}
            >
              <span className="text-gradient">Strategic Digital Transformation</span>
              <br />
              <span className="text-novastra-beige">for Sports Innovators</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl opacity-90 max-w-2xl mx-auto lg:mx-0 mb-8"
              variants={item}
            >
              Novastra Legacy harnesses AI, blockchain, and automation to elevate athletes into global icons, 
              empower clubs with cutting-edge strategies, and transform federations into digital pioneers.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start"
              variants={item}
            >
              <GradientButton 
                href="#contact"
                variant="primary"
                size="lg"
                animated={true}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Launch Your Legacy
              </GradientButton>
          
          {/* 3D Animated Logo */}
          <motion.div 
            className="lg:w-2/5 mt-12 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-80 h-80">
              {/* Gradient Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-novastra-orange/20 to-novastra-gold/20 blur-3xl"></div>
              
              {/* Logo */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 8, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                <Image 
                  src="images/novastra-logo.png" 
                  alt="Novastra Legacy Logo" 
                  width={400} 
                  height={400} 
                  className="drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="text-sm mb-2 opacity-70">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;