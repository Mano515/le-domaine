// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // À remplacer par le vrai domaine une fois le site déployé (ex: https://ledomaine-grenoble.fr)
  site: 'https://ledomaine-grenoble.netlify.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});