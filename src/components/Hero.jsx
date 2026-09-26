import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowUpRight, Circle } from 'lucide-react';
import GlowButton from './primitives/GlowButton';
import AmbientOrb from './primitives/AmbientOrb';
import SmartImage from './primitives/SmartImage';
import { BRAND, HERO_STATS, TICKER_ITEMS } from '../data/site';
import { getMedia } from '../data/media';
import { EASE, maskUp, stagger } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** The headline, split so each line can rise out of its own mask. */
const HEADLINE = ['Communicating Truth.', 'Capturing Moments.', 'Inspiring Generations.'];

/** Corner brackets + centre cross, as seen through a camera's viewfinder. */
function ViewfinderChrome() {
  const corners = [
    'left-3 top-3 border-l-2 border-t-2',
    'right-3 top-3 border-r-2 border-t-2',
    'left-3 bottom-3 border-b-2 border-l-2',
    'right-3 bottom-3 border-b-2 border-r-2',
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {corners.map((c) => (
        <span
          key={c}
          className={`absolute h-7 w-7 border-ember-glow/70 sm:h-10 sm:w-10 ${c}`}
        />
      ))}

      {/* Centre focus cross */}
      <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/25" />
      <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/25" />

      {/* Rule-of-thirds guides */}
      <span className="absolute inset-y-6 left-1/3 w-px bg-white/[0.07]" />
      <span className="absolute inset-y-6 left-2/3 w-px bg-white/[0.07]" />
      <span className="absolute inset-x-6 top-1/3 h-px bg-white/[0.07]" />
      <span className="absolute inset-x-6 top-2/3 h-px bg-white/[0.07]" />
    </div>
  );
}

export default function Hero({ onOpenShowreel }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Frame drifts up and dims slightly as the section leaves — a slow push-out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '14%']);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.35]);

  const hero = getMedia('hero');

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44"
    >
      {/* Ambient lighting */}
      <AmbientOrb className="-left-40 -top-24 opacity-70" size={720} color="rgba(245,181,68,0.18)" />
      <AmbientOrb
        className="-right-32 top-1/3 opacity-50"
        size={560}
        color="rgba(127,169,232,0.10)"
        drift="slower"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.1, 0.25)}>
          {/* Status strip */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
              <Circle
                className="h-2 w-2 animate-rec-pulse fill-ember-glow text-ember-glow"
                aria-hidden="true"
              />
              <span className="font-mono text-[0.62rem] uppercase tracking-ultra text-parchment-200">
                Now booking {new Date().getFullYear() + 1}
              </span>
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-ultra text-ash">
              Faith-Based Creative Media Agency · Est. {BRAND.founded}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 id="hero-heading" className="max-w-6xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : maskUp}
                  className={`block text-[2.4rem] font-normal leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[5.4rem] xl:text-[6.2rem] ${
                    i === 2 ? 'text-gradient-warm' : 'text-white'
                  }`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
          >
            We are a faith-based creative media and communications agency — cinematic
            production, live broadcast and media consulting for churches, ministries and
            organisations carrying a message worth hearing.
          </motion.p>

          {/* Calls to action */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <GlowButton href="#booking" size="lg" icon={ArrowUpRight}>
              Partner With Us
            </GlowButton>
            <GlowButton
              variant="outline"
              size="lg"
              onClick={onOpenShowreel}
              icon={Play}
              aria-haspopup="dialog"
            >
              View Showreel
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Viewfinder frame */}
        <motion.figure
          style={{ y: frameY, opacity: frameOpacity }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
          className="relative mt-14 sm:mt-20"
        >
          <div className="glass relative aspect-16/10 w-full overflow-hidden rounded-xl sm:aspect-21/9">
            <SmartImage
              src={hero.src}
              fallback={hero.fallback}
              alt={hero.alt}
              loading="eager"
              className="absolute inset-0 h-full w-full"
              imgClassName="scale-[1.03]"
            />

            {/* Cinematic wash over the plate */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-obsidian-950 via-obsidian-950/25 to-transparent"
            />

            <ViewfinderChrome />

            {/* Top HUD row */}
            <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment-200 sm:p-6 sm:text-[0.68rem]">
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-obsidian-950/60 px-3 py-1.5 backdrop-blur-xs">
                <span className="h-1.5 w-1.5 animate-rec-pulse rounded-full bg-red-500" aria-hidden="true" />
                REC
              </span>
              <span className="hidden gap-4 sm:flex">
                <span className="rounded-full border border-white/15 bg-obsidian-950/60 px-3 py-1.5 backdrop-blur-xs">
                  4K · 24 FPS
                </span>
                <span className="rounded-full border border-white/15 bg-obsidian-950/60 px-3 py-1.5 backdrop-blur-xs">
                  ISO 800
                </span>
              </span>
              <span className="rounded-full border border-white/15 bg-obsidian-950/60 px-3 py-1.5 backdrop-blur-xs">
                01:47:22
              </span>
            </div>

            {/* Centre play affordance */}
            <div className="absolute inset-0 z-30 grid place-items-center">
              <motion.button
                type="button"
                onClick={onOpenShowreel}
                aria-haspopup="dialog"
                aria-label="Play the One Gospel Media showreel"
                className="group relative grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-obsidian-950/50 backdrop-blur-md transition-colors hover:border-ember-glow sm:h-20 sm:w-20"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ember-glow/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <Play
                  className="relative h-5 w-5 translate-x-px fill-white text-white transition-colors group-hover:fill-ember-glow group-hover:text-ember-glow sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
              </motion.button>
            </div>

            {/* Bottom HUD row */}
            <figcaption className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 p-4 sm:p-6">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment-300 sm:text-[0.68rem]">
                Showreel · Vol. 03
              </span>
              <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment-300 sm:inline sm:text-[0.68rem]">
                f/1.8 · 35mm · WB 3200K
              </span>
            </figcaption>
          </div>
        </motion.figure>

        {/* Stats */}
        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger(0.08)}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/6 sm:mt-16 lg:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="bg-obsidian-900 px-5 py-7 sm:px-7"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">
                  {stat.label}
                </span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* Discipline ticker */}
      <div className="mt-16 overflow-hidden border-y border-white/[0.07] py-4 sm:mt-20">
        <div className="mask-fade-x flex">
          <div className={`flex shrink-0 items-center gap-10 pr-10 ${reduced ? '' : 'animate-marquee'}`}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-10 font-mono text-[0.68rem] uppercase tracking-ultra text-ash"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-ember-glow/50" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
