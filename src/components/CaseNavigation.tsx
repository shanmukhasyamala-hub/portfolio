import { useState } from 'react';
import { Compass, X } from 'lucide-react';
import { CHAPTERS, type ChapterId } from '../data/media';
import { AudioToggle } from './AudioToggle';

interface CaseNavigationProps {
  activeChapterIndex: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onJumpToChapter: (id: ChapterId) => void;
}

export function CaseNavigation({
  activeChapterIndex,
  isMuted,
  onToggleMute,
  onJumpToChapter,
}: CaseNavigationProps) {
  const [indexOpen, setIndexOpen] = useState(false);
  const currentChapter = CHAPTERS[activeChapterIndex] ?? CHAPTERS[0];

  const handleSelect = (id: ChapterId) => {
    setIndexOpen(false);
    onJumpToChapter(id);
  };

  return (
    <>
      {/* Minimal cinematic HUD: never a heavy traditional navbar; mobile height stays compact */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 pointer-events-none">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => handleSelect('opening')}
            className="pointer-events-auto text-left group cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="font-display text-base sm:text-lg font-semibold tracking-wider text-[#F3F4F6] group-hover:text-[#F6E7B4] transition-colors">
              CASE FILE: SHANMUKHA
            </span>
          </button>

          <div className="pointer-events-auto flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIndexOpen((prev) => !prev)}
              aria-expanded={indexOpen}
              aria-controls="case-index-drawer"
              className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 border border-white/15 bg-[#0A101F]/85 backdrop-blur-md text-xs tracking-wide text-[#E6E8EE] hover:border-[#D4AF37]/60 hover:text-[#F6E7B4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {indexOpen ? (
                <X className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              ) : (
                <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">Case Index ·</span>
              <span className="font-mono-tabular text-[#D4AF37]">{currentChapter.roman}</span>
            </button>

            <AudioToggle isMuted={isMuted} onToggle={onToggleMute} />
          </div>
        </div>
      </header>

      {/* Discreet Case Index Overlay Panel */}
      {indexOpen && (
        <div
          id="case-index-drawer"
          role="dialog"
          aria-label="Case chapters navigation"
          className="fixed inset-0 z-50 flex justify-end bg-[#060911]/75 backdrop-blur-sm"
          onClick={() => setIndexOpen(false)}
        >
          <nav
            aria-label="Case File Chapters"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm h-full bg-[#0A101F] border-l border-[#D4AF37]/25 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <p className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
                    CASE INDEX
                  </p>
                  <p className="font-display text-2xl text-[#F3F4F6] mt-1">
                    Investigation Chapters
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIndexOpen(false)}
                  aria-label="Close case index"
                  className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center border border-white/15 text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#D4AF37]/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <ol className="mt-6 space-y-2">
                {CHAPTERS.map((chapter) => {
                  const isActive = chapter.index === activeChapterIndex;
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(chapter.id)}
                        className={`w-full text-left px-4 py-3.5 border transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#D4AF37]/12 border-[#D4AF37]/60 text-[#F6E7B4]'
                            : 'bg-[#0F172A]/50 border-white/10 text-[#D1D5DB] hover:border-[#D4AF37]/40 hover:text-[#F3F4F6]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tabular text-[11px] tracking-[0.18em] text-[#D4AF37]">
                            {chapter.roman}
                          </span>
                          <span className="font-mono-tabular text-[11px] text-[#9CA3AF]">
                            {String(chapter.index).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="font-display text-xl font-semibold mt-1">
                          {chapter.shortTitle}
                        </p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5 line-clamp-1">
                          {chapter.subtitle}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2 text-xs text-[#9CA3AF]">
              <p className="font-mono-tabular text-[11px] tracking-wider text-[#D4AF37]">
                KEYBOARD CONTROLS
              </p>
              <div className="flex items-center justify-between">
                <span>Next / Previous Chapter</span>
                <span className="font-mono-tabular text-[#E6E8EE]">↓ / ↑</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mute / Unmute Sound</span>
                <span className="font-mono-tabular text-[#E6E8EE]">M</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Close Active Dossier</span>
                <span className="font-mono-tabular text-[#E6E8EE]">ESC</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
