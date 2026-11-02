import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ignagu.github.io',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/cv/print/') })],
  i18n: {
    // English first. To add Spanish or French: add 'es' / 'fr' here,
    // create src/i18n/<lang>.json and src/data/cv.<lang>.json,
    // and add thin pages under src/pages/<lang>/ that render the same views.
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
});
