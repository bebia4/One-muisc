import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Watch from './components/Watch';
import Booking from './components/Booking';
import Footer from './components/Footer';
import ShowreelModal from './components/ShowreelModal';
import GrainOverlay from './components/primitives/GrainOverlay';
import { FEATURED_VIDEO } from './data/videos';

export default function App() {
  const [reel, setReel] = useState({ open: false, project: null, video: null });

  // The hero's showreel button opens the featured film itself, not a placeholder.
  const openShowreel = useCallback(
    () => setReel({ open: true, project: null, video: FEATURED_VIDEO }),
    [],
  );
  const openCaseStudy = useCallback(
    (project) => setReel({ open: true, project, video: null }),
    [],
  );
  const closeReel = useCallback(() => setReel((r) => ({ ...r, open: false })), []);

  return (
    <>
      {/* First stop for keyboard users, before the nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-90 focus:rounded-full focus:bg-ember-glow focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-obsidian-950"
      >
        Skip to content
      </a>

      <GrainOverlay />
      <Navbar />

      <main id="main">
        <Hero onOpenShowreel={openShowreel} />
        <About />
        <Values />
        <Services />
        <Showcase onPlay={openCaseStudy} />
        <Watch />
        <Booking />
      </main>

      <Footer />

      <ShowreelModal
        open={reel.open}
        onClose={closeReel}
        project={reel.project}
        video={reel.video}
      />
    </>
  );
}
