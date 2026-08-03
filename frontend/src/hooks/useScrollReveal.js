import { useEffect } from 'react';

/**
 * Scroll-reveal hook — attaches an IntersectionObserver that adds
 * the 'visible' class to every element matching the selector once
 * it enters the viewport.
 */
export function useScrollReveal(selector = '[data-reveal]') {
  useEffect(() => {
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('visible'), Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}
