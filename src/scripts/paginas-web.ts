import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPaginasWeb(reduced: boolean) {
  initHero(reduced);
  initWhy(reduced);
  initProceso(reduced);
  initPlanes(reduced);
}

// ---- Hero: entrada + parallax leve de las figuras flotantes ----
function initHero(reduced: boolean) {
  const h1 = document.querySelector<HTMLElement>('[data-pw-h1]');
  const sub = document.querySelector<HTMLElement>('[data-pw-sub]');
  const cta = document.querySelector<HTMLElement>('[data-pw-cta]');
  const shapes = document.querySelector<HTMLElement>('[data-pw-shapes]');

  if (reduced) {
    [h1, sub, cta].forEach((el) => {
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    return;
  }

  if (h1 && sub && cta) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(h1, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(sub, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
      .to(cta, { opacity: 1, y: 0, duration: 0.7 }, 0.3);
  }

  if (shapes) {
    const heroSection = shapes.closest<HTMLElement>('[data-pw-hero]') ?? shapes;
    gsap.to(shapes, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

// ---- Por qué: tarjetas de estadística con conteo ----
function initWhy(reduced: boolean) {
  const section = document.querySelector<HTMLElement>('[data-pw-why]');
  const counts = Array.from(document.querySelectorAll<HTMLElement>('[data-pw-count]'));
  const hint = document.querySelector<HTMLElement>('[data-pw-scroll-hint]');
  if (!section) return;

  if (reduced) {
    counts.forEach((el) => {
      el.textContent = el.dataset.target ?? '0';
    });
    return;
  }

  counts.forEach((el) => {
    const target = Number(el.dataset.target ?? '0');
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  if (hint) {
    gsap.to(hint, { scaleY: 0.4, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}

// ---- Proceso: acto pinneado con mockup de navegador que evoluciona en 4 capas ----
function initProceso(reduced: boolean) {
  const pin = document.querySelector<HTMLElement>('[data-pw-proceso-pin]');
  const stageWrap = document.querySelector<HTMLElement>('[data-pw-stage-wrap]');
  const stepsNav = document.querySelector<HTMLElement>('[data-pw-steps-nav]');
  const panels = document.querySelector<HTMLElement>('[data-pw-panels]');
  const stage = document.querySelector<HTMLElement>('[data-pw-stage]');
  const canvas = document.querySelector<HTMLElement>('[data-pw-canvas]');
  const url = document.querySelector<HTMLElement>('[data-pw-url]');
  const urlDot = document.querySelector<HTMLElement>('[data-pw-url-dot]');
  const progress = document.querySelector<HTMLElement>('[data-pw-progress]');

  if (!pin || !stage || !canvas || !stepsNav || !panels) return;

  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-pw-layer]'));
  const panelEls = Array.from(document.querySelectorAll<HTMLElement>('[data-pw-panel]'));
  const stepNavItems = Array.from(document.querySelectorAll<HTMLElement>('[data-pw-step-nav-item]'));
  if (layers.length < 4 || panelEls.length < 4 || stepNavItems.length < 4) return;

  const RATIO = 720 / 468;

  // Estado final estático para reduced-motion: se muestra el último paso, sin pin ni animación.
  if (reduced) {
    gsap.set(layers.slice(0, -1), { opacity: 0 });
    gsap.set(layers[layers.length - 1], { opacity: 1 });
    gsap.set(panelEls.slice(0, -1), { opacity: 0 });
    gsap.set(panelEls[panelEls.length - 1], { opacity: 1, y: 0 });
    stepNavItems.forEach((el, i) => { el.style.opacity = i === stepNavItems.length - 1 ? '1' : '.35'; });
    if (url) url.textContent = 'https://tunegocio.com';
    if (urlDot) urlDot.style.background = '#7FBF6A';
    if (progress) progress.style.transform = 'scaleX(1)';
    document.querySelectorAll<HTMLElement>('[data-pw-chip]').forEach((el) => { el.style.opacity = '1'; });
    requestAnimationFrame(fitStage);
    return;
  }

  function fitStage() {
    if (!stage || !canvas || !pin || !stageWrap) return;
    const availH = stageWrap.clientHeight || pin!.clientHeight - 200;
    const colW = stageWrap.clientWidth || 1080;
    const w = Math.max(260, Math.min(1080, colW, availH * RATIO));
    stage.style.maxWidth = 'none';
    stage.style.width = `${w}px`;
    canvas.style.transform = `scale(${w / 720})`;
    ScrollTrigger.refresh();
  }

  requestAnimationFrame(fitStage);
  window.addEventListener('resize', fitStage);

  // Entrada de las notas de briefing (capa 0) al llegar a la sección.
  const wfEls = document.querySelectorAll<HTMLElement>('[data-pw-wf]');
  gsap.from(wfEls, {
    opacity: 0, y: 22, scale: 0.94, stagger: 0.07, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: pin, start: 'top 75%', once: true },
  });

  const urls = ['brief-tunegocio.md', 'diseño / arte', 'localhost:4321 · build', 'https://tunegocio.com'];
  const dots = ['#55514B', '#FFB200', '#FFB200', '#7FBF6A'];
  const pinScrollPct = 420; // largo del pin en % de viewport

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${pinScrollPct}%`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const codeEls = document.querySelectorAll<HTMLElement>('[data-pw-code]');
  const chipEls = document.querySelectorAll<HTMLElement>('[data-pw-chip]');

  for (let i = 1; i < 4; i++) {
    tl.addLabel(`s${i}`, '+=0.55');
    tl.to(layers[i - 1], { opacity: 0, scale: 0.965, filter: 'blur(7px)', duration: 0.5 }, `s${i}`)
      .fromTo(layers[i], { opacity: 0, scale: 1.05, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6 }, `s${i}`)
      .to(panelEls[i - 1], { opacity: 0, y: -34, duration: 0.35 }, `s${i}`)
      .fromTo(panelEls[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55 }, `s${i}+=0.2`)
      .to(stepNavItems, { opacity: 0.35, duration: 0.3 }, `s${i}`)
      .to(stepNavItems[i], { opacity: 1, duration: 0.3 }, `s${i}`)
      .to(stage, { rotateY: i % 2 ? -3 : 3, duration: 0.5 }, `s${i}`)
      .to(stage, { rotateY: 0, duration: 0.6 }, `s${i}+=0.5`);

    if (i === 2) {
      tl.fromTo(codeEls, { opacity: 0, x: -14 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.3 }, 's2+=0.4');
    }
    if (i === 3) {
      tl.fromTo(chipEls, { opacity: 0, y: 22, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.4, ease: 'back.out(2)' }, 's3+=0.5');
    }
  }
  tl.to({}, { duration: 0.6 });

  // Estado de la URL simulada, independiente de la dirección del scroll.
  const marks = [0, tl.labels.s1, tl.labels.s2, tl.labels.s3];
  let cur = -1;
  const setStep = () => {
    const t = tl.time();
    let i = 0;
    for (let k = 1; k < 4; k++) if (t >= marks[k] + 0.18) i = k;
    if (i === cur) return;
    cur = i;
    if (url) url.textContent = urls[i];
    if (urlDot) urlDot.style.background = dots[i];
  };
  tl.eventCallback('onUpdate', setStep);
  setStep();

  if (progress) {
    tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0);
  }
  ScrollTrigger.refresh();
}

// ---- Planes: reveal escalonado + tilt 3D en hover ----
function initPlanes(reduced: boolean) {
  const cards = document.querySelectorAll<HTMLElement>('[data-pw-plan-card]');
  if (!cards.length) return;

  if (reduced) {
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: cards[0], start: 'top 85%', once: true },
  });

  cards.forEach((card) => {
    const rotX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3.out' });
    const lift = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 8);
      rotX(-py * 8);
      lift(-4);
    });
    card.addEventListener('mouseleave', () => {
      rotX(0);
      rotY(0);
      lift(0);
    });
  });
}
