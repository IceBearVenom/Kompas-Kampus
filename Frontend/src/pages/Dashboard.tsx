import React from 'react';
import {
  Sparkles,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/dashboard/StatCard';
import type { Course } from '../types/academic';
import type { CareerPath } from '../types/career';
import type { GPAMetrics, StatCardData } from '../types/gpa';
import type { NavRoute } from '../types/navigation';
import type { Opportunity } from '../types/opportunity';
import type { Student } from '../types/student';

export const DashboardPage: React.FC<{
  student: Student;
  courses: Course[];
  careers: CareerPath[];
  opportunities: Opportunity[];
  gpaMetrics: GPAMetrics;
  onNavigate: (route: NavRoute) => void;
}> = ({ student, courses, careers, opportunities, gpaMetrics, onNavigate }) => {
  const stats: StatCardData[] = [
    {
      title: 'Cumulative GPA (IPK)',
      value: gpaMetrics.currentIPK.toFixed(2),
      description: `Latest Semester IPS: ${gpaMetrics.latestIPS.toFixed(2)}`,
      trend: gpaMetrics.currentIPK >= student.targetGPA ? 'Above Target' : 'In Progress',
      trendUp: gpaMetrics.currentIPK >= student.targetGPA - 0.15,
      iconName: 'gpa',
    },
    {
      title: 'Target Graduation GPA',
      value: student.targetGPA.toFixed(2),
      description: `Req. Future Avg: ${gpaMetrics.requiredFutureGPA.toFixed(2)}`,
      trend: gpaMetrics.requiredFutureGPA <= 4.0 ? 'Achievable' : 'Stretch',
      trendUp: gpaMetrics.requiredFutureGPA <= 3.85,
      iconName: 'target',
    },
    {
      title: 'Credits Completed (SKS)',
      value: `${gpaMetrics.totalCompletedCredits} / 144`,
      description: `${courses.filter((c) => c.status === 'ongoing').reduce((a, b) => a + b.credits, 0)} SKS Ongoing this sem`,
      trend: `${Math.round((gpaMetrics.totalCompletedCredits / 144) * 100)}% Done`,
      trendUp: true,
      iconName: 'credits',
    },
    {
      title: 'Top Career Match',
      value: `${careers[0]?.matchScore || 0}%`,
      description: careers[0]?.title || 'Explore Paths',
      trend: 'Aligned',
      trendUp: true,
      iconName: 'career',
    },
  ];

  const ongoingCourses = courses.filter((c) => c.status === 'ongoing');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, {student.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {student.university} • {student.major} (Semester {student.semester})
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onNavigate('gpa')}>
            <TrendingUp className="w-4 h-4" /> Simulate GPA
          </Button>
          <Button size="sm" onClick={() => onNavigate('ai-eval')}>
            <Sparkles className="w-4 h-4" /> AI Academic Evaluation
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} data={s} />
        ))}
      </div>

      {/* Main Charts & Ongoing Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                GPA Progression (IPS vs IPK)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Academic performance across completed semesters
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('gpa')}>
              Full Simulator <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaMetrics.history} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ipkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="semester" tickFormatter={(v) => `Sem ${v}`} tick={{ fontSize: 12 }} />
                <YAxis domain={[2.5, 4.0]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="ipk"
                  name="Cumulative IPK"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#ipkGrad)"
                />
                <Line
                  type="monotone"
                  dataKey="ips"
                  name="Semester IPS"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Ongoing Courses Summary */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Semester {student.semester} Courses
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                {ongoingCourses.reduce((a, b) => a + b.credits, 0)} SKS
              </span>
            </div>
            <div className="space-y-3">
              {ongoingCourses.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">{c.code}</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{c.name}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs">
                    {c.credits} SKS
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm" onClick={() => onNavigate('roadmap')}>
            Manage Academic Roadmap
          </Button>
        </Card>
      </div>

      {/* Bookmarked Opportunities Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Recommended & Saved Campus Opportunities
          </h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('opportunities')}>
            Explore All <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.slice(0, 2).map((opp) => (
            <Card key={opp.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{opp.type}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{opp.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {opp.organizer} • Deadline: {opp.deadline}
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('opportunities')}>
                View
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
