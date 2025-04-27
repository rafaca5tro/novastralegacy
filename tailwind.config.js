/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'novastra-orange': '#FF4500',
        'novastra-gold': '#FFD700',
        
        // Secondary Colors
        'deep-black': '#0A0A0A',
        'warm-white': '#F9F9F9',
        'novastra-beige': '#E8E1D9',
        
        // Accent Colors
        'novastra-dark-orange': '#E03E00',
        'novastra-light-gold': '#FFE34D',
        'novastra-gray': '#4A4A4A',
        'novastra-dark-gray': '#1A1A1A',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-novastra': 'linear-gradient(90deg, #FF4500, #FFD700)',
        'gradient-dark': 'linear-gradient(to right, #0A0A0A, #1A1A1A)',
      },
      boxShadow: {
        'novastra': '0 4px 30px rgba(255, 69, 0, 0.2)',
        'novastra-intense': '0 8px 40px rgba(255, 69, 0, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'reveal': 'reveal 0.8s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        reveal: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      transitionTimingFunction: {
        'novastra-ease': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'novastra-elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E8E1D9',
            h1: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}