// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize CSS minification
      minify: 'terser',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    ssr: {
      external: ['svgo'],
    },
  },
  // Optimize build output
  build: {
    inlineStylesheets: 'auto',
  },
}); 