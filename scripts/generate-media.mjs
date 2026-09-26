/**
 * Generates the local cinematic "plate" set used as poster art and as the
 * offline fallback for every remote photograph on the site.
 *
 * Each plate is a self-contained SVG: layered warm gradients, volumetric light
 * shafts, lens bokeh, stage haze and crowd silhouettes over an obsidian base.
 * They are deliberately stylised rather than photographic, so they read as
 * intentional art direction if a remote image ever fails to load.
 *
 * Run with: npm run media
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', 'public', 'media');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;

/** Deterministic PRNG so regenerating the media set produces identical files. */
function makeRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const round = (n) => Math.round(n * 100) / 100;

/** Volumetric light shafts angled from a source point. */
function lightShafts(rnd, { count, originX, originY, hue, opacity }) {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const spread = -42 + (i / Math.max(count - 1, 1)) * 84 + (rnd() - 0.5) * 9;
    const width = 26 + rnd() * 80;
    const len = H * (1.25 + rnd() * 0.65);
    const rad = (spread * Math.PI) / 180;
    const ex = originX + Math.sin(rad) * len;
    const ey = originY + Math.cos(rad) * len;
    const nx = Math.cos(rad) * (width / 2);
    const ny = -Math.sin(rad) * (width / 2);
    const o = round(opacity * (0.35 + rnd() * 0.65));
    out += `<polygon points="${round(originX)},${round(originY)} ${round(ex + nx)},${round(ey + ny)} ${round(ex - nx)},${round(ey - ny)}" fill="${hue}" opacity="${o}"/>`;
  }
  return `<g filter="url(#soft)" style="mix-blend-mode:screen">${out}</g>`;
}

/** Out-of-focus highlight circles, as from a fast lens wide open. */
function bokeh(rnd, { count, hue }) {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const r = 6 + rnd() * 54;
    const cx = rnd() * W;
    const cy = H * 0.1 + rnd() * H * 0.85;
    const o = round(0.05 + rnd() * 0.3);
    out += `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" fill="none" stroke="${hue}" stroke-width="${round(1 + rnd() * 2.5)}" opacity="${o}"/>`;
    out += `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" fill="${hue}" opacity="${round(o * 0.4)}"/>`;
  }
  return `<g filter="url(#bokehBlur)" style="mix-blend-mode:screen">${out}</g>`;
}

/** A silhouetted congregation: heads, shoulders, some raised hands. */
function crowd(rnd, { baseline, rows }) {
  let out = '';
  for (let r = 0; r < rows; r += 1) {
    const depth = r / Math.max(rows - 1, 1);
    const y = baseline + depth * 130;
    const scale = 0.62 + depth * 0.75;
    const fill = `hsl(248 14% ${round(2.5 + depth * 5)}%)`;
    const step = 52 * scale;
    let row = '';
    for (let x = -60; x < W + 80; x += step) {
      const jx = x + (rnd() - 0.5) * step * 0.5;
      const head = 12 * scale * (0.85 + rnd() * 0.35);
      const shoulder = head * 2.5;
      const hy = y - head * 2.3;
      row += `<circle cx="${round(jx)}" cy="${round(hy)}" r="${round(head)}"/>`;
      row += `<path d="M${round(jx - shoulder)} ${round(y + 200)} Q${round(jx - shoulder * 0.9)} ${round(hy + head * 1.5)} ${round(jx)} ${round(hy + head * 1.35)} Q${round(jx + shoulder * 0.9)} ${round(hy + head * 1.5)} ${round(jx + shoulder)} ${round(y + 200)} Z"/>`;
      // Occasional raised arm.
      if (rnd() > 0.76) {
        const dir = rnd() > 0.5 ? 1 : -1;
        const ax = jx + dir * head * 1.25;
        row += `<path d="M${round(ax)} ${round(hy + head * 2)} Q${round(ax + dir * head * 1.5)} ${round(hy - head * 1.6)} ${round(ax + dir * head * 0.7)} ${round(hy - head * 4.2)} L${round(ax + dir * head * 1.75)} ${round(hy - head * 4)} Q${round(ax + dir * head * 2.3)} ${round(hy - head * 0.6)} ${round(ax + dir * head * 2)} ${round(hy + head * 2.4)} Z"/>`;
      }
    }
    out += `<g fill="${fill}">${row}</g>`;
  }
  return out;
}

/** Horizontal haze bands, like atmosphere catching stage light. */
function haze(rnd, { count, hue }) {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const y = H * (0.25 + rnd() * 0.6);
    const h = 40 + rnd() * 190;
    out += `<rect x="-40" y="${round(y)}" width="${W + 80}" height="${round(h)}" fill="${hue}" opacity="${round(0.03 + rnd() * 0.07)}"/>`;
  }
  return `<g filter="url(#soft)" style="mix-blend-mode:screen">${out}</g>`;
}

function plate(cfg) {
  const rnd = makeRandom(cfg.seed);
  const [c0, c1, c2] = cfg.base;
  const accent = cfg.accent;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${cfg.alt}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${c0}"/>
      <stop offset="0.55" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="key" cx="${cfg.keyX}" cy="${cfg.keyY}" r="0.78">
      <stop offset="0" stop-color="${accent}" stop-opacity="${cfg.keyStrength}"/>
      <stop offset="0.35" stop-color="${accent}" stop-opacity="${round(cfg.keyStrength * 0.32)}"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rim" cx="${cfg.rimX}" cy="0.12" r="0.6">
      <stop offset="0" stop-color="#CFE3FF" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#CFE3FF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.5"/>
      <stop offset="0.42" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.78"/>
    </linearGradient>
    <radialGradient id="corner" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.62"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${cfg.shaftBlur}"/>
    </filter>
    <filter id="bokehBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${cfg.hazeCount ? haze(rnd, { count: cfg.hazeCount, hue: accent }) : ''}
  <rect width="${W}" height="${H}" fill="url(#key)"/>
  <rect width="${W}" height="${H}" fill="url(#rim)"/>
  ${cfg.shafts ? lightShafts(rnd, { count: cfg.shafts, originX: W * cfg.keyX, originY: H * cfg.keyY, hue: accent, opacity: cfg.shaftOpacity }) : ''}
  ${cfg.bokehCount ? bokeh(rnd, { count: cfg.bokehCount, hue: cfg.bokehHue || accent }) : ''}
  ${cfg.crowdRows ? crowd(rnd, { baseline: H * cfg.crowdBaseline, rows: cfg.crowdRows }) : ''}
  ${cfg.extra || ''}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <rect width="${W}" height="${H}" fill="url(#corner)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.09" style="mix-blend-mode:overlay"/>
</svg>`;
}

/** A stage proscenium + screen glow, for broadcast/auditorium plates. */
const stageExtra = `<g opacity="0.5">
  <rect x="440" y="250" width="720" height="330" rx="6" fill="#0d0f16" opacity="0.6"/>
  <rect x="440" y="250" width="720" height="330" rx="6" fill="none" stroke="#F5B544" stroke-opacity="0.16" stroke-width="2"/>
  <rect x="460" y="270" width="680" height="290" rx="3" fill="#1a1f2e" opacity="0.5"/>
</g>`;

/** Camera-rig geometry for production-floor plates. */
const rigExtra = `<g stroke="#0a0a0c" stroke-width="9" fill="none" opacity="0.9" stroke-linecap="round">
  <path d="M1180 1000 L1105 560"/><path d="M1032 1000 L1105 560"/><path d="M1105 560 L1105 470"/>
  <path d="M1230 1000 L1130 566"/>
</g>
<g fill="#08080a" opacity="0.94">
  <rect x="995" y="392" width="230" height="104" rx="12"/>
  <rect x="1215" y="418" width="96" height="58" rx="8"/>
  <circle cx="1311" cy="447" r="31"/>
  <rect x="1040" y="352" width="86" height="44" rx="6"/>
</g>
<circle cx="1311" cy="447" r="14" fill="#1d2433" opacity="0.95"/>
<circle cx="1305" cy="440" r="5" fill="#F5B544" opacity="0.5"/>`;

const PLATES = [
  {
    name: 'plate-worship-hall',
    alt: 'A congregation silhouetted against warm stage light in a darkened auditorium',
    seed: 1207,
    base: ['#0A0A0C', '#101019', '#07070A'],
    accent: '#F5B544',
    keyX: 0.5, keyY: 0.2, keyStrength: 0.5, rimX: 0.22,
    shafts: 13, shaftOpacity: 0.13, shaftBlur: 24,
    hazeCount: 5, bokehCount: 20,
    crowdRows: 4, crowdBaseline: 0.66,
  },
  {
    name: 'plate-camera-floor',
    alt: 'A cinema camera on sticks silhouetted on a production floor in amber light',
    seed: 4419,
    base: ['#0B0B0F', '#14121A', '#08080B'],
    accent: '#E09A3C',
    keyX: 0.3, keyY: 0.34, keyStrength: 0.44, rimX: 0.78,
    shafts: 8, shaftOpacity: 0.1, shaftBlur: 30,
    hazeCount: 4, bokehCount: 26,
    extra: rigExtra,
  },
  {
    name: 'plate-broadcast-gallery',
    alt: 'A live broadcast gallery with a wall of glowing monitors',
    seed: 8802,
    base: ['#08090D', '#0F1420', '#07080C'],
    accent: '#7FA9E8',
    keyX: 0.5, keyY: 0.4, keyStrength: 0.3, rimX: 0.5,
    shafts: 6, shaftOpacity: 0.07, shaftBlur: 34,
    hazeCount: 3, bokehCount: 34, bokehHue: '#9FC2F5',
    extra: `<g opacity="0.85">
      ${Array.from({ length: 12 }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 360 + col * 230;
        const y = 300 + row * 160;
        const lum = 0.1 + ((i * 37) % 60) / 220;
        return `<rect x="${x}" y="${y}" width="206" height="136" rx="5" fill="#111a2b"/><rect x="${x + 6}" y="${y + 6}" width="194" height="124" rx="3" fill="#7FA9E8" opacity="${round(lum)}"/>`;
      }).join('')}
    </g>
    <rect x="300" y="700" width="1000" height="16" rx="8" fill="#0a0c12" opacity="0.9"/>`,
  },
  {
    name: 'plate-portrait-light',
    alt: 'A single figure lit by a soft warm key light against deep shadow',
    seed: 3141,
    base: ['#0A0A0D', '#131017', '#070709'],
    accent: '#F0A94B',
    keyX: 0.63, keyY: 0.3, keyStrength: 0.46, rimX: 0.3,
    shafts: 6, shaftOpacity: 0.09, shaftBlur: 32,
    hazeCount: 3, bokehCount: 16,
    extra: `<g fill="#0b0b0f" opacity="0.95">
      <circle cx="800" cy="470" r="112"/>
      <path d="M580 1000 Q600 700 800 648 Q1000 700 1020 1000 Z"/>
    </g>
    <path d="M800 358 a112 112 0 0 1 96 172 a112 112 0 0 0 -96 -172 Z" fill="#F0A94B" opacity="0.1"/>`,
  },
  {
    name: 'plate-conference-stage',
    alt: 'A wide conference stage washed in amber light with a seated audience',
    seed: 6650,
    base: ['#09090C', '#111018', '#070709'],
    accent: '#F5B544',
    keyX: 0.5, keyY: 0.26, keyStrength: 0.42, rimX: 0.5,
    shafts: 15, shaftOpacity: 0.11, shaftBlur: 26,
    hazeCount: 6, bokehCount: 18,
    crowdRows: 3, crowdBaseline: 0.74,
    extra: stageExtra,
  },
  {
    name: 'plate-edit-suite',
    alt: 'A colour grading suite lit by the cool glow of reference monitors',
    seed: 9317,
    base: ['#08080B', '#0E1119', '#07070A'],
    accent: '#8FB4E6',
    keyX: 0.5, keyY: 0.42, keyStrength: 0.26, rimX: 0.5,
    shafts: 5, shaftOpacity: 0.06, shaftBlur: 36,
    hazeCount: 3, bokehCount: 22, bokehHue: '#A8C8F2',
    extra: `<rect x="430" y="270" width="740" height="330" rx="8" fill="#0d1220"/>
    <rect x="446" y="286" width="708" height="298" rx="4" fill="#8FB4E6" opacity="0.14"/>
    <g fill="#F5B544" opacity="0.4">
      ${Array.from({ length: 5 }, (_, i) => `<rect x="${470 + i * 138}" y="${520}" width="120" height="8" rx="4"/>`).join('')}
    </g>
    <rect x="360" y="690" width="880" height="150" rx="10" fill="#0a0c12" opacity="0.85"/>
    <g fill="#8FB4E6" opacity="0.2">
      ${Array.from({ length: 14 }, (_, i) => `<rect x="${380 + i * 62}" y="712" width="52" height="24" rx="3"/>`).join('')}
    </g>`,
  },
  {
    name: 'plate-testimony',
    alt: 'An intimate interview setup with a warm practical light behind the subject',
    seed: 2468,
    base: ['#0A090C', '#151018', '#08070A'],
    accent: '#E8923A',
    keyX: 0.37, keyY: 0.36, keyStrength: 0.4, rimX: 0.68,
    shafts: 7, shaftOpacity: 0.1, shaftBlur: 30,
    hazeCount: 4, bokehCount: 30,
    extra: `<g fill="#0a0a0e" opacity="0.96">
      <circle cx="1000" cy="500" r="96"/>
      <path d="M810 1000 Q828 740 1000 690 Q1172 740 1190 1000 Z"/>
    </g>`,
  },
  {
    name: 'plate-brand-film',
    alt: 'An architectural interior in high contrast with a warm shaft of light',
    seed: 7734,
    base: ['#09090C', '#121218', '#07070A'],
    accent: '#F2B457',
    keyX: 0.74, keyY: 0.18, keyStrength: 0.44, rimX: 0.2,
    shafts: 9, shaftOpacity: 0.14, shaftBlur: 22,
    hazeCount: 5, bokehCount: 12,
    extra: `<g fill="#08080b" opacity="0.9">
      <rect x="0" y="0" width="150" height="1000"/>
      <rect x="1450" y="0" width="150" height="1000"/>
      ${Array.from({ length: 4 }, (_, i) => `<rect x="${210 + i * 330}" y="0" width="58" height="1000" opacity="0.75"/>`).join('')}
    </g>
    <rect x="0" y="880" width="1600" height="120" fill="#060608" opacity="0.8"/>`,
  },
  {
    name: 'plate-outreach',
    alt: 'An open-air gathering at golden hour with a crowd in silhouette',
    seed: 5521,
    base: ['#0B0A0C', '#1A1319', '#08070A'],
    accent: '#F7A845',
    keyX: 0.5, keyY: 0.62, keyStrength: 0.52, rimX: 0.5,
    shafts: 11, shaftOpacity: 0.1, shaftBlur: 30,
    hazeCount: 6, bokehCount: 14,
    crowdRows: 3, crowdBaseline: 0.78,
  },
  {
    name: 'plate-hero',
    alt: 'A cinematic wide shot of a stage bathed in warm light with haze and crowd',
    seed: 1111,
    base: ['#09090C', '#12111A', '#070708'],
    accent: '#F5B544',
    keyX: 0.5, keyY: 0.3, keyStrength: 0.48, rimX: 0.3,
    shafts: 17, shaftOpacity: 0.12, shaftBlur: 26,
    hazeCount: 7, bokehCount: 28,
    crowdRows: 4, crowdBaseline: 0.7,
    extra: stageExtra,
  },
];

let bytes = 0;
for (const cfg of PLATES) {
  const svg = plate(cfg);
  const file = resolve(OUT, `${cfg.name}.svg`);
  writeFileSync(file, svg, 'utf8');
  bytes += Buffer.byteLength(svg);
  console.log(`  ${cfg.name}.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} kB`);
}

// A favicon built from the same language: an amber aperture on obsidian.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="g" cx="0.5" cy="0.38" r="0.7">
      <stop offset="0" stop-color="#F5B544"/>
      <stop offset="1" stop-color="#B3712A"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0A0A0C"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="url(#g)" stroke-width="3"/>
  <circle cx="32" cy="32" r="7" fill="url(#g)"/>
  <path d="M32 6 L32 14 M32 50 L32 58 M6 32 L14 32 M50 32 L58 32" stroke="#F5B544" stroke-width="2.5" stroke-linecap="round" opacity="0.65"/>
</svg>`;
writeFileSync(resolve(HERE, '..', 'public', 'favicon.svg'), favicon, 'utf8');

console.log(`\n${PLATES.length} plates + favicon written to public/media (${(bytes / 1024).toFixed(0)} kB total)`);
