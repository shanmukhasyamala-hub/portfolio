import {
  ACHIEVEMENTS_ARCHIVE,
  EDUCATION_RECORD,
  EXPERIENCE_TIMELINE,
} from '../data/experience';

export function ExperienceTimeline() {
  return (
    <section
      id="chapter-beyond"
      data-chapter-index="4"
      aria-labelledby="beyond-heading"
      className="relative min-h-[155vh] flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1420px] w-full mx-auto space-y-8">
        {/* Chapter Header */}
        <div className="chapter-panel max-w-2xl mx-auto text-center bg-[#060911]/86 backdrop-blur-md border border-[#D4AF37]/20 px-6 py-5 space-y-2">
          <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#D4AF37]">
            CHAPTER IV · BEYOND THE CASE
          </p>
          <h2
            id="beyond-heading"
            className="font-display text-3xl sm:text-5xl font-semibold text-[#F3F4F6] text-balance"
          >
            THE JOURNEY BEHIND THE DISCOVERY.
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Confirmed leadership roles, academic grounding, and milestone archives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,430px)_1fr_minmax(320px,430px)] items-start gap-6 lg:gap-8">
          {/* Left Column: Gold-threaded Experience Timeline */}
          <div className="chapter-panel bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-[#D4AF37]/20 p-6 sm:p-7 space-y-6">
            <div className="border-b border-white/10 pb-3">
              <p className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
                FIELD EXPERIENCE &amp; LEADERSHIP
              </p>
            </div>

            <ol className="relative space-y-6 pl-5">
              <div
                aria-hidden="true"
                className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-white/15"
              />
              {EXPERIENCE_TIMELINE.map((item) => (
                <li key={item.id} className="relative space-y-2">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rotate-45 bg-[#D4AF37] border border-[#060911]"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono-tabular text-[#D4AF37]">
                      {item.recordCode}
                    </span>
                    <span className="text-[#9CA3AF]">{item.period}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#F3F4F6]">
                    {item.organization}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-sm font-medium text-[#E5C158]">{item.role}</p>
                    {item.credentialId && (
                      <span className="font-mono-tabular text-xs text-[#F6E7B4]">
                        · {item.credentialId}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#D1D5DB]">
                    {item.summary}
                  </p>

                  {item.highlights.length > 0 && (
                    <ul className="pt-1 space-y-1 text-xs text-[#D1D5DB]">
                      {item.highlights.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#D4AF37]" aria-hidden="true">—</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.skillsPracticed && item.skillsPracticed.length > 0 && (
                    <p className="pt-1 text-[11px] text-[#9CA3AF]">
                      <span className="text-[#E5C158]">Skills Practiced: </span>
                      {item.skillsPracticed.join(' · ')}
                    </p>
                  )}

                  {item.outcome && (
                    <p className="text-xs italic text-[#9CA3AF]">{item.outcome}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Center Cinema Corridor for Clip 04 Temple & Future City */}
          <div className="hidden lg:block h-[60vh]" aria-hidden="true" />

          {/* Right Column: Education Record & Verified Achievements */}
          <div className="chapter-panel space-y-5">
            {/* Academic Record */}
            <div className="bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-[#D4AF37]/25 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
                  ACADEMIC RECORD · {EDUCATION_RECORD.recordCode}
                </span>
                <span className="font-mono-tabular text-xs text-[#E5C158]">
                  Pursuing
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl font-semibold text-[#F3F4F6] text-balance">
                  {EDUCATION_RECORD.degree}
                </h3>
                <p className="text-sm text-[#E5C158]">
                  {EDUCATION_RECORD.branch}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs sm:text-sm">
                <div>
                  <p className="text-[#9CA3AF]">University</p>
                  <p className="font-medium text-[#E6E8EE] mt-0.5">
                    {EDUCATION_RECORD.institution}
                  </p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Academic Status</p>
                  <p className="font-medium text-[#F6E7B4] mt-0.5">
                    {EDUCATION_RECORD.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Achievements */}
            <div className="bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-white/12 p-6 sm:p-7 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <p className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
                  VERIFIED ACHIEVEMENTS
                </p>
              </div>

              <ul className="space-y-3.5">
                {ACHIEVEMENTS_ARCHIVE.map((entry) => (
                  <li
                    key={entry.id}
                    className="pb-3 last:pb-0 border-b last:border-b-0 border-white/10 flex items-start gap-3"
                  >
                    <span className="font-mono-tabular text-[11px] text-[#D4AF37] pt-0.5 shrink-0">
                      {entry.recordCode}
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#E6E8EE]">
                      {entry.text}
                    </p>
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
