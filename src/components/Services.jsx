import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clapperboard, Radio, Aperture, Layers, Settings, ArrowUpRight, Users, Clock } from 'lucide-react';
import SectionHeading from './primitives/SectionHeading';
import AmbientOrb from './primitives/AmbientOrb';
import GlowButton from './primitives/GlowButton';
import { SERVICES } from '../data/site';
import { EASE } from '../lib/motion';

const ICONS = { Clapperboard, Radio, Aperture, Layers, Settings };

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = SERVICES[activeIndex];
  const ActiveIcon = ICONS[active.icon] || Clapperboard;

  /**
   * Full keyboard support for the tablist, per the WAI-ARIA tabs pattern:
   * arrows move between tabs, Home/End jump to the ends, and focus follows
   * selection so the panel below always matches what is focused.
   */
  const onTabKeyDown = useCallback((event) => {
    const last = SERVICES.length - 1;
    let next = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = activeIndex === last ? 0 : activeIndex + 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = activeIndex === 0 ? last : activeIndex - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;

    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }, [activeIndex]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <AmbientOrb
        className="-right-40 top-1/4 opacity-60"
        size={700}
        color="rgba(245,181,68,0.13)"
        drift="slower"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          id="services-heading"
          eyebrow="Capabilities"
          title={
            <>
              Everything from the first
              <br />
              <span className="text-gradient-warm">treatment to the last export.</span>
            </>
          }
          lede="Five disciplines, run by one team. Book a single service or hand us the whole production chain — the brief, the shoot, the stream, the finish and the systems left behind."
        />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Tab rail */}
          <div className="min-w-0 lg:col-span-4">
            <div
              role="tablist"
              aria-label="Service categories"
              aria-orientation="vertical"
              onKeyDown={onTabKeyDown}
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {SERVICES.map((service, i) => {
                const Icon = ICONS[service.icon] || Clapperboard;
                const selected = i === activeIndex;

                return (
                  <button
                    key={service.id}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`service-tab-${service.id}`}
                    aria-selected={selected}
                    aria-controls={`service-panel-${service.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all duration-400 lg:w-full lg:gap-4 lg:px-5 ${
                      selected
                        ? 'border-ember-glow/30 bg-white/6'
                        : 'border-white/[0.07] bg-transparent hover:border-white/15 hover:bg-white/3'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="service-rail"
                        aria-hidden="true"
                        className="absolute inset-y-3 left-0 hidden w-[2px] rounded-full bg-ember-glow lg:block"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors duration-400 ${
                        selected
                          ? 'border-ember-glow/40 bg-ember-glow/10 text-ember-glow'
                          : 'border-white/10 text-ash group-hover:text-slate-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span
                      className={`whitespace-nowrap text-[0.8rem] font-medium transition-colors duration-400 lg:whitespace-normal ${
                        selected ? 'text-white' : 'text-mist group-hover:text-slate-200'
                      }`}
                    >
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 hidden lg:block">
              <GlowButton href="#booking" variant="outline" size="md" icon={ArrowUpRight}>
                Scope a project
              </GlowButton>
            </div>
          </div>

          {/* Panel */}
          <div className="min-w-0 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`service-panel-${active.id}`}
                aria-labelledby={`service-tab-${active.id}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="glass relative overflow-hidden rounded-2xl p-7 sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ember-glow/10 blur-3xl"
                />

                <div className="relative flex flex-wrap items-start justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-ember-glow/35 bg-ember-glow/10 text-ember-glow">
                      <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-ultra text-ember-glow/75">
                      Service {String(activeIndex + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mist">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {active.turnaround}
                  </span>
                </div>

                <h3 className="relative mt-7 font-display text-[1.9rem] leading-tight text-white sm:text-4xl">
                  {active.title}
                </h3>

                <p className="relative mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-slate-300">
                  {active.summary}
                </p>
                <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-ash">
                  {active.detail}
                </p>

                <hr className="hairline my-8" />

                {/* Deliverables */}
                <div className="relative">
                  <h4 className="font-mono text-[0.6rem] uppercase tracking-ultra text-ash">
                    Deliverables
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.deliverables.map((tag, i) => (
                      <motion.li
                        key={tag}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                        className="rounded-full border border-ember-glow/20 bg-ember-glow/[0.07] px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide text-parchment-200 transition-colors duration-300 hover:border-ember-glow/45 hover:text-ember-glow"
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Audience */}
                <div className="relative mt-8">
                  <h4 className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-ultra text-ash">
                    <Users className="h-3 w-3" aria-hidden="true" />
                    Built for
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {active.audience.map((who) => (
                      <li key={who} className="flex items-center gap-2 text-[0.78rem] text-mist">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember-glow/60" />
                        {who}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-9 lg:hidden">
                  <GlowButton href="#booking" variant="outline" size="md" icon={ArrowUpRight}>
                    Scope a project
                  </GlowButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
