import React from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import type { Opportunity, OpportunityType } from '../../types/opportunity';

export const OpportunityCard: React.FC<{
  opportunity: Opportunity;
  onToggleBookmark: (id: string) => void;
  onSelect: (opp: Opportunity) => void;
}> = ({ opportunity, onToggleBookmark, onSelect }) => {
  const typeColors: Record<OpportunityType, string> = {
    Competition: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
    Organization: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
    Event: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  };

  return (
    <Card className="p-5 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[opportunity.type]}`}>
            {opportunity.type}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(opportunity.id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Bookmark opportunity"
          >
            {opportunity.isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
          {opportunity.title}
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
          {opportunity.organizer}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2">
          {opportunity.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {opportunity.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" /> Due {opportunity.deadline}
        </div>
        <Button variant="ghost" size="sm" onClick={() => onSelect(opportunity)}>
          Details <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
};
