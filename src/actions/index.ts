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
      ).default([]),
      objetivo: z.string().optional(),
      mensaje: z.string().min(5),
      // Honeypot: hidden field real users never fill. If it has content,
      // it's a bot — pretend success without touching the database.
      website: z.string().max(0).optional(),
    }),
    handler: async (input) => {
      if (input.website) {
        return { ok: true };
      }

      const { website: _website, ...lead } = input;
      const { error } = await supabaseAdmin.from('leads').insert({
        ...lead,
        objetivo: lead.objetivo ?? null,
        source: 'web-onboarding',
      });

      if (error) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'No se pudo guardar el lead' });
      }

      return { ok: true };
    },
  }),
};
