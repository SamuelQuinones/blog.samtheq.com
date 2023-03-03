const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: ["sr-only"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "h1,h2,h3,h4,h5,h6": {
              scrollMarginTop: "4rem",
              "> a": {
                display: "block",
                textDecorationLine: "none",
                "&::after": {
                  opacity: 0,
                  content: `" #"`,
                  color: "rgb(148 163 184)",
                },
                "&:hover": {
                  color: "var(--tw-prose-headings)",
                  "&::after": {
                    opacity: 100,
                  },
                },
              },
            },
            code: {
              fontVariantLigatures: "none",
              "&::before": {
                content: `"" !important`,
              },
              "&::after": {
                content: `"" !important`,
              },
              fontWeight: "normal",
            },
            ":not(pre) > code": {
              background: "#030a11",
              padding: "0.25rem",
              fontSize: "0.95rem !important",
              borderRadius: "0.25rem",
              color: "#86e1fc",
            },
          },
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("disabled-class", ["&.disabled", "&:disabled"]);
    }),
  ],
};
