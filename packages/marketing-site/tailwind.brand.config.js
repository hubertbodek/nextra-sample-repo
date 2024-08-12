/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-twk-everett-mono)"],
        "secondary-mono": ["var(--font-jetbrains-mono)"],
        sans: ["var(--font-twk-everett)"],
        "secondary-sans": ["var(--font-inter)"],
      },
      colors: {
        brand: {
          yellow: {
            50: "hsl(var(--yellow-50))",
            100: "hsl(var(--yellow-100))",
            200: "hsl(var(--yellow-200))",
            300: "hsl(var(--yellow-300))",
            400: "hsl(var(--yellow-400))",
            500: "hsl(var(--yellow-500))",
            600: "hsl(var(--yellow-600))",
            700: "hsl(var(--yellow-700))",
            800: "hsl(var(--yellow-800))",
            900: "hsl(var(--yellow-900))",
          },
          dark: {
            300: "hsl(var(--dark-300))",
            400: "hsl(var(--dark-400))",
            500: "hsl(var(--dark-500))",
            600: "hsl(var(--dark-600))",
            700: "hsl(var(--dark-700))",
          },
          gray: {
            100: "hsl(var(--gray-100))",
            200: "hsl(var(--gray-200))",
            300: "hsl(var(--gray-300))",
            400: "hsl(var(--gray-400))",
            500: "hsl(var(--gray-500))",
            600: "hsl(var(--gray-600))",
            700: "hsl(var(--gray-700))",
            800: "hsl(var(--gray-800))",
            900: "hsl(var(--gray-900))",
            950: "hsl(var(--gray-950))",
          },
          green: {
            500: "hsl(var(--green-500))",
          },
          olive: {
            500: "hsl(var(--olive-500))",
          },
          ["off-white"]: {
            500: "hsl(var(--off-white-500))",
          },
          ["code-green-dark"]: {
            DEFAULT: "hsl(var(--code-green-dark))",
          },
          danger: {
            50: "hsl(var(--danger-50))",
            500: "hsl(var(--danger-500))",
          },
          info: {
            50: "hsl(var(--info-50))",
            500: "hsl(var(--info-500))",
          },
          success: {
            500: "hsl(var(--success-500))",
          },
          warning: {
            50: "hsl(var(--warning-50))",
            500: "hsl(var(--warning-500))",
          },
        },
        "new-brand": {
          black: "hsl(var(--new-brand-black))",
          "dark-500": "hsl(var(--new-brand-dark-500))",
          "dark-600": "hsl(var(--new-brand-dark-600))",
          white: "hsl(var(--new-brand-white))",
          "yellow-400": "hsl(var(--new-brand-yellow-400))",
          "yellow-500": "hsl(var(--new-brand-yellow-500))",
        },
      },
      fontSize: {
        "new-brand-body1": [
          "var(--new-brand-body-1-font-size)",
          "var(--new-brand-body-1-line-height)",
        ],
        "new-brand-body2": [
          "var(--new-brand-body-2-font-size)",
          "var(--new-brand-body-2-line-height)",
        ],
        "new-brand-body3": [
          "var(--new-brand-body-3-font-size)",
          "var(--new-brand-body-3-line-height)",
        ],
        "new-brand-body4": [
          "var(--new-brand-body-4-font-size)",
          "var(--new-brand-body-4-line-height)",
        ],
        "new-brand-body5": [
          "var(--new-brand-body-5-font-size)",
          "var(--new-brand-body-5-line-height)",
        ],
        "new-brand-body6": [
          "var(--new-brand-body-6-font-size)",
          "var(--new-brand-body-6-line-height)",
        ],
        "new-brand-tag": [
          "var(--new-brand-tag-font-size)",
          "var(--new-brand-tag-line-height)",
        ],
        "new-brand-heading": [
          "var(--new-brand-heading-font-size)",
          "var(--new-brand-heading-line-height)",
        ],
        body1: ["var(--body-1-font-size)", "var(--body-1-line-height)"],
        "body1-mobile": [
          "var(--body-1-mobile-font-size)",
          "var(--body-1-mobile-line-height)",
        ],
        body2: ["var(--body-2-font-size)", "var(--body-2-line-height)"],
        "body2-mobile": [
          "var(--body-2-mobile-font-size)",
          "var(--body-2-mobile-line-height)",
        ],
        body3: ["var(--body-3-font-size)", "var(--body-3-line-height)"],
        "button-large": [
          "var(--button-large-font-size)",
          "var(--button-large-line-height)",
        ],
        "button-small": [
          "var(--button-small-font-size)",
          "var(--button-small-line-height)",
        ],
        h1: ["var(--h1-font-size)", "var(--h1-line-height)"],
        "h1-mobile": [
          "var(--h1-mobile-font-size)",
          "var(--h1-mobile-line-height)",
        ],
        h2: ["var(--h2-font-size)", "var(--h2-line-height)"],
        "h2-mobile": [
          "var(--h2-mobile-font-size)",
          "var(--h2-mobile-line-height)",
        ],
        h3: ["var(--h3-font-size)", "var(--h3-line-height)"],
        "h3-mobile": [
          "var(--h3-mobile-font-size)",
          "var(--h3-mobile-line-height)",
        ],
        h4: ["var(--h4-font-size)", "var(--h4-line-height)"],
        "h4-mobile": [
          "var(--h4-mobile-font-size)",
          "var(--h4-mobile-line-height)",
        ],
        h5: ["var(--h5-font-size)", "var(--h5-line-height)"],
        "h5-mobile": [
          "var(--h5-mobile-font-size)",
          "var(--h5-mobile-line-height)",
        ],
        subhead1: [
          "var(--subhead-1-font-size)",
          "var(--subhead-1-line-height)",
        ],
        "subhead1-mobile": [
          "var(--subhead-1-mobile-font-size)",
          "var(--subhead-1-mobile-line-height)",
        ],
        tag: ["var(--tag-font-size)", "var(--tag-line-height)"],
        tag2: ["var(--tag-2-font-size)", "var(--tag-2-line-height)"],
        "quote-large": [
          "var(--quote-large-font-size)",
          "var(--quote-large-line-height)",
        ],
        "quote-large-mobile": [
          "var(--quote-large-mobile-font-size)",
          "var(--quote-large-mobile-line-height)",
        ],
        "quote-small": [
          "var(--quote-small-font-size)",
          "var(--quote-small-line-height)",
        ],
      },
      const: {
        headerHeight: "var(--header-height)",
        bannerHeight: "var(--banner-height)",
      },
    },
  },
};
