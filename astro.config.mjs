// @ts-check
import path from 'node:path'
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://mapsformom.com',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  },

  integrations: [
    sitemap({
    filter: (page) => !page.includes('/404'),
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
  }), react(), markdoc(), keystatic()],
});