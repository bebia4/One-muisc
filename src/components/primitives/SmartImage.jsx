import { useEffect, useState } from 'react';

/**
 * An image that cannot render a broken frame.
 *
 * Loads `src` first; if that errors (offline, blocked host, dead URL) it swaps
 * to `fallback` exactly once. Until either resolves it shows a tonal placeholder
 * in the site's palette, so a slow load reads as intentional darkness rather
 * than an empty white box.
 */
export default function SmartImage({
  src,
  fallback,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  sizes,
  ...rest
}) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Reset when the source changes (e.g. a filtered grid swapping items).
  useEffect(() => {
    setCurrent(src);
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const handleError = () => {
    if (!failed && fallback && current !== fallback) {
      setFailed(true);
      setCurrent(fallback);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-obsidian-850 ${className}`} {...rest}>
      {/* Tonal placeholder, faded out once the real frame paints. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-linear-to-br from-obsidian-800 via-obsidian-850 to-obsidian-950 transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={current}
        alt={alt}
        loading={loading}
        sizes={sizes}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
