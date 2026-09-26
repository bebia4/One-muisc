import { motion } from 'framer-motion';

/**
 * The site's primary action. Renders as <a> when given an href, <button>
 * otherwise, so semantics follow behaviour rather than appearance.
 *
 * Note: the base classes below include `inline-flex`. Tailwind 4 emits
 * `.inline-flex` after `.hidden` in the stylesheet, so passing `hidden` (or
 * `hidden sm:inline-flex`) via `className` will NOT hide this button — the
 * base class wins on source order regardless of class order. To hide it at a
 * breakpoint, wrap it in an element that carries the `hidden` class instead.
 *
 * `variant`:
 *   solid   — amber fill with an ambient bloom, for the single key action
 *   outline — hairline border that warms on hover, for secondary actions
 *   ghost   — bare text with an underline sweep
 */
export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  className = '',
  icon: Icon,
  type = 'button',
  ...rest
}) {
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-[0.8rem]',
    lg: 'px-8 py-4 text-sm',
  };

  const variants = {
    solid:
      'bg-ember-glow text-obsidian-950 hover:bg-ember-warm shadow-[0_0_0_0_rgba(245,181,68,0)] hover:shadow-[0_8px_44px_-6px_rgba(245,181,68,0.55)]',
    outline:
      'border border-white/20 text-white hover:border-ember-glow/60 hover:text-ember-glow hover:shadow-[0_8px_36px_-14px_rgba(245,181,68,0.5)]',
    ghost: 'text-slate-300 hover:text-ember-glow',
  };

  const classes = [
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full',
    'font-medium uppercase tracking-[0.18em] transition-all duration-500',
    sizes[size],
    variants[variant],
    className,
  ].join(' ');

  const inner = (
    <>
      {/* Light sweeps across the face on hover, like a sheen on glass. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
      />
      <span className="relative z-10">{children}</span>
      {Icon && (
        <Icon
          className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 26 },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} onClick={onClick} {...motionProps} {...rest}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps} {...rest}>
      {inner}
    </motion.button>
  );
}
