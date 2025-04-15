module.exports = {
  parser: "@typescript-eslint/parser", // Tells ESLint to use the TypeScript parser
  extends: [
    "eslint:recommended", // ESLint recommended rules
    "plugin:@typescript-eslint/recommended", // TypeScript-specific linting rules
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    // Override/add rules settings here, such as:
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  ignorePatterns: ["dist/", "node_modules/"], // Folders to ignore
};
