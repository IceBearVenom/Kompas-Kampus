export interface AIEvaluationReport {
  generatedAt: string;
  overallStatus: 'On Track' | 'Needs Attention' | 'Exceeding Expectations';
  summary: string;
  gpaAnalysis: {
    currentIPK: number;
    targetIPK: number;
    requiredAverageIPS: number;
    feasibility: string;
    advice: string;
  };
  courseFeedback: string[];
  careerAlignment: {
    primaryGoal: string;
    alignmentScore: number;
    gapAnalysis: string;
  };
  actionableRecommendations: {
    id: string;
    priority: 'High' | 'Medium' | 'Low';
    category: 'Academic' | 'Career' | 'Extracurricular';
    title: string;
    description: string;
  }[];
}
