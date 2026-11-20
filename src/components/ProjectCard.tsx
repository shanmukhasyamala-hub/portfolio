import { ArrowUpRight, FolderOpen } from 'lucide-react';
import type { ProjectDossier } from '../data/projects';

interface ProjectCardProps {
  project: ProjectDossier;
  onInspect: (project: ProjectDossier) => void;
}

export function ProjectCard({ project, onInspect }: ProjectCardProps) {
  const hasTech = project.technologies.length > 0;

  return (
    <article className="bg-[#060911]/86 lg:bg-[#0A101F]/82 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/65 transition-colors p-5 sm:p-6 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
          <span className="font-mono-tabular text-xs tracking-[0.18em] text-[#D4AF37]">
            {project.caseNumber}
          </span>
          <span className="text-[11px] text-[#9CA3AF]">
            {project.verificationStatus === 'verified'
              ? 'Verified Record'
              : 'Editable Placeholder'}
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold text-[#F3F4F6]">
          {project.name}
        </h3>

        <p className="text-[11px] font-mono-tabular tracking-wide text-[#9CA3AF]">
          {project.category}
        </p>

        <p className="text-xs sm:text-sm leading-relaxed text-[#D1D5DB]">
          {project.shortSummary}
        </p>

        {hasTech && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9CA3AF]">
            {project.technologies.slice(0, 5).map((tech, idx, arr) => (
              <span key={tech} className="inline-flex items-center gap-2 text-[#E5C158]">
                <span>{tech}</span>
                {idx < arr.length - 1 && (
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                )}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-[#9CA3AF]">+{project.technologies.length - 5} more</span>
            )}
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-[#D4AF37]/12 border border-[#D4AF37]/45 text-xs font-medium tracking-wide text-[#F6E7B4] hover:bg-[#D4AF37] hover:text-[#060911] transition-colors cursor-pointer whitespace-nowrap"
        >
          <FolderOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Inspect Evidence File</span>
        </button>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className="inline-flex items-center gap-1 text-xs text-[#D1D5DB] hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} Live Demonstration`}
              className="inline-flex items-center gap-1 text-xs text-[#D1D5DB] hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              <span>Live</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
