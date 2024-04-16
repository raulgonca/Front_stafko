/** @type {import('tailwindcss').Config} */
// tailwind.config.js
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
      backgroundImage: {
        'avatar': 'url(https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg)',
      },
    },
  },
}
