export type CourseStatus = 'completed' | 'ongoing' | 'planned';

export type GradeLetter = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E' | 'TBD';

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number; // SKS
  semester: number;
  status: CourseStatus;
  grade: GradeLetter;
  gradePoint: number; // 0.0 - 4.0
  category: 'Core' | 'Elective' | 'General';
  prerequisites: string[];
  recommendedForCareers?: string[];
}
