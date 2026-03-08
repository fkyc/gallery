import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/gallery/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        'moon-field': resolve(import.meta.dirname, 'src/pieces/moon-field/index.html'),
        'deep-dive': resolve(import.meta.dirname, 'src/pieces/deep-dive/index.html'),
      },
    },
  },
});
