/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snake: '#22c55e',
        apple: '#ef4444',
        bomb: '#f59e0b',
        slow: '#3b82f6',
        invincible: '#a855f7',
      }
    },
  },
  plugins: [],
}

