/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'icon-blue': '#59A2F6',
        'details-grey': '#ABABAB',
        'border-grey': '#D7D7D7',
        'positive': '#19B444',
        'positive-light': '#DCFFE6',
        'theme': '#3399FF',
        'theme-light': '#DFEFFF',
        'filter-grey': "#424242",
        'filter-grey-2': "#686868",
        'linear-grey': "#EAEAEA"
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-out': 'fadeOut 1s ease-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
  
    },
  },
  plugins: [],
}