import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0e0e14',
          900: '#16161d',
          850: '#1c1c25',
          800: '#23232e',
          700: '#2e2e3d',
          600: '#3d3d4f',
          500: '#52526a',
          400: '#6b6b85',
          300: '#8a8aa3',
          200: '#acacc0',
          100: '#d2d2de',
          50: '#ededf2',
        },
        terra: {
          700: '#8e4422',
          600: '#a85028',
          500: '#c4653a',
          400: '#d47d52',
          300: '#e4a07a',
          200: '#f0c4a8',
        },
        cream: {
          50: '#fefcf8',
          100: '#f9f4eb',
          200: '#f0e8d8',
          300: '#e4d8c2',
          400: '#d4c4a8',
        },
        gold: {
          600: '#96751a',
          500: '#b8922a',
          400: '#c9a84c',
          300: '#dbc26e',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-source)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.625rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h4': ['clamp(1.0625rem, 1.4vw, 1.3125rem)', { lineHeight: '1.4' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.8' }],
        'body': ['1.0625rem', { lineHeight: '1.8' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'overline': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        'prose': '64ch',
        'wide': '80rem',
        'narrow': '44rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
      animation: {
        grain: 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
}
export default config
