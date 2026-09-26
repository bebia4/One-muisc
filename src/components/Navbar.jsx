import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './primitives/Logo';
import GlowButton from './primitives/GlowButton';
import { NAV_LINKS } from '../data/site';
import { useScrolled, useActiveSection } from '../hooks/useScrollState';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { EASE } from '../lib/motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);

  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.href.replace('#', '')), []);
  const active = useActiveSection(sectionIds);

  useLockBodyScroll(menuOpen);

  // A thin amber reading-progress line along the very top of the page.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  // Escape closes the mobile sheet.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Close the sheet when the viewport grows past the mobile breakpoint,
  // otherwise it can stay mounted and trap scroll on rotate/resize.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleNavClick = useCallback((event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    // Let the sheet's exit animation start before we scroll.
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-ember-deep via-ember-glow to-ember-warm"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-8xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'border border-white/10 bg-obsidian-900/80 shadow-[0_18px_60px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="flex shrink-0 items-center rounded-full"
            aria-label="One Gospel Media — back to top"
          >
            <Logo className="h-9 w-9" withWordmark />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-mist hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-ember-glow/25 bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <GlowButton
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              size="sm"
              className="hidden sm:inline-flex"
              icon={ArrowUpRight}
            >
              Book a Consultation
            </GlowButton>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white transition hover:border-ember-glow/50 hover:text-ember-glow lg:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-obsidian-950/[0.97] backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.ul
              className="relative flex h-full flex-col justify-center gap-1 px-8"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block border-b border-white/[0.07] py-5 font-display text-3xl text-white transition-colors hover:text-ember-glow sm:text-4xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="pt-8"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <GlowButton
                  href="#booking"
                  onClick={(e) => handleNavClick(e, '#booking')}
                  size="lg"
                  className="w-full"
                  icon={ArrowUpRight}
                >
                  Book a Consultation
                </GlowButton>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
