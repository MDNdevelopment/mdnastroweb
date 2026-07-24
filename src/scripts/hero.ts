import gsap from 'gsap';

export function initHero(reduced: boolean) {
  const lines = document.querySelectorAll<HTMLElement>('.mdn-line');
  const sub = document.querySelector<HTMLElement>('[data-hero-sub]');
  const cta = document.querySelector<HTMLElement>('[data-hero-cta]');
  const mark = document.querySelector<HTMLElement>('[data-hero-mark]');

  if (reduced) {
    lines.forEach(l => { l.style.transform = 'translateY(0)'; });
    if (sub) sub.style.opacity = '1';
    if (cta) cta.style.opacity = '1';
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(lines, { y: 0, duration: 1, stagger: 0.1 }, 0)
    .to(sub, { opacity: 1, duration: 0.7 }, 0.5)
    .to(cta, { opacity: 1, duration: 0.7 }, 0.65);

  if (mark) {
    gsap.to(mark, {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-hero]',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}
