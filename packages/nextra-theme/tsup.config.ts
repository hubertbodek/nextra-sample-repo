import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'nextra-theme-docs',
  entry: ['src/index.tsx'],
  format: 'esm',
  dts: true,
  external: ['nextra', 'react', 'react-dom', 'next'],
  outExtension: () => ({ js: '.js' })
})
