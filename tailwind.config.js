/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        colors: {
          'tea-green': '#CCD5AE',
          'beige-light': '#E9EDC9',
          'corn-silk': '#FEFAE0',
          'papaya-whip': '#FAEDCD',
          'buff-md': '#D4A373'
        }
      }
    }
  },
  plugins: []
}
