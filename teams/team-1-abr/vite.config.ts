import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite + Vitest config. Vitest runs unit tests in jsdom so React components can be tested.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    // e2e specs are run by Playwright, not Vitest.
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
  },
});
