/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a',
        },
        surface: {
          950: '#0a0f1e',
          900: '#0f1529',
          850: '#131a33',
          800: '#182242',
          700: '#223054',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,0.2), 0 20px 60px -15px rgba(37,99,235,0.4)',
        card: '0 10px 40px -12px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.08) 1px, transparent 0)',
        'hero-grad': 'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.15), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out both',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'slide-down': 'slideDown 0.5s ease-out both',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'scanner': 'scanner 2s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(30px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { from: { transform: 'translateY(-20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideInLeft: { from: { transform: 'translateX(-40px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        slideInRight: { from: { transform: 'translateX(40px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        scaleIn: { from: { transform: 'scale(0.9)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        glowPulse: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        gradientX: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        scanner: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
    },
  },
  plugins: [],
};
