// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pabluchenkooo.github.io',
  base: '/arar-landing-page/',
  output: 'static',
  build: {
    assets: 'assets',
  },
  vite: {
    optimizeDeps: {
      include: ['p5'],
    },
  },
});
