import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'auth-bg': "url('/public/images/authbg.png')"
      },
      colors: {
        'primary-blue': '#1034A6',
        'primary-green': '#6BBC3B',
        'gray': '#F1F4F9',
        'secondary-green': '#e1f2d8',
        'yellow': '#fcbe2d'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config