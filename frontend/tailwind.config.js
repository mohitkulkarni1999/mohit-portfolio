/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#1b1a15',
          soft: '#4a4738',
          faint: '#9a968a',
        },
        primary: {
          50: '#fff4ec', 100: '#ffe7d6', 200: '#ffcbab', 300: '#ffa875',
          400: '#fb823d', 500: '#f56218', 600: '#e84a0f', 700: '#c13a0e',
          800: '#9a3010', 900: '#7b2b10',
        },
        surface: {
          950: '#f6f3ea',
          900: '#efebdd',
          850: '#fffdf7',
          800: '#e7e2d3',
          700: '#d6d0be',
        },
      },
      boxShadow: {
        glow: '3px 3px 0 0 #e84a0f',
        card: '3px 3px 0 0 rgba(27,26,21,0.12)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(232,74,15,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,74,15,0.06) 1px, transparent 1px)',
        'hero-grad': 'radial-gradient(circle at 50% 0%, rgba(232,74,15,0.08), transparent 55%)',
      },
    },
  },
  plugins: [],
};