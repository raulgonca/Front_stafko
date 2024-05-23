/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#fd9a70',
        'custom-purple': '#655a7c',
        'custom-bluecito': '#00916e',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  corePlugins: {
    preflight: false, // deshabilita preflight si no lo necesitas
  },
};
