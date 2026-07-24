import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initServicios(reduced: boolean) {
  const pin = document.querySelector<HTMLElement>('[data-svc-pin]');
  const track = document.querySelector<HTMLElement>('[data-svc-track]');

  if (!pin || !track || reduced) return;

  // Wait for layout to settle
  requestAnimationFrame(() => {
    const trackW = track.scrollWidth;
    const viewW = window.innerWidth;
    const distance = trackW - viewW;

    if (distance <= 0) return;

    const deadZone = window.innerHeight * 0.6; // zona muerta al final para leer el CTA

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: `+=${distance + deadZone}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, { x: -distance, ease: 'none', duration: distance });
    tl.to({}, { duration: deadZone }); // tramo vacío = pausa con el CTA visible
  });
}
