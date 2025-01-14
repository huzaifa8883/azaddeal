/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"'],
        sansing: ['"Open Sans","sans-serif"'],
        manrope: ['Manrope', 'sans-serif'],
        helveticaLight: ['"Helvetica Neue-Light"', 'Arial', 'sans-serif','Manrope'], 
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],// yahan Open Sans ko sans font mein add kiya
      },
    },
  },
  plugins: [],
}