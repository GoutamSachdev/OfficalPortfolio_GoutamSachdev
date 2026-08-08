/** @type {import('tailwindcss').Config} */
const {fontFamily} = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        mont: ['var(--font-mont)',...fontFamily.sans]
      },
      colors: {
        dark: "#0f0f10",
        light: "#f7f7f5",
        primary: "#B63E96",
        primaryDark: "#58E6D9",
        muted: "#6b6b70",
        line: "#e5e5e2",
        lineDark: "#2a2a2d",
        mixColr: ["#121212", "rgba(131,58,180,1)", "rgba(253,29,29,1)", "rgba(252,176,69,1)", "rgba(131,58,180,1)", "#121212"]
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(0,0,0,0.08), 0 1px 3px -1px rgba(0,0,0,0.06)",
        card: "0 10px 30px -12px rgba(0,0,0,0.18), 0 4px 10px -6px rgba(0,0,0,0.10)",
        cardHover: "0 22px 48px -16px rgba(0,0,0,0.22), 0 8px 18px -8px rgba(0,0,0,0.14)",
        glow: "0 0 0 1px rgba(182,62,150,0.25), 0 8px 24px -8px rgba(182,62,150,0.35)"
      },
      keyframes: {
        spin: {
          to: { transform: "rotate(360deg)" }
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        marquee: 'marquee 28s linear infinite'
      },
      backgroundImage: {
        circularLight: 'repeating-radial-gradient(rgba(0,0,0,0.04) 2px, #f7f7f5 6px, #f7f7f5 100px)',
        circularDark: 'repeating-radial-gradient(rgba(255,255,255,0.05) 2px, #0f0f10 6px, #0f0f10 100px)'
      }
    }
  }
}