import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import type { Course, GradeLetter } from '../types/academic';
import type { GPAMetrics } from '../types/gpa';
import type { Student } from '../types/student';
import { GRADE_POINT_MAP } from '../utils/grade';

export const GPATrackerPage: React.FC<{
  student: Student;
  courses: Course[];
  gpaMetrics: GPAMetrics;
  onUpdateTargetGPA: (newTarget: number) => void;
}> = ({ student, courses, gpaMetrics, onUpdateTargetGPA }) => {
  const ongoingCourses = useMemo(
    () => courses.filter((c) => c.status === 'ongoing' || c.status === 'planned'),
    [courses]
  );

  // Local state for simulated grades of ongoing/planned courses
  const [simulatedGrades, setSimulatedGrades] = useState<Record<string, GradeLetter>>(() => {
    const initial: Record<string, GradeLetter> = {};
    ongoingCourses.forEach((c) => {
      initial[c.id] = 'A';
    });
    return initial;
  });

  const [targetInput, setTargetInput] = useState<string>(student.targetGPA.toString());

  // Calculate projected GPA dynamically
  const simulationResult = useMemo(() => {
    const completed = courses.filter((c) => c.status === 'completed');
    const completedCredits = completed.reduce((acc, c) => acc + c.credits, 0);
    const completedPoints = completed.reduce((acc, c) => acc + c.credits * c.gradePoint, 0);

    let simCredits = 0;
    let simPoints = 0;
    ongoingCourses.forEach((c) => {
      const selectedGrade = simulatedGrades[c.id] || 'TBD';
      if (selectedGrade !== 'TBD') {
        simCredits += c.credits;
        simPoints += c.credits * GRADE_POINT_MAP[selectedGrade];
      }
    });

    const projectedIPS = simCredits > 0 ? Number((simPoints / simCredits).toFixed(2)) : 0;
    const totalCredits = completedCredits + simCredits;
    const projectedIPK =
      totalCredits > 0 ? Number(((completedPoints + simPoints) / totalCredits).toFixed(2)) : 0;

    return {
      projectedIPS,
      projectedIPK,
      simCredits,
      delta: Number((projectedIPK - gpaMetrics.currentIPK).toFixed(2)),
    };
  }, [courses, ongoingCourses, simulatedGrades, gpaMetrics.currentIPK]);

  const handleTargetSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(targetInput);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 4.0) {
      onUpdateTargetGPA(Number(parsed.toFixed(2)));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          GPA Tracker & Grade Simulator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Monitor your IP & IPK progression and simulate future course grades to hit your graduation goal.
        </p>
      </div>

      {/* Top GPA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs font-medium uppercase text-slate-500">Current IPK</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {gpaMetrics.currentIPK.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-2">{gpaMetrics.totalCompletedCredits} SKS Graded</p>
        </Card>

        <Card className="p-5 border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20">
          <p className="text-xs font-medium uppercase text-indigo-600 dark:text-indigo-400">
            Simulated Projected IPK
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
              {simulationResult.projectedIPK.toFixed(2)}
            </p>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                simulationResult.delta >= 0
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {simulationResult.delta >= 0 ? `+${simulationResult.delta.toFixed(2)}` : simulationResult.delta.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Simulated IPS: {simulationResult.projectedIPS.toFixed(2)} ({simulationResult.simCredits} SKS)
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium uppercase text-slate-500">Required Future GPA</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {gpaMetrics.requiredFutureGPA > 4.0 ? '> 4.00' : Math.max(0, gpaMetrics.requiredFutureGPA).toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Across remaining {gpaMetrics.remainingCredits} SKS
          </p>
        </Card>

        <Card className="p-5">
          <form onSubmit={handleTargetSave}>
            <label className="text-xs font-medium uppercase text-slate-500 block">
              Target Graduation IPK
            </label>
            <div className="flex items-center gap-2 mt-1.5">
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="w-24 px-3 py-1.5 text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Button type="submit" size="sm">
                Update
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Current Goal: {student.targetGPA.toFixed(2)}</p>
          </form>
        </Card>
      </div>

      {/* Grade Simulator & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="p-6 lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Grade Simulator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select expected grades for ongoing & planned courses to preview your IPK impact.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase text-slate-500">
                  <th className="py-3 pr-3">Course</th>
                  <th className="py-3 px-3">Sem</th>
                  <th className="py-3 px-3">SKS</th>
                  <th className="py-3 pl-3 text-right">Target Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {ongoingCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-3 pr-3">
                      <p className="font-semibold text-slate-900 dark:text-white">{course.name}</p>
                      <p className="text-xs font-mono text-slate-500">{course.code}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">Sem {course.semester}</td>
                    <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-200">{course.credits}</td>
                    <td className="py-3 pl-3 text-right">
                      <select
                        value={simulatedGrades[course.id] || 'A'}
                        onChange={(e) =>
                          setSimulatedGrades((prev) => ({
                            ...prev,
                            [course.id]: e.target.value as GradeLetter,
                          }))
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                      >
                        {(['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'TBD'] as GradeLetter[]).map((g) => (
                          <option key={g} value={g}>
                            {g} {g !== 'TBD' ? `(${GRADE_POINT_MAP[g].toFixed(1)})` : ''}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Semester GPA Trend
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Historical IPS per semester alongside cumulative IPK
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gpaMetrics.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="semester" tickFormatter={(v) => `S${v}`} tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 4.0]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ips" name="Semester IPS" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="ipk" name="Cumulative IPK" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-600 dark:text-slate-300">
            <strong>Tip:</strong> Prioritize earning at least an <strong>A-</strong> in 4-SKS core courses to maximize your cumulative IPK trajectory.
          </div>
        </Card>
      </div>
    </div>
  );
};
