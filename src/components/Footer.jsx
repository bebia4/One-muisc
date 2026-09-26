import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './primitives/Logo';
import Reveal from './primitives/Reveal';
import AmbientOrb from './primitives/AmbientOrb';
import { SOCIAL_ICONS } from './primitives/SocialIcons';
import { BRAND, FOOTER_COLUMNS, SOCIALS } from '../data/site';
import { EASE } from '../lib/motion';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | error | done

  const onSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState('error');
      return;
    }
    // No backend in this build — wire this to your list provider.
    setState('done');
  };

  return (
    <form onSubmit={onSubmit} className="mt-7" noValidate>
      <label htmlFor="newsletter-email" className="mb-3 block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">
        The Dispatch — one email a month on craft and calling
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state !== 'idle') setState('idle'); }}
          placeholder="you@ministry.org"
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
          disabled={state === 'done'}
          className="w-full rounded-full border border-white/12 bg-obsidian-950/60 px-5 py-3 text-sm text-white placeholder:text-ash transition-colors duration-300 focus:border-ember-glow/50 focus:outline-none focus:ring-1 focus:ring-ember-glow/25 disabled:opacity-50 sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={state === 'done'}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white transition-all duration-400 hover:border-ember-glow/60 hover:text-ember-glow disabled:border-ember-glow/40 disabled:text-ember-glow"
        >
          {state === 'done' ? (
            <>
              Subscribed
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          ) : (
            <>
              Subscribe
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <p aria-live="polite" className="mt-2 min-h-[1rem] text-[0.72rem]">
        {state === 'error' && (
          <span id="newsletter-error" className="text-red-400">Please enter a valid email address.</span>
        )}
        {state === 'done' && (
          <span className="text-ember-glow">You are on the list. Watch your inbox.</span>
        )}
      </p>
    </form>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-obsidian-950 pt-20 sm:pt-28">
      <AmbientOrb
        className="left-1/2 -bottom-72 -translate-x-1/2 opacity-45"
        size={900}
        color="rgba(245,181,68,0.12)"
        drift="slower"
      />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        {/* Manifesto */}
        <Reveal>
          <p className="max-w-4xl font-display text-[1.6rem] leading-[1.35] text-parchment-100 sm:text-3xl lg:text-[2.6rem] lg:leading-[1.3]">
            {BRAND.manifesto}
          </p>
        </Reveal>

        <hr className="hairline my-14 sm:my-16" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Logo className="h-11 w-11" withWordmark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash">
              {BRAND.tagline}
            </p>
            <Newsletter />
          </div>

          {/* Nav columns */}
          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="font-mono text-[0.6rem] uppercase tracking-ultra text-ember-glow/70">
                  {col.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.85rem] text-mist transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-ultra text-ember-glow/70">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-[0.85rem]">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-start gap-2.5 text-mist transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-glow/60" aria-hidden="true" />
                  <span className="break-all">{BRAND.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-start gap-2.5 text-mist transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-glow/60" aria-hidden="true" />
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-mist">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-glow/60" aria-hidden="true" />
                {BRAND.location}
              </li>
            </ul>

            <ul className="mt-7 flex gap-2">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <li key={social.id}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${BRAND.name} on ${social.label}`}
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-mist transition-colors duration-300 hover:border-ember-glow/50 hover:text-ember-glow"
                    >
                      {Icon ? <Icon /> : null}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div aria-hidden="true" className="mask-fade-b mt-20 select-none overflow-hidden sm:mt-24">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="whitespace-nowrap text-center font-display text-[10.2vw] leading-none tracking-[-0.03em] text-white/[0.055]"
          >
            ONE GOSPEL MEDIA
          </motion.p>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 sm:flex-row">
          <p className="text-center font-mono text-[0.62rem] tracking-[0.14em] text-ash sm:text-left">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ash">
            Soli Deo Gloria
          </p>
        </div>
      </div>
    </footer>
  );
}
