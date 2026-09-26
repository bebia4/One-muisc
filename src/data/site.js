/**
 * All editorial content for the site. Keeping copy out of components means the
 * marketing team can edit words without touching layout or motion code.
 */

export const BRAND = {
  name: 'One Gospel Media',
  short: 'OGM',
  tagline: 'Communicating Truth. Capturing Moments. Inspiring Generations.',
  manifesto:
    'We believe the Gospel deserves the same craft the world reserves for its blockbusters. Every frame we light, every story we cut, every stream we send out is an act of stewardship — truth carried with excellence, so that it travels further than the room it was born in.',
  email: 'hello@onegospelmedia.com',
  phone: '+1 (555) 014-2200',
  location: 'Studio + Field Unit · Available Worldwide',
  founded: 2019,
};

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Values', href: '#values' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Booking', href: '#booking' },
];

export const HERO_STATS = [
  { value: '480+', label: 'Productions delivered' },
  { value: '2.4M', label: 'Livestream viewers reached' },
  { value: '70+', label: 'Churches & ministries served' },
  { value: '6', label: 'Countries filmed in' },
];

export const TICKER_ITEMS = [
  'Cinematic Storytelling',
  'Multi-Cam Broadcast',
  'Editorial Photography',
  'Colour & Finish',
  'Media Systems Design',
  'Conference Coverage',
  'Documentary Shorts',
  'Team Training',
];

export const ABOUT_PILLARS = [
  {
    title: 'The Heart Behind the Lens',
    body:
      'We are not a vendor with a camera. We are believers who happen to be technicians — people who pray over a run-of-show, who learn a congregation’s name before we learn its lighting grid. Craft without conviction is decoration; conviction without craft is noise. We refuse both.',
  },
  {
    title: 'Media is the modern Roman road',
    body:
      'Rome paved the empire and the early church walked those roads with the Gospel. Today the roads are fibre, feeds and timelines. We build for that infrastructure with the same intent: clear signal, wide reach, nothing lost in transit.',
  },
  {
    title: 'Stewardship over spectacle',
    body:
      'A budget entrusted to us belongs to a congregation. So we scope honestly, shoot efficiently, and hand back files, systems and trained people — not a dependency. The goal is a ministry that can carry its own story after we leave.',
  },
];

export const VISION_MISSION = [
  {
    key: 'vision',
    kicker: 'Where we are going',
    title: 'Vision',
    statement:
      'A generation that encounters the Gospel in the language it already speaks — moving image, sound and story — rendered with a quality that earns a second look and a lasting trust.',
    points: [
      'Faith-rooted media held to cinema-grade standards',
      'Every ministry equipped to tell its own story well',
      'Truth that outlives the platform it launched on',
    ],
    mediaKey: 'vision',
  },
  {
    key: 'mission',
    kicker: 'What we do about it',
    title: 'Mission',
    statement:
      'To serve churches, ministries and purpose-driven organisations with production, broadcast and consulting that is technically excellent, spiritually grounded and genuinely handed over.',
    points: [
      'Produce work that is beautiful and doctrinally careful',
      'Build broadcast systems teams can actually operate',
      'Train and release local creatives, not replace them',
    ],
    mediaKey: 'mission',
  },
];

export const VALUES = [
  {
    id: 'excellence',
    icon: 'Gem',
    title: 'Excellence',
    line: 'Craft as worship.',
    body:
      'We hold our work to the standard of the commercial world and then push past it, because what we are carrying deserves more care than a product launch. Focus is checked twice. Audio is never an afterthought. The last 5% is the work.',
    metric: 'Colour-managed finish on every deliverable',
  },
  {
    id: 'integrity',
    icon: 'Shield',
    title: 'Integrity',
    line: 'The edit tells the truth.',
    body:
      'We will not manufacture a moment that did not happen, inflate a crowd, or cut a testimony into something the person did not mean. Honest coverage, honest quotes, honest invoices. If we cannot deliver it, we say so before you sign.',
    metric: 'Fixed scope, no surprise line items',
  },
  {
    id: 'creativity',
    icon: 'Sparkles',
    title: 'Creativity',
    line: 'Familiar truth, fresh frame.',
    body:
      'The message never changes; the way we carry it always should. We chase the unexpected angle, the restraint that lands harder than the flourish, the silence that makes the next line matter. Never derivative, never gimmick.',
    metric: 'Bespoke treatment per project, no templates',
  },
  {
    id: 'purpose',
    icon: 'Compass',
    title: 'Purpose',
    line: 'Every frame is sent somewhere.',
    body:
      'We start from the outcome, not the equipment list. Who is this for, what should it move in them, and where will it live? If a shot does not serve that answer, it does not survive the cut, however beautiful it was to capture.',
    metric: 'Outcome brief agreed before first call-sheet',
  },
];

export const SERVICES = [
  {
    id: 'cinematography',
    icon: 'Clapperboard',
    title: 'Cinematography & Video Production',
    summary:
      'Narrative-led filmmaking from treatment to final grade — brand films, ministry documentaries, sermon series and campaign spots shot with intent.',
    detail:
      'We run full pre-production: creative treatment, shot-listing, casting and scheduling, then shoot on cinema bodies with prime glass and controlled lighting. You get a director on the floor, not just an operator.',
    deliverables: ['4K / 6K Capture', 'Cinema Primes', 'Directed Treatment', 'Location Scout', 'Colour Grade'],
    audience: ['Churches', 'Ministries', 'Nonprofits', 'Purpose-led Brands'],
    turnaround: '2–5 weeks',
  },
  {
    id: 'broadcast',
    icon: 'Radio',
    title: 'Live Broadcast & Streaming',
    summary:
      'Multi-camera services, conferences and concerts carried live to every platform your people are on — with a redundancy plan behind it.',
    detail:
      'Switched multi-cam production with dedicated audio embed, graphics playout, and simulcast to YouTube, Facebook, your app and custom RTMP. Bonded-cellular and hardwired failover so a dropped feed never becomes a dropped service.',
    deliverables: ['Low-Latency Stream', 'Multi-Platform Simulcast', 'Failover Encoding', 'Live Graphics', 'On-Site Switch'],
    audience: ['Weekend Services', 'Conferences', 'Concerts', 'Global Campuses'],
    turnaround: 'Live + 48h archive',
  },
  {
    id: 'photography',
    icon: 'Aperture',
    title: 'Editorial & Event Photography',
    summary:
      'Stills that carry the same tone as the film — documentary coverage, leadership portraiture and library-building for the year ahead.',
    detail:
      'Unobtrusive documentary shooting through the whole run of an event, plus controlled portrait sessions for staff and speakers. Delivered as a tagged, colour-consistent library your comms team can actually search.',
    deliverables: ['Event Documentary', 'Leadership Portraits', 'Tagged Library', 'Same-Week Selects', 'Print-Ready Files'],
    audience: ['Conferences', 'Leadership Teams', 'Campaigns', 'Publications'],
    turnaround: '5–10 days',
  },
  {
    id: 'post',
    icon: 'Layers',
    title: 'Post-Production & Content Repurposing',
    summary:
      'One capture, a whole quarter of content — long-form finish plus the vertical cutdowns, reels and clips that carry it into the feed.',
    detail:
      'Story-first editing, sound design and mix, motion graphics and colour. Then systematic repurposing: hooks pulled from the transcript, captioned verticals, quote cards and audiograms built to a repeatable weekly rhythm.',
    deliverables: ['Short-Form Cutdowns', 'Captioned Verticals', 'Sound Design & Mix', 'Motion Graphics', 'Audiograms'],
    audience: ['Social Teams', 'Podcasts', 'Sermon Series', 'Campaigns'],
    turnaround: '1–3 weeks',
  },
  {
    id: 'consulting',
    icon: 'Settings',
    title: 'Media Consulting & Systems Setup',
    summary:
      'We design the room, specify the kit, install it and train your volunteers until they can run a service without us in the building.',
    detail:
      'Technical audit of your current setup, then a costed system design — cameras, switching, audio path, lighting, networking and storage. Installation, documented run-books, and hands-on training cycles until the local team is genuinely independent.',
    deliverables: ['System Design', 'Kit Specification', 'Install & Commission', 'Run-Book Docs', 'Volunteer Training'],
    audience: ['Church Plants', 'Growing Campuses', 'Broadcast Rooms', 'Media Teams'],
    turnaround: '4–12 weeks',
  },
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'conferences', label: 'Conferences' },
  { id: 'testimonies', label: 'Testimonies' },
  { id: 'brand', label: 'Brand Films' },
  { id: 'live', label: 'Live Events' },
];

export const PROJECTS = [
  {
    id: 'conference-elevate',
    title: 'Elevate Conference',
    client: 'Elevate Network',
    category: 'conferences',
    year: 2025,
    format: '3-Day Multi-Cam',
    runtime: '04:12',
    blurb:
      'Six cameras across three days, cut nightly so delegates left each evening with the session already in their feed.',
    tags: ['6-Cam', 'Nightly Cutdowns', 'Live Stream'],
    featured: true,
  },
  {
    id: 'testimony-restored',
    title: 'Restored',
    client: 'Grace Chapel',
    category: 'testimonies',
    year: 2025,
    format: 'Short Documentary',
    runtime: '08:47',
    blurb:
      'A single-take interview intercut with archive, tracing eleven years from a hospital corridor to a baptism tank.',
    tags: ['Documentary', 'Archive Restoration', 'Original Score'],
    featured: true,
  },
  {
    id: 'brand-cornerstone',
    title: 'Cornerstone',
    client: 'Cornerstone Trust',
    category: 'brand',
    year: 2024,
    format: 'Brand Film',
    runtime: '02:30',
    blurb:
      'An identity film for a housing charity, shot across four sites in one week on anamorphic glass.',
    tags: ['Anamorphic', 'Multi-Site', 'Campaign Cut'],
    featured: false,
  },
  {
    id: 'live-easter',
    title: 'Easter Sunday Simulcast',
    client: 'Riverside Campuses',
    category: 'live',
    year: 2026,
    format: 'Live Broadcast',
    runtime: 'LIVE',
    blurb:
      'Four campuses, one gallery, 61,000 concurrent viewers and zero dropped frames across a three-hour window.',
    tags: ['Simulcast', 'Bonded Failover', '61k Concurrent'],
    featured: true,
  },
  {
    id: 'live-worship-nights',
    title: 'Worship Nights Vol. II',
    client: 'One Sound Collective',
    category: 'live',
    year: 2025,
    format: 'Live Album Capture',
    runtime: '06:05',
    blurb:
      'A live worship record captured over two nights, with a 32-channel audio split feeding both the mix and the film.',
    tags: ['32-Ch Split', 'Two-Night Capture', 'Live Album'],
    featured: false,
  },
  {
    id: 'testimony-first-light',
    title: 'First Light',
    client: 'City Outreach',
    category: 'testimonies',
    year: 2024,
    format: 'Portrait Series',
    runtime: '03:18',
    blurb:
      'Nine portraits from a night shelter, each lit with a single source and cut to the speaker’s own rhythm.',
    tags: ['Portrait Series', 'Natural Sound', 'Single Source'],
    featured: false,
  },
  {
    id: 'conference-commission',
    title: 'The Commissioning',
    client: 'Harvest Global',
    category: 'conferences',
    year: 2026,
    format: 'Outdoor Broadcast',
    runtime: '05:40',
    blurb:
      'An open-air commissioning for 9,000 people, streamed at golden hour with drone and long-lens coverage.',
    tags: ['Outdoor OB', 'Drone', 'Golden Hour'],
    featured: false,
  },
  {
    id: 'brand-post-suite',
    title: 'Sending Season',
    client: 'Mission Forward',
    category: 'brand',
    year: 2025,
    format: 'Campaign Series',
    runtime: '01:55',
    blurb:
      'One shoot repurposed into a hero film, six verticals and a full quarter of captioned social content.',
    tags: ['Repurposing', '6 Verticals', 'Quarterly Bank'],
    featured: false,
  },
];

export const SERVICE_PILLS = [
  { id: 'video', label: 'Video Production', icon: 'Video' },
  { id: 'photo', label: 'Photography', icon: 'Camera' },
  { id: 'streaming', label: 'Live Streaming', icon: 'Radio' },
  { id: 'post', label: 'Post-Production', icon: 'Scissors' },
  { id: 'consulting', label: 'Consulting', icon: 'Settings' },
];

export const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $40,000',
  '$40,000+',
  'Not sure yet',
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', body: 'We learn the outcome before we quote the kit.' },
  { step: '02', title: 'Treatment', body: 'A written creative direction you sign off on.' },
  { step: '03', title: 'Production', body: 'Our unit arrives prepped, on time, on brief.' },
  { step: '04', title: 'Handover', body: 'Finished files, source archive and trained people.' },
];

export const FOOTER_COLUMNS = [
  {
    heading: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Core Values', href: '#values' },
      { label: 'Our Process', href: '#about' },
      { label: 'Selected Work', href: '#work' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Cinematography', href: '#services' },
      { label: 'Live Broadcast', href: '#services' },
      { label: 'Photography', href: '#services' },
      { label: 'Post-Production', href: '#services' },
      { label: 'Consulting', href: '#services' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Book a Consultation', href: '#booking' },
      { label: 'Request Showreel', href: '#work' },
      { label: 'Partner With Us', href: '#booking' },
    ],
  },
];

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  { id: 'vimeo', label: 'Vimeo', href: 'https://vimeo.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
];
