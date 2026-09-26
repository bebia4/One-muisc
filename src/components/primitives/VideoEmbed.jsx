import { useState } from 'react';
import { Play } from 'lucide-react';
import SmartImage from './SmartImage';
import { getMedia } from '../../data/media';
import { embedUrl, thumbnailUrl } from '../../data/videos';

/**
 * A YouTube player that costs nothing until it is wanted.
 *
 * Until the visitor presses play this renders a poster and a play control —
 * no iframe, so no YouTube script, request or cookie on page load. Pressing
 * play swaps in the real player, already running.
 *
 * The poster leans on SmartImage's existing remote/local chain: YouTube's own
 * thumbnail first, falling back to a cinematic plate if that 404s (not every
 * upload has a maxres thumbnail) or if the host is blocked entirely.
 */
export default function VideoEmbed({ video, autoPlay = false, className = '' }) {
  const [playing, setPlaying] = useState(autoPlay);
  const portrait = video.orientation === 'portrait';
  const aspect = portrait ? 'aspect-9/16' : 'aspect-video';
  // A portrait player pinned to full width would tower past the viewport.
  const width = portrait ? 'mx-auto w-full max-w-sm' : 'w-full';
  const plate = getMedia(video.poster);

  if (playing) {
    return (
      <div className={`${aspect} ${width} overflow-hidden bg-obsidian-950 ${className}`}>
        <iframe
          src={embedUrl(video)}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      /*
        The poster is decorative (alt=""), so this label is the only accessible
        name the control has — it has to name the video, not just say "play".
      */
      aria-label={`Play video: ${video.title}`}
      className={`group relative block ${aspect} ${width} overflow-hidden bg-obsidian-950 focus:outline-hidden ${className}`}
    >
      <SmartImage
        src={thumbnailUrl(video.youtubeId)}
        fallback={plate.fallback}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-obsidian-950 via-obsidian-950/25 to-obsidian-950/40 transition-opacity duration-500 group-hover:from-obsidian-950/90"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:scale-105"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-obsidian-950/60 backdrop-blur-md transition-colors duration-300 group-hover:border-ember-glow/60 group-focus-visible:border-ember-glow">
          <Play className="h-6 w-6 translate-x-px fill-ember-glow text-ember-glow" />
        </span>
      </span>
    </button>
  );
}
