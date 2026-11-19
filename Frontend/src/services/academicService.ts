import { initialCourses } from '../data/mockAcademic';
import { apiRequest } from './api';
import type { Course } from '../types/academic';

export const academicService = {
  getCourses: (): Promise<Course[]> =>
    apiRequest('/academic/courses', () => initialCourses, 300),
};
