/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tron-blue': '#00BFFF',
        'tron-dark': '#000E2A',
        'tron-darker': '#000814',
        'cyber-blue': '#33CCFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tron-grid': 'radial-gradient(ellipse at center, #001D3D 0%, #000E2A 70%, #000814 100%)',
      },
      animation: {
        'grid-pulse': 'gridPulse 4s ease-in-out infinite alternate',
        'scanlines': 'scanlines 2s linear infinite',
      },
      boxShadow: {
        'tron': '0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3)',
        'cyber': 'inset 0 0 10px rgba(0, 191, 255, 0.2), 0 0 10px rgba(0, 191, 255, 0.3)',
      }
    },
  },
  plugins: [],
};