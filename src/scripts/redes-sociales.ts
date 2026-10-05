import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initRedesSociales(reduced: boolean) {
  initHero(reduced);
  initWhy(reduced);
  initProceso(reduced);
  initPlanes(reduced);
}

// ---- Hero: entrada + parallax leve de las figuras flotantes ----
function initHero(reduced: boolean) {
  const h1 = document.querySelector<HTMLElement>('[data-rs-h1]');
  const sub = document.querySelector<HTMLElement>('[data-rs-sub]');
  const cta = document.querySelector<HTMLElement>('[data-rs-cta]');
  const shapes = document.querySelector<HTMLElement>('[data-rs-shapes]');

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
    const heroSection = shapes.closest<HTMLElement>('[data-rs-hero]') ?? shapes;
    gsap.to(shapes, {
      y: 60,
      ease: 'none',
      scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

// ---- Por qué nosotros: contadores ----
function initWhy(reduced: boolean) {
  const section = document.querySelector<HTMLElement>('[data-rs-why]');
  const counts = Array.from(document.querySelectorAll<HTMLElement>('[data-rs-count]'));
  const hint = document.querySelector<HTMLElement>('[data-rs-scroll-hint]');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-rs-why-card]'));
  const statEls = Array.from(document.querySelectorAll<HTMLElement>('[data-rs-stat]'));
  if (!section) return;

  if (reduced) {
    gsap.set([...cards, ...statEls], { opacity: 1 });
    counts.forEach((el) => { el.textContent = el.dataset.target ?? '0'; });
    return;
  }

  // Tarjetas: entran escalonadas desde abajo con un giro leve; el ícono se dibuja al aparecer.
  if (cards.length) {
    gsap.set(cards, { y: 70, rotate: (i) => (i % 2 ? 2.5 : -2.5), scale: 0.92 });
    const strokes = cards.flatMap((c) => Array.from(c.querySelectorAll<SVGGeometryElement>('svg path, svg circle')));
    strokes.forEach((el) => {
      const len = el.getTotalLength?.() ?? 0;
      if (len) gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.timeline({ scrollTrigger: { trigger: cards[0], start: 'top 85%', once: true } })
      .to(cards, { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.14 }, 0)
      .to(strokes, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', stagger: 0.03 }, 0.25);
  }

  // Métricas: deslizan desde la izquierda.
  if (statEls.length) {
    gsap.set(statEls, { x: -60 });
    gsap.to(statEls, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: statEls[0], start: 'top 90%', once: true },
    });
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

// ---- Proceso: acto pinneado con un teléfono que evoluciona en 4 capas ----
function initProceso(reduced: boolean) {
  const pin = document.querySelector<HTMLElement>('[data-rs-proceso-pin]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (pin && header) {
    pin.style.height = `calc(100vh - ${Math.ceil(header.getBoundingClientRect().height)}px)`;
  }
  const stageWrap = document.querySelector<HTMLElement>('[data-rs-stage-wrap]');
  const stepsNav = document.querySelector<HTMLElement>('[data-rs-steps-nav]');
  const panels = document.querySelector<HTMLElement>('[data-rs-panels]');
  const stage = document.querySelector<HTMLElement>('[data-rs-stage]');
  const canvas = document.querySelector<HTMLElement>('[data-rs-canvas]');
  const progress = document.querySelector<HTMLElement>('[data-rs-progress]');

  if (!pin || !stage || !canvas || !stepsNav || !panels) return;

  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-rs-layer]'));
  const panelEls = Array.from(document.querySelectorAll<HTMLElement>('[data-rs-panel]'));
  const stepNavItems = Array.from(document.querySelectorAll<HTMLElement>('[data-rs-step-nav-item]'));
  if (layers.length < 4 || panelEls.length < 4 || stepNavItems.length < 4) return;

  const CANVAS_W = 300;
  const RATIO = 300 / 600; // ancho / alto del teléfono
  const cells = document.querySelectorAll<HTMLElement>('[data-rs-cell]');
  const tiles = document.querySelectorAll<HTMLElement>('[data-rs-tile]');
  const bars = document.querySelectorAll<HTMLElement>('[data-rs-bar]');
  const results = document.querySelectorAll<HTMLElement>('[data-rs-result]');

  function fitStage() {
    if (!stage || !canvas || !pin || !stageWrap) return;
    const availH = stageWrap.clientHeight || pin!.clientHeight - 200;
    const colW = stageWrap.clientWidth || 360;
    const w = Math.max(150, Math.min(360, colW, availH * RATIO));
    stage.style.width = `${w}px`;
    canvas.style.transform = `scale(${(w - 4) / CANVAS_W})`; // -4: borde de 2px por lado
    ScrollTrigger.refresh();
  }

  // Estado final estático para reduced-motion: se muestra el último paso, sin pin ni animación.
  if (reduced) {
    gsap.set(layers.slice(0, -1), { opacity: 0 });
    gsap.set(layers[layers.length - 1], { opacity: 1 });
    gsap.set(panelEls.slice(0, -1), { opacity: 0 });
    gsap.set(panelEls[panelEls.length - 1], { opacity: 1, y: 0 });
    stepNavItems.forEach((el, i) => { el.style.opacity = i === stepNavItems.length - 1 ? '1' : '.35'; });
    if (progress) progress.style.transform = 'scaleX(1)';
    requestAnimationFrame(fitStage);
    window.addEventListener('resize', fitStage);
    return;
  }

  requestAnimationFrame(fitStage);
  window.addEventListener('resize', fitStage);

  gsap.from(document.querySelectorAll<HTMLElement>('[data-rs-wf]'), {
    opacity: 0, y: 22, scale: 0.94, stagger: 0.07, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: pin, start: 'top 75%', once: true },
  });

  const pinScrollPct = 420;
  const headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 0;

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: pin,
      start: `top top+=${headerH}`,
      end: () => `+=${pinScrollPct}%`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  for (let i = 1; i < 4; i++) {
    tl.addLabel(`s${i}`, '+=0.55');
    tl.to(layers[i - 1], { opacity: 0, scale: 0.965, filter: 'blur(7px)', duration: 0.5 }, `s${i}`)
      .fromTo(layers[i], { opacity: 0, scale: 1.05, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6 }, `s${i}`)
      .to(panelEls[i - 1], { opacity: 0, y: -34, duration: 0.35 }, `s${i}`)
      .fromTo(panelEls[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55 }, `s${i}+=0.2`)
      .to(stepNavItems, { opacity: 0.35, duration: 0.3 }, `s${i}`)
      .to(stepNavItems[i], { opacity: 1, duration: 0.3 }, `s${i}`);

    if (i === 1) {
      tl.fromTo(cells, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.015, duration: 0.25 }, 's1+=0.3');
    }
    if (i === 2) {
      tl.fromTo(tiles, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, stagger: 0.07, duration: 0.3, ease: 'back.out(2)' }, 's2+=0.35');
    }
    if (i === 3) {
      tl.fromTo(bars, { scaleY: 0 }, { scaleY: 1, stagger: 0.07, duration: 0.4 }, 's3+=0.35')
        .fromTo(results, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35, ease: 'back.out(2)' }, 's3+=0.8');
    }
  }
  tl.to({}, { duration: 0.6 });

  if (progress) {
    tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0);
  }
  ScrollTrigger.refresh();
}

// ---- Planes: reveal escalonado + tilt 3D en hover ----
function initPlanes(reduced: boolean) {
  const cards = document.querySelectorAll<HTMLElement>('[data-rs-plan-card]');
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
    const items = card.querySelectorAll<HTMLElement>('li');
    gsap.set(items, { opacity: 0, x: -16 });
    gsap.to(items, {
      opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05,
      scrollTrigger: { trigger: card, start: 'top 70%', once: true },
    });

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
