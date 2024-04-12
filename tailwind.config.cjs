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
          DEFAULT: "hsl(var(--text) / <alpha-value>)",
        },
        background: {
          "lighter-10": "hsl(var(--background-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
        },
        primary: {
          "lighter-10": "hsl(var(--primary-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          "darker-10": "hsl(var(--primary-darker-10) / <alpha-value>)",
        },
        secondary: {
          "lighter-10": "hsl(var(--secondary-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          "darker-10": "hsl(var(--secondary-darker-10) / <alpha-value>)",
        },
        accent: {
          "lighter-10": "hsl(var(--accent-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          "darker-10": "hsl(var(--accent-darker-10) / <alpha-value>)",
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
