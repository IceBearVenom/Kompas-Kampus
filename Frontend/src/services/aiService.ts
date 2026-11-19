import { apiRequest } from './api';
import type { Course } from '../types/academic';
import type { AIEvaluationReport } from '../types/api';
import type { GPAMetrics } from '../types/gpa';
import type { Student } from '../types/student';

export const aiService = {
  generateAcademicEvaluation: (
    student: Student,
    courses: Course[],
    metrics: GPAMetrics
  ): Promise<AIEvaluationReport> => {
    return apiRequest('/ai/evaluate', () => {
      const isAchievable = metrics.requiredFutureGPA <= 4.0;
      const ongoingCredits = courses
        .filter((c) => c.status === 'ongoing')
        .reduce((sum, c) => sum + c.credits, 0);

      return {
        generatedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        overallStatus: metrics.currentIPK >= student.targetGPA - 0.15 ? 'On Track' : 'Needs Attention',
        summary: `Based on your Semester ${student.semester} profile in ${student.major} at ${student.university}, your cumulative GPA (${metrics.currentIPK.toFixed(2)}) shows strong foundational momentum in core programming and database subjects.`,
        gpaAnalysis: {
          currentIPK: metrics.currentIPK,
          targetIPK: student.targetGPA,
          requiredAverageIPS: metrics.requiredFutureGPA,
          feasibility: isAchievable
            ? metrics.requiredFutureGPA <= 3.85
              ? 'Highly Achievable'
              : 'Challenging but Realistic'
            : 'Target Exceeds 4.00 Cap',
          advice: isAchievable
            ? `To reach your target IPK of ${student.targetGPA.toFixed(2)} by graduation, aim for an average IPS of ${Math.max(0, metrics.requiredFutureGPA).toFixed(2)} across your remaining ${metrics.remainingCredits} SKS.`
            : `Your target IPK requires above 4.00 in remaining SKS. Consider adjusting your target IPK or retaking B+ core courses if university policy allows.`,
        },
        courseFeedback: [
          `Current Semester ${student.semester} workload is ${ongoingCredits} SKS — well-balanced for maintaining deep focus on Software Engineering and Artificial Intelligence.`,
          `Your 'A' grades in Data Structures & Database Systems strongly validate your readiness for backend and full-stack engineering roles.`,
          `Taking Human-Computer Interaction as an elective bridges technical execution with product usability.`
        ],
        careerAlignment: {
          primaryGoal: student.careerGoals[0] || 'Software Engineer',
          alignmentScore: 91,
          gapAnalysis: 'Strong frontend & database fundamentals. Strengthening Cloud Architecture and automated CI/CD testing will close your remaining skill gap.'
        },
        actionableRecommendations: [
          {
            id: 'rec-1',
            priority: 'High',
            category: 'Academic',
            title: 'Secure A / A- in Software Engineering (4 SKS)',
            description: 'High-credit core courses carry significant weight toward pushing your IPK past 3.75 this semester.'
          },
          {
            id: 'rec-2',
            priority: 'High',
            category: 'Extracurricular',
            title: 'Submit Proposal for GEMASTIK XIX',
            description: 'Turn your Software Engineering semester project into a national competition entry to build portfolio proof.'
          },
          {
            id: 'rec-3',
            priority: 'Medium',
            category: 'Career',
            title: 'Enroll in Modern Web & Cloud Architecture (Sem 5)',
            description: 'Directly addresses your Cloud & DevOps skill gap identified in your Full-Stack Engineer roadmap.'
          }
        ]
      };
    }, 600);
  }
};
