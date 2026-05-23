/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        navy: '#0f172a',
        surface: '#f0f4ff',
      },
      boxShadow: {
        card:  '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.06)',
        blue:  '0 4px 14px rgba(37,99,235,0.3)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
