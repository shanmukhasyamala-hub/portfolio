import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { INVESTIGATOR_PHOTOS } from '../data/media';
import { PROFILE_DATA } from '../data/profile';
import { ContactDossier } from './ContactDossier';

interface FinalRevelationProps {
  onReturnToOpening: () => void;
}

export function FinalRevelation({ onReturnToOpening }: FinalRevelationProps) {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="chapter-revelation"
      data-chapter-index="5"
      aria-labelledby="revelation-heading"
      className="relative min-h-[135vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1420px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-[minmax(320px,420px)_1fr_minmax(320px,420px)] items-center gap-8 lg:gap-10">
        {/* Left Column: Final Revelation Statement */}
        <div className="chapter-panel bg-[#060911]/88 lg:bg-[#0A101F]/84 backdrop-blur-md border border-[#D4AF37]/25 p-6 sm:p-8 space-y-5">
          <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#D4AF37]">
            CHAPTER V · THE FINAL REVELATION
          </p>

          <div className="space-y-2">
            <p className="font-display italic text-2xl sm:text-3xl text-[#E5C158]">
              CASE CLOSED?
            </p>
            <h2
              id="revelation-heading"
              className="font-display text-3xl sm:text-5xl font-semibold leading-[1.06] text-[#F3F4F6] text-balance"
            >
              THE STORY IS JUST BEGINNING.
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#D1D5DB]">
            Above the glowing skyline, the investigator and her golden retriever close the leather case file—knowing every solved question opens a deeper horizon.
          </p>

          <div className="pt-2 border-t border-white/10 space-y-3">
            <p className="font-display text-xl text-[#F6E7B4]">
              “{PROFILE_DATA.motto}”
            </p>

            <button
              type="button"
              onClick={onReturnToOpening}
              className="inline-flex items-center gap-2.5 min-h-[40px] px-4 py-2 border border-[#D4AF37]/45 text-xs font-medium tracking-wide text-[#F6E7B4] hover:bg-[#D4AF37] hover:text-[#060911] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Return to Chapter 0</span>
            </button>
          </div>
        </div>

        {/* Center Clear Cinema Window for Clip 05 City Overlook */}
        <div className="hidden lg:block h-[64vh]" aria-hidden="true" />

        {/* Right Column: Contact Dossier & Investigator Sign-Off */}
        <div className="chapter-panel space-y-5">
          <ContactDossier />

          <div className="bg-[#060911]/86 lg:bg-[#0A101F]/80 backdrop-blur-md border border-white/12 p-4 flex items-center gap-4">
            {!photoError ? (
              <img
                src={INVESTIGATOR_PHOTOS.portraitFull}
                alt="Shanmukha standing along a sunlit corridor"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setPhotoError(true)}
                className="w-16 h-20 object-cover object-top border border-white/15 shrink-0"
              />
            ) : (
              <div className="w-16 h-20 bg-[#0F172A] border border-white/15 shrink-0" />
            )}
            <div className="space-y-1">
              <p className="font-display text-lg font-semibold text-[#F3F4F6]">
                {PROFILE_DATA.name}
              </p>
              <p className="text-xs text-[#9CA3AF]">
                {PROFILE_DATA.education.branch} · {PROFILE_DATA.education.institution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Editorial Footer */}
      <footer className="max-w-[1420px] w-full mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF]">
        <p>{PROFILE_DATA.caseTitle} · {PROFILE_DATA.subtitle}</p>
        <p>{PROFILE_DATA.tagline}</p>
      </footer>
    </section>
  );
}
