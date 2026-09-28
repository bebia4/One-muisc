/**
 * The One Gospel Media mark: a torch flame rising behind a cross, set in the
 * gold ring that doubles as the "O" of ONE.
 *
 * The artwork is lifted from the company's own business card rather than
 * redrawn, so it matches print exactly. Two variants ship:
 *
 *   ogm-mark.png           navy cross — for light backgrounds and print
 *   ogm-mark-reversed.png  parchment cross — for this site's obsidian canvas
 *
 * The reversed file exists because the brand navy (#002047) is all but
 * invisible on a near-black page; only the cross is recoloured, the gold is
 * untouched. The wordmark stays live text so it renders crisply at any size
 * and remains selectable and searchable.
 */
export default function Logo({
  className = 'h-11 w-auto',
  withWordmark = false,
  wordmarkClass = '',
  variant = 'reversed',
}) {
  const src = variant === 'reversed' ? '/brand/ogm-mark-reversed.png' : '/brand/ogm-mark.png';

  const mark = (
    <img
      src={src}
      /*
        Decorative when the wordmark sits beside it — the text already names
        the company, so announcing it twice only adds noise for screen readers.
      */
      alt={withWordmark ? '' : 'One Gospel Media'}
      width={240}
      height={458}
      decoding="async"
      className={`${className} shrink-0 select-none object-contain`}
    />
  );

  if (!withWordmark) return mark;

  return (
    <span className="flex items-center gap-2.5">
      {mark}
      <span className={`flex flex-col leading-none ${wordmarkClass}`}>
        <span className="font-display text-[0.95rem] tracking-[0.14em] text-white">ONE GOSPEL</span>
        <span className="font-mono text-[0.58rem] tracking-ultra text-ember-glow/75">MEDIA</span>
      </span>
    </span>
  );
}
