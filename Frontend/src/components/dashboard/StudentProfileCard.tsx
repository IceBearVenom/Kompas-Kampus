import React from 'react';
import {
  Edit3
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import type { Student } from '../../types/student';

export const StudentProfileCard: React.FC<{ student: Student; onEditClick?: () => void }> = ({
  student,
  onEditClick,
}) => (
  <Card className="p-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
          {student.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Semester {student.semester} / {student.maxSemesters}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            {student.major} • <span className="font-medium">{student.university}</span>
          </p>
          {student.personalityType && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Profile Archetype: <span className="font-medium text-indigo-600 dark:text-indigo-400">{student.personalityType}</span>
            </p>
          )}
        </div>
      </div>
      {onEditClick && (
        <Button variant="outline" size="sm" onClick={onEditClick}>
          <Edit3 className="w-4 h-4" /> Edit Profile
        </Button>
      )}
    </div>

    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Academic & Tech Interests
        </span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {student.interests.map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Target Career Paths
        </span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {student.careerGoals.map((goal) => (
            <span
              key={goal}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
            >
              {goal}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Card>
);
