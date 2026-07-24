import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll progress bar
const progressBar = document.querySelector<HTMLElement>('[data-progress]');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.width = `${pct * 100}%`;
  }, { passive: true });
}

// Reveal elements
const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (prefersReduced) {
  reveals.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
} else {
  reveals.forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 87%',
        once: true,
      },
    });
  });
}

// ---- Hero animation ----
import('./hero').then(m => m.initHero(prefersReduced));

// ---- Nosotros ----
import('./nosotros').then(m => m.initNosotros(prefersReduced));

// ---- Servicios horizontal scroll ----
import('./servicios').then(m => m.initServicios(prefersReduced));

// ---- Counter ----
import('./counter').then(m => m.initCounter(prefersReduced));

// ---- Magnetic buttons ----
if (!prefersReduced) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(btn => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * 0.3);
      yTo((e.clientY - cy) * 0.3);
    });
    btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  });
}

// Refresh ScrollTrigger after fonts load
document.fonts.ready.then(() => ScrollTrigger.refresh());
