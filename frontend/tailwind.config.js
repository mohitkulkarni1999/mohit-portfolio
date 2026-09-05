/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"JetBrains Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eafff1', 100: '#d1ffe3', 200: '#a8ffcb', 300: '#7dfcb0',
          400: '#4bf08f', 500: '#22d971', 600: '#17b95b', 700: '#0f9447',
          800: '#0d7338', 900: '#0a5c2d',
        },
        amber: {
          300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b',
        },
        surface: {
          950: '#060a08',
          900: '#0a100d',
          850: '#0e1511',
          800: '#141d17',
          700: '#1f2d25',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,217,113,0.2), 0 20px 60px -15px rgba(34,217,113,0.35)',
        card: '0 10px 40px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(125,252,176,0.06) 1px, transparent 0)',
        'hero-grad': 'radial-gradient(circle at 50% 0%, rgba(34,217,113,0.12), transparent 60%)',
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
        'scanner': 'scanner 2.5s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(30px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { from: { transform: 'translateY(-20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideInLeft: { from: { transform: 'translateX(-40px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        slideInRight: { from: { transform: 'translateX(40px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        scaleIn: { from: { transform: 'scale(0.9)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        glowPulse: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        gradientX: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        scanner: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};