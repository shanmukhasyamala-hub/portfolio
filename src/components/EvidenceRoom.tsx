import { PROJECTS_DATA, type ProjectDossier } from '../data/projects';
import { ProjectCard } from './ProjectCard';

interface EvidenceRoomProps {
  onSelectProject: (project: ProjectDossier) => void;
}

export function EvidenceRoom({ onSelectProject }: EvidenceRoomProps) {
  const leftProjects = PROJECTS_DATA.slice(0, 3);
  const rightProjects = PROJECTS_DATA.slice(3, 6);

  return (
    <section
      id="chapter-evidence"
      data-chapter-index="3"
      aria-labelledby="evidence-heading"
      className="relative min-h-[155vh] flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1420px] w-full mx-auto space-y-8">
        {/* Chapter Header */}
        <div className="chapter-panel max-w-2xl mx-auto text-center bg-[#060911]/86 backdrop-blur-md border border-[#D4AF37]/20 px-6 py-5 space-y-2">
          <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#D4AF37]">
            CHAPTER III · THE EVIDENCE ROOM
          </p>
          <h2
            id="evidence-heading"
            className="font-display text-3xl sm:text-5xl font-semibold text-[#F3F4F6] text-balance"
          >
            EVERY PROJECT HAS A STORY.
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Open any exhibit file to examine its problem statement, solution notes, and editable project records.
          </p>
        </div>

        {/* Left & Right Evidence Exhibit Columns framing Clip 03 AI Laboratory */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,430px)_1fr_minmax(320px,430px)] items-start gap-6 lg:gap-8">
          <div className="chapter-panel space-y-4">
            {leftProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInspect={onSelectProject}
              />
            ))}
          </div>

          <div className="hidden lg:block h-[60vh]" aria-hidden="true" />

          <div className="chapter-panel space-y-4">
            {rightProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInspect={onSelectProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
