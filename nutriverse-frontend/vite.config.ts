import { defineConfig } from 'vite';
import path from 'path';

// Uses Vite's native ESBuild JSX compiler, eliminating Babel & caniuse-lite dependencies
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
