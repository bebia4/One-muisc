import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import SectionHeading from './primitives/SectionHeading';
import SmartImage from './primitives/SmartImage';
import AmbientOrb from './primitives/AmbientOrb';
import GlowButton from './primitives/GlowButton';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/site';
import { getMedia } from '../data/media';
import { EASE } from '../lib/motion';

function ProjectCard({ project, onPlay, featured }) {
  const media = getMedia(project.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`group relative overflow-hidden rounded-2xl border border-white/9 bg-obsidian-850 ${
        featured ? 'sm:col-span-2 lg:row-span-2' : ''
      }`}
    >
      <SmartImage
        src={media.src}
        fallback={media.fallback}
        alt={media.alt}
        className={`w-full ${featured ? 'aspect-16/11 lg:aspect-4/3' : 'aspect-16/11'}`}
        imgClassName="transition-transform duration-1200 ease-out group-hover:scale-[1.07]"
      />

      {/* Permanent floor gradient so text is always legible, deepening on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-obsidian-950 via-obsidian-950/45 to-transparent transition-opacity duration-500 group-hover:from-obsidian-950 group-hover:via-obsidian-950/70"
      />

      {/* Top meta */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
        <span className="rounded-full border border-white/15 bg-obsidian-950/65 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-parchment-200 backdrop-blur-xs">
          {project.format}
        </span>
        <span className="rounded-full border border-white/15 bg-obsidian-950/65 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-parchment-200 backdrop-blur-xs">
          {project.runtime}
        </span>
      </div>

      {/* Play control, revealed on hover/focus */}
      <div className="absolute inset-0 grid place-items-center">
        <button
          type="button"
          onClick={() => onPlay(project)}
          aria-haspopup="dialog"
          aria-label={`Play case study: ${project.title} for ${project.client}`}
          className="grid h-14 w-14 scale-90 place-items-center rounded-full border border-white/30 bg-obsidian-950/55 opacity-0 backdrop-blur-md transition-all duration-500 hover:border-ember-glow hover:text-ember-glow focus-visible:scale-100 focus-visible:opacity-100 group-hover:scale-100 group-hover:opacity-100"
        >
          <Play className="h-5 w-5 translate-x-px fill-current text-white" aria-hidden="true" />
        </button>
      </div>

      {/* Foot */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ember-glow/80">
              {project.client} · {project.year}
            </span>
            <h3 className="mt-2 truncate font-display text-xl text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 translate-y-1 text-ash opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-ember-glow group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        {/* Blurb + tags slide up on hover, always present for assistive tech */}
        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:mt-4 group-hover:grid-rows-[1fr] group-focus-within:mt-4 group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="text-[0.82rem] leading-relaxed text-mist">{project.blurb}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[0.62rem] tracking-wide text-parchment-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Showcase({ onPlay }) {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-28 overflow-hidden border-y border-white/6 bg-obsidian-950/40 py-24 sm:py-32 lg:py-40"
    >
      <AmbientOrb
        className="-left-40 bottom-0 opacity-50"
        size={660}
        color="rgba(245,181,68,0.11)"
        drift="slower"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="work-heading"
            eyebrow="Selected Work"
            title={
              <>
                Frames that went
                <br />
                <span className="text-gradient-warm">somewhere.</span>
              </>
            }
            className="lg:max-w-2xl"
          />
          <GlowButton
            href="#booking"
            variant="ghost"
            size="md"
            icon={ArrowUpRight}
            className="self-start lg:pb-3"
          >
            Commission a film
          </GlowButton>
        </div>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter work by category"
          className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2 lg:mt-16"
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const selected = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                aria-pressed={selected}
                className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[0.74rem] font-medium uppercase tracking-[0.14em] transition-colors duration-400 ${
                  selected
                    ? 'border-ember-glow/40 text-obsidian-950'
                    : 'border-white/10 text-mist hover:border-white/25 hover:text-white'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-ember-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid auto-rows-auto grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPlay={onPlay}
                /* One hero cell anchors the mosaic. More than one leaves a
                   column that nothing can fill on a three-column grid. */
                featured={filter === 'all' && i === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Live region so filtering is announced to screen readers */}
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter === 'all' ? '' : ` in ${PROJECT_CATEGORIES.find((c) => c.id === filter)?.label}`}.
        </p>
      </div>
    </section>
  );
}
