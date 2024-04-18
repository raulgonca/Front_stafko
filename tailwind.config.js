/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // o 'media' o 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  corePlugins: {
    // Agrega los core plugins que necesitas, por ejemplo:
    preflight: false, // deshabilita preflight si no lo necesitas
  },
  theme: {
    extend: {
      // Agrega tus estilos personalizados aquí
    },
  },
}
