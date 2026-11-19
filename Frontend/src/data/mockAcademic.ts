import type { Course } from '../types/academic';

export const initialCourses: Course[] = [
  // Semester 1
  { id: 'cs-101', code: 'MII1001', name: 'Programming Fundamentals', credits: 4, semester: 1, status: 'completed', grade: 'A', gradePoint: 4.0, category: 'Core', prerequisites: [] },
  { id: 'cs-102', code: 'MII1002', name: 'Calculus I', credits: 3, semester: 1, status: 'completed', grade: 'A-', gradePoint: 3.7, category: 'Core', prerequisites: [] },
  { id: 'cs-103', code: 'MII1003', name: 'Discrete Mathematics', credits: 3, semester: 1, status: 'completed', grade: 'B+', gradePoint: 3.3, category: 'Core', prerequisites: [] },
  { id: 'cs-104', code: 'UNU1001', name: 'Academic English & Writing', credits: 2, semester: 1, status: 'completed', grade: 'A', gradePoint: 4.0, category: 'General', prerequisites: [] },
  // Semester 2
  { id: 'cs-201', code: 'MII1201', name: 'Data Structures & Algorithms', credits: 4, semester: 2, status: 'completed', grade: 'A', gradePoint: 4.0, category: 'Core', prerequisites: ['MII1001'], recommendedForCareers: ['Full-Stack Software Engineer'] },
  { id: 'cs-202', code: 'MII1202', name: 'Linear Algebra', credits: 3, semester: 2, status: 'completed', grade: 'B+', gradePoint: 3.3, category: 'Core', prerequisites: ['MII1002'], recommendedForCareers: ['AI Product Engineer'] },
  { id: 'cs-203', code: 'MII1203', name: 'Computer Organization', credits: 3, semester: 2, status: 'completed', grade: 'A-', gradePoint: 3.7, category: 'Core', prerequisites: [] },
  // Semester 3
  { id: 'cs-301', code: 'MII2101', name: 'Database Systems', credits: 4, semester: 3, status: 'completed', grade: 'A', gradePoint: 4.0, category: 'Core', prerequisites: ['MII1201'], recommendedForCareers: ['Full-Stack Software Engineer'] },
  { id: 'cs-302', code: 'MII2102', name: 'Operating Systems', credits: 3, semester: 3, status: 'completed', grade: 'B+', gradePoint: 3.3, category: 'Core', prerequisites: ['MII1203'] },
  { id: 'cs-303', code: 'MII2103', name: 'Probability & Statistics', credits: 3, semester: 3, status: 'completed', grade: 'A-', gradePoint: 3.7, category: 'Core', prerequisites: ['MII1002'], recommendedForCareers: ['AI Product Engineer'] },
  // Semester 4 (Ongoing)
  { id: 'cs-401', code: 'MII2201', name: 'Software Engineering', credits: 4, semester: 4, status: 'ongoing', grade: 'TBD', gradePoint: 0, category: 'Core', prerequisites: ['MII2101'], recommendedForCareers: ['Full-Stack Software Engineer'] },
  { id: 'cs-402', code: 'MII2202', name: 'Artificial Intelligence', credits: 3, semester: 4, status: 'ongoing', grade: 'TBD', gradePoint: 0, category: 'Core', prerequisites: ['MII1201', 'MII2103'], recommendedForCareers: ['AI Product Engineer'] },
  { id: 'cs-403', code: 'MII2203', name: 'Computer Networks', credits: 3, semester: 4, status: 'ongoing', grade: 'TBD', gradePoint: 0, category: 'Core', prerequisites: ['MII2102'] },
  { id: 'cs-404', code: 'MII2204', name: 'Human-Computer Interaction', credits: 3, semester: 4, status: 'ongoing', grade: 'TBD', gradePoint: 0, category: 'Elective', prerequisites: [], recommendedForCareers: ['Full-Stack Software Engineer', 'AI Product Engineer'] },
  // Semester 5 (Planned)
  { id: 'cs-501', code: 'MII3101', name: 'Machine Learning', credits: 3, semester: 5, status: 'planned', grade: 'TBD', gradePoint: 0, category: 'Elective', prerequisites: ['MII2202'], recommendedForCareers: ['AI Product Engineer'] },
  { id: 'cs-502', code: 'MII3102', name: 'Modern Web & Cloud Architecture', credits: 3, semester: 5, status: 'planned', grade: 'TBD', gradePoint: 0, category: 'Elective', prerequisites: ['MII2201', 'MII2203'], recommendedForCareers: ['Full-Stack Software Engineer'] },
];
