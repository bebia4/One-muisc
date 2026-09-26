import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT, withReducedMotion } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Scroll-triggered entrance wrapper. Defaults to the site's fade-up, but any
 * variant set can be passed in. Automatically degrades to a plain fade when
 * the user prefers reduced motion.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = '',
  as = 'div',
  amount,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] || motion.div;
  const resolved = withReducedMotion(variants, reduced);

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { once: true, amount } : VIEWPORT}
      variants={resolved}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Comp>
  );
}
