// @ts-check
import { defineConfig, fontProviders, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://mdnpublicidad.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: netlify(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      // Webhook de n8n que envía el correo del formulario (ver src/pages/api/contacto.ts)
      N8N_CONTACT_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret' }),
      N8N_CONTACT_SECRET: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  compressHTML: true,
  prefetch: { defaultStrategy: 'viewport' },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Saira Condensed',
      cssVariable: '--font-display-src',
      weights: [600, 700, 800],
    },
    {
      provider: fontProviders.google(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-sans-src',
      weights: [400, 600, 700],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono-src',
      weights: [400, 500],
    },
  ],
});
