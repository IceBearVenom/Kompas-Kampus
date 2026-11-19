import React from 'react';
import {
  GraduationCap,
  Compass,
  Target,
  BookOpen
} from 'lucide-react';
import { Card } from '../common/Card';
import type { StatCardData } from '../../types/gpa';

export const StatCard: React.FC<{ data: StatCardData }> = ({ data }) => {
  const iconMap = {
    gpa: <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    credits: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    target: <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    career: <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
  };

  return (
    <Card className="p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {data.title}
          </p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {data.value}
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
          {iconMap[data.iconName]}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">{data.description}</span>
        {data.trend && (
          <span
            className={`font-semibold px-2 py-0.5 rounded-full ${
              data.trendUp
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
            }`}
          >
            {data.trend}
          </span>
        )}
      </div>
    </Card>
  );
};
