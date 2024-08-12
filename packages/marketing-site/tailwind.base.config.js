const brand = require("./tailwind.brand.config.js");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: ["class", 'html[class~="dark"]'],
  safelist: ["nx-grid-cols-3", "nx-grid-cols-4"],
  theme: {
    extend: {
      screens: {
        "1.5xl": "1440px",
        "3xl": "2560px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulsing-cursor": "pulsing-cursor 1.5s infinite",
      },
      borderColor: {
        "white-12": "rgba(255, 255, 255, 0.12)",
      },
      fontFamily: { ...brand.theme.extend.fontFamily },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        ...brand.theme.extend.colors,
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: { ...brand.theme.extend.fontSize },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulsing-cursor": {
          "0%": { opacity: 1 },
          "25%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
