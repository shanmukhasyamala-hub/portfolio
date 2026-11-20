import type { VideoClipIndex } from '../data/media';

interface MysteryAtmosphereProps {
  activeVideoIndex: VideoClipIndex;
  chapterProgress: number;
  reducedMotion: boolean;
}

const PERIPHERAL_MOTES = [
  { left: '8%', top: '22%', delay: '0s', size: 2 },
  { left: '14%', top: '64%', delay: '1.8s', size: 3 },
  { left: '21%', top: '40%', delay: '3.2s', size: 2 },
  { left: '79%', top: '28%', delay: '1.1s', size: 2 },
  { left: '86%', top: '58%', delay: '2.6s', size: 3 },
  { left: '92%', top: '34%', delay: '4.1s', size: 2 },
  { left: '11%', top: '82%', delay: '2.2s', size: 2 },
  { left: '88%', top: '80%', delay: '0.7s', size: 2 },
];

/**
 * Restrained scene-specific mystery effects layered behind/around the centered
 * 9:16 foreground video. Never obscures faces or the golden retriever.
 */
export function MysteryAtmosphere({
  activeVideoIndex,
  chapterProgress,
  reducedMotion,
}: MysteryAtmosphereProps) {
  const motionClass = (cls: string) => (reducedMotion ? '' : cls);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-15 overflow-hidden select-none"
    >
      {/* CLIP 1 — Investigation Headquarters: sweeping flashlight, dust motes, faint red threads */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          activeVideoIndex === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`hidden lg:block absolute -inset-x-24 -top-24 h-[75vh] bg-[radial-gradient(ellipse_at_28%_35%,rgba(232,199,102,0.14),transparent_48%)] ${motionClass(
            'animate-flashlight'
          )}`}
        />
        {/* Faint peripheral crimson evidence threads */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="210" x2="360" y2="380" stroke="#9E2A2B" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="1440" y1="180" x2="1080" y2="340" stroke="#9E2A2B" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="190" cy="300" r="3" fill="#9E2A2B" />
          <circle cx="1240" cy="270" r="3" fill="#9E2A2B" />
        </svg>
      </div>

      {/* CLIP 2 — The Investigator: subtle flashlight rim, soft doorway mist & golden clue embers */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          activeVideoIndex === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`hidden lg:block absolute inset-y-0 right-0 w-[40vw] bg-[radial-gradient(circle_at_85%_48%,rgba(111,94,150,0.22),transparent_60%)] ${motionClass(
            'animate-fog'
          )}`}
        />
        <div className="hidden lg:block absolute bottom-0 inset-x-0 h-[32vh] bg-[radial-gradient(ellipse_at_50%_92%,rgba(212,175,55,0.14),transparent_55%)]" />
      </div>

      {/* CLIP 3 — The Evidence (AI Lab): holographic side lattices & subtle scanner sweep */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          activeVideoIndex === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(111,94,150,0.16),transparent_42%),radial-gradient(circle_at_85%_50%,rgba(74,124,199,0.15),transparent_42%)]" />
        {!reducedMotion && (
          <div className="hidden lg:block absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B74BD]/45 to-transparent animate-scanner" />
        )}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <circle cx="160" cy="450" r="110" fill="none" stroke="#8B74BD" strokeWidth="0.75" strokeDasharray="3 8" />
          <circle cx="1280" cy="450" r="110" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="3 8" />
        </svg>
      </div>

      {/* CLIP 4 — Beyond the Case (Temple & Forest): mist drift & volumetric antique-gold temple light */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          activeVideoIndex === 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`absolute -inset-x-12 bottom-0 h-[42vh] bg-[radial-gradient(ellipse_at_50%_100%,rgba(212,175,55,0.16),rgba(10,16,31,0.35)_55%,transparent_80%)] ${motionClass(
            'animate-fog'
          )}`}
        />
        <div
          className="hidden lg:block absolute inset-0 opacity-25 bg-[linear-gradient(122deg,rgba(212,175,55,0.16)_0%,transparent_34%,transparent_66%,rgba(212,175,55,0.12)_100%)]"
          style={{
            transform: reducedMotion
              ? undefined
              : `translate3d(0, ${(chapterProgress - 0.5) * -14}px, 0)`,
          }}
        />
      </div>

      {/* CLIP 5 — The Final Revelation: expansive night skyline lights & subtle pullback depth */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          activeVideoIndex === 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(212,175,55,0.14),transparent_62%)]" />
      </div>

      {/* Restrained peripheral dust / golden particles (kept in outer margins away from faces) */}
      <div className="hidden md:block absolute inset-0">
        {PERIPHERAL_MOTES.map((mote, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full bg-[#E8C766]/55 ${motionClass('animate-mote')}`}
            style={{
              left: mote.left,
              top: mote.top,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDelay: mote.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
