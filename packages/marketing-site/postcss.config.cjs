/** @type {import('postcss').Postcss} */
module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {
      config: "./tailwind.nextra.config.js",
    },
    "postcss-lightningcss": {
      browsers: ">= .25%",
    },
    autoprefixer: {},
  },
};
