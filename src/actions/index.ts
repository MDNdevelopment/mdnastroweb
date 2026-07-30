import { ActionError, defineAction } from 'astro:actions';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { supabaseAdmin } from '../lib/supabase';

export const server = {
  submitOnboarding: defineAction({
    accept: 'form',
    input: z.object({
      nombre: z.string().min(2),
      empresa: z.string().min(1),
      telefono: z.string().refine(isValidPhoneNumber, { message: 'Número de teléfono inválido' }),
      email: z.string().email(),
      servicios: z.union([z.array(z.string()), z.string()]).transform(v =>
        Array.isArray(v) ? v : [v]
      ).refine(v => v.length >= 1, { message: 'Elige al menos un servicio' }),
      objetivo: z.string().min(1, 'El objetivo es requerido'),
      mensaje: z.string().min(5),
      tipoPagina: z.string().optional(),
      captchaToken: z.string().optional(),
      // Honeypot: hidden field real users never fill. If it has content,
      // it's a bot — pretend success without touching the database.
      website: z.string().max(0).optional(),
    }),
    handler: async (input) => {
      if (input.website) {
        return { ok: true };
      }

      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: import.meta.env.TURNSTILE_SECRET_KEY,
          response: input.captchaToken ?? '',
        }),
      });
      const outcome = await verify.json();
      if (!outcome.success) {
        throw new ActionError({ code: 'FORBIDDEN', message: 'Verificación anti-bot fallida' });
      }

      const { website: _website, captchaToken: _captchaToken, tipoPagina, ...lead } = input;
      const { error } = await supabaseAdmin.from('leads').insert({
        ...lead,
        tipo_pagina: tipoPagina || null,
        source: 'web-onboarding',
      });

      if (error) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'No se pudo guardar el lead' });
      }

      return { ok: true };
    },
  }),
};
