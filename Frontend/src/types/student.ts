export interface Student {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  semester: number;
  maxSemesters: number;
  interests: string[];
  strengths: string[];
  careerGoals: string[];
  targetGPA: number;
  personalityType?: string;
}
