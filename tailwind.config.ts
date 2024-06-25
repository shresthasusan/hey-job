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
          400: '#2589FE',
          500: '#FFD04F',
          600: '#FFC00E',
          700: '#FFAC10',
        },
        secondary: {
          400: '#FF0080',
          500: '#7928CA',
          600: '#253E94',
        },
        sucess: {
          400: '#00C985',
          500: '#00C985',
          600: '#007310',
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
