import { ArrowDown } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

interface OpeningSequenceProps {
  onEnterInvestigation: () => void;
}

export function OpeningSequence({ onEnterInvestigation }: OpeningSequenceProps) {
  return (
    <section
      id="chapter-opening"
      data-chapter-index="0"
      aria-labelledby="opening-title"
      className="relative min-h-[120vh] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1420px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-[minmax(320px,420px)_1fr_minmax(320px,420px)] items-center gap-8 lg:gap-10">
        {/* Left Title Column */}
        <div className="chapter-panel bg-[#060911]/82 lg:bg-[#0A101F]/78 backdrop-blur-md border border-[#D4AF37]/20 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
            <span className="font-mono-tabular text-xs tracking-[0.22em] text-[#D4AF37]">
              CHAPTER 0 · OPENING
            </span>
            <span className="font-mono-tabular text-xs text-[#9E2A2B] tracking-widest">
              ACTIVE DOSSIER
            </span>
          </div>

          <div className="space-y-2.5">
            <h1
              id="opening-title"
              className="font-display text-4xl sm:text-5xl xl:text-[3.5rem] font-semibold leading-[1.04] tracking-tight text-[#F3F4F6] text-balance"
            >
              {PROFILE_DATA.caseTitle}
            </h1>
            <p className="font-display italic text-xl sm:text-2xl text-[#E5C158] tracking-wide">
              {PROFILE_DATA.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#D1D5DB]">
            {PROFILE_DATA.tagline}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onEnterInvestigation}
              className="group inline-flex items-center gap-3 min-h-[44px] px-5 py-3 bg-[#D4AF37] text-[#060911] font-semibold text-sm tracking-wide hover:bg-[#E8C766] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Enter the Investigation</span>
              <ArrowDown
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Center Clear Cinema Window for Clip 01 */}
        <div className="hidden lg:block h-[62vh]" aria-hidden="true" />

        {/* Right Narrative Cue Column */}
        <div className="chapter-panel bg-[#060911]/82 lg:bg-[#0A101F]/78 backdrop-blur-md border border-white/12 p-6 sm:p-8 space-y-5">
          <p className="font-mono-tabular text-xs tracking-[0.2em] text-[#9CA3AF]">
            INVESTIGATION BRIEF
          </p>
          <blockquote className="font-display text-2xl sm:text-[1.65rem] leading-snug text-[#F3F4F6] text-balance">
            “{PROFILE_DATA.motto}”
          </blockquote>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/50 via-white/10 to-transparent" />
          <div className="space-y-2 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
            <p>
              Rain strikes the glass outside the study. Beneath the lamp light, a leather dossier opens—connecting clues, code, and curiosity.
            </p>
            <p className="font-mono-tabular text-[11px] text-[#9CA3AF] pt-1">
              Scroll to advance the reel · Use ↑ / ↓ keys to step chapters
            </p>
          </div>
        </div>
      </div>

      {/* Bottom subtle scroll indicator */}
      <div className="max-w-[1420px] w-full mx-auto flex justify-center pt-8">
        <button
          type="button"
          onClick={onEnterInvestigation}
          className="inline-flex items-center gap-2.5 px-4 py-2 text-xs tracking-[0.2em] text-[#D4AF37]/90 hover:text-[#F6E7B4] transition-colors cursor-pointer"
        >
          <span className="font-mono-tabular">BEGIN SEQUENCE</span>
          <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
