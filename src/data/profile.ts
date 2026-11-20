export interface ProfileData {
  caseTitle: string;
  subtitle: string;
  tagline: string;
  motto: string;
  name: string;
  shortName: string;
  roleTitle: string;
  introductionParagraphs: string[];
  languages: string[];
  education: {
    degree: string;
    branch: string;
    institution: string;
    status: string;
  };
  dimensions: {
    id: string;
    label: string;
    summary: string;
    details: string[];
  }[];
  companionNote: {
    name: string;
    role: string;
    description: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  caseTitle: 'CASE FILE: SHANMUKHA',
  subtitle: 'THE MYSTERY BEHIND THE MIND.',
  tagline:
    'Exploring technology, designing experiences, and building intelligent solutions that make a difference.',
  motto: 'Think beyond boundaries. Build beyond expectations.',
  name: 'P. Baby Shanmukha Syamala',
  shortName: 'Shanmukha',
  roleTitle: 'B.Tech CSE (Artificial Intelligence & Machine Learning)',
  introductionParagraphs: [
    'I am P. Baby Shanmukha Syamala, a second-year B.Tech student specializing in Computer Science and Engineering (Artificial Intelligence & Machine Learning) at Sir Padampat Singhania University.',
    'I am passionate about artificial intelligence, machine learning, software development, and designing meaningful digital experiences. I enjoy transforming ideas into practical solutions through technology, creative thinking, and continuous experimentation.',
    'My interests extend beyond conventional software development. I explore AI-powered applications, intelligent automation, interactive interfaces, 3D experiences, and product innovation.',
    "I believe technology should not simply solve problems but create experiences that make people's lives easier, smarter, and better.",
  ],
  languages: ['Telugu', 'English', 'Hindi'],
  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'Computer Science and Engineering — Artificial Intelligence & Machine Learning',
    institution: 'Sir Padampat Singhania University',
    status: 'Second Year | Currently Pursuing',
  },
  dimensions: [
    {
      id: 'education',
      label: 'Education',
      summary: 'Bachelor of Technology (B.Tech) · Sir Padampat Singhania University',
      details: [
        'Branch: Computer Science and Engineering — Artificial Intelligence & Machine Learning',
        'University: Sir Padampat Singhania University',
        'Academic Status: Second Year | Currently Pursuing',
      ],
    },
    {
      id: 'strengths',
      label: 'Strengths',
      summary: 'Product thinking, creative problem-solving & continuous experimentation',
      details: [
        'Creative problem-solving & transforming ideas into application concepts',
        'Product thinking, strategic planning & user-focused design thinking',
        'Interest in emerging AI technologies & adaptability to new technologies',
        'Collaborative teamwork, communication, presentation & continuous learning',
      ],
    },
    {
      id: 'interests',
      label: 'Interests',
      summary: 'AI, interactive interfaces, spatial design & emerging technology',
      details: [
        'Artificial Intelligence and Machine Learning · Generative AI and Agentic AI',
        'AI-powered application development · Web and frontend development',
        'Interactive 3D experiences · UI/UX and product design',
        'Architecture and interior/spatial design · Smart environments and intelligent spaces',
        'Emerging technologies, innovation, hackathons and technical competitions',
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      summary: 'Multilingual communication across three languages',
      details: ['Telugu', 'English', 'Hindi'],
    },
  ],
  companionNote: {
    name: 'The Golden Retriever',
    role: 'Navigator & Field Companion',
    description:
      'Present across every threshold of the investigation—from the rain-soaked study to the laboratory portal and the city overlook.',
  },
};
