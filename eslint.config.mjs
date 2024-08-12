// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptSort from "eslint-plugin-typescript-sort-keys";
import objectSort from "eslint-plugin-sort-keys-fix";
import nextEslintPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactEslint from "eslint-plugin-react";

export default [
  ...tseslint.config(eslint.configs.recommended, ...tseslint.configs.strict),
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "sort-keys-fix": objectSort,
      "typescript-sort-keys": typescriptSort
    },
    rules: {
      "@typescript-eslint/no-extraneous-class": 0,
      "sort-keys-fix/sort-keys-fix": "error",
      "typescript-sort-keys/interface": "error",
      "typescript-sort-keys/string-enum": "error"
    }
  },
  {
    files: ["**/frontend/**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextEslintPlugin,
      react: reactEslint,
      "react-hooks": reactHooksPlugin
    },
    rules: {
      ...nextEslintPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "@next/next/no-duplicate-head": 0,
      "react/jsx-sort-props": 1
    }
  },
  {
    ignores: ["**/dist/**", "**/.next/**", "**/.turbo/**", "**/next.config.js"]
  }
];
