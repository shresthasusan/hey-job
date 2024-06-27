import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
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
    },
  },
  plugins: [

  ],
};
export default config;
