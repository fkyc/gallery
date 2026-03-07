import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/gallery/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'majoras-field': resolve(__dirname, 'src/pieces/majoras-field/index.html'),
      },
    },
  },
});
