# CASE FILE: SHANMUKHA — The Mystery Behind the Mind

An interactive mystery-adventure cinematic portfolio built with React, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, and scroll-controlled HTML5 portrait (`9:16`) video storytelling.

## Architecture Overview

- **Cinematic Video Stage (`CinematicStage` + `VideoController`)**: Preserves the natural `9:16` portrait composition across desktop and mobile without stretching or cropping Shanmukha or the golden retriever. Desktop renders a centered portrait cinema frame over a live-synced blurred backdrop canvas, while mobile presents a full-screen portrait stage with calibrated contrast scrims.
- **Scroll-Driven Chapters (`ChapterManager`)**: Uses GSAP `ScrollTrigger` to drive chapter transitions, progress tracking (`ScrollProgress`), and safe `gsap.ticker` video scrubbing (`readyState >= 1` guarded), with lazy adjacent-clip preloading and poster fallbacks.
- **Accessibility & Reduced Motion**: Respects `prefers-reduced-motion: reduce` by disabling parallax and scroll scrubbing, showing crisp chapter posters with an explicit Play/Pause control, and supporting full keyboard shortcuts:
  - `ArrowDown` / `ArrowUp`: Step to next / previous chapter
  - `M`: Toggle atmospheric audio & video sound
  - `Escape`: Close the active project evidence dossier modal

## Editable Data Files

All personal, project, skill, experience, and contact records live in modular files under `src/data/`:

- `src/data/profile.ts`: Investigator title, motto, introduction paragraphs, and interactive profile dimensions.
- `src/data/skills.ts`: Skill Archive clues across Programming, Web, Technology, and Creative & Analytical categories.
- `src/data/projects.ts`: Evidence Room dossiers (`GlowUp`, `Human 360°`, `InterviewVerse AI`, `TRANQUIL`, `BIS Sahayak`, `Personal Portfolio Projects`). Leave `githubUrl` / `liveUrl` empty until verified—unavailable links are automatically hidden.
- `src/data/experience.ts`: Leadership timeline (`SAMM Metaverse`, `CodeHive`, `Google Student Ambassador`), SPSU University education record, and milestone placeholders.
- `src/data/contacts.ts`: Contact Dossier fields (`email`, `github`, `linkedin`, `resumeUrl`, `portfolio`). Only non-empty verified channels and resume files are rendered as active links/downloads.
- `src/data/media.ts`: Video clip, poster, and portrait image mappings.

## Local Development

```bash
npm install
npm run dev
```

The development server runs on `http://localhost:3000`.

## Verification & Production Build

```bash
npm run lint
npm run build
npm run preview
```

## Production Deployment

1. Run `npm run build` to generate the optimized static bundle in `dist/` (including `public/assets/` videos, posters, and photographs).
2. Deploy `dist/` to any static host or Node/container environment serving `dist/` with SPA fallback to `index.html`.
