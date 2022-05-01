/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
