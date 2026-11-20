import { CHAPTERS, type ChapterId } from '../data/media';

interface ScrollProgressProps {
  activeChapterIndex: number;
  globalProgress: number;
  onJumpToChapter: (id: ChapterId) => void;
}

export function ScrollProgress({
  activeChapterIndex,
  globalProgress,
  onJumpToChapter,
}: ScrollProgressProps) {
  const clamped = Math.max(0, Math.min(1, globalProgress));
  const activeChapter = CHAPTERS[activeChapterIndex] ?? CHAPTERS[0];

  return (
    <aside
      aria-label="Investigation progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-4"
    >
      <div className="text-right pr-1">
        <p className="font-mono-tabular text-[11px] tracking-[0.2em] text-[#D4AF37]">
          {String(activeChapterIndex).padStart(2, '0')} / {String(CHAPTERS.length - 1).padStart(2, '0')}
        </p>
        <p className="text-xs text-[#9CA3AF] mt-0.5 whitespace-nowrap">
          {activeChapter.shortTitle}
        </p>
      </div>

      {/* Gold investigation thread */}
      <div className="relative flex flex-col items-end gap-3.5 pr-1">
        <div
          aria-hidden="true"
          className="absolute right-[7px] top-2 bottom-2 w-[1px] bg-white/12"
        />
        <div
          aria-hidden="true"
          className="absolute right-[7px] top-2 w-[1px] bg-[#D4AF37] origin-top transition-transform duration-150"
          style={{
            height: 'calc(100% - 16px)',
            transform: `scaleY(${clamped})`,
          }}
        />

        {CHAPTERS.map((chapter, idx) => {
          const isActive = idx === activeChapterIndex;
          const isVisited = idx < activeChapterIndex;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onJumpToChapter(chapter.id)}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`Jump to ${chapter.roman}: ${chapter.shortTitle}`}
              className="group relative flex items-center gap-3 py-1 cursor-pointer focus-visible:outline-[#D4AF37]"
            >
              <span
                className={`text-[11px] tracking-wider transition-opacity duration-200 whitespace-nowrap ${
                  isActive
                    ? 'opacity-100 text-[#F6E7B4] font-medium'
                    : 'opacity-0 group-hover:opacity-100 text-[#9CA3AF]'
                }`}
              >
                {chapter.roman}
              </span>
              <span
                className={`relative z-10 block transition-all duration-200 border ${
                  isActive
                    ? 'w-3.5 h-3.5 rotate-45 bg-[#D4AF37] border-[#F6E7B4] shadow-[0_0_12px_rgba(212,175,55,0.65)]'
                    : isVisited
                    ? 'w-2.5 h-2.5 rotate-45 bg-[#D4AF37]/45 border-[#D4AF37]/80'
                    : 'w-2.5 h-2.5 rotate-45 bg-[#0A101F] border-white/30 group-hover:border-[#D4AF37]'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
