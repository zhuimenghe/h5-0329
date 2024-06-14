const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      colors: {
        primary: '#E60000',
        warning:'#FE931F',
        success: '#52C41A',
        secondary: '#ecc94b',
        white:'#fff',
        gray:{
          bg:'#F5F4F9',
          border:'#CECECE',
          DEFAULT:'#8c8c8c',
          dark:'#666'
        }
        // ...
      },
      spacing: {
        'xs':'0.3rem',
        'sm':'0.6rem',
        DEFAULT:'1rem',
        'lg':'1.5rem',
        'xl':'2.5rem',
        '2xl':'3.5rem'
      }
    },
  },
  plugins: [],
}
