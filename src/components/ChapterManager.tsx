import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS, type VideoClipIndex } from '../data/media';
import type { ProjectDossier } from '../data/projects';
import { OpeningSequence } from './OpeningSequence';
import { InvestigatorProfile } from './InvestigatorProfile';
import { SkillsArchive } from './SkillsArchive';
import { EvidenceRoom } from './EvidenceRoom';
import { ExperienceTimeline } from './ExperienceTimeline';
import { FinalRevelation } from './FinalRevelation';
import { FinalLead } from './FinalLead';

gsap.registerPlugin(ScrollTrigger);

interface ChapterManagerProps {
  reducedMotion: boolean;
  onChapterChange: (chapterIndex: number, videoIndex: VideoClipIndex) => void;
  onChapterProgress: (progress: number) => void;
  onGlobalProgress: (progress: number) => void;
  onJumpToChapter: (id: (typeof CHAPTERS)[number]['id']) => void;
  onSelectProject: (project: ProjectDossier) => void;
}

export function ChapterManager({
  reducedMotion,
  onChapterChange,
  onChapterProgress,
  onGlobalProgress,
  onJumpToChapter,
  onSelectProject,
}: ChapterManagerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Global scroll progress
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          onGlobalProgress(self.progress);
        },
      });

      // Chapter-by-chapter video mapping and progress scrubbing
      CHAPTERS.forEach((chapter) => {
        const el = document.getElementById(`chapter-${chapter.id}`);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => onChapterChange(chapter.index, chapter.videoIndex),
          onEnterBack: () => onChapterChange(chapter.index, chapter.videoIndex),
          onUpdate: (self) => {
            if (chapter.id === 'investigator') {
              onChapterProgress(self.progress * 0.65);
            } else if (chapter.id === 'skills') {
              onChapterProgress(0.65 + self.progress * 0.35);
            } else {
              onChapterProgress(self.progress);
            }
          },
        });
      });

      // Subtle compositor-only parallax on dossier panels (disabled for reduced motion)
      if (!reducedMotion) {
        const panels = gsap.utils.toArray<HTMLElement>('.chapter-panel');
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 18 },
            {
              y: -14,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        });
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, onChapterChange, onChapterProgress, onGlobalProgress]);

  return (
    <main ref={containerRef} className="relative z-10 w-full">
      <OpeningSequence
        onEnterInvestigation={() => onJumpToChapter('investigator')}
      />
      <InvestigatorProfile />
      <SkillsArchive />
      <EvidenceRoom onSelectProject={onSelectProject} />
      <ExperienceTimeline />
      <FinalRevelation
        onReturnToOpening={() => onJumpToChapter('opening')}
      />
      <FinalLead />
    </main>
  );
}
