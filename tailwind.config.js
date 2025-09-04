const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Apne default sans-serif font ko 'Inter' set karein
        sans: ['var(--font-inter)', ...fontFamily.sans],
        // Headings ke liye 'serif' font ko 'Playfair Display' set karein
        serif: ['var(--font-playfair-display)', ...fontFamily.serif],
      },
      // Nayi Color Scheme
      colors: {
        'background': '#F5F5F5', // Soft Gray background
        'text-primary': '#222222', // Dark Charcoal for text
        'primary': '#8A3324',     // A rich, warm Brown (Bistre) for accents
        'primary-hover': '#6B281B', // Darker shade for hover
        'secondary': '#A9A9A9',   // Muted Gray for secondary text/borders
        'highlight': '#FFFFFF',  // White for cards and highlights
      },
    },
  },
  plugins: [],
}