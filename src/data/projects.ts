export interface ProjectDossier {
  id: string;
  caseNumber: string;
  name: string;
  fullTitle: string;
  category: string;
  verificationStatus: 'verified' | 'placeholder';
  shortSummary: string;
  description: string;
  problemStatement: string;
  solution: string;
  technologies: string[];
  features: string[];
  hardware?: string[];
  coreModules?: string[];
  designFeatures?: string[];
  questionDistribution?: string;
  hackathon?: string;
  domain?: string;
  devEnvironment?: string;
  roleOrFocusLabel: string;
  roleOrFocus: string;
  contributions?: string;
  impactOrVisionLabel?: string;
  impactOrVision?: string;
  screenshots: {
    src: string;
    caption: string;
  }[];
  githubUrl: string;
  liveUrl: string;
}

/**
 * Six Real Project Evidence Dossiers (Part 4).
 * Uses strictly verified information supplied by P. Baby Shanmukha Syamala.
 */
export const PROJECTS_DATA: ProjectDossier[] = [
  {
    id: 'bis-sahayak',
    caseNumber: 'EXH-01',
    name: 'BIS Sahayak',
    fullTitle: 'BIS SAHAYAK — AI-Powered BIS Compliance Assistant',
    category: 'Artificial Intelligence | RAG | Government Technology | Document Intelligence',
    verificationStatus: 'verified',
    shortSummary:
      'AI-powered intelligent assistant transforming complex Bureau of Indian Standards (BIS) documentation into structured, actionable compliance guidance for MSMEs and entrepreneurs.',
    description:
      'BIS Sahayak is an AI-powered intelligent assistant designed to simplify the process of understanding and complying with Indian Standards established by the Bureau of Indian Standards (BIS). BIS documentation can be highly technical, lengthy, and difficult for MSMEs, entrepreneurs, manufacturers, and first-time business owners to understand. The platform aims to transform complex BIS documents into understandable, structured, and actionable compliance information.',
    problemStatement: 'SIH26107 — Ministry of Consumer Affairs',
    solution:
      'Transforms lengthy technical BIS standards documents into structured, citation-backed compliance checklists, OCR-assisted product-label verification, and interactive laboratory testing graphs with explicit information-not-found responses.',
    technologies: [
      'React / Next.js',
      'Python',
      'FastAPI',
      'Docling',
      'Tesseract OCR',
      'ChromaDB / Pinecone',
      'Ollama',
      'D3.js',
      'Docker',
    ],
    features: [
      'AI-powered BIS standards assistant',
      'Retrieval-Augmented Generation (RAG)',
      'PDF extraction and processing',
      'Visual compliance checklists',
      'Exact paragraph-level citations',
      'Interactive laboratory testing graphs',
      'Product-label recognition through OCR',
      'Regional-language assistance and voice interaction roadmap',
      'Explicit information-not-found responses',
    ],
    roleOrFocusLabel: 'My Role',
    roleOrFocus: 'Product and Strategy | Frontend and Technical Evaluation',
    contributions:
      'Product planning, feature definition, user-focused solution design, frontend considerations and technical explanations.',
    impactOrVisionLabel: 'Impact',
    impactOrVision: 'Making technical compliance information more accessible to MSMEs and entrepreneurs.',
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'tranquil',
    caseNumber: 'EXH-02',
    name: 'TRANQUIL',
    fullTitle: 'TRANQUIL — AI-Powered Stress Management System',
    category: 'Health Technology | AI | IoT | Wearable Technology',
    verificationStatus: 'verified',
    shortSummary:
      'Smart stress-management concept pairing an ESP32 wearable monitoring headband with a companion application for personalized relaxation and wellness support.',
    description:
      'TRANQUIL is a smart stress-management concept combining a wearable stress-monitoring headband with a companion application. It aims to observe physiological signals, identify potential stress patterns and provide personalized relaxation experiences.',
    problemStatement:
      'Observing everyday physiological stress patterns and delivering calm, accessible relaxation guidance without intrusive complexity.',
    solution:
      'Integrates an ESP32-based physiological sensor headband (GSR and MAX30102 over Bluetooth Low Energy) with a privacy-focused companion app offering breathing guidance, ambient audio, mood journaling, and SOS support.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'ESP32', 'BLE communication'],
    hardware: ['ESP32', 'GSR sensor', 'MAX30102', 'Bluetooth Low Energy'],
    features: [
      'Wearable stress-monitoring headband',
      'Physiological signal monitoring',
      'Personalized stress score',
      'Guided breathing exercises',
      'Relaxation music and ambient sounds',
      'Personalized wellness suggestions',
      'Mood journaling',
      'Vibration-based relaxation support',
      'SOS and trusted-contact functionality',
      'Privacy-focused personal data management',
    ],
    roleOrFocusLabel: 'My Focus',
    roleOrFocus:
      'Concept development, frontend design, application experience, feature planning and wearable integration.',
    impactOrVisionLabel: 'Vision',
    impactOrVision:
      'Making everyday stress awareness and relaxation more accessible through connected technology.',
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'interviewverse-ai',
    caseNumber: 'EXH-03',
    name: 'InterviewVerse AI',
    fullTitle: 'INTERVIEWVERSE AI — Intelligent AI Interview Platform',
    category: 'Generative AI | Agentic AI | EdTech | Interview Preparation',
    verificationStatus: 'verified',
    shortSummary:
      'AI-powered interview preparation platform featuring resume-based simulation, AI interview avatars, webcam interaction, and structured performance analytics.',
    description:
      'An AI-powered interview preparation platform designed to help students and job seekers improve their interview performance through realistic, interactive mock interviews. Users can upload resumes, select target job roles and participate in simulated interviews with AI-powered interview avatars.',
    problemStatement:
      'Students and job seekers often lack accessible, realistic mock interview practice tailored to both their resume and target job role.',
    solution:
      'Provides interactive avatar-led mock interviews using a balanced four-part question distribution (25% resume-based, 25% technical, 25% behavioral, 25% situational), webcam interaction, and an analytics dashboard with actionable feedback.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Zustand',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Gemini / OpenAI',
      'MediaPipe',
    ],
    features: [
      'Resume-based interview preparation',
      'Job-role selection',
      'AI-powered interview avatars',
      'Interactive mock interviews',
      'Webcam-based interaction',
      'Technical questions',
      'Behavioral questions',
      'Situational questions',
      'Resume-based questions',
      'Performance evaluation',
      'Feedback and improvement suggestions',
      'Interview analytics dashboard',
    ],
    questionDistribution: '25% resume-based, 25% technical, 25% behavioral and 25% situational',
    hackathon: 'HackArena 2.0 — Hyderabad Zonal Round',
    domain: 'Generative AI and Agentic AI',
    devEnvironment: 'Trae.ai',
    roleOrFocusLabel: 'My Focus',
    roleOrFocus:
      'Product concept, user experience, feature planning, interview workflow and AI-powered application design.',
    impactOrVisionLabel: 'Vision',
    impactOrVision:
      'Making high-quality interview preparation accessible through intelligent and realistic mock interviews.',
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'human-360',
    caseNumber: 'EXH-04',
    name: 'Human 360°',
    fullTitle: 'HUMAN 360° — Personal Digital Intelligence Platform',
    category: 'AI | Personal Productivity | Digital Twin | Intelligent Applications',
    verificationStatus: 'verified',
    shortSummary:
      'Personal intelligence platform concept unifying mission control, AI Council assistance, digital twin insights, Health 360, and guided workflows.',
    description:
      'A personal intelligence platform concept designed to bring multiple aspects of an individual’s digital life into one unified application.',
    problemStatement:
      'Personal productivity, wellness insights, and AI decision support are fragmented across disconnected tools.',
    solution:
      'Brings Mission Control, an AI Assistant / AI Council, a Digital Twin concept, Health 360, and Guided Mode together inside a unified dark-and-light responsive interface.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'AI integration', 'Responsive application interfaces'],
    features: [
      'Mission Control — Centralized overview and personal dashboard',
      'AI Assistant / AI Council — Intelligent assistance and decision support',
      'Digital Twin — Personalized digital representation concept',
      'Health 360 — Personal wellness information and insights',
      'Guided Mode — Structured guidance and task experiences',
    ],
    designFeatures: [
      'Dark and light themes',
      'Premium interface',
      'Centralized navigation',
      'Modern dashboard',
      'Interactive components',
      'Unified user experience',
    ],
    roleOrFocusLabel: 'My Focus',
    roleOrFocus: 'Product architecture, feature planning, UI/UX design and frontend development.',
    impactOrVisionLabel: 'Vision',
    impactOrVision:
      'Creating a unified intelligent ecosystem that helps people understand, organize and improve different aspects of their lives.',
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'glowup',
    caseNumber: 'EXH-05',
    name: 'GlowUp',
    fullTitle: 'GLOWUP — AI-Powered Beauty and Skincare Assistant',
    category: 'Artificial Intelligence | Beauty Technology | Personalized Recommendations',
    verificationStatus: 'verified',
    shortSummary:
      'AI-powered beauty and skincare application concept delivering personalized onboarding, preference questionnaires, product recommendations, and routines.',
    description:
      'An AI-powered beauty and skincare application concept designed to help users discover suitable beauty products and build personalized skincare routines.',
    problemStatement:
      'Navigating beauty and skincare product discovery can be overwhelming without structured preference assessment.',
    solution:
      'Guides users through personalized onboarding and skin-related preference questionnaires to generate tailored skincare routines and product recommendations.',
    technologies: [],
    features: [
      'Personalized onboarding',
      'Skincare and beauty questionnaires',
      'Skin-related preference assessment',
      'Product recommendations',
      'Personalized skincare routines',
      'Beauty product discovery',
      'Modern UI/UX',
    ],
    roleOrFocusLabel: 'My Focus',
    roleOrFocus:
      'Product concept, user research considerations, onboarding flow, questionnaire design, personalization strategy and application interface.',
    impactOrVisionLabel: 'Vision',
    impactOrVision:
      'Making beauty and skincare discovery more personalized, informed and accessible.',
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'case-file-shanmukha',
    caseNumber: 'EXH-06',
    name: 'CASE FILE: SHANMUKHA',
    fullTitle: 'CASE FILE: SHANMUKHA — THE MYSTERY BEHIND THE MIND',
    category: 'Personal Branding | Interactive 3D Web Development | Creative Technology',
    verificationStatus: 'verified',
    shortSummary:
      'Cinematic, mystery-investigation interactive portfolio combining scroll-controlled portrait film sequences, scene-matched backdrops, and structured case dossiers.',
    description:
      'A cinematic, immersive personal portfolio designed to present my identity, technical journey, projects, skills and achievements through a mystery-investigation storytelling experience.',
    problemStatement:
      'Conventional developer portfolios rarely convey personal storytelling, creative direction, and technical craft as one cohesive interactive film.',
    solution:
      'Combines a scroll-driven five-chapter video narrative with scene-matched widescreen extensions, interactive evidence dossiers, and accessible keyboard navigation.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'HTML5 Video API'],
    features: [
      'Cinematic introduction',
      'Photorealistic character representation',
      'Mystery-inspired storytelling',
      'Interactive case navigation',
      'Project investigation sections',
      'Personal profile and skills',
      'Experience and achievement records',
      'Cinematic transitions',
      'Interactive navigation',
      'Responsive experience',
    ],
    roleOrFocusLabel: 'My Focus',
    roleOrFocus:
      'Concept creation, creative direction, personal branding, interface planning and interactive portfolio development.',
    screenshots: [],
    githubUrl: '',
    liveUrl: 'https://shanmukhapersonal.vercel.app',
  },
];
