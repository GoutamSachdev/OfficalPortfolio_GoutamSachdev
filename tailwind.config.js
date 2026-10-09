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
        "spin-reverse": {
          to: { transform: "rotate(-360deg)" }
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        /* Soft idle pulse for the skills core — scale only, so it never
           shifts layout or nudges neighbouring pills. */
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.18)", opacity: "0.15" }
        },
        /* Glow travelling around the core ring — opacity only, so it fades in
           and out instead of snapping back to the start each cycle. */
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        marquee: 'marquee 28s linear infinite',
        // Orbit decorations: slow counter-rotating rings (pure decoration —
        // no text rides on them, so nothing can tilt or drift off-centre).
        // Four different periods so the layers visibly slide past each other
        // rather than looking locked together.
        orbit: 'spin 46s linear infinite',
        'orbit-reverse': 'spin-reverse 62s linear infinite',
        'orbit-fast': 'spin 22s linear infinite',
        'orbit-slower': 'spin 96s linear infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4.5s ease-in-out infinite'
      },
      backgroundImage: {
        circularLight: 'repeating-radial-gradient(rgba(0,0,0,0.04) 2px, #f7f7f5 6px, #f7f7f5 100px)',
        circularDark: 'repeating-radial-gradient(rgba(255,255,255,0.05) 2px, #0f0f10 6px, #0f0f10 100px)'
      }
    }
  }
}