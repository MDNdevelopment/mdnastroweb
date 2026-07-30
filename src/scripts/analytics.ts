declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// Delegated click tracking: any element with data-ga-event fires that event,
// with data-ga-* attributes (minus data-ga-event) passed as params.
// Guarded for SSR: this module is also imported by islands rendered server-side.
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-ga-event]');
    if (!el) return;

    const params: Record<string, unknown> = {};
    for (const { name, value } of Array.from(el.attributes)) {
      if (name.startsWith('data-ga-') && name !== 'data-ga-event') {
        params[name.replace('data-ga-', '').replace(/-/g, '_')] = value;
      }
    }
    trackEvent(el.dataset.gaEvent!, params);
  });
}
