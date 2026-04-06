import { defineConfig } from 'vitest/config';
 
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
    setupFiles: [],
    reporters: ['default'],
    testTimeout: 15000,
    hookTimeout: 15000,
  },
});
