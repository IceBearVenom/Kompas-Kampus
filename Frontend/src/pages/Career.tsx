import React, { useState } from 'react';
import {
  Compass
} from 'lucide-react';
import {
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { CareerCard } from '../components/career/CareerCard';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { assessmentQuestions } from '../data/mockCareer';
import type { CareerPath } from '../types/career';
import type { Student } from '../types/student';

export const CareerPage: React.FC<{
  careers: CareerPath[];
  student: Student;
  onUpdateStudent: (updated: Student) => void;
}> = ({ careers, student, onUpdateStudent }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(careers[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizSubmit = () => {
    const scores = Object.values(answers);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 85;
    const archetype =
      avg >= 90
        ? 'Analytical Systems Architect (INTJ)'
        : avg >= 80
        ? 'Full-Stack Product Builder (ENTP)'
        : 'Strategic Tech Innovator (ENFJ)';

    onUpdateStudent({
      ...student,
      personalityType: archetype,
    });
    setQuizCompleted(true);
    setShowQuiz(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Career Paths & Skill Gap Analysis
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Discover roles aligned with your Major, interests, and coursework competency.
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowQuiz(!showQuiz)}>
          <Compass className="w-4 h-4" /> {showQuiz ? 'Close Assessment' : 'Retake Interest Assessment'}
        </Button>
      </div>

      {/* Interactive Interest Assessment */}
      {showQuiz && (
        <Card className="p-6 border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Quick Career & Personality Assessment
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Answer 3 quick questions to calibrate your student archetype and career recommendations.
          </p>
          <div className="space-y-5">
            {assessmentQuestions.map((q, idx) => (
              <div key={q.id}>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  {idx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.score }))}
                        className={`p-3 text-left text-xs rounded-xl border transition-all ${
                          selected
                            ? 'border-indigo-600 bg-indigo-600 text-white font-medium'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              onClick={handleQuizSubmit}
              disabled={Object.keys(answers).length < assessmentQuestions.length}
            >
              Calculate Assessment Result
            </Button>
          </div>
        </Card>
      )}

      {quizCompleted && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-sm text-emerald-800 dark:text-emerald-200">
          <span>
            Assessment updated! Your calibrated archetype is <strong>{student.personalityType}</strong>.
          </span>
          <button onClick={() => setQuizCompleted(false)} className="text-xs underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Career Cards Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {careers.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            isSelected={selectedCareer.id === career.id}
            onSelect={setSelectedCareer}
          />
        ))}
      </div>

      {/* Selected Career Skill Gap Radar & Recommended Courses */}
      {selectedCareer && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="p-6 lg:col-span-7">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Skills Gap Radar: {selectedCareer.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comparing your current proficiency against industry entry benchmarks
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Demand {selectedCareer.demandGrowth}
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={selectedCareer.requiredSkills}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Your Current Level"
                    dataKey="studentLevel"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.45}
                  />
                  <Radar
                    name="Target Industry Level"
                    dataKey="targetLevel"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.15}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Skill Breakdown & Recommended Subjects
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Courses at {student.university} that accelerate readiness for this path:
              </p>

              <div className="mt-4 space-y-3">
                {selectedCareer.requiredSkills.map((skill) => {
                  const gap = Math.max(0, skill.targetLevel - skill.studentLevel);
                  return (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-700 dark:text-slate-200">{skill.name}</span>
                        <span className="text-slate-500">
                          {skill.studentLevel}% / {skill.targetLevel}%{' '}
                          {gap > 0 && <span className="text-amber-600">(-{gap}%)</span>}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${skill.studentLevel}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Recommended Courses
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.recommendedCourses.map((courseName) => (
                    <span
                      key={courseName}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300"
                    >
                      {courseName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
