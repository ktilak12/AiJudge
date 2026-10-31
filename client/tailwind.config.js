/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090909',
        'secondary-bg': '#111111',
        'card-bg': '#171717',
        'card-hover': '#1f1f1f',
        'primary-text': '#F5F5F5',
        'secondary-text': '#929292',
        'accent-red': {
          DEFAULT: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.25)',
          muted: '#991B1B'
        },
        'accent-orange': '#F97316',
        'accent-green': '#22C55E',
        'border-subtle': '#262626',
        'border-highlight': '#333333'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.35)',
        'glow-red-lg': '0 0 50px -10px rgba(239, 68, 68, 0.45)',
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.3)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.3)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(239, 68, 68, 0.5)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}

