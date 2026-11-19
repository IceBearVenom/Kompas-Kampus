import type { AssessmentQuestion, CareerPath } from '../types/career';

export const initialCareers: CareerPath[] = [
  {
    id: 'car-01',
    title: 'Full-Stack Software Engineer',
    category: 'Software Engineering',
    matchScore: 92,
    description: 'Design, build, and scale end-to-end web applications from responsive frontend interfaces to distributed backend APIs.',
    averageSalaryIDR: 'Rp 12.000.000 - Rp 24.000.000 / mo',
    demandGrowth: '+24% YoY',
    requiredSkills: [
      { name: 'React & TypeScript', studentLevel: 85, targetLevel: 90 },
      { name: 'Backend APIs & SQL', studentLevel: 75, targetLevel: 85 },
      { name: 'System Architecture', studentLevel: 60, targetLevel: 80 },
      { name: 'Cloud & DevOps', studentLevel: 45, targetLevel: 75 },
      { name: 'Automated Testing', studentLevel: 55, targetLevel: 80 },
    ],
    recommendedCourses: ['Software Engineering', 'Modern Web & Cloud Architecture', 'Human-Computer Interaction']
  },
  {
    id: 'car-02',
    title: 'AI Product Engineer',
    category: 'Artificial Intelligence',
    matchScore: 86,
    description: 'Bridge applied machine learning and user-facing software products by integrating LLMs, recommendation engines, and intelligent workflows.',
    averageSalaryIDR: 'Rp 15.000.000 - Rp 28.000.000 / mo',
    demandGrowth: '+38% YoY',
    requiredSkills: [
      { name: 'Python & ML Frameworks', studentLevel: 70, targetLevel: 88 },
      { name: 'Prompt & RAG Engineering', studentLevel: 78, targetLevel: 85 },
      { name: 'Product UX Sense', studentLevel: 82, targetLevel: 85 },
      { name: 'Statistical Modeling', studentLevel: 68, targetLevel: 80 },
      { name: 'API Latency Optimization', studentLevel: 50, targetLevel: 78 },
    ],
    recommendedCourses: ['Artificial Intelligence', 'Machine Learning', 'Probability & Statistics']
  },
  {
    id: 'car-03',
    title: 'Product Manager (Tech)',
    category: 'Product & Strategy',
    matchScore: 79,
    description: 'Define product vision, prioritize engineering roadmaps, and align user insights with measurable business outcomes.',
    averageSalaryIDR: 'Rp 14.000.000 - Rp 26.000.000 / mo',
    demandGrowth: '+18% YoY',
    requiredSkills: [
      { name: 'User Research & UX', studentLevel: 75, targetLevel: 88 },
      { name: 'Data Analytics (SQL)', studentLevel: 72, targetLevel: 85 },
      { name: 'Agile & Roadmapping', studentLevel: 60, targetLevel: 90 },
      { name: 'Stakeholder Communication', studentLevel: 65, targetLevel: 88 },
      { name: 'Technical Literacy', studentLevel: 90, targetLevel: 80 },
    ],
    recommendedCourses: ['Human-Computer Interaction', 'Software Engineering']
  }
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'When starting a group software project, which role do you naturally gravitate toward?',
    dimension: 'Technical',
    options: [
      { label: 'Architecting the codebase and core technical stack', score: 95 },
      { label: 'Designing the user experience and interactive flows', score: 75 },
      { label: 'Coordinating milestones, tasks, and team presentations', score: 60 }
    ]
  },
  {
    id: 'q2',
    question: 'Which type of university problem excites you the most?',
    dimension: 'Analytical',
    options: [
      { label: 'Optimizing an algorithm or training a predictive model', score: 95 },
      { label: 'Building a polished app that solves an everyday campus issue', score: 85 },
      { label: 'Researching user behavior and pitching a startup solution', score: 70 }
    ]
  },
  {
    id: 'q3',
    question: 'How do you prefer to learn new skills outside regular lectures?',
    dimension: 'Creative',
    options: [
      { label: 'Building side projects and shipping live demos', score: 90 },
      { label: 'Competing in hackathons and algorithmic contests', score: 85 },
      { label: 'Leading student tech communities and workshops', score: 75 }
    ]
  }
];
