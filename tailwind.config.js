/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom theme colors
        primary: {
          blue: '#45AEF5',
          white: '#FFFFFF',
          gray: '#1D2633',
          'deep-blue': '#10161F'
        },
        // TON brand colors (keeping for compatibility)
        ton: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#45AEF5', // Using custom blue
          500: '#45AEF5',
          600: '#3a92cc',
          700: '#2f76a3',
          800: '#245a7a',
          900: '#1a3e51',
        }
      },
      fontFamily: {
        'inter-display': ['InterDisplay-Medium', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}