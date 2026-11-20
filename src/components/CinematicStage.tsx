import { VIDEO_CLIPS, type VideoClipIndex } from '../data/media';
import { VideoController } from './VideoController';
import { MysteryAtmosphere } from './MysteryAtmosphere';

interface CinematicStageProps {
  activeVideoIndex: VideoClipIndex;
  chapterProgress: number;
  isMuted: boolean;
  reducedMotion: boolean;
  onFirstFrameReady: () => void;
}

export function CinematicStage({
  activeVideoIndex,
  chapterProgress,
  isMuted,
  reducedMotion,
  onFirstFrameReady,
}: CinematicStageProps) {
  const activeClip = VIDEO_CLIPS[activeVideoIndex];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none select-none bg-[#060911] overflow-hidden"
      aria-hidden={!reducedMotion}
    >
      <VideoController
        activeVideoIndex={activeVideoIndex}
        chapterProgress={chapterProgress}
        isMuted={isMuted}
        reducedMotion={reducedMotion}
        onFirstFrameReady={onFirstFrameReady}
      />

      <MysteryAtmosphere
        activeVideoIndex={activeVideoIndex}
        chapterProgress={chapterProgress}
        reducedMotion={reducedMotion}
      />

      {/* Atmospheric midnight navy + violet mist + vignette gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(6,9,17,0.68)_68%,rgba(6,9,17,0.94)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-[#060911]/82 via-transparent to-[#060911]/88"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#060911]/72 via-transparent to-[#060911]/72 hidden lg:block"
      />

      {/* Subtle violet & gold volumetric atmospheric haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] rounded-full bg-[#6F5E96]/10 blur-[120px] z-10"
      />

      {/* Subtle cinema film grain */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-4 z-30 opacity-45 mix-blend-overlay film-grain ${
          reducedMotion ? '' : 'film-grain-animated'
        }`}
      />

      {/* Discreet scene caption on large desktop beneath the portrait stage */}
      <div className="hidden xl:flex items-center justify-center absolute bottom-3 left-0 right-0 z-30">
        <p className="font-mono-tabular text-[11px] tracking-[0.18em] text-[#9CA3AF]/75">
          {activeClip.label}
        </p>
      </div>
    </div>
  );
}
