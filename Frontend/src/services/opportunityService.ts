import { initialOpportunities } from '../data/mockOpportunities';
import { apiRequest } from './api';
import type { Opportunity } from '../types/opportunity';

export const opportunityService = {
  getOpportunities: (): Promise<Opportunity[]> =>
    apiRequest('/opportunities', () => initialOpportunities, 300),
};
