/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'padel-dark': '#080b14',
        'padel-lime': '#b8ff3c',
        'padel-white': '#f0f0f0',
        'padel-card': '#12182b',
        'padel-hover': '#1a2238'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        display: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}
