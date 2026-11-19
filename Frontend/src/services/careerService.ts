import { initialCareers } from '../data/mockCareer';
import { apiRequest } from './api';
import type { CareerPath } from '../types/career';

export const careerService = {
  getCareerPaths: (): Promise<CareerPath[]> =>
    apiRequest('/career/recommendations', () => initialCareers, 300),
};
