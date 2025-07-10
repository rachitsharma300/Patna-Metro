/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'patna-primary': {
          light: '#3A7BD5',  // Vibrant gradient blue
          dark: '#09203F'    // Deep navy
        },
        'patna-accent': {
          light: '#00D2FF',  // Electric cyan
          dark: '#00C6FB'    // Slightly deeper cyan
        },
        'patna-dark': '#0F172A',  // Space navy
        'patna-light': '#F8FAFC'   // Snow white
      },
      backgroundImage: {
        'patna-gradient': 'linear-gradient(to right, #3A7BD5, #00D2FF)',
        'patna-gradient-dark': 'linear-gradient(to right, #09203F, #00C6FB)'
      }
    },
  },
  plugins: [],
}