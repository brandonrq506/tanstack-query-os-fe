import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginQuery from '@tanstack/eslint-plugin-query'
import reactCompiler from "eslint-plugin-react-compiler"

export default tseslint.config([
  globalIgnores(["dist"]),
  ...pluginQuery.configs['flat/recommended'],
  reactCompiler.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "sort-imports": ["error", { allowSeparatedGroups: true }],
      "array-callback-return": "error",
      complexity: "warn",
      "default-case": "error",
      "default-case-last": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "logical-assignment-operators": "error",
      "line-comment-position": "error",
      "max-depth": "error",
      "max-lines": [
        "error",
        { max: 170, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "error",
        { skipBlankLines: true, skipComments: true },
      ],
      "multiline-comment-style": ["error", "bare-block"],
      "no-await-in-loop": "error",
      "no-alert": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-implicit-coercion": "error",
      "no-lonely-if": "error",
      "no-magic-numbers": ["error", { ignore: [-1, 0, 1] }],
      "no-multi-assign": "error",
      "no-negated-condition": "error",
      "no-nested-ternary": "error",
      "no-return-assign": ["error", "always"],
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": "error",
      "no-unreachable-loop": "error",
      "no-use-before-define": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-promise-reject-errors": "error",
      "prefer-rest-params": "error",
      "prefer-template": "error",
      "require-await": "error",
      yoda: "error",
    }
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ["**/*.spec.{tsx,ts}"],
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      "no-magic-numbers": "off",
    },
  },
  eslintConfigPrettier,
]);
