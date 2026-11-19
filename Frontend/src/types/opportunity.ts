export type OpportunityType = 'Organization' | 'Competition' | 'Event';

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  type: OpportunityType;
  deadline: string;
  location: string;
  tags: string[];
  description: string;
  benefits: string[];
  isBookmarked: boolean;
}
