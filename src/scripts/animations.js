/**
 * ARAR Landing Page — GSAP Scroll Animations
 * Elements are visible by default. Animations are purely additive.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function init() {
  if (prefersReducedMotion) return;

  try {
    heroReveal();
    scrollReveal();
    solutionCardsStagger();
    headerScrollClass();
  } catch (e) {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}

/* Hero — immediate fade-in */
function heroReveal() {
  const heroEls = document.querySelectorAll('.hero .animate-on-scroll');
  if (!heroEls.length) return;

  gsap.fromTo(
    heroEls,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power2.out', stagger: 0.12 }
  );
}

/* Scroll reveal for non-hero elements */
function scrollReveal() {
  const elements = gsap.utils.toArray('.animate-on-scroll');
  if (!elements.length) return;

  elements.forEach((el) => {
    // Skip hero (handled above) and solution cards (handled by stagger below)
    if (el.closest('.hero, #hero')) return;
    if (el.closest('.solutions__grid')) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* Solution cards stagger */
function solutionCardsStagger() {
  const grids = gsap.utils.toArray('.solutions__grid');
  grids.forEach((grid) => {
    const cards = grid.querySelectorAll('.solution-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* Header shadow on scroll */
function headerScrollClass() {
  const header = document.querySelector('#main-header, .header, header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    onUpdate: (self) => {
      header.classList.toggle('scrolled', self.progress > 0);
    },
  });
}

/* Initialize */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('astro:page-load', () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  init();
});
