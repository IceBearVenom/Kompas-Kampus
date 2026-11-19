import React, { useState, useMemo } from 'react';
import {
  Search,
  Bookmark,
  CheckCircle2,
  Award as Trophy
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import type { Opportunity, OpportunityType } from '../types/opportunity';

export const OpportunitiesPage: React.FC<{
  opportunities: Opportunity[];
  onToggleBookmark: (id: string) => void;
}> = ({ opportunities, onToggleBookmark }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | OpportunityType>('All');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      const matchesSearch =
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.organizer.toLowerCase().includes(search.toLowerCase()) ||
        o.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesType = typeFilter === 'All' || o.type === typeFilter;
      const matchesBookmark = !onlyBookmarked || o.isBookmarked;
      return matchesSearch && matchesType && matchesBookmark;
    });
  }, [opportunities, search, typeFilter, onlyBookmarked]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Campus Opportunities, Organizations & Competitions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Build your non-academic portfolio (SKPI) through student organizations, hackathons, and tech summits.
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search competitions, organizations, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['All', 'Competition', 'Organization', 'Event'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTypeFilter(tab)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors ${
                typeFilter === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1.5 ${
              onlyBookmarked
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Saved
          </button>
        </div>
      </Card>

      {/* Opportunity Grid */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Trophy className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching opportunities</h3>
          <p className="text-sm text-slate-500 mt-1">Clear your filters to view all active campus listings.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onToggleBookmark={onToggleBookmark}
              onSelect={setSelectedOpp}
            />
          ))}
        </div>
      )}

      {/* Opportunity Detail Modal */}
      <Modal
        isOpen={!!selectedOpp}
        onClose={() => setSelectedOpp(null)}
        title={selectedOpp?.title || 'Opportunity Details'}
      >
        {selectedOpp && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {selectedOpp.type}
              </span>
              <span className="text-slate-500">Deadline: {selectedOpp.deadline}</span>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Organized by <strong className="text-slate-800 dark:text-slate-200">{selectedOpp.organizer}</strong> • {selectedOpp.location}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedOpp.description}
            </p>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Benefits & Outcomes
              </h4>
              <ul className="space-y-1.5">
                {selectedOpp.benefits.map((b) => (
                  <li key={b} className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onToggleBookmark(selectedOpp.id);
                  setSelectedOpp({ ...selectedOpp, isBookmarked: !selectedOpp.isBookmarked });
                }}
              >
                {selectedOpp.isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
              </Button>
              <Button onClick={() => setSelectedOpp(null)}>Done</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
