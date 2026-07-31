import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCounter(reduced: boolean) {
  const countEls = document.querySelectorAll<HTMLElement>('[data-count]');

  countEls.forEach((countEl) => {
    const target = Number(countEl.dataset.countTo) || 500;
    const triggerEl = countEl.closest<HTMLElement>('[data-counter]') ?? countEl;

    if (reduced) {
      countEl.textContent = String(target);
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 4,
      ease: 'power1.out',
      onStart: () => {
        // HTML serves the final value for no-JS/no-scroll cases; only drop to 0
        // right as the count-up animation actually begins.
        countEl.textContent = '0';
      },
      onUpdate: () => {
        countEl.textContent = String(Math.round(obj.val));
      },
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        once: true,
      },
    });
  });
}
