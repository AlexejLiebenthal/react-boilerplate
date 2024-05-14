const { resolve } = require("node:path");

const project = [resolve(__dirname, "tsconfig.json"), resolve(__dirname, "tsconfig.node.json")];

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:promise/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:unicorn/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.gen.ts", "cloudflare.d.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },

    "jsx-a11y": {
      polymorphicPropName: "as",
      components: {
        Button: "button",
        Image: "img",
        AvatarImage: "img",
      },
    },

    react: {
      buttonComponents: ["Button"],
    },
  },
  plugins: ["react-refresh", "simple-import-sort", "unused-imports"],
  rules: {
    // Default rule from Vite to help with Fast HMR
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    // We will deactivate this rule which was activated by airbnb recommended rules (https://github.com/airbnb/javascript/blob/c25bce83be4db06e6a221d79686c485cd2ed5d5d/packages/eslint-config-airbnb-base/rules/style.js#L340..L358):
    // AirBnB's rule for `for..of` is too strict. We want to allow `for..of` loops. Which also aligns with unicorn's rule.
    // The `for..in` rule is also already disabled in the eslint typescript recommended rule https://typescript-eslint.io/rules/no-for-in-array/
    // The `labels` rule is not necessary because it is part of the `eslint:recommended` rule set. (https://eslint.org/docs/latest/rules/no-labels)
    // The `with statement` rule is not necessary because it is part of the `eslint:recommended` rule set. (https://eslint.org/docs/latest/rules/no-with)
    "no-restricted-syntax": "off",

    // Adding a stylistic rule for type imports.
    // Unfortunately, this is somehow not part of `plugin:@typescript-eslint/stylistic-type-checked`.
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],

    // We make an exception for this rule for JSX attributes,
    // e.g., <form onSubmit={someAsyncSubmitHandler}>...</form>, which is now allowed.
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],

    // With TypeScript, this rules can be safely deactivated.
    "react/require-default-props": "off",
    "react/prop-types": "off",

    // We want to require destructuring and symmetric naming of `useState` hook value and setter variables
    "react/hook-use-state": "error",

    // We want to disallow problematic leaked values from being rendered
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["coerce"] }],

    // We want to allow the use of fragments in JSX in an expression. AirBnB's rule is too strict and disallows it.
    "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],

    // We like to allow `null` in our (react) codebase. But the reasoning behind this rule is completely valid.
    "unicorn/no-null": "off",

    // Configure allowed abbreviations
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: [/db/i, /env/i, /props/i, /ref/i, /fn/i, /src/i, /err/i],
      },
    ],

    // Setup of `unsused-imports` plugin
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // Setup of `simple-import-sort` plugin
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    "import/prefer-default-export": "off",
    "import/no-default-export": "warn",
  },
  overrides: [
    // Configure test rules
    {
      // https://vitest.dev/config/#include
      files: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      settings: {
        jest: {
          globalPackage: "vitest",
          version: "latest",
        },
      },
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react",
        "plugin:jest-formatting/recommended",
      ],
      rules: {
        // We want to enforce the use of `userEvent` over `fireEvent` in testing-library. See also: https://testing-library.com/docs/user-event/intro/
        "testing-library/prefer-user-event": "error",

        // We want to use unbound-method from jest in favor of the one from typescript-eslint in tests.
        "@typescript-eslint/unbound-method": "off",
        "jest/unbound-method": "error",

        // We want to disallow duplicate setup and teardown hooks.
        "jest/no-duplicate-hooks": "error",

        // We want to require lowercase test names.
        "jest/prefer-lowercase-title": "warn",
      },
    },
    {
      files: ["*.config.{js,ts}"],
      rules: {
        // This are some rules for configuration files.
        "import/no-extraneous-dependencies": "off",
        "import/no-default-export": "off",
        "global-require": "off",
        "unicorn/prefer-module": "off",
        "@typescript-eslint/no-unsafe-call": "off",
      },
    },
    {
      files: ["src/components/ui/**/*.{ts,tsx}"],
      rules: {
        "react/jsx-props-no-spreading": "off",
        "react-refresh/only-export-components": "off",
      },
    },
  ],
};
