/**
 * Central media registry.
 *
 * Every image on the site resolves through this file, so art direction can be
 * re-pointed in one place without touching a component.
 *
 * Each entry has:
 *   local  — a generated cinematic plate in /public/media. Always present, so
 *            the site never renders a broken frame, even fully offline.
 *   remote — an optional photograph URL. Used as the primary source when
 *            USE_REMOTE_IMAGERY is true; SmartImage silently falls back to
 *            `local` if it fails to load.
 *   alt    — the accessible description. Written once, reused everywhere.
 *
 * Swapping in One Gospel Media's own stills is the intended final step: replace
 * the `remote` values (or drop files into /public/media and repoint `local`).
 * A production agency should be showing its own frames, not stock.
 */

/**
 * Master switch for photography.
 *
 * Shipped `false` so a clean checkout renders the curated plate set with no
 * network dependency and no layout shift. Flip to `true` once `remote` points
 * at real, licensed photography.
 */
export const USE_REMOTE_IMAGERY = false;

const P = '/media';

export const MEDIA = {
  hero: {
    local: `${P}/plate-hero.svg`,
    remote: '',
    alt: 'A darkened auditorium lit by warm stage light, haze in the air above a standing congregation',
  },
  aboutPrimary: {
    local: `${P}/plate-camera-floor.svg`,
    remote: '',
    alt: 'A cinema camera on a tripod silhouetted against warm light on a production floor',
  },
  aboutSecondary: {
    local: `${P}/plate-testimony.svg`,
    remote: '',
    alt: 'An intimate interview setup, the subject rim-lit by a warm practical behind them',
  },
  vision: {
    local: `${P}/plate-outreach.svg`,
    remote: '',
    alt: 'An open-air gathering at golden hour, the crowd in silhouette against a warm sky',
  },
  mission: {
    local: `${P}/plate-worship-hall.svg`,
    remote: '',
    alt: 'A congregation with raised hands silhouetted against amber stage light',
  },
  booking: {
    local: `${P}/plate-brand-film.svg`,
    remote: '',
    alt: 'A high-contrast architectural interior cut by a warm shaft of light',
  },
  // Showcase frames, keyed by project id.
  'conference-elevate': {
    local: `${P}/plate-conference-stage.svg`,
    remote: '',
    alt: 'A wide conference stage washed in amber light before a seated audience',
  },
  'testimony-restored': {
    local: `${P}/plate-testimony.svg`,
    remote: '',
    alt: 'A close interview frame with a soft warm key and deep falloff into shadow-sm',
  },
  'brand-cornerstone': {
    local: `${P}/plate-brand-film.svg`,
    remote: '',
    alt: 'Architectural columns in high contrast with warm light raking across them',
  },
  'live-easter': {
    local: `${P}/plate-broadcast-gallery.svg`,
    remote: '',
    alt: 'A live broadcast gallery, a wall of monitors glowing in a dim control room',
  },
  'live-worship-nights': {
    local: `${P}/plate-worship-hall.svg`,
    remote: '',
    alt: 'A worship night seen from the back of the room, hands raised in silhouette',
  },
  'testimony-first-light': {
    local: `${P}/plate-portrait-light.svg`,
    remote: '',
    alt: 'A single figure lit by a soft warm key against near-black surroundings',
  },
  'conference-commission': {
    local: `${P}/plate-outreach.svg`,
    remote: '',
    alt: 'An outdoor commissioning service at golden hour with a large gathered crowd',
  },
  'brand-post-suite': {
    local: `${P}/plate-edit-suite.svg`,
    remote: '',
    alt: 'A colour grading suite lit by the cool glow of reference monitors',
  },
};

/**
 * Resolve a media key to the props SmartImage needs.
 * Unknown keys fall back to the hero plate rather than throwing, so a typo
 * degrades to a valid frame instead of an empty box.
 */
export function getMedia(key) {
  const entry = MEDIA[key] || MEDIA.hero;
  return {
    src: USE_REMOTE_IMAGERY && entry.remote ? entry.remote : entry.local,
    fallback: entry.local,
    alt: entry.alt,
  };
}
