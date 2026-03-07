import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/gallery/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        'majoras-field': resolve(import.meta.dirname, 'src/pieces/majoras-field/index.html'),
      },
    },
  },
});
