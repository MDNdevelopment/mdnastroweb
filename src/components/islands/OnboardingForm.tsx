import { useEffect, useRef, useState } from 'react';
import { actions } from 'astro:actions';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { serviceChips } from '../../data/content';

const WEB_CHIP = 'Web & apps';
const TIPOS_PAGINA = ['Landing', 'Web corporativa', 'Sistema', 'Ayúdenme a elegir'];

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type Step = 1 | 2;
type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Step1 {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
}

interface Step2 {
  servicios: string[];
  objetivo: string;
  mensaje: string;
  tipoPagina: string;
}

const INPUT_BASE =
  'w-full bg-[#0C0B0A] border border-white/[.14] rounded-xl px-4 py-3.5 text-[#F6F3EC] text-[16px] font-sans outline-none transition-all duration-250 focus:border-[#FFB200] focus:bg-[#100E0B] placeholder:text-[#6f6a61]';

const LABEL_BASE = 'text-[12px] font-semibold tracking-[1.4px] uppercase text-[#9a9489]';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OnboardingForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>('idle');
  const [s1, setS1] = useState<Step1>({ nombre: '', empresa: '', telefono: '', email: '' });
  const [s2, setS2] = useState<Step2>({ servicios: [], objetivo: '', mensaje: '', tipoPagina: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Step1 | keyof Step2, string>>>({});
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (step !== 2 || widgetId.current || !captchaRef.current) return;

    let cancelled = false;
    const tryRender = () => {
      if (cancelled || !captchaRef.current) return;
      if (!window.turnstile) {
        setTimeout(tryRender, 200);
        return;
      }
      widgetId.current = window.turnstile.render(captchaRef.current, {
        sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (token: string) => {
          setCaptchaToken(token);
          setCaptchaError(false);
        },
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
      });
    };
    tryRender();

    return () => {
      cancelled = true;
    };
  }, [step]);

  useEffect(() => {
    const onPlanSelected = (e: Event) => {
      const plan = (e as CustomEvent<string>).detail;
      setS2(prev => ({
        ...prev,
        servicios: prev.servicios.includes(WEB_CHIP) ? prev.servicios : [...prev.servicios, WEB_CHIP],
        tipoPagina: plan,
      }));
    };
    window.addEventListener('mdn:plan-selected', onPlanSelected);
    return () => window.removeEventListener('mdn:plan-selected', onPlanSelected);
  }, []);

  const toggleChip = (chip: string) => {
    setS2(prev => ({
      ...prev,
      servicios: prev.servicios.includes(chip)
        ? prev.servicios.filter(c => c !== chip)
        : [...prev.servicios, chip],
    }));
    if (errors.servicios) setErrors(prev => ({ ...prev, servicios: undefined }));
  };

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!s1.nombre.trim()) e.nombre = 'required';
    if (!s1.empresa.trim()) e.empresa = 'required';
    if (!s1.telefono.trim() || !isValidPhoneNumber(s1.telefono)) e.telefono = 'required';
    if (!s1.email.trim() || !EMAIL_RE.test(s1.email.trim())) e.email = 'required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (s2.servicios.length === 0) e.servicios = 'required';
    if (!s2.objetivo.trim()) e.objetivo = 'required';
    if (!s2.mensaje.trim()) e.mensaje = 'required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    setStatus('submitting');
    try {
      const fd = new FormData();
      Object.entries(s1).forEach(([k, v]) => fd.append(k, v));
      s2.servicios.forEach(s => fd.append('servicios', s));
      fd.append('objetivo', s2.objetivo);
      fd.append('mensaje', s2.mensaje);
      if (s2.tipoPagina) fd.append('tipoPagina', s2.tipoPagina);
      fd.append('captchaToken', captchaToken);

      const { error } = await actions.submitOnboarding(fd);
      if (error) {
        setStatus('error');
        window.turnstile?.reset(widgetId.current);
        setCaptchaToken('');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
      window.turnstile?.reset(widgetId.current);
      setCaptchaToken('');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8 px-2.5">
        <div className="w-[74px] h-[74px] rounded-full bg-[#FFB200] grid place-items-center mx-auto mb-6">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0C0B0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h3 className="m-0 font-display font-extrabold uppercase" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>¡Recibido!</h3>
        <p className="mt-3.5 mx-auto mb-0 max-w-[420px] text-[16px] leading-[1.6] text-[#B8B3A8]">
          Gracias por confiar en MDN Publicidad. Nuestro equipo revisará tu onboarding y te contactará en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress header */}
      <div className="flex items-center gap-3.5 mb-8">
        <span className="font-display font-extrabold text-[15px] text-[#FFB200] tracking-[1px]">
          PASO 0{step} / 02
        </span>
        <div className="flex flex-1 items-center gap-2.5">
          {([1, 2] as Step[]).map((n, i) => (
            <div key={n} className="flex flex-1 items-center gap-2.5 last:flex-initial">
              <div
                className="w-8 h-8 shrink-0 rounded-full grid place-items-center border-2 font-display font-extrabold text-[13px] transition-all duration-500"
                style={
                  n <= step
                    ? { borderColor: '#FFB200', background: '#FFB200', color: '#0C0B0A' }
                    : { borderColor: 'rgba(255,255,255,.14)', background: 'transparent', color: '#6f6a61' }
                }
              >
                {n < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0C0B0A" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                ) : n}
              </div>
              {i === 0 && (
                <div
                  className="flex-1 h-[2px] rounded-full transition-all duration-500"
                  style={{ background: step > 1 ? '#FFB200' : 'rgba(255,255,255,.14)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot: hidden from real users, bots tend to fill every field. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute w-px h-px opacity-0 pointer-events-none -left-[9999px]"
        />
        {step === 1 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px_22px]">
              {([
                ['nombre', 'Nombre y apellido *', 'text', 'Tu nombre'],
                ['empresa', 'Empresa / Marca *', 'text', 'Nombre de tu empresa'],
                ['email', 'Email *', 'email', 'tucorreo@empresa.com'],
              ] as [keyof Step1, string, string, string][]).map(([name, label, type, placeholder]) => (
                <label key={name} className="flex flex-col gap-2.5">
                  <span className={LABEL_BASE}>{label}</span>
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={s1[name]}
                    onChange={e => {
                      setS1(prev => ({ ...prev, [name]: e.target.value }));
                      if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
                    }}
                    className={`${INPUT_BASE} ${errors[name] ? '!border-[#ff5b4d]' : ''}`}
                  />
                </label>
              ))}
              <label className="flex flex-col gap-2.5">
                <span className={LABEL_BASE}>Teléfono *</span>
                <PhoneInput
                  international
                  defaultCountry="VE"
                  placeholder="Tu número"
                  value={s1.telefono}
                  onChange={value => {
                    setS1(prev => ({ ...prev, telefono: value ?? '' }));
                    if (errors.telefono) setErrors(prev => ({ ...prev, telefono: undefined }));
                  }}
                  className={`mdn-phone ${errors.telefono ? 'mdn-phone-error' : ''}`}
                />
              </label>
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2.5 font-sans text-[14px] font-bold tracking-[1px] uppercase text-[#0C0B0A] bg-[#FFB200] border-0 cursor-pointer px-8 py-4 rounded-full transition-all duration-250 hover:bg-[#FFC233]"
              >
                Siguiente
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="m-0 mb-3.5 text-[13px] font-semibold tracking-[1.5px] uppercase text-[#FFB200]">¿Qué servicios necesitas? *</p>
            <div className="flex flex-wrap gap-2.5 mb-2">
              {serviceChips.map(chip => {
                const on = s2.servicios.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className="font-sans text-[14px] font-semibold cursor-pointer px-5 py-3 rounded-full border transition-all duration-250"
                    style={{
                      background: on ? '#FFB200' : '#0F0E0C',
                      color: on ? '#0C0B0A' : '#C9C4BA',
                      borderColor: on ? '#FFB200' : 'rgba(255,255,255,.16)',
                    }}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
            <p className="m-0 mb-4 text-[13px] text-[#ff5b4d] min-h-[16px]">
              {errors.servicios ? 'Elige al menos un servicio.' : ''}
            </p>

            {s2.servicios.includes(WEB_CHIP) && (
              <div className="mb-6">
                <p className="m-0 mb-3.5 text-[13px] font-semibold tracking-[1.5px] uppercase text-[#FFB200]">¿Qué tipo de página quieres?</p>
                <div role="radiogroup" aria-label="Tipo de página" className="flex flex-wrap gap-2.5">
                  {TIPOS_PAGINA.map(tipo => {
                    const on = s2.tipoPagina === tipo;
                    return (
                      <button
                        key={tipo}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setS2(prev => ({ ...prev, tipoPagina: tipo }))}
                        className="font-sans text-[14px] font-semibold cursor-pointer px-5 py-3 rounded-full border transition-all duration-250"
                        style={{
                          background: on ? '#FFB200' : '#0F0E0C',
                          color: on ? '#0C0B0A' : '#C9C4BA',
                          borderColor: on ? '#FFB200' : 'rgba(255,255,255,.16)',
                        }}
                      >
                        {tipo}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <label className="flex flex-col gap-2.5 mb-5">
              <span className={LABEL_BASE}>¿Cuál es tu objetivo principal? *</span>
              <input
                name="objetivo"
                type="text"
                placeholder="Ej. crear mi página web, aumentar ventas, crecer en redes..."
                value={s2.objetivo}
                onChange={e => {
                  setS2(prev => ({ ...prev, objetivo: e.target.value }));
                  if (errors.objetivo) setErrors(prev => ({ ...prev, objetivo: undefined }));
                }}
                className={`${INPUT_BASE} ${errors.objetivo ? '!border-[#ff5b4d]' : ''}`}
              />
            </label>

            <label className="flex flex-col gap-2.5">
              <span className={LABEL_BASE}>Cuéntanos lo que necesitas *</span>
              <textarea
                name="mensaje"
                rows={4}
                placeholder="Describe tu proyecto o reto actual"
                value={s2.mensaje}
                onChange={e => {
                  setS2(prev => ({ ...prev, mensaje: e.target.value }));
                  if (errors.mensaje) setErrors(prev => ({ ...prev, mensaje: undefined }));
                }}
                className={`${INPUT_BASE} resize-y min-h-[130px] leading-[1.55] ${errors.mensaje ? '!border-[#ff5b4d]' : ''}`}
              />
            </label>

            <div className="mt-6">
              <div ref={captchaRef} />
              {captchaError && (
                <p className="mt-2 text-[13px] text-[#ff5b4d]">Confirma que no eres un robot.</p>
              )}
            </div>

            {status === 'error' && (
              <p className="mt-3 text-[14px] text-[#ff5b4d]">Hubo un error al enviar. Intenta de nuevo.</p>
            )}

            <div className="flex justify-between items-center mt-8 gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold tracking-[1px] uppercase text-[#B8B3A8] bg-transparent border-0 cursor-pointer py-3.5 px-1 transition-colors duration-250 hover:text-[#F6F3EC]"
              >
                ← Atrás
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2.5 font-sans text-[14px] font-bold tracking-[1px] uppercase text-[#0C0B0A] bg-[#FFB200] border-0 cursor-pointer px-8 py-4 rounded-full transition-all duration-250 hover:bg-[#FFC233] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Enviando...' : '¡Empecemos a crecer!'}
                {status !== 'submitting' && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
