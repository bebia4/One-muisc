import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Check } from 'lucide-react';
import SectionHeading from './primitives/SectionHeading';
import Reveal from './primitives/Reveal';
import SmartImage from './primitives/SmartImage';
import AmbientOrb from './primitives/AmbientOrb';
import { ABOUT_PILLARS, VISION_MISSION, PROCESS_STEPS, BRAND } from '../data/site';
import { getMedia } from '../data/media';
import { EASE, fadeUp, stagger, VIEWPORT } from '../lib/motion';

/**
 * Vision and Mission as a split card pair. Hovering (or focusing) one expands
 * its share of the row on desktop, so the two sit in a deliberate tension
 * rather than as two equal boxes.
 */
function VisionMissionSplit() {
  const [activeKey, setActiveKey] = useState('vision');

  return (
    <div className="mt-20 flex flex-col gap-4 lg:mt-28 lg:flex-row">
      {VISION_MISSION.map((panel) => {
        const isActive = activeKey === panel.key;
        const media = getMedia(panel.mediaKey);

        return (
          <motion.article
            key={panel.key}
            onMouseEnter={() => setActiveKey(panel.key)}
            onFocus={() => setActiveKey(panel.key)}
            animate={{ flexGrow: isActive ? 1.25 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ flexBasis: 0 }}
            className="edge-light group relative min-h-104 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-obsidian-850/60 p-7 backdrop-blur-md transition-colors duration-500 hover:border-ember-glow/25 sm:p-10"
          >
            {/* Backing plate, brought up on hover */}
            <SmartImage
              src={media.src}
              fallback={media.fallback}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? 'opacity-30' : 'opacity-[0.14]'
              }`}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-obsidian-950 via-obsidian-950/85 to-obsidian-950/55"
            />

            <div className="relative flex h-full flex-col">
              <span className="eyebrow">{panel.kicker}</span>

              <h3 className="mt-5 font-display text-4xl leading-none text-white sm:text-5xl">
                {panel.title}
              </h3>

              <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-slate-300">
                {panel.statement}
              </p>

              <ul className="mt-auto space-y-3 pt-8">
                {panel.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.22rem] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-ember-glow/40 bg-ember-glow/10"
                    >
                      <Check className="h-2.5 w-2.5 text-ember-glow" />
                    </span>
                    <span className="text-sm leading-relaxed text-mist">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export default function About() {
  const primary = getMedia('aboutPrimary');
  const secondary = getMedia('aboutSecondary');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <AmbientOrb
        className="-left-52 top-1/4 opacity-60"
        size={640}
        color="rgba(245,181,68,0.11)"
        drift="slower"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          id="about-heading"
          eyebrow="Core Identity"
          title={
            <>
              The heart behind
              <br />
              <span className="text-gradient-warm">the lens.</span>
            </>
          }
          lede="One Gospel Media exists where conviction meets craft. We tell the truth beautifully — and we build the systems that let ministries keep telling it long after our unit has packed down."
        />

        {/* Editorial grid: narrative column + stacked imagery */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.14)}
          >
            {ABOUT_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="border-t border-white/9 py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[0.68rem] tracking-[0.2em] text-ember-glow/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl leading-tight text-white sm:text-[1.9rem]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-4 pl-0 text-[0.95rem] leading-relaxed text-mist sm:pl-[3.1rem]">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Imagery + pull quote */}
          <div className="lg:col-span-5">
            <Reveal className="sticky top-28 space-y-4">
              <figure className="relative overflow-hidden rounded-2xl border border-white/10">
                <SmartImage
                  src={primary.src}
                  fallback={primary.fallback}
                  alt={primary.alt}
                  className="aspect-4/5 w-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-obsidian-950/90 via-transparent to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment-300">
                    On the floor · Field Unit
                  </span>
                </figcaption>
              </figure>

              <blockquote className="glass rounded-2xl p-7">
                <Quote className="h-5 w-5 text-ember-glow/60" aria-hidden="true" />
                <p className="mt-4 font-display text-xl leading-snug text-parchment-100 sm:text-2xl">
                  &ldquo;Media is the modern Roman road. We are simply making sure the
                  message travels it well.&rdquo;
                </p>
                <footer className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                  — {BRAND.name}
                </footer>
              </blockquote>

              <figure className="relative hidden overflow-hidden rounded-2xl border border-white/10 sm:block">
                <SmartImage
                  src={secondary.src}
                  fallback={secondary.fallback}
                  alt={secondary.alt}
                  className="aspect-16/10 w-full"
                />
              </figure>
            </Reveal>
          </div>
        </div>

        <VisionMissionSplit />

        {/* Process */}
        <div className="mt-24 lg:mt-32">
          <Reveal className="mb-10 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-8 bg-ember-glow/60" />
            <h3 className="font-mono text-[0.64rem] uppercase tracking-ultra text-ember-glow/80 sm:text-xs">
              How we work
            </h3>
          </Reveal>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1)}
            className="grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PROCESS_STEPS.map((step) => (
              <motion.li
                key={step.step}
                variants={fadeUp}
                className="group bg-obsidian-900 p-7 transition-colors duration-500 hover:bg-obsidian-850"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-ember-glow/70">
                  {step.step}
                </span>
                <h4 className="mt-4 font-display text-xl text-white">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-0 bg-ember-glow/60 transition-all duration-700 group-hover:w-full"
                />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
