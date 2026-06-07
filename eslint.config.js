import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Vendored agent-skill bundles (third-party JS) and build output — not first-party source.
  globalIgnores(['dist', '.claude', '.github', '.codex']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message:
            'Raw hex color found. Use brand-token utilities (bg-cta, text-primary, border-border, etc.) instead. If you need a new color, add a token to the @theme block in src/index.css.',
        },
        {
          selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
          message:
            'Raw hex color found. Use brand-token utilities (bg-cta, text-primary, border-border, etc.) instead. If you need a new color, add a token to the @theme block in src/index.css.',
        },
      ],
    },
  },
  {
    files: ['src/components/ProductIllustration.jsx'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    // ProductBrochure.jsx is the single source of truth for the catalog: it
    // co-exports the `products` array that Products.jsx derives its counts from.
    files: ['src/components/ProductBrochure.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['api/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
