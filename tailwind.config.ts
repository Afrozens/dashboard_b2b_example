import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-01': '#8fcbd9',
        'secondary-01': '#E0E0E0',
      },
      colors: {
        'primary-01': '#8fcbd9',
        'secondary-01': '#E0E0E0',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
export default config;
