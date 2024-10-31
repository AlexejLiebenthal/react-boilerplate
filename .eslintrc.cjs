const { resolve } = require("node:path");

const project = [
  resolve(__dirname, "tsconfig.json"),
  resolve(__dirname, "tsconfig.app.json"),
  resolve(__dirname, "tsconfig.node.json"),
];

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
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
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.gen.ts"],
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
      version: "detect",
      buttonComponents: ["Button"],
    },
  },
  plugins: ["react-refresh", "simple-import-sort", "unused-imports"],
  rules: {
    // Default rule from Vite to help with Fast HMR
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

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

    // We want to enforce a consisten function type for function components
    "react/function-component-definition": "error",

    // We want to enforce self-closing components
    "react/self-closing-comp": "error",

    // We want to require destructuring and symmetric naming of `useState` hook value and setter variables
    "react/hook-use-state": "error",

    // We want to disallow problematic leaked values from being rendered
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["coerce"] }],

    // We want to be explicit about the props we pass to components
    "react/jsx-props-no-spreading": "error",

    // We want to disallow to define a prop and not use it
    "react/no-unused-prop-types": "error",

    // We want to disallow the use of `dangerouslySetInnerHTML`
    "react/no-danger": "error",

    // We want to enforce proper props naming
    "react/boolean-prop-naming": "warn",

    // We want to enforce proper handler naming
    "react/jsx-handler-names": "warn",

    // We like to allow `null in some cases as return values in our react codebase - though the reasoning not to use `null` is completely valid: see https://github.com/sindresorhus/meta/discussions/7
    "unicorn/no-null": "warn",

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

    // Setup of `import` plugin for default exports
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

        // We want to use unbound-method implementation from jest eslint rules instead of the one from typescript-eslint in tests.
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
        // This configuation is used to match shadcn style
        "react/jsx-props-no-spreading": "off",
        "react-refresh/only-export-components": "off",
      },
    },
  ],
};
