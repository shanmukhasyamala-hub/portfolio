import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause } from 'lucide-react';
import { VIDEO_CLIPS, type VideoClipIndex } from '../data/media';

interface VideoControllerProps {
  activeVideoIndex: VideoClipIndex;
  chapterProgress: number;
  isMuted: boolean;
  reducedMotion: boolean;
  onFirstFrameReady: () => void;
}

export function VideoController({
  activeVideoIndex,
  chapterProgress,
  isMuted,
  reducedMotion,
  onFirstFrameReady,
}: VideoControllerProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const backdropCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef<number>(chapterProgress);
  const activeIndexRef = useRef<VideoClipIndex>(activeVideoIndex);

  const [loadedClips, setLoadedClips] = useState<Record<number, boolean>>({});
  const [readyMetadata, setReadyMetadata] = useState<Record<number, boolean>>({});
  const [manualPlaying, setManualPlaying] = useState<boolean>(false);

  progressRef.current = chapterProgress;
  activeIndexRef.current = activeVideoIndex;

  // Reset manual playback state when switching clips in reduced-motion mode
  useEffect(() => {
    setManualPlaying(false);
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx !== activeVideoIndex && !vid.paused) {
        vid.pause();
      }
    });
  }, [activeVideoIndex]);

  // Sync mute state cleanly to active video element
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      vid.muted = idx === activeVideoIndex ? isMuted : true;
    });
  }, [isMuted, activeVideoIndex]);

  // Smooth scroll-driven video scrubbing via gsap.ticker + ambient canvas mirror
  useEffect(() => {
    let lastCanvasDraw = 0;

    const tick = () => {
      const idx = activeIndexRef.current;
      const vid = videoRefs.current[idx];
      if (!vid) return;

      // Mirror active video frame to blurred desktop/mobile atmospheric canvas (~15fps)
      const now = performance.now();
      if (now - lastCanvasDraw > 66 && vid.readyState >= 2) {
        const canvas = backdropCanvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            try {
              ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
              lastCanvasDraw = now;
            } catch {
              // Ignore transient decode errors
            }
          }
        }
      }

      if (reducedMotion || manualPlaying) return;

      if (vid.readyState >= 1 && Number.isFinite(vid.duration) && vid.duration > 0) {
        const clamped = Math.max(0.01, Math.min(0.99, progressRef.current));
        const targetTime = clamped * vid.duration;
        const delta = targetTime - vid.currentTime;

        if (!vid.seeking && Math.abs(delta) > 0.035) {
          const nextTime = vid.currentTime + delta * 0.22;
          try {
            vid.currentTime = Math.max(0, Math.min(vid.duration - 0.02, nextTime));
          } catch {
            // Graceful fallback if browser restricts seeking before buffer
          }
        }
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [reducedMotion, manualPlaying]);

  const toggleManualPlayback = () => {
    const vid = videoRefs.current[activeVideoIndex];
    if (!vid) return;
    if (vid.paused) {
      vid.muted = isMuted;
      void vid.play().then(() => setManualPlaying(true)).catch(() => setManualPlaying(false));
    } else {
      vid.pause();
      setManualPlaying(false);
    }
  };

  const backdropScale = reducedMotion
    ? undefined
    : `scale(${(1.01 + Math.max(0, Math.min(1, chapterProgress)) * 0.04).toFixed(4)})`;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Desktop: Scene-matched 16:9 widescreen environmental extensions + live blurred video light spillover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {VIDEO_CLIPS.map((clip, idx) => {
          const isActive = idx === activeVideoIndex;
          return (
            <div
              key={`${clip.id}-env`}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Widescreen scene extension on desktop/tablet */}
              <img
                src={clip.environmentBackdrop}
                alt=""
                referrerPolicy="no-referrer"
                style={{ transform: isActive ? backdropScale : undefined }}
                className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-300 ease-out"
              />
              {/* Native blurred poster fallback for mobile & pre-canvas warmth */}
              <img
                src={clip.poster}
                alt=""
                referrerPolicy="no-referrer"
                className="lg:hidden absolute inset-0 w-full h-full object-cover scale-115 blur-3xl opacity-35"
              />
            </div>
          );
        })}

        {/* Live blurred video luminance spillover unifying foreground portrait with widescreen extension */}
        <canvas
          ref={backdropCanvasRef}
          width={180}
          height={320}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-115 blur-3xl opacity-28 mix-blend-screen"
        />
      </div>

      {/* Centered portrait 9:16 stage preserving natural framing without stretching or cropping */}
      <div className="relative z-10 h-full lg:h-[84vh] lg:max-h-[880px] aspect-[9/16] max-w-full flex items-center justify-center lg:border lg:border-[#D4AF37]/20 lg:bg-[#060911]/80 lg:shadow-[0_24px_96px_rgba(0,0,0,0.92)] overflow-hidden">
        {VIDEO_CLIPS.map((clip, idx) => {
          const isActive = idx === activeVideoIndex;
          const isAdjacent = Math.abs(idx - activeVideoIndex) <= 1;
          const shouldAttachSource = isAdjacent || loadedClips[idx];
          const isMetadataReady = Boolean(readyMetadata[idx]);

          return (
            <div
              key={clip.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Crisp poster fallback eliminates black frames or loading flashes */}
              <img
                src={clip.poster}
                alt={clip.sceneSummary}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-contain bg-[#060911]"
              />

              {/* Portrait video layer */}
              {shouldAttachSource && (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={clip.src}
                  poster={clip.poster}
                  muted={isActive ? isMuted : true}
                  playsInline
                  loop
                  preload={isActive ? 'auto' : 'metadata'}
                  onLoadedMetadata={() => {
                    setReadyMetadata((prev) => ({ ...prev, [idx]: true }));
                    setLoadedClips((prev) => ({ ...prev, [idx]: true }));
                    if (idx === 0) onFirstFrameReady();
                  }}
                  onCanPlay={() => {
                    setReadyMetadata((prev) => ({ ...prev, [idx]: true }));
                    if (idx === 0) onFirstFrameReady();
                  }}
                  className={`relative z-10 w-full h-full object-contain transition-opacity duration-500 ${
                    isMetadataReady && (!reducedMotion || manualPlaying)
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />
              )}

              {/* Subtle status badge only while active video metadata buffers */}
              {isActive && !isMetadataReady && !reducedMotion && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-[#060911]/80 border border-[#D4AF37]/25 text-[11px] font-mono-tabular text-[#D4AF37]">
                  Buffering reel...
                </div>
              )}
            </div>
          );
        })}

        {/* Subtle portrait rim & lateral feather vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#060911]/75 via-transparent to-[#060911]/45"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#060911]/35 via-transparent to-[#060911]/35"
        />

        {/* Reduced-motion accessible playback control */}
        {reducedMotion && (
          <button
            type="button"
            onClick={toggleManualPlayback}
            aria-label={manualPlaying ? 'Pause chapter video' : 'Play chapter video'}
            className="pointer-events-auto absolute bottom-5 right-5 z-30 inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 bg-[#0A101F]/90 border border-[#D4AF37]/40 text-xs text-[#F3F4F6] hover:border-[#D4AF37] transition-colors cursor-pointer"
          >
            {manualPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Pause Scene</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Play Scene</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
