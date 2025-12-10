/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'thanos-red': '#F50010',      // Tu Rojo Puro (Acción principal)
        'thanos-charcoal': '#000000', // Tu Gris Carbón (Textos oscuros, fondos oscuros)
        'thanos-blue': '#0356C9',     // Tu Azul Láser (Acciones secundarias, en lugar del verde)
      }
    },
  },
  plugins: [],
}