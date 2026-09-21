/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kin: {
          50: '#f4fbf6',
          100: '#e6f6eb',
          200: '#ceeed6',
          300: '#a3dfb4',
          400: '#71c88d',
          500: '#48ab69',
          600: '#358c52',
          700: '#2c6f43',
          800: '#275838',
          900: '#214930',
          950: '#0e2718',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f8f5ee',
          200: '#f0ebd9',
          300: '#e4dcbe',
          400: '#d5c79e',
        },
        sage: {
          50: '#f5f7f5',
          100: '#e8ebe7',
          200: '#d2d9d1',
          300: '#b2beb0',
          400: '#8e9e8b',
          500: '#71826e',
          600: '#586756',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-fan-1': 'spin 1.2s linear infinite',
        'spin-fan-2': 'spin 0.6s linear infinite',
        'spin-fan-3': 'spin 0.25s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 1.5s infinite',
        'bubble': 'bubble 3s ease-in infinite',
        'droplet': 'droplet 1.5s ease-in infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(10px) scale(0.6)', opacity: '0.2' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-30px) scale(1.1)', opacity: '0' },
        },
        droplet: {
          '0%': { transform: 'translateY(-10px) scale(0.9)', opacity: '1' },
          '80%': { transform: 'translateY(15px) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(20px) scale(0.4)', opacity: '0' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.75))' },
        }
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.05)',
        'soft-lg': '0 16px 45px rgba(0,0,0,0.07)',
        'glow-kin': '0 0 25px -3px rgba(52, 211, 153, 0.35)',
        'glow-amber': '0 0 25px -3px rgba(251, 191, 36, 0.4)',
        'glow-sky': '0 0 25px -3px rgba(56, 189, 248, 0.4)',
      }
    },
  },
  plugins: [],
}
