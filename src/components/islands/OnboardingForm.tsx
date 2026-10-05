import { useEffect, useState } from 'react';
import { serviceChips, waLink } from '../../data/content';
import { trackEvent } from '../../scripts/analytics';

const WEB_CHIP = 'Web & apps';
const REDES_CHIP = 'Gestión de redes';
const TIPOS_PAGINA = ['Landing', 'Web corporativa', 'Sistema', 'Ayúdenme a elegir'];
const PLANES_REDES = ['MDN Lite', 'MDN Plus', 'MDN Premium', 'Ayúdenme a elegir'];

type Status = 'idle' | 'sent';

interface Fields {
  nombre: string;
  empresa: string;
  servicios: string[];
  tipoPagina: string;
  planRedes: string;
  mensaje: string;
}

const INPUT_BASE =
  'w-full bg-[#0C0B0A] border border-white/[.14] rounded-xl px-4 py-3.5 text-[#F6F3EC] text-[16px] font-sans outline-none transition-all duration-250 focus:border-[#FFB200] focus:bg-[#100E0B] placeholder:text-[#6f6a61]';

const LABEL_BASE = 'text-[12px] font-semibold tracking-[1.4px] uppercase text-[#9a9489]';

const SUBTITLE = 'm-0 mb-3.5 text-[13px] font-semibold tracking-[1.5px] uppercase text-[#FFB200]';

const OPTION_BASE =
  'font-sans text-[14px] font-semibold cursor-pointer px-5 py-3 rounded-full border transition-all duration-250';

const optionStyle = (on: boolean) => ({
  background: on ? '#FFB200' : '#0F0E0C',
  color: on ? '#0C0B0A' : '#C9C4BA',
  borderColor: on ? '#FFB200' : 'rgba(255,255,255,.16)',
});

function buildMessage(f: Fields) {
  const lines = [`Hola MDN Publicidad, soy ${f.nombre.trim()} de ${f.empresa.trim()}.`, '', `Servicios: ${f.servicios.join(', ')}`];
  if (f.servicios.includes(WEB_CHIP) && f.tipoPagina) lines.push(`Tipo de página: ${f.tipoPagina}`);
  if (f.servicios.includes(REDES_CHIP) && f.planRedes) lines.push(`Plan de redes: ${f.planRedes}`);
  lines.push('', f.mensaje.trim());
  return lines.join('\n');
}

export default function OnboardingForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [f, setF] = useState<Fields>({ nombre: '', empresa: '', servicios: [], tipoPagina: '', planRedes: '', mensaje: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [link, setLink] = useState('');

  useEffect(() => {
    const onPlanSelected = (e: Event) => {
      const { servicio, plan } = (e as CustomEvent<{ servicio: 'web' | 'redes'; plan: string }>).detail;
      const chip = servicio === 'redes' ? REDES_CHIP : WEB_CHIP;
      setF(prev => ({
        ...prev,
        servicios: prev.servicios.includes(chip) ? prev.servicios : [...prev.servicios, chip],
        ...(servicio === 'redes' ? { planRedes: plan } : { tipoPagina: plan }),
      }));
    };
    window.addEventListener('mdn:plan-selected', onPlanSelected);
    return () => window.removeEventListener('mdn:plan-selected', onPlanSelected);
  }, []);

  const clearError = (key: keyof Fields) => {
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const toggleChip = (chip: string) => {
    setF(prev => ({
      ...prev,
      servicios: prev.servicios.includes(chip) ? prev.servicios.filter(c => c !== chip) : [...prev.servicios, chip],
    }));
    clearError('servicios');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!f.nombre.trim()) err.nombre = 'required';
    if (!f.empresa.trim()) err.empresa = 'required';
    if (f.servicios.length === 0) err.servicios = 'required';
    if (!f.mensaje.trim()) err.mensaje = 'required';
    setErrors(err);
    if (Object.keys(err).length) return;

    const url = waLink(buildMessage(f));
    setLink(url);
    setStatus('sent');
    trackEvent('generate_lead', {
      tipo_pagina: f.servicios.includes(WEB_CHIP) ? f.tipoPagina || undefined : undefined,
      plan_redes: f.servicios.includes(REDES_CHIP) ? f.planRedes || undefined : undefined,
      servicios: f.servicios.join(', '),
    });
    if (!window.open(url, '_blank', 'noopener,noreferrer')) window.location.href = url;
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-8 px-2.5">
        <div className="w-[74px] h-[74px] rounded-full bg-[#FFB200] grid place-items-center mx-auto mb-6">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0C0B0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h3 className="m-0 font-display font-extrabold uppercase" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>¡Listo, abrimos WhatsApp!</h3>
        <p className="mt-3.5 mx-auto mb-0 max-w-[420px] text-[16px] leading-[1.6] text-[#B8B3A8]">
          Solo falta que envíes el mensaje y te respondemos por ahí. ¿No se abrió?{' '}
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#FFB200] underline">Ábrelo aquí</a>.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-sans text-[13px] font-semibold tracking-[1px] uppercase text-[#B8B3A8] bg-transparent border-0 cursor-pointer transition-colors duration-250 hover:text-[#F6F3EC]"
        >
          ← Editar mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px_22px]">
        {([
          ['nombre', 'Nombre y apellido *', 'Tu nombre'],
          ['empresa', 'Empresa / Marca *', 'Nombre de tu empresa'],
        ] as [keyof Fields, string, string][]).map(([name, label, placeholder]) => (
          <label key={name} className="flex flex-col gap-2.5">
            <span className={LABEL_BASE}>{label}</span>
            <input
              name={name}
              type="text"
              placeholder={placeholder}
              value={f[name] as string}
              onChange={e => {
                setF(prev => ({ ...prev, [name]: e.target.value }));
                clearError(name);
              }}
              className={`${INPUT_BASE} ${errors[name] ? '!border-[#ff5b4d]' : ''}`}
            />
          </label>
        ))}
      </div>

      <p className={`${SUBTITLE} mt-8`}>¿Qué servicios necesitas? *</p>
      <div className="flex flex-wrap gap-2.5 mb-2">
        {serviceChips.map(chip => (
          <button
            key={chip}
            type="button"
            aria-pressed={f.servicios.includes(chip)}
            onClick={() => toggleChip(chip)}
            className={OPTION_BASE}
            style={optionStyle(f.servicios.includes(chip))}
          >
            {chip}
          </button>
        ))}
      </div>
      <p className="m-0 mb-4 text-[13px] text-[#ff5b4d] min-h-[16px]">
        {errors.servicios ? 'Elige al menos un servicio.' : ''}
      </p>

      {f.servicios.includes(WEB_CHIP) && (
        <div className="mb-6">
          <p className={SUBTITLE}>¿Qué tipo de página quieres?</p>
          <div role="radiogroup" aria-label="Tipo de página" className="flex flex-wrap gap-2.5">
            {TIPOS_PAGINA.map(tipo => (
              <button
                key={tipo}
                type="button"
                role="radio"
                aria-checked={f.tipoPagina === tipo}
                onClick={() => setF(prev => ({ ...prev, tipoPagina: tipo }))}
                className={OPTION_BASE}
                style={optionStyle(f.tipoPagina === tipo)}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      )}

      {f.servicios.includes(REDES_CHIP) && (
        <div className="mb-6">
          <p className={SUBTITLE}>¿Qué plan de redes te interesa?</p>
          <div role="radiogroup" aria-label="Plan de redes" className="flex flex-wrap gap-2.5">
            {PLANES_REDES.map(plan => (
              <button
                key={plan}
                type="button"
                role="radio"
                aria-checked={f.planRedes === plan}
                onClick={() => setF(prev => ({ ...prev, planRedes: plan }))}
                className={OPTION_BASE}
                style={optionStyle(f.planRedes === plan)}
              >
                {plan}
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="flex flex-col gap-2.5">
        <span className={LABEL_BASE}>Cuéntanos lo que necesitas *</span>
        <textarea
          name="mensaje"
          rows={4}
          placeholder="Describe tu proyecto, tu objetivo o el reto que tienes hoy"
          value={f.mensaje}
          onChange={e => {
            setF(prev => ({ ...prev, mensaje: e.target.value }));
            clearError('mensaje');
          }}
          className={`${INPUT_BASE} resize-y min-h-[130px] leading-[1.55] ${errors.mensaje ? '!border-[#ff5b4d]' : ''}`}
        />
      </label>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="inline-flex items-center gap-2.5 font-sans text-[14px] font-bold tracking-[1px] uppercase text-[#0C0B0A] bg-[#FFB200] border-0 cursor-pointer px-8 py-4 rounded-full transition-all duration-250 hover:bg-[#FFC233]"
        >
          Enviar por WhatsApp
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </form>
  );
}
