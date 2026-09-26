import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A soft, out-of-focus pool of light behind a section — the ambient glow that
 * keeps the obsidian canvas from reading flat.
 *
 * Purely decorative, so it is hidden from assistive technology.
 */
export default function AmbientOrb({
  className = '',
  color = 'rgba(245,181,68,0.16)',
  size = 620,
  blur = 130,
  drift = 'slow',
}) {
  const reduced = useReducedMotion();
  const anim = reduced ? '' : drift === 'slower' ? 'animate-drift-slower' : 'animate-drift-slow';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${anim} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 68%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
