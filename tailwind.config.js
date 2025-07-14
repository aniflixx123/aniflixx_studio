/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          // Add AniFlixx custom colors
          'aniflixx-purple': '#9333ea',
          'aniflixx-pink': '#ec4899',
          'aniflixx-dark': '#0a0a0a',
          'aniflixx-gray': '#111111'
        }
      },
    },
    plugins: [],
  }