import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gem, Shield, Sparkles, Compass, ArrowUpRight } from 'lucide-react';
import SectionHeading from './primitives/SectionHeading';
import AmbientOrb from './primitives/AmbientOrb';
import { VALUES } from '../data/site';
import { EASE, fadeUp, stagger, VIEWPORT } from '../lib/motion';

const ICONS = { Gem, Shield, Sparkles, Compass };

/**
 * One of the four pillars.
 *
 * The deeper description is revealed by hover on pointer devices and by focus
 * for keyboard users — but it is always present in the DOM and only visually
 * collapsed, so screen readers and touch users never lose the content.
 */
function ValueCard({ value, index, isActive, onActivate, onDeactivate }) {
  const Icon = ICONS[value.icon] || Gem;

  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      tabIndex={0}
      aria-labelledby={`value-${value.id}-title`}
      className="edge-light group relative flex min-h-[21rem] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-obsidian-850/50 p-7 backdrop-blur-md transition-all duration-500 hover:border-ember-glow/30 hover:bg-obsidian-850/80 focus-visible:border-ember-glow/40 sm:min-h-[24rem]"
    >
      {/* Light pooling in from the top-left corner on hover */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-ember-glow/20 blur-3xl transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`grid h-12 w-12 place-items-center rounded-xl border transition-all duration-500 ${
            isActive
              ? 'border-ember-glow/45 bg-ember-glow/12 text-ember-glow'
              : 'border-white/10 bg-white/[0.04] text-mist'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-[0.68rem] tracking-[0.2em] text-ash">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3
        id={`value-${value.id}-title`}
        className="relative mt-7 font-display text-[1.65rem] leading-none text-white sm:text-3xl"
      >
        {value.title}
      </h3>

      <p className="relative mt-3 text-sm italic text-ember-glow/75">{value.line}</p>

      {/*
        At rest the description is clamped to a couple of lines; activating the
        card opens it fully. The card reserves height for the full text either
        way, so nothing in the row reflows when a neighbour is hovered.
      */}
      <div className="relative mt-5">
        <p
          className={`text-sm leading-relaxed transition-colors duration-500 ${
            isActive ? 'text-slate-300' : 'line-clamp-2 text-ash'
          }`}
        >
          {value.body}
        </p>
      </div>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-7">
        <span className="font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
          {value.metric}
        </span>
        <ArrowUpRight
          className={`h-4 w-4 shrink-0 transition-all duration-500 ${
            isActive ? 'translate-x-0 text-ember-glow opacity-100' : '-translate-x-1 text-ash opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Base rule that fills with light as the card activates */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-glow to-transparent transition-opacity duration-700 ${
          isActive ? 'opacity-70' : 'opacity-0'
        }`}
      />
    </motion.article>
  );
}

export default function Values() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="relative scroll-mt-28 overflow-hidden border-y border-white/[0.06] bg-obsidian-950/40 py-24 sm:py-32 lg:py-40"
    >
      <AmbientOrb
        className="left-1/2 top-0 -translate-x-1/2 opacity-50"
        size={820}
        color="rgba(245,181,68,0.10)"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="values-heading"
            eyebrow="What we will not trade"
            title={
              <>
                Four pillars that hold
                <br />
                <span className="text-gradient-warm">every frame up.</span>
              </>
            }
            className="lg:max-w-2xl"
          />
          <p className="max-w-sm text-sm leading-relaxed text-ash lg:pb-3 lg:text-right">
            These are not slogans on a wall. They are the reasons we turn work down,
            the standards we bill against, and the promises you can hold us to.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {VALUES.map((value, i) => (
            <ValueCard
              key={value.id}
              value={value}
              index={i}
              isActive={activeId === value.id}
              onActivate={() => setActiveId(value.id)}
              onDeactivate={() => setActiveId((cur) => (cur === value.id ? null : cur))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
