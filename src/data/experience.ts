export interface ExperienceItem {
  id: string;
  recordCode: string;
  organization: string;
  role: string;
  credentialId?: string;
  period: string;
  summary: string;
  highlights: string[];
  skillsPracticed?: string[];
  outcome?: string;
}

export interface AchievementItem {
  id: string;
  recordCode: string;
  text: string;
}

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'samm-metaverse',
    recordCode: 'EXP-01',
    organization: 'SAMM Metaverse',
    role: 'Frontend Developer Intern',
    period: 'Internship',
    summary:
      'Worked on frontend development assignments focused on creating interactive, responsive and visually appealing web applications.',
    highlights: [
      'Profile Generator — Day 1',
      'Student Registration Form — Day 2',
      'Premium Student Registration Interface — Day 3',
      'NovaTech Company Landing Page — Day 4',
      'Company Landing Page — Day 5',
      'NeoCalc Pro Calculator — Day 6',
      'To-Do Application — Day 7',
      'Weather Application — Day 8',
      'React Landing Page — Day 9',
    ],
    skillsPracticed: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Responsive Design',
      'UI/UX',
      'Interactive Components',
      'Form Validation',
      'Frontend Debugging',
      'Git',
      'GitHub',
    ],
    outcome:
      'Improved practical frontend development abilities and gained experience translating design concepts into working applications.',
  },
  {
    id: 'google-student-ambassador',
    recordCode: 'COM-01',
    organization: 'Google Student Ambassador',
    role: 'Google Student Ambassador',
    credentialId: 'GID: 14106',
    period: 'Leadership & Community',
    summary:
      "Selected for the Google Student Ambassador program. Interested in promoting technology awareness, student learning, community engagement and opportunities to explore Google's technology ecosystem.",
    highlights: [],
  },
  {
    id: 'codehive',
    recordCode: 'COM-02',
    organization: 'CodeHive',
    role: 'Co-Head',
    period: 'Leadership & Community',
    summary: 'Co-leading student technical collaboration, hackathon readiness, and research pitches.',
    highlights: [
      'Coordinating team members',
      'Organizing hackathon and competition participation',
      'Building collaborative technical teams',
      'Assigning responsibilities based on strengths',
      'Supporting research and product planning',
      'Coordinating presentations and pitches',
      'Encouraging technical learning and teamwork',
    ],
  },
  {
    id: 'stoxra',
    recordCode: 'COM-03',
    organization: 'Stoxra',
    role: 'Campus Ambassador',
    period: 'Community',
    summary: 'Participated in campus ambassador activities and student-community engagement.',
    highlights: [],
  },
];

export const EDUCATION_RECORD = {
  recordCode: 'EDU-01',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science and Engineering — Artificial Intelligence & Machine Learning',
  institution: 'Sir Padampat Singhania University',
  status: 'Second Year | Currently Pursuing',
};

export const ACHIEVEMENTS_ARCHIVE: AchievementItem[] = [
  {
    id: 'ach-gsa',
    recordCode: 'ACH-01',
    text: 'Selected as a Google Student Ambassador.',
  },
  {
    id: 'ach-sih',
    recordCode: 'ACH-02',
    text: 'Selected for Smart India Hackathon 2026 problem-statement development with the BIS compliance assistant concept.',
  },
  {
    id: 'ach-hackarena',
    recordCode: 'ACH-03',
    text: 'Participated in HackArena 2.0 Hyderabad Zonal Round.',
  },
  {
    id: 'ach-nata',
    recordCode: 'ACH-04',
    text: 'Qualified NATA.',
  },
  {
    id: 'ach-jee',
    recordCode: 'ACH-05',
    text: 'Achieved 80.5885285 percentile in JEE Main Paper 2A (B.Arch).',
  },
];
