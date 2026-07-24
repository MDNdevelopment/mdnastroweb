import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNosotros(reduced: boolean) {
  const section = document.querySelector<HTMLElement>('[data-nos]');
  if (!section) return;

  const marquee = section.querySelector<HTMLElement>('[data-nos-marquee]');
  const heading = section.querySelector<HTMLElement>('[data-nos-heading]');
  const lead = section.querySelector<HTMLElement>('[data-nos-lead]');
  const cards = section.querySelectorAll<HTMLElement>('[data-nos-card]');

  if (reduced) {
    gsap.set([heading, lead, ...cards], { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set([heading, lead], { opacity: 0, y: 28 });
  gsap.set(cards, { opacity: 0, y: 46, scale: 0.94 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 75%', once: true },
  });
  tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(lead, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55')
    .to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', stagger: 0.14 }, '-=0.35');

  // Subtle parallax drift on the marquee as the section scrolls by
  if (marquee) {
    gsap.to(marquee, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // Soft 3D tilt + lift on card hover
  cards.forEach((card) => {
    const rotX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3.out' });
    const lift = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 10);
      rotX(-py * 10);
      lift(-6);
    });
    card.addEventListener('mouseleave', () => {
      rotX(0);
      rotY(0);
      lift(0);
    });
  });
}
