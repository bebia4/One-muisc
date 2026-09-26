/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070709',
          900: '#0A0A0C',
          850: '#0E0E12',
          800: '#121216',
          750: '#17171D',
          700: '#1D1D24',
          600: '#26262F',
          500: '#32323D',
        },
        ember: {
          glow: '#F5B544',
          warm: '#E09A3C',
          deep: '#B3712A',
        },
        /*
          Muted text tones, chosen so both pass WCAG AA (>=4.5:1) on every
          panel shade in use. Tailwind's own slate-500/600 sit at ~4.1:1 here
          and fail, so they are not used for text anywhere on this site.
        */
        mist: '#A8B2C1',
        ash: '#8A94A5',
        parchment: {
          100: '#F6F1E7',
          200: '#E9E0CE',
          300: '#D6C9B0',
          400: '#B8A98C',
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      letterSpacing: {
        'ultra': '0.35em',
        'mega': '0.5em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'drift-slow': 'drift 26s ease-in-out infinite',
        'drift-slower': 'drift 38s ease-in-out infinite',
        'rec-pulse': 'recPulse 1.8s ease-in-out infinite',
        'marquee': 'marquee 38s linear infinite',
        'sheen': 'sheen 3.2s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(3%,-4%,0) scale(1.08)' },
          '66%': { transform: 'translate3d(-3%,3%,0) scale(0.95)' },
        },
        recPulse: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '60%,100%': { transform: 'translateX(220%)' },
        },
      },
    },
  },
  plugins: [],
};
