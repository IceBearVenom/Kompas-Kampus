import type { GradeLetter } from '../types/academic';

export const GRADE_POINT_MAP: Record<GradeLetter, number> = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'D': 1.0,
  'E': 0.0,
  'TBD': 0.0,
};
