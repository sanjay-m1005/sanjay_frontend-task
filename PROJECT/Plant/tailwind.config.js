/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        leaf: {
          light: '#86efac',
          DEFAULT: '#10b981',
          dark: '#047857',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 20px 35px -4px rgba(0, 0, 0, 0.06), 0 8px 12px -3px rgba(0, 0, 0, 0.03)',
        'glow-emerald': '0 0 25px -3px rgba(34, 197, 94, 0.35)',
        'glow-blue': '0 0 25px -3px rgba(59, 130, 246, 0.35)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.35)',
      },
      animation: {
        'sway-gentle': 'swayGentle 4s ease-in-out infinite alternate',
        'sway-wilt': 'swayWilt 6s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'float-dew': 'floatDew 3s ease-in-out infinite alternate',
        'wave-flow': 'waveFlow 4s linear infinite',
      },
      keyframes: {
        swayGentle: {
          '0%': { transform: 'rotate(-1.5deg)' },
          '100%': { transform: 'rotate(2.5deg)' },
        },
        swayWilt: {
          '0%': { transform: 'rotate(-0.5deg) translateY(0)' },
          '100%': { transform: 'rotate(1deg) translateY(3px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        floatDew: {
          '0%': { transform: 'translateY(0) scale(0.95)', opacity: '0.6' },
          '100%': { transform: 'translateY(-6px) scale(1.08)', opacity: '1' },
        },
        waveFlow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
