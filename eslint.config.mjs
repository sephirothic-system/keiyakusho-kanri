import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'lib/generated/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      '.env*',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '*.d.ts',
      '!src/**/*.d.ts',
    ],
  },
]

export default eslintConfig
