export type ChapterId =
  | 'opening'
  | 'investigator'
  | 'skills'
  | 'evidence'
  | 'beyond'
  | 'revelation';

export type VideoClipIndex = 0 | 1 | 2 | 3 | 4;

export interface VideoAsset {
  id: string;
  src: string;
  poster: string;
  environmentBackdrop: string;
  label: string;
  sceneSummary: string;
}

export interface ChapterMeta {
  id: ChapterId;
  index: number;
  roman: string;
  shortTitle: string;
  heading: string;
  subtitle: string;
  videoIndex: VideoClipIndex;
}

/**
 * Local uploaded cinematic portrait (9:16) videos, extracted poster fallbacks,
 * and scene-matched 16:9 widescreen environmental extensions (strictly environmental,
 * zero generated people or animals).
 */
export const VIDEO_CLIPS: VideoAsset[] = [
  {
    id: 'clip-01-opening',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_10.40.38_PM_f9d02900.mp4',
    poster: '/assets/posters/poster-01-opening.jpg',
    environmentBackdrop: '/src/assets/images/env_clip1_hq_1795196949270.jpg',
    label: 'Clip 01 · Investigation Headquarters',
    sceneSummary: 'Rain outside the archive window. A flashlight sweeps across the red-string evidence board.',
  },
  {
    id: 'clip-02-investigator',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_10.40.43_PM_a16c3d39.mp4',
    poster: '/assets/posters/poster-02-investigator.jpg',
    environmentBackdrop: '/src/assets/images/env_clip2_doorway_1795196948784.jpg',
    label: 'Clip 02 · The Investigator & Guide',
    sceneSummary: 'The golden retriever uncovers a glowing clue on the rain-darkened floor and leads the way.',
  },
  {
    id: 'clip-03-evidence',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_10.41.06_PM_84183637.mp4',
    poster: '/assets/posters/poster-03-evidence.jpg',
    environmentBackdrop: '/src/assets/images/env_clip3_ailab_1795196949479.jpg',
    label: 'Clip 03 · The AI Laboratory',
    sceneSummary: 'Walking past neural holograms toward a radiant computational portal.',
  },
  {
    id: 'clip-04-beyond',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_10.41.06_PM__1__ddd1faad.mp4',
    poster: '/assets/posters/poster-04-beyond.jpg',
    environmentBackdrop: '/src/assets/images/env_clip4_temple_1795196948263.jpg',
    label: 'Clip 04 · Temple Corridor to Tomorrow',
    sceneSummary: 'Stepping beneath carved stone pillars illuminated by floating milestones toward the skyline.',
  },
  {
    id: 'clip-05-revelation',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_10.41.06_PM__2__50500ce3.mp4',
    poster: '/assets/posters/poster-05-revelation.jpg',
    environmentBackdrop: '/src/assets/images/env_clip5_city_1795196948212.jpg',
    label: 'Clip 05 · The Final Revelation',
    sceneSummary: 'Shanmukha and her golden retriever close the leather case file above the glowing city.',
  },
];

export const INVESTIGATOR_PHOTOS = {
  portraitPrimary: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_2.41.38_PM_f90a02bf.jpeg',
  portraitFull: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_10.44.52_PM_f827fad5.jpeg',
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'opening',
    index: 0,
    roman: 'Chapter 0',
    shortTitle: 'Case File',
    heading: 'CASE FILE: SHANMUKHA',
    subtitle: 'THE MYSTERY BEHIND THE MIND.',
    videoIndex: 0,
  },
  {
    id: 'investigator',
    index: 1,
    roman: 'Chapter I',
    shortTitle: 'Investigator',
    heading: 'THE PERSON BEHIND THE CASE.',
    subtitle: 'Investigator Profile & Origins',
    videoIndex: 1,
  },
  {
    id: 'skills',
    index: 2,
    roman: 'Chapter II',
    shortTitle: 'Skill Archive',
    heading: 'EVERY SKILL IS A CLUE.',
    subtitle: 'Capabilities & Analytical Craft',
    videoIndex: 1,
  },
  {
    id: 'evidence',
    index: 3,
    roman: 'Chapter III',
    shortTitle: 'Evidence Room',
    heading: 'EVERY PROJECT HAS A STORY.',
    subtitle: 'Case Dossiers & Systems Built',
    videoIndex: 2,
  },
  {
    id: 'beyond',
    index: 4,
    roman: 'Chapter IV',
    shortTitle: 'Beyond the Case',
    heading: 'THE JOURNEY BEHIND THE DISCOVERY.',
    subtitle: 'Experience, Leadership & Education',
    videoIndex: 3,
  },
  {
    id: 'revelation',
    index: 5,
    roman: 'Chapter V',
    shortTitle: 'Revelation',
    heading: 'THE STORY IS JUST BEGINNING.',
    subtitle: 'Case Closed? Open Transmission',
    videoIndex: 4,
  },
];
