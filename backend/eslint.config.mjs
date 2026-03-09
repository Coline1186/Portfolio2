import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist", "build", "node_modules"],
  },

  {
    files: ["**/*.{js,cjs,mjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    rules: {
      "no-console": "off",

      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
]);
