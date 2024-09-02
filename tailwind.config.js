/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        'fill-available': '-webkit-fill-available',
      },
    },
  },
  plugins: [
    require('@tailwindcss/nesting'),
    require('daisyui'),
  ],
}

