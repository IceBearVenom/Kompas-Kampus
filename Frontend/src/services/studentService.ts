import { initialStudent } from '../data/mockStudent';
import { apiRequest } from './api';
import type { Student } from '../types/student';

export const studentService = {
  getStudentProfile: (): Promise<Student> =>
    apiRequest('/student/me', () => initialStudent, 250),

  updateStudentProfile: (updated: Student): Promise<Student> =>
    apiRequest('/student/me', () => updated, 200),
};
