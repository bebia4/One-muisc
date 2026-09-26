/**
 * The OGM badge: an aperture blade ring around a warm core, echoing both a lens
 * iris and a halo. Scales cleanly from the 32px nav badge to the footer lockup.
 */
export default function Logo({ className = 'h-9 w-9', withWordmark = false, wordmarkClass = '' }) {
  const mark = (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="One Gospel Media">
      <defs>
        <radialGradient id="ogm-core" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#F5B544" />
          <stop offset="100%" stopColor="#B3712A" />
        </radialGradient>
        <linearGradient id="ogm-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6F1E7" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#F5B544" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B3712A" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0A0A0C" />
      <circle cx="32" cy="32" r="19" fill="none" stroke="url(#ogm-ring)" strokeWidth="2.4" />
      {/* Six aperture blades. */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="32"
          x2="32"
          y2="13"
          stroke="url(#ogm-ring)"
          strokeWidth="1.5"
          strokeOpacity="0.45"
          strokeLinecap="round"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="7.5" fill="url(#ogm-core)" />
      <circle cx="29.5" cy="29.5" r="2.2" fill="#FFF8EC" fillOpacity="0.75" />
    </svg>
  );

  if (!withWordmark) return mark;

  return (
    <span className="flex items-center gap-3">
      {mark}
      <span className={`flex flex-col leading-none ${wordmarkClass}`}>
        <span className="font-display text-[0.95rem] tracking-[0.14em] text-white">ONE GOSPEL</span>
        <span className="font-mono text-[0.58rem] tracking-ultra text-ember-glow/75">MEDIA</span>
      </span>
    </span>
  );
}
