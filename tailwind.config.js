/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        suno: '#111111', // Warna background gelap ala musik app
        accent: '#8b5cf6', // Warna ungu
      }
    },
  },
  plugins: [],
}
