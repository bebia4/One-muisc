/**
 * Brand marks, hand-authored.
 *
 * Lucide removed its brand icon set in v1, so these are inline SVG paths kept
 * on the same 24px grid and stroke language as the rest of the icon system.
 * They inherit colour via `currentColor`.
 */

const base = 'h-4 w-4';

export function InstagramIcon({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 12c0-2.6-.2-4-.5-4.7a2.6 2.6 0 0 0-1.8-1.8C18.6 5.2 15.8 5 12 5s-6.6.2-7.7.5a2.6 2.6 0 0 0-1.8 1.8C2.2 8 2 9.4 2 12s.2 4 .5 4.7a2.6 2.6 0 0 0 1.8 1.8c1.1.3 3.9.5 7.7.5s6.6-.2 7.7-.5a2.6 2.6 0 0 0 1.8-1.8c.3-.7.5-2.1.5-4.7Z" />
      <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function VimeoIcon({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21.5 8.1c-.4 3.1-2.6 7.3-6.5 12.6-2 2.7-3.8 4-5.2 4-.9 0-1.6-.8-2.2-2.5L5.4 13c-.4-1.7-.9-2.5-1.4-2.5-.1 0-.6.3-1.4.9l-.9-1.1c1-.8 1.9-1.7 2.8-2.5 1.3-1.1 2.2-1.7 2.8-1.8 1.5-.1 2.4.9 2.7 3 .4 2.3.7 3.8.8 4.3.4 1.8.8 2.7 1.3 2.7.4 0 .9-.6 1.7-1.7.8-1.1 1.2-2 1.3-2.6.1-1-.3-1.5-1.3-1.5-.4 0-.9.1-1.4.3.9-3 2.7-4.5 5.3-4.4 1.9.1 2.8 1.3 2.7 3.7Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10.5V17" />
      <circle cx="7" cy="7.2" r="1.1" fill="currentColor" stroke="none" />
      <path d="M11 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
      <path d="M11 10.5V17" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  vimeo: VimeoIcon,
  linkedin: LinkedinIcon,
};
