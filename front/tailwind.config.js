/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brunoAce: ['Bruno Ace', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif']
      },
    },
  },
  plugins: [],
}

