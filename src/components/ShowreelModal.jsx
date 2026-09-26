import { Play, Clock, Film } from 'lucide-react';
import Modal from './primitives/Modal';
import SmartImage from './primitives/SmartImage';
import VideoEmbed from './primitives/VideoEmbed';
import { getMedia } from '../data/media';

/**
 * The showreel dialog.
 *
 * Given a `video` it plays that film. Given a `project` instead it frames that
 * case study's plate like a player at rest, with the metadata a producer would
 * want alongside it — those entries have no film attached yet.
 *
 * The player mounts with autoPlay because reaching this dialog already took a
 * deliberate press; and because Modal only renders its children while open,
 * closing unmounts the iframe, which is what actually stops the audio.
 */
export default function ShowreelModal({ open, onClose, project, video }) {
  const media = getMedia(project?.id || 'hero');
  const title = video
    ? video.title
    : project
      ? `${project.title} — ${project.client}`
      : 'One Gospel Media · Showreel Vol. 03';

  return (
    <Modal open={open} onClose={onClose} title={project ? 'Case Study' : 'Showreel'} labelledBy="showreel-title">
      {video ? (
        <VideoEmbed video={video} autoPlay className="bg-obsidian-950" />
      ) : (
        <div className="relative aspect-video w-full bg-obsidian-950">
          <SmartImage
            src={media.src}
            fallback={media.fallback}
            alt={media.alt}
            loading="eager"
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-obsidian-950 via-obsidian-950/30 to-obsidian-950/50"
          />

          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-obsidian-950/60 backdrop-blur-md">
                <Play className="h-6 w-6 translate-x-px fill-ember-glow text-ember-glow" aria-hidden="true" />
              </span>
              <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-ultra text-parchment-300">
                Film in post — talk to us about this one
              </p>
            </div>
          </div>

          {/* Scrub bar, for the look of a player at rest */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 px-5 pb-4">
            <div className="h-[3px] w-full rounded-full bg-white/15">
              <div className="h-[3px] w-1/3 rounded-full bg-ember-glow" />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <h3 id="showreel-title" className="font-display text-xl text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
            {video
              ? 'Playing from One Gospel Media on YouTube.'
              : project
                ? project.blurb
                : 'A cross-section of conferences, testimonies, brand films and live broadcasts from the last three production years.'}
          </p>
        </div>

        {!video && (
        <ul className="flex shrink-0 flex-wrap gap-2">
          <li className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mist">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {project?.runtime || '03:24'}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mist">
            <Film className="h-3 w-3" aria-hidden="true" />
            {project?.format || '4K · Dolby'}
          </li>
        </ul>
        )}
      </div>
    </Modal>
  );
}
