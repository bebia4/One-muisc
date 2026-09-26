import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Booking from './components/Booking';
import Footer from './components/Footer';
import ShowreelModal from './components/ShowreelModal';
import GrainOverlay from './components/primitives/GrainOverlay';

export default function App() {
  const [reel, setReel] = useState({ open: false, project: null });

  const openShowreel = useCallback(() => setReel({ open: true, project: null }), []);
  const openCaseStudy = useCallback((project) => setReel({ open: true, project }), []);
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
        <Booking />
      </main>

      <Footer />

      <ShowreelModal open={reel.open} onClose={closeReel} project={reel.project} />
    </>
  );
}
