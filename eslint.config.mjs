import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
export default [
  { ignores: ['dist/**', 'node_modules/**'] },

  js.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...(prettierConfig.rules ?? {}),

      /**
       * IMPORTANT:
       * ESLint's core `no-undef` rule does not understand TypeScript type positions.
       * TS itself handles undefined identifiers correctly.
       */
      'no-undef': 'off',

      '@typescript-eslint/explicit-function-return-type': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],

      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ]
    }
  }
];
