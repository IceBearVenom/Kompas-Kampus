import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Target,
  Briefcase,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { aiService } from '../services/aiService';
import type { Course } from '../types/academic';
import type { AIEvaluationReport } from '../types/api';
import type { GPAMetrics } from '../types/gpa';
import type { Student } from '../types/student';

export const AIEvaluationPage: React.FC<{
  student: Student;
  courses: Course[];
  gpaMetrics: GPAMetrics;
}> = ({ student, courses, gpaMetrics }) => {
  const [report, setReport] = useState<AIEvaluationReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvaluation = async () => {
    setLoading(true);
    const data = await aiService.generateAcademicEvaluation(student, courses, gpaMetrics);
    setReport(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvaluation();
  }, [student, courses]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Academic & Career Evaluation
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Structured Advisor
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Comprehensive evaluation synthesized from your current IPK, course load, and career goals.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchEvaluation} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Regenerate Analysis
        </Button>
      </div>

      {loading || !report ? (
        <Card className="p-12 text-center">
          <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Analyzing semester transcript, SKS workload, and career skill alignment...
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Executive Summary Card */}
          <Card className="p-6 border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50/60 via-white to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Status: {report.overallStatus}
              </span>
              <span className="text-xs text-slate-400">Evaluated on {report.generatedAt}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed">
              {report.summary}
            </p>
          </Card>

          {/* GPA & Career Alignment Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" /> GPA Target Feasibility Analysis
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <p className="text-xs text-slate-500">Current IPK</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {report.gpaAnalysis.currentIPK.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <p className="text-xs text-slate-500">Target IPK</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {report.gpaAnalysis.targetIPK.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <p className="text-xs text-slate-500">Req. Avg IPS</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {report.gpaAnalysis.requiredAverageIPS.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Assessment ({report.gpaAnalysis.feasibility}):</strong> {report.gpaAnalysis.advice}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" /> Career Alignment Feedback
              </h3>
              <div className="mt-4 flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30">
                <div>
                  <p className="text-xs text-slate-500">Primary Career Goal</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {report.careerAlignment.primaryGoal}
                  </p>
                </div>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {report.careerAlignment.alignmentScore}%
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {report.careerAlignment.gapAnalysis}
              </p>
            </Card>
          </div>

          {/* Course Selection Feedback */}
          <Card className="p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Course Selection & Workload Observations
            </h3>
            <ul className="space-y-2.5">
              {report.courseFeedback.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Actionable Recommendations */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Personalized Action Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.actionableRecommendations.map((rec) => (
                <Card key={rec.id} className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {rec.category}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          rec.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {rec.priority} Priority
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rec.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
