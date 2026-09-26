import SectionHeading from './primitives/SectionHeading';
import Reveal from './primitives/Reveal';
import AmbientOrb from './primitives/AmbientOrb';
import VideoEmbed from './primitives/VideoEmbed';
import { VIDEOS } from '../data/videos';

/**
 * The film shelf.
 *
 * Each card carries its own player rather than routing through the showreel
 * dialog, so a visitor can start one film, scroll, and start another without
 * a modal in the way. Players are facades until pressed — see VideoEmbed —
 * so a page with five videos on it still makes zero YouTube requests on load.
 */
export default function Watch() {
  const [lead, ...rest] = VIDEOS;

  return (
    <section
      id="watch"
      aria-labelledby="watch-heading"
      className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <AmbientOrb
        className="-right-40 top-24 opacity-50"
        size={620}
        color="rgba(245,181,68,0.10)"
        drift="slow"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          id="watch-heading"
          eyebrow="Watch"
          title={
            <>
              The work,
              <br />
              <span className="text-gradient-warm">in motion.</span>
            </>
          }
          lede="Messages, worship and testimony — the films themselves, not a description of them. Nothing loads from YouTube until you press play."
        />

        {/* Lead film, given the width it deserves. */}
        <Reveal className="mt-14 sm:mt-16">
          <figure className="edge-light overflow-hidden rounded-2xl border border-white/9 bg-obsidian-850/60">
            <VideoEmbed video={lead} />
            <figcaption className="flex flex-col gap-1 p-6 sm:p-7">
              <h3 className="font-display text-xl text-white sm:text-2xl">{lead.title}</h3>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Featured film
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video, i) => (
            <Reveal as="li" key={video.id} delay={i * 0.06}>
              <figure className="edge-light h-full overflow-hidden rounded-2xl border border-white/9 bg-obsidian-850/60">
                <VideoEmbed video={video} />
                <figcaption className="p-5 sm:p-6">
                  <h3 className="font-display text-lg leading-snug text-white">{video.title}</h3>
                  {video.orientation === 'portrait' && (
                    <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ash">
                      Vertical
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
