import { useState } from 'react';
import { SKILLS_ARCHIVE, type SkillItem } from '../data/skills';

export function SkillsArchive() {
  const allSkills = SKILLS_ARCHIVE.flatMap((cat) => cat.items);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(allSkills[0]);

  const leftCategories = SKILLS_ARCHIVE.slice(0, 3); // Programming, Web Development, Artificial Intelligence
  const rightCategories = SKILLS_ARCHIVE.slice(3, 5); // Tools, Other Skills

  const renderCategoryPanel = (category: (typeof SKILLS_ARCHIVE)[number]) => (
    <div
      key={category.id}
      className="bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-[#D4AF37]/20 p-5 sm:p-6 space-y-4"
    >
      <div className="space-y-1 border-b border-white/10 pb-3">
        <h3 className="font-display text-2xl font-semibold text-[#F3F4F6]">
          {category.title}
        </h3>
        <p className="text-xs leading-relaxed text-[#9CA3AF]">
          {category.disciplineNote}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
        {category.items.map((item) => {
          const isSelected = selectedSkill.id === item.id;
          const isConnected = selectedSkill.linkedTo.includes(item.name);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedSkill(item)}
              aria-pressed={isSelected}
              className={`group text-left p-3.5 border transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F6E7B4]'
                  : isConnected
                  ? 'bg-[#6F5E96]/16 border-[#D4AF37]/45 text-[#E6E8EE]'
                  : 'bg-[#0F172A]/65 border-white/12 text-[#D1D5DB] hover:border-[#D4AF37]/50 hover:text-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tabular text-[11px] tracking-wider text-[#D4AF37]">
                  {item.clueCode}
                </span>
                {isConnected && !isSelected && (
                  <span className="text-[10px] tracking-wider text-[#E5C158]">
                    Linked Clue
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm font-semibold tracking-wide">
                {item.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="chapter-skills"
      data-chapter-index="2"
      aria-labelledby="skills-heading"
      className="relative min-h-[140vh] flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1420px] w-full mx-auto space-y-8">
        {/* Chapter Header */}
        <div className="chapter-panel max-w-2xl mx-auto text-center bg-[#060911]/86 backdrop-blur-md border border-[#D4AF37]/20 px-6 py-5 space-y-2">
          <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#D4AF37]">
            CHAPTER II · THE SKILL ARCHIVE
          </p>
          <h2
            id="skills-heading"
            className="font-display text-3xl sm:text-5xl font-semibold text-[#F3F4F6] text-balance"
          >
            EVERY SKILL IS A CLUE.
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Select any clue to trace its connections across programming, web systems, intelligence, and design.
          </p>
        </div>

        {/* Left & Right Evidence Columns around Center Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,430px)_1fr_minmax(320px,430px)] items-start gap-6 lg:gap-8">
          <div className="chapter-panel space-y-5">
            {leftCategories.map(renderCategoryPanel)}
          </div>

          {/* Center Clue Inspection Strip above/within central corridor */}
          <div className="chapter-panel lg:mt-16 bg-[#060911]/90 backdrop-blur-md border border-[#D4AF37]/35 p-5 sm:p-6 space-y-3 shadow-[0_16px_48px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
              <span className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
                CLUE ANALYSIS · {selectedSkill.clueCode}
              </span>
              <span className="text-xs text-[#9CA3AF]">Active Node</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6E7B4]">
              {selectedSkill.name}
            </h3>

            <p className="text-sm leading-relaxed text-[#E6E8EE]">
              {selectedSkill.context}
            </p>

            {/* Unboxed typographic connections (zero pill clutter) */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9CA3AF]">
              <span className="text-[#D4AF37] font-medium">Connected Clues:</span>
              {selectedSkill.linkedTo.map((linkName, idx) => (
                <span key={linkName} className="inline-flex items-center gap-2 text-[#E6E8EE]">
                  <span>{linkName}</span>
                  {idx < selectedSkill.linkedTo.length - 1 && (
                    <span aria-hidden="true" className="text-[#D4AF37]/60">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="chapter-panel space-y-5">
            {rightCategories.map(renderCategoryPanel)}
          </div>
        </div>
      </div>
    </section>
  );
}
