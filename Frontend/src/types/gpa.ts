export interface SemesterGPAHistory {
  semester: number;
  ips: number; // Indeks Prestasi Semester
  ipk: number; // Indeks Prestasi Kumulatif
  creditsEarned: number;
}

export interface StatCardData {
  title: string;
  value: string | number;
  description: string;
  trend?: string;
  trendUp?: boolean;
  iconName: 'gpa' | 'credits' | 'target' | 'career';
}

export interface GPAMetrics {
  currentIPK: number;
  latestIPS: number;
  totalCompletedCredits: number;
  totalPlannedCredits: number;
  remainingCredits: number;
  requiredFutureGPA: number;
  history: SemesterGPAHistory[];
  remainingSemesters: number;
}
