export interface SkillItem {
  id: string;
  name: string;
  clueCode: string;
  context: string;
  linkedTo: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  disciplineNote: string;
  items: SkillItem[];
}

/**
 * Verified Technical Skills Archive (Part 7).
 * Intentionally omits arbitrary percentages or proficiency levels.
 */
export const SKILLS_ARCHIVE: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    disciplineNote: 'Core programming languages for systems logic, scripting, and interactive software.',
    items: [
      {
        id: 'c',
        name: 'C',
        clueCode: 'CLU-01',
        context: 'Foundational procedural programming and low-level problem solving.',
        linkedTo: ['C++', 'Problem Solving'],
      },
      {
        id: 'cpp',
        name: 'C++',
        clueCode: 'CLU-02',
        context: 'Structured and object-oriented programming for algorithmic challenges.',
        linkedTo: ['C', 'Problem Solving'],
      },
      {
        id: 'python',
        name: 'Python',
        clueCode: 'CLU-03',
        context: 'Backend services, AI application workflows, RAG pipelines, and document processing.',
        linkedTo: ['Generative AI', 'RAG', 'OCR-based document processing'],
      },
      {
        id: 'javascript-prog',
        name: 'JavaScript',
        clueCode: 'CLU-04',
        context: 'Interactive web applications, client-side logic, and browser-based experiences.',
        linkedTo: ['React', 'TypeScript', 'Frontend Development'],
      },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    disciplineNote: 'Modern frontend stack for responsive, interactive, and accessible interfaces.',
    items: [
      {
        id: 'html5',
        name: 'HTML5',
        clueCode: 'CLU-05',
        context: 'Semantic document architecture for modern web applications.',
        linkedTo: ['CSS3', 'Responsive Web Design'],
      },
      {
        id: 'css3',
        name: 'CSS3',
        clueCode: 'CLU-06',
        context: 'Visual layout styling, transitions, and responsive design systems.',
        linkedTo: ['HTML5', 'Tailwind CSS', 'UI/UX Design'],
      },
      {
        id: 'javascript-web',
        name: 'JavaScript',
        clueCode: 'CLU-07',
        context: 'Dynamic client-side behavior, DOM interactions, and API integration.',
        linkedTo: ['React', 'TypeScript', 'Frontend Development'],
      },
      {
        id: 'react',
        name: 'React',
        clueCode: 'CLU-08',
        context: 'Component-driven frontend interfaces across projects and internship work.',
        linkedTo: ['TypeScript', 'Tailwind CSS', 'Frontend Development'],
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        clueCode: 'CLU-09',
        context: 'Type-safe frontend engineering for complex interactive platforms.',
        linkedTo: ['React', 'JavaScript'],
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        clueCode: 'CLU-10',
        context: 'Utility-first styling for rapid, consistent UI craftsmanship.',
        linkedTo: ['CSS3', 'React', 'UI/UX Design'],
      },
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    disciplineNote: 'Applied AI architectures, retrieval pipelines, and intelligent assistant concepts.',
    items: [
      {
        id: 'genai',
        name: 'Generative AI',
        clueCode: 'CLU-11',
        context: 'Designing interactive AI-driven workflows and simulated conversational experiences.',
        linkedTo: ['AI Application Development', 'Prompt Engineering'],
      },
      {
        id: 'ai-app-dev',
        name: 'AI Application Development',
        clueCode: 'CLU-12',
        context: 'End-to-end product concepts combining intelligent models with user-focused UX.',
        linkedTo: ['Generative AI', 'Product Strategy', 'Python'],
      },
      {
        id: 'rag',
        name: 'RAG',
        clueCode: 'CLU-13',
        context: 'Retrieval-Augmented Generation for grounded, citation-backed document intelligence.',
        linkedTo: ['Python', 'Intelligent Assistants', 'OCR-based document processing'],
      },
      {
        id: 'prompt-eng',
        name: 'Prompt Engineering',
        clueCode: 'CLU-14',
        context: 'Structuring reliable prompts and evaluation instructions for AI assistants.',
        linkedTo: ['Generative AI', 'Intelligent Assistants'],
      },
      {
        id: 'ai-concepts',
        name: 'AI-powered application concepts',
        clueCode: 'CLU-15',
        context: 'Ideating practical solutions across compliance, wellness, interviews, and personalization.',
        linkedTo: ['Research and Ideation', 'Product Strategy'],
      },
      {
        id: 'intelligent-assistants',
        name: 'Intelligent Assistants',
        clueCode: 'CLU-16',
        context: 'Purpose-built assistant workflows guiding users through complex information.',
        linkedTo: ['RAG', 'Prompt Engineering'],
      },
      {
        id: 'ocr-doc',
        name: 'OCR-based document processing',
        clueCode: 'CLU-17',
        context: 'Extracting structured compliance and product-label insights from documents and images.',
        linkedTo: ['Python', 'RAG'],
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    disciplineNote: 'Version control, design, deployment, and AI-assisted development environments.',
    items: [
      { id: 'git', name: 'Git', clueCode: 'CLU-18', context: 'Source version tracking and collaborative branching.', linkedTo: ['GitHub'] },
      { id: 'github', name: 'GitHub', clueCode: 'CLU-19', context: 'Repository hosting and collaborative project management.', linkedTo: ['Git'] },
      { id: 'vscode', name: 'VS Code', clueCode: 'CLU-20', context: 'Primary code editing and debugging workspace.', linkedTo: ['Git', 'React'] },
      { id: 'figma', name: 'Figma', clueCode: 'CLU-21', context: 'Interface wireframing, visual systems, and interactive prototyping.', linkedTo: ['UI/UX Design'] },
      { id: 'vercel', name: 'Vercel', clueCode: 'CLU-22', context: 'Frontend deployment and web hosting workflow.', linkedTo: ['React', 'Frontend Development'] },
      { id: 'bolt', name: 'Bolt', clueCode: 'CLU-23', context: 'Rapid AI-assisted web prototyping and experimentation.', linkedTo: ['AI Application Development'] },
      { id: 'trae', name: 'Trae.ai', clueCode: 'CLU-24', context: 'AI-powered development environment used in InterviewVerse AI.', linkedTo: ['AI Application Development', 'TypeScript'] },
      { id: 'base44', name: 'Base44', clueCode: 'CLU-25', context: 'Rapid application concept iteration and interface building.', linkedTo: ['Product Strategy'] },
      { id: 'manus', name: 'Manus', clueCode: 'CLU-26', context: 'Workflow research and rapid digital concept exploration.', linkedTo: ['Research and Ideation'] },
    ],
  },
  {
    id: 'other-skills',
    title: 'Other Skills',
    disciplineNote: 'Product planning, user experience craft, teamwork, and technical communication.',
    items: [
      { id: 'ui-ux-design', name: 'UI/UX Design', clueCode: 'CLU-27', context: 'User-focused design thinking, onboarding flows, and interface clarity.', linkedTo: ['Figma', 'Frontend Development'] },
      { id: 'product-strategy', name: 'Product Strategy', clueCode: 'CLU-28', context: 'Problem framing, feature definition, and solution architecture.', linkedTo: ['Research and Ideation', 'AI-powered application concepts'] },
      { id: 'problem-solving', name: 'Problem Solving', clueCode: 'CLU-29', context: 'Creative analytical approach to real-world engineering and product challenges.', linkedTo: ['C', 'C++', 'Product Strategy'] },
      { id: 'frontend-dev', name: 'Frontend Development', clueCode: 'CLU-30', context: 'Translating concepts into responsive, interactive browser applications.', linkedTo: ['React', 'Responsive Web Design', 'UI/UX Design'] },
      { id: 'responsive-design', name: 'Responsive Web Design', clueCode: 'CLU-31', context: 'Adapting interfaces cleanly across desktop, tablet, and mobile viewports.', linkedTo: ['HTML5', 'CSS3', 'Frontend Development'] },
      { id: 'creative-thinking', name: 'Creative Thinking', clueCode: 'CLU-32', context: 'Connecting technology, spatial awareness, and storytelling.', linkedTo: ['UI/UX Design', 'Research and Ideation'] },
      { id: 'team-coord', name: 'Team Coordination', clueCode: 'CLU-33', context: 'Organizing hackathon teams, assigning strengths, and guiding pitches.', linkedTo: ['Technical Presentation'] },
      { id: 'tech-presentation', name: 'Technical Presentation', clueCode: 'CLU-34', context: 'Explaining technical architecture and product vision clearly.', linkedTo: ['Team Coordination', 'Product Strategy'] },
      { id: 'research-ideation', name: 'Research and Ideation', clueCode: 'CLU-35', context: 'Investigating problem domains and shaping practical, innovative concepts.', linkedTo: ['Product Strategy', 'Creative Thinking'] },
    ],
  },
];
