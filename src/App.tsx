import { useCallback, useEffect, useState } from 'react';
import { CHAPTERS, type ChapterId, type VideoClipIndex } from './data/media';
import type { ProjectDossier } from './data/projects';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useAmbientAudio } from './hooks/useAmbientAudio';
import { LoadingScreen } from './components/LoadingScreen';
import { CinematicStage } from './components/CinematicStage';
import { CaseNavigation } from './components/CaseNavigation';
import { ScrollProgress } from './components/ScrollProgress';
import { ChapterManager } from './components/ChapterManager';
import { ProjectModal } from './components/ProjectModal';
import { MysteryCursor } from './components/MysteryCursor';

export default function App() {
  const reducedMotion = useReducedMotion();
  const { isMuted, toggleMute } = useAmbientAudio();

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState<VideoClipIndex>(0);
  const [chapterProgress, setChapterProgress] = useState<number>(0);
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDossier | null>(null);

  const handleChapterChange = useCallback(
    (chapterIndex: number, videoIndex: VideoClipIndex) => {
      setActiveChapterIndex(chapterIndex);
      setActiveVideoIndex(videoIndex);
    },
    []
  );

  const handleJumpToChapter = useCallback(
    (id: ChapterId) => {
      const targetEl = document.getElementById(`chapter-${id}`);
      const meta = CHAPTERS.find((c) => c.id === id);
      if (meta) {
        setActiveChapterIndex(meta.index);
        setActiveVideoIndex(meta.videoIndex);
      }
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    },
    [reducedMotion]
  );

  // Global keyboard shortcuts: ArrowDown / ArrowUp (chapters), M (mute), Escape (close modal)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      if (
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === 'Escape' && selectedProject) {
        event.preventDefault();
        setSelectedProject(null);
        return;
      }

      if (event.key === 'm' || event.key === 'M') {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          toggleMute();
        }
        return;
      }

      // Do not hijack arrow keys while a modal is open or key is held down
      if (selectedProject || event.repeat) return;

      if (event.key === 'ArrowDown') {
        const nextIndex = Math.min(CHAPTERS.length - 1, activeChapterIndex + 1);
        if (nextIndex !== activeChapterIndex) {
          event.preventDefault();
          handleJumpToChapter(CHAPTERS[nextIndex].id);
        }
      } else if (event.key === 'ArrowUp') {
        const prevIndex = Math.max(0, activeChapterIndex - 1);
        if (prevIndex !== activeChapterIndex) {
          event.preventDefault();
          handleJumpToChapter(CHAPTERS[prevIndex].id);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeChapterIndex, selectedProject, toggleMute, handleJumpToChapter]);

  return (
    <div className="relative min-h-screen bg-[#060911] text-[#E6E8EE]">
      <MysteryCursor reducedMotion={reducedMotion} />
      <LoadingScreen isVideoReady={isVideoReady} />

      <CinematicStage
        activeVideoIndex={activeVideoIndex}
        chapterProgress={chapterProgress}
        isMuted={isMuted}
        reducedMotion={reducedMotion}
        onFirstFrameReady={() => setIsVideoReady(true)}
      />

      <CaseNavigation
        activeChapterIndex={activeChapterIndex}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onJumpToChapter={handleJumpToChapter}
      />

      <ScrollProgress
        activeChapterIndex={activeChapterIndex}
        globalProgress={globalProgress}
        onJumpToChapter={handleJumpToChapter}
      />

      <ChapterManager
        reducedMotion={reducedMotion}
        onChapterChange={handleChapterChange}
        onChapterProgress={setChapterProgress}
        onGlobalProgress={setGlobalProgress}
        onJumpToChapter={handleJumpToChapter}
        onSelectProject={setSelectedProject}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
