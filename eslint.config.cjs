const eslintPluginReact = require('eslint-plugin-react')
const eslintPluginReactHooks = require('eslint-plugin-react-hooks')
const pluginPrettier = require('eslint-plugin-prettier')
const pluginTypeScript = require('@typescript-eslint/eslint-plugin')
// const prettierConfig = require('./.prettierrc.json');
const parser = require('@typescript-eslint/parser')

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'writable',
      },
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier: pluginPrettier,
      '@typescript-eslint': pluginTypeScript,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      // 'prettier/prettier': ['error', prettierConfig],
      'react/prop-types': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-redeclare': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
]
