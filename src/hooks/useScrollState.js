import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether the page has scrolled past `threshold`, throttled to one
 * update per animation frame so the sticky header never thrashes layout.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/**
 * Highlights the nav link for whichever section currently owns the viewport.
 *
 * Uses IntersectionObserver rather than scroll maths so it stays cheap. The
 * observer only reports sections whose visibility *changed*, so we keep a
 * running map of what is on screen — otherwise the last matched section stays
 * highlighted after scrolling back to the hero, where nothing is in the band.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  const visibility = useRef(new Map());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const seen = visibility.current;
    seen.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          seen.set(entry.target.id, entry.isIntersecting ? entry.boundingClientRect.top : null);
        });

        // Of everything currently on screen, take the one nearest the top.
        const onScreen = [...seen.entries()]
          .filter(([, top]) => top !== null)
          .sort((a, b) => a[1] - b[1]);

        setActive(onScreen.length ? onScreen[0][0] : '');
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      seen.clear();
    };
  }, [ids]);

  return active;
}
