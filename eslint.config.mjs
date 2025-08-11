// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import objectSort from "eslint-plugin-sort-keys-fix";
import nextEslintPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactEslint from "eslint-plugin-react";
import { fixupPluginRules } from "@eslint/compat";

export default [
  ...tseslint.config(eslint.configs.recommended, ...tseslint.configs.strict),
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "sort-keys-fix": objectSort
    },
    rules: {
      "@typescript-eslint/no-extraneous-class": 0,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_"
        }
      ],
      "sort-keys-fix/sort-keys-fix": "error"
    }
  },
  {
    files: ["**/frontend/**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextEslintPlugin,
      react: reactEslint,
      "react-hooks": fixupPluginRules(reactHooksPlugin)
    },
    rules: {
      ...nextEslintPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "@next/next/no-duplicate-head": 0,
      "react/jsx-sort-props": 1
    }
  },
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/next.config.js",
      "**/ecosystem.config.js"
    ]
  }
];
