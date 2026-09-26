/**
 * Page-wide film grain. Sits above everything and ignores pointer events, so
 * it reads as emulsion texture rather than a layer you can interact with.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-layer pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
    />
  );
}
