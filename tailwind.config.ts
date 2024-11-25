import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {

        // Complex site-specific row configuration
        'dashboard': '200px minmax(500px, 1fr) 100px',
      },
      colors: {
        primary: {
          400: '#fff6de',
          500: '#ffc82c',
          600: '#FFC00E',
          700: '#FFAC10',
        },
        secondary: {
          400: '#FF0080',
          500: '#7928CA',
          600: '#253E94',
        },
        sucess: {
          400: '#d2fff0',
          500: '#00C985',
          600: '#007310',
        },
        danger: {
          400: '#ffe1e1',
          500: '#FF4D4D',
          600: '#FF0000',
        },
      },

    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      pulse: {
        '0%, 100%': {
          opacity: '1',
        },
        '50%': {
          opacity: '0.5',
        },
      },
    },

  },
  plugins: [

  ],
};
export default withUt(config);
