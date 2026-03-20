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
      cssCodeSplit: false,
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
  // CRITICAL: Inline all stylesheets to eliminate separate CSS network requests
  build: {
    inlineStylesheets: 'always',
  },
}); 