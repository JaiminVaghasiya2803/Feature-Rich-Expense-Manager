import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: "readonly",
        global: "writable"
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn", 
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-undef": "off"
    }
  },
  {
    files: ["*.config.js", "*.config.mts", "babel.config.js", "jest.config.js", "metro.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        module: "writable",
        require: "readonly", 
        __dirname: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off"
    }
  }
];
