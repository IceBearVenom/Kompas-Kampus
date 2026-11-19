import type { Course } from '../types/academic';
import type { GPAMetrics, SemesterGPAHistory } from '../types/gpa';

export const gpaService = {
  calculateGPAMetrics: (courses: Course[], maxSemesters: number, targetGPA: number): GPAMetrics => {
    const completed = courses.filter((c) => c.status === 'completed');
    const totalCompletedCredits = completed.reduce((acc, c) => acc + c.credits, 0);
    const totalQualityPoints = completed.reduce((acc, c) => acc + c.credits * c.gradePoint, 0);
    const currentIPK = totalCompletedCredits > 0 ? Number((totalQualityPoints / totalCompletedCredits).toFixed(2)) : 0;

    // Group by semester for history chart
    const semesterMap = new Map<number, { points: number; credits: number }>();
    completed.forEach((c) => {
      const prev = semesterMap.get(c.semester) || { points: 0, credits: 0 };
      semesterMap.set(c.semester, {
        points: prev.points + c.credits * c.gradePoint,
        credits: prev.credits + c.credits,
      });
    });

    const sortedSemesters = Array.from(semesterMap.keys()).sort((a, b) => a - b);
    let runningPoints = 0;
    let runningCredits = 0;
    const history: SemesterGPAHistory[] = sortedSemesters.map((sem) => {
      const data = semesterMap.get(sem)!;
      const ips = Number((data.points / data.credits).toFixed(2));
      runningPoints += data.points;
      runningCredits += data.credits;
      const ipk = Number((runningPoints / runningCredits).toFixed(2));
      return {
        semester: sem,
        ips,
        ipk,
        creditsEarned: data.credits,
      };
    });

    const latestIPS = history.length > 0 ? history[history.length - 1].ips : 0;

    // Required future GPA calculation assuming 144 total graduation SKS
    const totalGraduationCredits = 144;
    const remainingCredits = Math.max(0, totalGraduationCredits - totalCompletedCredits);
    const requiredTotalPoints = targetGPA * totalGraduationCredits;
    const neededPoints = requiredTotalPoints - totalQualityPoints;
    const requiredFutureGPA =
      remainingCredits > 0 ? Number((neededPoints / remainingCredits).toFixed(2)) : currentIPK;

    return {
      currentIPK,
      latestIPS,
      totalCompletedCredits,
      totalPlannedCredits: courses.reduce((acc, c) => acc + c.credits, 0),
      remainingCredits,
      requiredFutureGPA,
      history,
      remainingSemesters: Math.max(1, maxSemesters - sortedSemesters.length),
    };
  },
};
