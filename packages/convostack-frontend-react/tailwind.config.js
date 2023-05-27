/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '.convostack',
  theme: {
    fontFamily: {
      sans: ['Arial', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      animation: {
        'conversation-window-fade-enter': 'conversation-window-fade-enter 0.3s ease-in-out',
        'conversation-window-fade-out': 'conversation-window-fade-out 0.3s ease-in-out',
      },
      keyframes: {
        'conversation-window-fade-enter': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'conversation-window-fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      colors: {
        'off-white': "#FAFAFA",
      },
      borderWidth: {
        '1': '1px',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to bottom, #2563EB, #3B82F6)',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
