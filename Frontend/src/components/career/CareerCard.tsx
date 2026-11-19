import React from 'react';
import {
  ChevronRight
} from 'lucide-react';
import { Card } from '../common/Card';
import type { CareerPath } from '../../types/career';

export const CareerCard: React.FC<{
  career: CareerPath;
  isSelected: boolean;
  onSelect: (career: CareerPath) => void;
}> = ({ career, isSelected, onSelect }) => (
  <Card
    className={`p-5 cursor-pointer transition-all ${
      isSelected
        ? 'ring-2 ring-indigo-600 border-indigo-600 dark:ring-indigo-500'
        : 'hover:border-slate-300 dark:hover:border-slate-700'
    }`}
  >
    <div onClick={() => onSelect(career)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {career.category}
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {career.title}
          </h3>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 shrink-0">
          {career.matchScore}% Match
        </span>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2">
        {career.description}
      </p>
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-200">{career.averageSalaryIDR}</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
          View Skill Gap <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </Card>
);
