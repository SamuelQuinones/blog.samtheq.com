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
        // APPEND HERE
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
            "--tw-prose-invert-body": "hsl(var(--text))",
            "--tw-prose-invert-links": "hsl(var(--accent))",
            "--tw-prose-invert-quotes": "hsl(166deg 68% 74%)",
            "--tw-prose-invert-quote-borders": "hsl(var(--background-lighter-10))",
            "--tw-prose-invert-hr": "hsl(var(--background-lighter-10))",
            "--tw-prose-invert-th-borders": "rgb(255,255,255)",
            "--tw-prose-invert-td-borders": "hsl(var(--background-lighter-10))",
            "--tw-prose-invert-bullets": "rgb(255,255,255)",
            "--tw-prose-invert-counters": "rgb(255,255,255)",
            "--tw-prose-invert-captions": "hsl(166deg 68% 74%)",
            img: {
              marginLeft: "auto",
              marginRight: "auto",
            },
            "sup > a[data-footnote-ref]": {
              scrollMarginTop: "4rem",
            },
            "h1,h2,h3,h4,h5,h6": {
              scrollMarginTop: "4rem",
              "> a": {
                color: "var(--tw-prose-headings)",
                display: "block",
                textDecorationLine: "none",
                "&::after": {
                  opacity: 0,
                  content: `" #"`,
                },
                "&:hover": {
                  color: "rgb(255,255,255)",
                  "&::after": {
                    opacity: 0.8,
                  },
                },
              },
            },
            // pre: {
            //   lineHeight: 1.5,
            // },
            code: {
              fontVariantLigatures: "none",
              "&::before": {
                content: `none !important`,
              },
              "&::after": {
                content: `none !important`,
              },
              fontWeight: "normal",
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
