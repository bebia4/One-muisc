/**
 * Video registry.
 *
 * Mirrors src/data/media.js: every video on the site resolves through this
 * file, so the reel can be re-cut without touching a component.
 *
 * Each entry has:
 *   youtubeId   — the 11-character video id.
 *   title       — the accessible name. Used for the iframe `title`, the play
 *                 button's label and the card heading, so it must describe the
 *                 actual video rather than decorate it.
 *   orientation — 'landscape' (16:9) or 'portrait' (9:16, a Short). Drives the
 *                 aspect ratio of both the poster and the player.
 *   poster      — a key into MEDIA, used as the offline/blocked fallback
 *                 behind the YouTube thumbnail. See VideoEmbed.
 *   start       — optional start offset in seconds.
 *   featured    — the one reel the hero's "View showreel" button opens.
 *
 * On the `list` parameter: two of the supplied URLs carried an `RD...`
 * playlist, which is YouTube's auto-generated "radio" mix. Embedding it would
 * roll on into arbitrary third-party videos inside One Gospel Media's own
 * player, so the list is deliberately dropped and each entry plays as a single
 * video.
 */

export const VIDEOS = [
  {
    id: 'blessed-monty-west',
    youtubeId: 'LIuVEU9UOPs',
    title: 'Blessed Pastor Monty West',
    orientation: 'landscape',
    poster: 'testimony-restored',
    featured: true,
  },
  {
    id: 'growth-mindset-spark-ovadje',
    youtubeId: 'LSi32Br81pA',
    title: 'GROWTH MINDSET: BY DR SPARK OVADJE',
    orientation: 'landscape',
    poster: 'conference-elevate',
  },
  {
    id: 'alpha-and-omega-hope-moyo',
    youtubeId: 'tQPv2VBzQrM',
    title: 'Alpha And Omega - Hope Moyo Official',
    orientation: 'landscape',
    poster: 'live-worship-nights',
  },
  {
    /*
      TODO: title unknown. No title was supplied with this URL and
      youtube.com is unreachable from the build environment, so it could not
      be looked up. Replace `title` with the real video title — it is read
      aloud by screen readers and shown on the card.
    */
    id: 'featured-video',
    youtubeId: 'dde-Gw-w8Bk',
    title: 'Featured Video',
    orientation: 'landscape',
    poster: 'live-easter',
    start: 3,
  },
  {
    id: 'be-a-blessing',
    youtubeId: 'u73l4n18HcA',
    title: 'Be a blessing to others too',
    orientation: 'portrait',
    poster: 'vision',
  },
];

/** The reel the hero's showreel button opens. */
export const FEATURED_VIDEO = VIDEOS.find((v) => v.featured) || VIDEOS[0];

export function getVideo(id) {
  return VIDEOS.find((v) => v.id === id);
}

/**
 * YouTube's own thumbnail for a video.
 *
 * `maxresdefault` is not generated for every upload, so VideoEmbed hands this
 * to SmartImage as the *remote* source with a local plate behind it — a missing
 * thumbnail falls back to a cinematic plate instead of a broken frame.
 */
export function thumbnailUrl(youtubeId) {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

/**
 * Build the embed URL.
 *
 * Uses youtube-nocookie.com, and VideoEmbed only mounts the iframe once the
 * visitor presses play, so no YouTube request or cookie happens on page load.
 */
export function embedUrl(video, { autoplay = true } = {}) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  if (autoplay) params.set('autoplay', '1');
  if (video.start) params.set('start', String(video.start));
  return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params}`;
}

/**
 * Placeholder film for each showcase case study.
 *
 * The case studies in site.js have no films of their own yet, so each one is
 * pointed at one of the supplied videos purely so the player is real rather
 * than a "film in post" card. The five films cycle across the eight entries,
 * which means several entries currently share a film.
 *
 * These pairings are arbitrary: the films are not recordings of these case
 * studies, and the case studies carry their own illustrative credits and
 * metrics. Replace each line with that project's actual film as it lands —
 * the map is written out entry by entry, rather than computed, so a single
 * project can be repointed without touching the others. A project with no
 * entry here falls back to the "film in post" card, so deleting a line is
 * also safe.
 */
export const PROJECT_VIDEO = {
  'conference-elevate': 'blessed-monty-west',
  'testimony-restored': 'growth-mindset-spark-ovadje',
  'brand-cornerstone': 'alpha-and-omega-hope-moyo',
  'live-easter': 'featured-video',
  'live-worship-nights': 'be-a-blessing',
  'testimony-first-light': 'blessed-monty-west',
  'conference-commission': 'growth-mindset-spark-ovadje',
  'brand-post-suite': 'alpha-and-omega-hope-moyo',
};

/** The film to play for a showcase project, or undefined if it has none. */
export function getProjectVideo(projectId) {
  if (!projectId) return undefined;
  return getVideo(PROJECT_VIDEO[projectId]);
}
