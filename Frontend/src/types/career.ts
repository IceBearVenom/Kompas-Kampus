export interface CareerPath {
  id: string;
  title: string;
  category: string;
  matchScore: number; // 0 - 100
  description: string;
  averageSalaryIDR: string;
  demandGrowth: string;
  requiredSkills: {
    name: string;
    studentLevel: number; // 0 - 100
    targetLevel: number; // 0 - 100
  }[];
  recommendedCourses: string[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  dimension: 'Analytical' | 'Creative' | 'Leadership' | 'Technical';
  options: {
    label: string;
    score: number;
  }[];
}
