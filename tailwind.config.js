/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode using class strategy
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Covers most Next.js project structures
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js 13+ app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
