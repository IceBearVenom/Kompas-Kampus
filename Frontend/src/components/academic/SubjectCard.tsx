import React from 'react';
import {
  Trash2,
  Edit3
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import type { Course, CourseStatus } from '../../types/academic';

export const SubjectCard: React.FC<{
  course: Course;
  onEdit?: (course: Course) => void;
  onDelete?: (id: string) => void;
}> = ({ course, onEdit, onDelete }) => {
  const statusStyles: Record<CourseStatus, { badge: string; label: string }> = {
    completed: {
      badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
      label: 'Completed',
    },
    ongoing: {
      badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
      label: 'Ongoing',
    },
    planned: {
      badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      label: 'Planned',
    },
  };

  return (
    <Card className="p-4 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
              {course.code} • Sem {course.semester}
            </span>
            <h4 className="font-semibold text-slate-900 dark:text-white mt-0.5 leading-snug">
              {course.name}
            </h4>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyles[course.status].badge}`}>
            {statusStyles[course.status].label}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">
            {course.credits} SKS
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
            {course.category}
          </span>
          {course.status === 'completed' && (
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold">
              Grade: {course.grade} ({course.gradePoint.toFixed(1)})
            </span>
          )}
        </div>

        {course.prerequisites.length > 0 && (
          <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
            Prerequisites: <span className="font-mono text-slate-700 dark:text-slate-300">{course.prerequisites.join(', ')}</span>
          </p>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(course)}>
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="danger" size="sm" onClick={() => onDelete(course.id)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
