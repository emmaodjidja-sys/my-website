import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fafaf6',
        ink: {
          DEFAULT: '#0c0c14',
          2: '#262630',
          3: '#6a6a78',
          4: '#9c9caa',
        },
        rule: '#e2e2dc',
        'hover-tint': '#ededec',
        signature: '#6E1818',
        'image-ground': '#f0ece0',
        tag: {
          h: '#3c4fe0',
          n: '#4f7a5e',
          c: '#9c3a3a',
          f: '#8a6420',
          m: '#5d4078',
        },
      },
      fontFamily: {
        sans: ["'Neue Haas Unica'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'leader':       ['clamp(1.75rem, 3.5vw, 2.625rem)', { lineHeight: '1.05',  letterSpacing: '-0.015em', fontWeight: '700' }],
        'standfirst':   ['16px',     { lineHeight: '1.45',  letterSpacing: '0' }],
        'editor':       ['17px',     { lineHeight: '1.55',  letterSpacing: '0' }],
        'editor-lead':  ['19px',     { lineHeight: '1.5',   letterSpacing: '0' }],
        'strip':        ['11px',     { lineHeight: '1',     letterSpacing: '0.16em', fontWeight: '700' }],
        'card-title':   ['14.5px',   { lineHeight: '1.25',  letterSpacing: '-0.005em', fontWeight: '600' }],
        'card-meta':    ['9.5px',    { lineHeight: '1.4',   letterSpacing: '0.14em',  fontWeight: '600' }],
        'card-foot':    ['10px',     { lineHeight: '1.2',   letterSpacing: '0.10em',  fontWeight: '500' }],
        'nav':          ['11px',     { lineHeight: '1',     letterSpacing: '0.10em',  fontWeight: '500' }],
        'marquee':      ['13px',     { lineHeight: '1.2',   letterSpacing: '0.02em' }],
        'colophon':     ['11px',     { lineHeight: '1.2',   letterSpacing: '0.08em',  fontWeight: '500' }],
        'nameplate':    ['13px',     { lineHeight: '1',     letterSpacing: '0.06em',  fontWeight: '700' }],
        'meta':         ['10px',     { lineHeight: '1.4',   letterSpacing: '0.10em',  fontWeight: '500' }],
      },
      letterSpacing: {
        'wider2': '0.10em',
        'wider3': '0.14em',
        'wider4': '0.16em',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
