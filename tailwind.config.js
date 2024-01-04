/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
            './dist/*.js'
],
  theme: {
    container:{
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        dark: '#0f172a',
        abu: '#f3f4f6',
      },
      fontFamily: {
        roboto: 'Roboto, sans-serif',
      },
    },
  },
  plugins: [],
}

