import js from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import pluginQuery from "@tanstack/eslint-plugin-query";
import * as tsParser from "@typescript-eslint/parser";
import importX from "eslint-plugin-import-x";
import jest from "eslint-plugin-jest";
import jestDom from "eslint-plugin-jest-dom";
import jsxA11y from "eslint-plugin-jsx-a11y";
import promise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";
import testingLibrary from "eslint-plugin-testing-library";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint, { configs as tseslintConfigs } from "typescript-eslint";

const project = [
  `${import.meta.dirname}/tsconfig.json`,
  `${import.meta.dirname}/tsconfig.app.json`,
  `${import.meta.dirname}/tsconfig.node.json`,
];

export default tseslint.config(
  { ignores: ["dist", "**/*.gen.ts"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslintConfigs.strictTypeChecked,
      ...tseslintConfigs.stylisticTypeChecked,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      importX.flatConfigs.react,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      jsxA11y.flatConfigs.recommended,
      ...pluginQuery.configs["flat/recommended"],
      promise.configs["flat/recommended"],
      comments.recommended,
      unicorn.configs["flat/recommended"],
      ...tailwind.configs["flat/recommended"],
    ],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.builtin },
      parser: tsParser,
      parserOptions: {
        // projectService: true,
        project,
      },
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project,
        },
      },

      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

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

      // Make an exception for this rule for JSX attributes,
      // e.g., <form onSubmit={someAsyncSubmitHandler}>...</form>, which is now allowed.
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      // Enforce a consisten function type for function components
      "react/function-component-definition": "error",

      // Enforce self-closing components
      "react/self-closing-comp": "error",

      // Require destructuring and symmetric naming of `useState` hook value and setter variables
      "react/hook-use-state": "error",

      // Disallow problematic leaked values from being rendered
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["coerce"] }],

      // Be explicit about the props which will be passed to components
      "react/jsx-props-no-spreading": "error",

      // Disallow to define a prop and not use it
      "react/no-unused-prop-types": "error",

      // Disallow the use of `dangerouslySetInnerHTML`
      "react/no-danger": "error",

      // Enforce proper props naming
      "react/boolean-prop-naming": "warn",

      // Enforce proper handler naming
      "react/jsx-handler-names": "warn",

      // This rule is not needed with TypeScript
      "react/prop-types": "off",

      // Configure allowed abbreviations
      "unicorn/prevent-abbreviations": [
        "error",
        {
          ignore: [/db/i, /env/i, /props/i, /ref/i, /fn/i, /src/i, /err/i],
        },
      ],

      // Ensure shorter, consistent, safer regex
      // Probably we should move to `eslint-plugin-regex`: https://github.com/sindresorhus/eslint-plugin-unicorn/pull/2443
      "unicorn/better-regex": "error",

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

      // Enforce a consistent import order
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // npm packages
            "internal", // paths aliased in tsconfig
            "parent", // parent directory imports
            "sibling", // same directory imports
            "index", // index of same directory
            "object", // object imports
            "type", // type imports
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "{react,react-dom,react-dom/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom"],
        },
      ],

      // Prevent circular dependencies
      "import-x/no-cycle": [
        "error",
        {
          maxDepth: Infinity,
          ignoreExternal: true,
        },
      ],

      // Remove unnecessary path segments
      "import-x/no-useless-path-segments": [
        "error",
        {
          noUselessIndex: true,
        },
      ],

      // Prevent importing the same module in multiple places
      "import-x/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],

      // Ensure all imports appear before other statements
      "import-x/first": "error",

      // Ensure new line after imports
      "import-x/newline-after-import": "error",

      // Prevent importing packages through relative paths
      "import-x/no-relative-packages": "error",

      // Ensure consistent use of file extension
      "import-x/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],

      // Ensure imports are resolved correctly
      "import-x/no-unresolved": [
        "error",
        {
          // Ignore all paths that start with `/` (vite public path alias)
          ignore: ["^/"],
        },
      ],

      // Prevent importing dev dependencies in production code
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["*.config.{js,ts}", "tests/**/*.{js,ts,tsx}", "**/*.test.{js,ts,tsx}"],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    settings: {
      jest: {
        globalPackage: "vitest",
        version: "latest",
      },
    },

    extends: [
      jest.configs["flat/recommended"],
      jest.configs["flat/style"],
      jestDom.configs["flat/recommended"],
      testingLibrary.configs["flat/react"],
    ],

    rules: {
      // eslint-plugin-jest-formatting is now part of eslint-plugin-jest and needs to be configured manually
      "jest/padding-around-after-all-blocks": "error",
      "jest/padding-around-after-each-blocks": "error",
      "jest/padding-around-before-all-blocks": "error",
      "jest/padding-around-before-each-blocks": "error",
      "jest/padding-around-describe-blocks": "error",
      "jest/padding-around-test-blocks": "error",
    },
  },
  {
    files: ["**/*.config.{js,ts}"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      // This configuation is used for all non auto fixable rules in shadcn components
      "react/jsx-props-no-spreading": "off",
      "react-refresh/only-export-components": "off",
    },
  },
);
