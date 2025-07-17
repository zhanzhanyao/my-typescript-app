// eslint.config.js (CommonJS 版本)

const pluginTs = require('@typescript-eslint/eslint-plugin');
const parserTs = require('@typescript-eslint/parser');
const pluginPrettier = require('eslint-plugin-prettier');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier 格式检查
      'prettier/prettier': 'error',

      // 类型安全提升
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
    },
    ignores: ['/coverage'],
  },
];
