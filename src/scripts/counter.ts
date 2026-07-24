import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCounter(reduced: boolean) {
  const countEl = document.querySelector<HTMLElement>('[data-count]');
  const counterSection = document.querySelector<HTMLElement>('[data-counter]');

  if (!countEl || !counterSection) return;

  if (reduced) {
    countEl.textContent = '500';
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: 500,
    duration: 4,
    ease: 'power1.out',
    onUpdate: () => {
      countEl.textContent = String(Math.round(obj.val));
    },
    scrollTrigger: {
      trigger: counterSection,
      start: 'top 80%',
      once: true,
    },
  });
}
