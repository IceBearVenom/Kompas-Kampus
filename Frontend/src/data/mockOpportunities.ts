import type { Opportunity } from '../types/opportunity';

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-01',
    title: 'GEMASTIK XIX — Software Development Division',
    organizer: 'Puspresnas Kemendikbudristek',
    type: 'Competition',
    deadline: '2026-12-10',
    location: 'National / Hybrid',
    tags: ['Software Engineering', 'National', 'Team of 3'],
    description: 'Indonesia’s premier national ICT student competition. Build impactful software solutions addressing national digital transformation challenges.',
    benefits: ['National recognition & SKPI points', 'Mentorship from industry engineers', 'Cash prizes & fast-track internships'],
    isBookmarked: true
  },
  {
    id: 'opp-02',
    title: 'Google Developer Groups on Campus (GDGoC) — Core Team',
    organizer: 'GDGoC Chapter UGM',
    type: 'Organization',
    deadline: '2026-11-30',
    location: 'Yogyakarta (On-Campus)',
    tags: ['Leadership', 'Web & AI', 'Community'],
    description: 'Lead technical workshops, study jams, and hackathons for over 600 student developers across campus.',
    benefits: ['Direct network with Google Developer Experts', 'Leadership & event management experience', 'Exclusive swags & summit invitations'],
    isBookmarked: false
  },
  {
    id: 'opp-03',
    title: 'Indonesia AI & Cloud Student Summit 2026',
    organizer: 'Faculty of Engineering & Tech Partners',
    type: 'Event',
    deadline: '2026-11-25',
    location: 'Grha Sabha Pramana / Live Stream',
    tags: ['AI', 'Cloud', 'Networking'],
    description: 'Full-day hands-on labs covering production RAG systems, TypeScript full-stack deployment, and tech career panels.',
    benefits: ['Free cloud credits ($50)', 'Certificate of completion', 'On-site CV review with tech recruiters'],
    isBookmarked: true
  },
  {
    id: 'opp-04',
    title: 'Compfest UI — Indie Game & App Innovation Challenge',
    organizer: 'Fasilkom Universitas Indonesia',
    type: 'Competition',
    deadline: '2026-12-18',
    location: 'Jakarta / Online',
    tags: ['Product Design', 'Innovation', 'UI/UX'],
    description: 'Showcase your product engineering and UI/UX design skills by creating an innovative application from ideation to MVP.',
    benefits: ['Product pitch coaching', 'Total prize pool Rp 45.000.000', 'Portfolio showcase'],
    isBookmarked: false
  }
];
