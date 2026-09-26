/**
 * Shared Framer Motion variants and easing.
 *
 * One vocabulary of motion across the site keeps the whole thing feeling like
 * a single piece rather than a collection of separately animated components.
 */

/** A slow, weighted ease — closer to a camera move than a UI pop. */
export const EASE = [0.22, 1, 0.36, 1];
export const EASE_OUT = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Parent wrapper that walks its children in one after another. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Headline words that rise out of an overflow-hidden mask. */
export const maskUp = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.95, ease: EASE },
  },
};

/** Shared viewport config so every scroll reveal triggers at the same point. */
export const VIEWPORT = { once: true, amount: 0.22 };
export const VIEWPORT_LOOSE = { once: true, amount: 0.1 };

/**
 * Collapses any variant set to a plain fade when the user asks for reduced
 * motion — content still arrives, it just stops travelling.
 */
export function withReducedMotion(variants, reduced) {
  if (!reduced) return variants;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.28 } },
  };
}
