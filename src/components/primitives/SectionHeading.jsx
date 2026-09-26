import { motion } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT, withReducedMotion } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * The standard section masthead: a mono eyebrow, a display headline, and an
 * optional lede. Keeping it in one component is what makes the vertical rhythm
 * consistent from section to section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
  titleClassName = '',
  id,
}) {
  const reduced = useReducedMotion();
  const item = withReducedMotion(fadeUp, reduced);
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      className={`flex max-w-3xl flex-col ${alignment} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(0.12)}
    >
      {eyebrow && (
        <motion.div variants={item} className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-ember-glow/60" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        id={id}
        variants={item}
        className={`text-[2rem] font-normal leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem] ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
        >
          {lede}
        </motion.p>
      )}
    </motion.div>
  );
}
