import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/gallery/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        'moon-field-v1': resolve(import.meta.dirname, 'src/pieces/moon-field/v1/index.html'),
        'moon-field-v2': resolve(import.meta.dirname, 'src/pieces/moon-field/v2/index.html'),
        'deep-dive': resolve(import.meta.dirname, 'src/pieces/deep-dive/index.html'),
        'tree-explorations': resolve(import.meta.dirname, 'src/explorations/trees/index.html'),
      },
    },
  },
});
