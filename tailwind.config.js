/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#81D959',
        secondary: '#7763BF',
        tertiary: '#FFBA55',
        secondary2: '#8E80BF',
        quaternary: '#F2F2F2',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
