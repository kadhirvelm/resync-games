// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptSort from "eslint-plugin-typescript-sort-keys";
import objectSort from "eslint-plugin-sort-keys-fix";

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
    ignores: ["**/dist/**", "**/.next/**", "**/.turbo/**", "**/next.config.js"]
  }
];
