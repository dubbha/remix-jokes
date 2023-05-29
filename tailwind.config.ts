import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2.5rem',
      },
    },
    extend: {
      animation: {
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        shimmer: `linear-gradient(
          90deg,
          rgb(255 0 255 0) 0,
          rgb(255 255 255 0.2) 20%,
          rgb(255 255 255 0.5) 60%,
          rgb(255 255 255 0));`,
        radial: "var(--bg-radial)",
      },
      colors: {
        links: "hsl(var(--color-links) / <alpha-value>)",
        "links-hover": "hsl(var(--color-links-hover) / <alpha-value>)",
        foreground: "hsl(var(--color-foreground) / <alpha-value>)",
        background: "hsl(var(--color-background) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        invalid: "hsl(var(--color-invalid) / <alpha-value>)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["baloo", "var(--font-body)"],
      },
    },
  },
  plugins: [],
} satisfies Config

