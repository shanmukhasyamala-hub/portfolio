import { useState } from 'react';
import { INVESTIGATOR_PHOTOS } from '../data/media';
import { PROFILE_DATA } from '../data/profile';

export function InvestigatorProfile() {
  const [activeDimensionId, setActiveDimensionId] = useState<string>(
    PROFILE_DATA.dimensions[0].id
  );
  const [imageError, setImageError] = useState(false);

  const activeDimension =
    PROFILE_DATA.dimensions.find((d) => d.id === activeDimensionId) ??
    PROFILE_DATA.dimensions[0];

  return (
    <section
      id="chapter-investigator"
      data-chapter-index="1"
      aria-labelledby="investigator-heading"
      className="relative min-h-[140vh] flex items-center py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1420px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[minmax(320px,420px)_1fr_minmax(320px,420px)] items-center gap-8 lg:gap-10">
        {/* Left Column: Authentic Investigator Photograph & Companion Dossier */}
        <div className="chapter-panel bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-[#D4AF37]/20 p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
              CHAPTER I · SUBJECT FILE
            </span>
            <span className="font-mono-tabular text-xs text-[#9CA3AF]">
              VERIFIED PORTRAIT
            </span>
          </div>

          {/* Investigator Photo Frame */}
          <div className="relative overflow-hidden border border-white/15 bg-[#060911]">
            {!imageError ? (
              <img
                src={INVESTIGATOR_PHOTOS.portraitPrimary}
                alt="P. Baby Shanmukha Syamala — Computer Science Engineering (AI & ML) student"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full aspect-[4/5] object-cover object-top"
              />
            ) : (
              <div className="w-full aspect-[4/5] flex items-center justify-center bg-[#0F172A] text-center p-6">
                <p className="font-display text-xl text-[#D4AF37]">
                  Subject Portrait · {PROFILE_DATA.shortName}
                </p>
              </div>
            )}
            <div className="p-3.5 bg-[#060911]/90 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold text-[#F3F4F6]">
                  {PROFILE_DATA.name}
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  {PROFILE_DATA.roleTitle}
                </p>
              </div>
              <span className="font-mono-tabular text-[11px] text-[#D4AF37] shrink-0 text-right">
                Second Year
              </span>
            </div>
          </div>

          {/* Golden Retriever Companion Note */}
          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#E5C158]">
                {PROFILE_DATA.companionNote.name}
              </span>
              <span className="text-[#9CA3AF]">
                {PROFILE_DATA.companionNote.role}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#D1D5DB]">
              {PROFILE_DATA.companionNote.description}
            </p>
          </div>
        </div>

        {/* Center Clear Stage for Clip 02 */}
        <div className="hidden lg:block h-[66vh]" aria-hidden="true" />

        {/* Right Column: Narrative Introduction & Interactive Dossier Tabs */}
        <div className="chapter-panel bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-[#D4AF37]/20 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <p className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
              INVESTIGATOR PROFILE
            </p>
            <h2
              id="investigator-heading"
              className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#F3F4F6] text-balance"
            >
              THE PERSON BEHIND THE CASE.
            </h2>
          </div>

          <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#E6E8EE]">
            {PROFILE_DATA.introductionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Interactive Dimension Selector */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div
              role="tablist"
              aria-label="Investigator profile dimensions"
              className="flex flex-wrap gap-1.5"
            >
              {PROFILE_DATA.dimensions.map((dimension) => {
                const isSelected = dimension.id === activeDimension.id;
                return (
                  <button
                    key={dimension.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveDimensionId(dimension.id)}
                    className={`min-h-[36px] px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#D4AF37]/16 border-[#D4AF37]/70 text-[#F6E7B4]'
                        : 'bg-[#060911]/60 border-white/12 text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-white/30'
                    }`}
                  >
                    {dimension.label}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" className="space-y-2.5 pt-1">
              <p className="font-display text-xl text-[#E5C158]">
                {activeDimension.summary}
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#D1D5DB]">
                {activeDimension.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono-tabular text-[#D4AF37] mt-0.5" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
