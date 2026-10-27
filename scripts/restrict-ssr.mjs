// Post-build: limita la función SSR de Netlify a /api/*.
//
// El adapter de Astro registra la función con path '/*', así que cada URL que no es un
// archivo estático (404 de bots, redirects de barra final) la invoca y gasta cuota de
// Netlify Functions. Solo /api/contacto necesita función; todo lo demás es HTML estático.

import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../.netlify/v1/functions/ssr/ssr.mjs', import.meta.url);
const src = await readFile(file, 'utf8');

if (!src.includes("path: '/*'")) {
  throw new Error("restrict-ssr: no encontré path: '/*' en ssr.mjs; revisa la versión del adapter.");
}

await writeFile(file, src.replace("path: '/*'", "path: '/api/*'"));
console.log("restrict-ssr: función SSR limitada a '/api/*'");
