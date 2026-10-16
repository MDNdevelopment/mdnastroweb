// Envío del formulario por correo: el navegador llama a este endpoint y este reenvía a un webhook
// de n8n (que manda el correo con Mailgun a transferenciasmdn@gmail.com). Así la URL del webhook y
// el secreto nunca llegan al navegador.
import type { APIRoute } from 'astro';
import { N8N_CONTACT_WEBHOOK_URL, N8N_CONTACT_SECRET } from 'astro:env/server';

export const prerender = false;

const MAX = { nombre: 120, empresa: 120, contacto: 160, mensaje: 3000 };
const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const POST: APIRoute = async ({ request, site }) => {
  // Solo desde el propio sitio (o localhost en desarrollo)
  const origin = request.headers.get('origin') ?? '';
  const allowed = origin === site?.origin || /^https?:\/\/localhost(:\d+)?$/.test(origin);
  if (!allowed) return json({ ok: false, error: 'forbidden' }, 403);

  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // Campo trampa: las personas no lo ven ni lo llenan, los bots sí. Respondemos "ok" sin enviar nada.
  if (typeof b.web === 'string' && b.web.trim()) return json({ ok: true });

  const str = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);
  const data = {
    nombre: str(b.nombre, MAX.nombre),
    empresa: str(b.empresa, MAX.empresa),
    contacto: str(b.contacto, MAX.contacto),
    mensaje: str(b.mensaje, MAX.mensaje),
    servicios: Array.isArray(b.servicios) ? b.servicios.map((s) => str(s, 60)).slice(0, 10) : [],
    tipoPagina: str(b.tipoPagina, 60),
    planRedes: str(b.planRedes, 60),
    pagina: str(b.pagina, 200),
  };
  if (!data.nombre || !data.empresa || !data.contacto || !data.mensaje || data.servicios.length === 0) {
    return json({ ok: false, error: 'invalid' }, 422);
  }

  try {
    const res = await fetch(N8N_CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-mdn-secret': N8N_CONTACT_SECRET },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return json({ ok: false, error: 'upstream' }, 502);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'upstream' }, 502);
  }
};
