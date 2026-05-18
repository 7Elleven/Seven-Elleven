/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0a1628',
        'dark-blue-light': '#1a2a3a',
        'accent-blue': '#2596be',
        'light-blue': '#4aabcf',
        'neon-blue': '#6ec8e0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.125rem' }],
        sm: ['0.8125rem', { lineHeight: '1.25rem' }],
        base: ['0.9375rem', { lineHeight: '1.5rem' }],
        lg: ['1.0625rem', { lineHeight: '1.625rem' }],
        xl: ['1.1875rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.375rem', { lineHeight: '1.875rem' }],
        '3xl': ['1.625rem', { lineHeight: '2rem' }],
        '4xl': ['2rem', { lineHeight: '2.25rem' }],
        '5xl': ['2.5rem', { lineHeight: '2.75rem' }],
        '6xl': ['3rem', { lineHeight: '1.1' }],
        '7xl': ['3.5rem', { lineHeight: '1.1' }],
        '8xl': ['4.5rem', { lineHeight: '1' }],
        '9xl': ['6rem', { lineHeight: '1' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

