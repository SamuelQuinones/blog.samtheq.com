module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
  },
  env: {
    node: true,
    browser: true,
  },
  ignorePatterns: ["node_modules/*", "dist/*", "*.cjs", "!.prettierrc"],
  rules: {
    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    "@typescript-eslint/prefer-nullish-coalescing": [
      "warn",
      { ignorePrimitives: { boolean: true} },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
    "@typescript-eslint/unbound-method": ["warn", { ignoreStatic: true }],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
        "ts-expect-error": "allow-with-description",
        minimumDescriptionLength: 10,
      },
    ],
  },
  overrides: [
    {
      files: ["*.tsx", "*.ts"],
      settings: {
        react: {
          version: "detect",
        },
      },
      plugins: ["react-hooks"],
      extends: ["plugin:react/recommended", "plugin:react/jsx-runtime"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [
          "warn",
          {
            additionalHooks: "useIsomorphicLayoutEffect",
          },
        ],
      },
    },
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2020: true,
      },
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "prettier/prettier": "off",
      },
    },
  ],
};
