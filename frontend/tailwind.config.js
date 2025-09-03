// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // This section tells Tailwind to look at all .js and .jsx files in your src folder
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}