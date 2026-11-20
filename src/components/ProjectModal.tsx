import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { ProjectDossier } from '../data/projects';

interface ProjectModalProps {
  project: ProjectDossier | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060911]/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#0A101F] border border-[#D4AF37]/35 shadow-[0_24px_96px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6 my-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono-tabular tracking-[0.2em] text-[#D4AF37]">
                EVIDENCE DOSSIER · {project.caseNumber}
              </span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="text-[#9CA3AF]">{project.category}</span>
            </div>
            <h2
              id="modal-project-title"
              className="font-display text-2xl sm:text-4xl font-semibold text-[#F3F4F6]"
            >
              {project.fullTitle}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close evidence file (Shortcut: Escape)"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-white/15 text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#D4AF37]/70 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
            PROJECT OVERVIEW
          </h3>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#E6E8EE]">
            {project.description}
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10">
          <div className="space-y-2">
            <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
              PROBLEM STATEMENT
            </h3>
            <p className="text-sm leading-relaxed text-[#D1D5DB]">
              {project.problemStatement}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
              SOLUTION ARCHITECTURE
            </h3>
            <p className="text-sm leading-relaxed text-[#D1D5DB]">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Role, Contributions, Impact / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
              {project.roleOrFocusLabel.toUpperCase()}
            </h3>
            <p className="text-sm leading-relaxed text-[#E6E8EE]">
              {project.roleOrFocus}
            </p>
            {project.contributions && (
              <p className="text-xs leading-relaxed text-[#9CA3AF]">
                {project.contributions}
              </p>
            )}
          </div>

          {project.impactOrVision && (
            <div className="space-y-2">
              <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
                {(project.impactOrVisionLabel ?? 'Vision').toUpperCase()}
              </h3>
              <p className="text-sm leading-relaxed text-[#D1D5DB]">
                {project.impactOrVision}
              </p>
            </div>
          )}
        </div>

        {/* Optional Hackathon / Domain / Dev Environment / Question Distribution */}
        {(project.hackathon || project.domain || project.devEnvironment || project.questionDistribution) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
            {project.hackathon && (
              <div>
                <p className="font-mono-tabular text-[11px] tracking-[0.18em] text-[#D4AF37]">
                  HACKATHON
                </p>
                <p className="text-[#E6E8EE] mt-1">{project.hackathon}</p>
              </div>
            )}
            {project.domain && (
              <div>
                <p className="font-mono-tabular text-[11px] tracking-[0.18em] text-[#D4AF37]">
                  DOMAIN
                </p>
                <p className="text-[#E6E8EE] mt-1">{project.domain}</p>
              </div>
            )}
            {project.devEnvironment && (
              <div>
                <p className="font-mono-tabular text-[11px] tracking-[0.18em] text-[#D4AF37]">
                  DEVELOPMENT ENVIRONMENT
                </p>
                <p className="text-[#E6E8EE] mt-1">{project.devEnvironment}</p>
              </div>
            )}
            {project.questionDistribution && (
              <div className="sm:col-span-2">
                <p className="font-mono-tabular text-[11px] tracking-[0.18em] text-[#D4AF37]">
                  QUESTION DISTRIBUTION
                </p>
                <p className="text-[#D1D5DB] mt-1">{project.questionDistribution}</p>
              </div>
            )}
          </div>
        )}

        {/* Technologies & Hardware */}
        {(project.technologies.length > 0 || (project.hardware && project.hardware.length > 0)) && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            {project.technologies.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
                  TECHNOLOGIES
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#F3F4F6]">
                  {project.technologies.map((tech, idx) => (
                    <span key={tech} className="inline-flex items-center gap-3">
                      <span>{tech}</span>
                      {idx < project.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-[#D4AF37]/60">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.hardware && project.hardware.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
                  HARDWARE
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#E5C158]">
                  {project.hardware.map((hw, idx, arr) => (
                    <span key={hw} className="inline-flex items-center gap-3">
                      <span>{hw}</span>
                      {idx < arr.length - 1 && (
                        <span aria-hidden="true" className="text-[#D4AF37]/60">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Features / Core Modules */}
        {project.features.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-white/10">
            <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
              KEY FEATURES &amp; MODULES
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-[#D1D5DB]">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-[#D4AF37]" aria-hidden="true">
                    —
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Design Features (when provided) */}
        {project.designFeatures && project.designFeatures.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-white/10">
            <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
              DESIGN FEATURES
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#D1D5DB]">
              {project.designFeatures.map((feat, idx, arr) => (
                <span key={feat} className="inline-flex items-center gap-3">
                  <span>{feat}</span>
                  {idx < arr.length - 1 && (
                    <span aria-hidden="true" className="text-[#D4AF37]/60">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Screenshots: shown when verified media is attached */}
        {project.screenshots.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
              EVIDENCE SCREENSHOTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((shot, idx) => (
                <figure key={idx} className="border border-white/12 bg-[#060911] overflow-hidden">
                  <img
                    src={shot.src}
                    alt={shot.caption || `${project.name} screenshot ${idx + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-video object-cover"
                  />
                  {shot.caption && (
                    <figcaption className="px-3 py-2 text-xs text-[#9CA3AF] border-t border-white/10">
                      {shot.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* External Links: only shown when verified URLs exist */}
        <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-[#D4AF37]/50 text-xs font-medium text-[#F6E7B4] hover:bg-[#D4AF37] hover:text-[#060911] transition-colors whitespace-nowrap"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-[#D4AF37] text-[#060911] text-xs font-semibold hover:bg-[#E8C766] transition-colors whitespace-nowrap"
              >
                <span>Live Demonstration</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-4 py-2 border border-white/15 text-xs text-[#D1D5DB] hover:text-[#F3F4F6] hover:border-white/40 transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
