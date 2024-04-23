const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: ["sr-only"],
  theme: {
    container: {
      center: true,
      padding: "0.75rem",
    },
    extend: {
      colors: {
        text: {
          DEFAULT: "hsl(300, 4%, 95%)",
          50: "hsl(300, 4%, 95%)",
          100: "hsl(300, 2%, 90%)",
          200: "hsl(300, 4%, 80%)",
          300: "hsl(300, 3%, 70%)",
          400: "hsl(300, 3%, 60%)",
          500: "hsl(300, 3%, 50%)",
          600: "hsl(300, 3%, 40%)",
          700: "hsl(300, 3%, 30%)",
          800: "hsl(300, 4%, 20%)",
          900: "hsl(300, 2%, 10%)",
          950: "hsl(300, 4%, 5%)",
        },
        background: {
          DEFAULT: "hsl(300, 33%, 10%)",
          50: "hsl(300, 31%, 95%)",
          100: "hsl(300, 33%, 90%)",
          200: "hsl(300, 33%, 80%)",
          300: "hsl(300, 33%, 70%)",
          400: "hsl(300, 33%, 60%)",
          500: "hsl(300, 33%, 50%)",
          600: "hsl(300, 33%, 40%)",
          700: "hsl(300, 33%, 30%)",
          800: "hsl(300, 33%, 20%)",
          900: "hsl(300, 33%, 10%)",
          950: "hsl(300, 31%, 5%)",
        },
        primary: {
          DEFAULT: "hsl(198, 93%, 50%)",
          50: "hsl(198, 92%, 95%)",
          100: "hsl(198, 92%, 90%)",
          200: "hsl(198, 92%, 80%)",
          300: "hsl(198, 93%, 70%)",
          400: "hsl(198, 93%, 60%)",
          500: "hsl(198, 93%, 50%)",
          600: "hsl(198, 93%, 40%)",
          700: "hsl(198, 93%, 30%)",
          800: "hsl(198, 92%, 20%)",
          900: "hsl(198, 92%, 10%)",
          950: "hsl(200, 92%, 5%)",
        },
        secondary: {
          DEFAULT: "hsl(334, 86%, 30%)",
          50: "hsl(333, 85%, 95%)",
          100: "hsl(333, 84%, 90%)",
          200: "hsl(334, 86%, 80%)",
          300: "hsl(334, 86%, 70%)",
          400: "hsl(334, 86%, 60%)",
          500: "hsl(334, 86%, 50%)",
          600: "hsl(334, 86%, 40%)",
          700: "hsl(334, 86%, 30%)",
          800: "hsl(334, 86%, 20%)",
          900: "hsl(333, 84%, 10%)",
          950: "hsl(335, 85%, 5%)",
        },
        accent: {
          DEFAULT: "hsl(100, 46%, 60%)",
          50: "hsl(100, 46%, 95%)",
          100: "hsl(99, 45%, 90%)",
          200: "hsl(100, 45%, 80%)",
          300: "hsl(100, 46%, 70%)",
          400: "hsl(100, 46%, 60%)",
          500: "hsl(100, 46%, 50%)",
          600: "hsl(100, 46%, 40%)",
          700: "hsl(100, 46%, 30%)",
          800: "hsl(100, 45%, 20%)",
          900: "hsl(99, 45%, 10%)",
          950: "hsl(100, 46%, 5%)",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            "sup > a[data-footnote-ref]": {
              scrollMarginTop: "4rem",
            },
            ":not(pre) > code": {
              background: "hsl(var(--background-lighter-10))",
              padding: "0.25rem",
              fontSize: "0.95rem !important",
              borderRadius: "0.25rem",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("disabled", ["&:disabled", "&.disabled"]);
    }),
  ],
};
