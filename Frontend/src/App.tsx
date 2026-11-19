import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Map,
  Compass,
  Award,
  User,
  Sparkles,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { Card } from './components/common/Card';
import { academicService } from './services/academicService';
import { careerService } from './services/careerService';
import { gpaService } from './services/gpaService';
import { opportunityService } from './services/opportunityService';
import { studentService } from './services/studentService';
import type { Course } from './types/academic';
import type { CareerPath } from './types/career';
import type { NavRoute } from './types/navigation';
import type { Opportunity } from './types/opportunity';
import type { Student } from './types/student';
import { DashboardPage } from './pages/Dashboard';
import { GPATrackerPage } from './pages/GPA';
import { AcademicRoadmapPage } from './pages/AcademicRoadmap';
import { CareerPage } from './pages/Career';
import { OpportunitiesPage } from './pages/Opportunities';
import { AIEvaluationPage } from './pages/AIEvaluation';
import { ProfilePage } from './pages/Profile';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<NavRoute>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Centralized typed state populated via API service layer
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [careers, setCareers] = useState<CareerPath[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function bootstrapApp() {
      try {
        setIsLoading(true);
        const [studentData, courseData, careerData, oppData] = await Promise.all([
          studentService.getStudentProfile(),
          academicService.getCourses(),
          careerService.getCareerPaths(),
          opportunityService.getOpportunities(),
        ]);
        if (!isMounted) return;
        setStudent(studentData);
        setCourses(courseData);
        setCareers(careerData);
        setOpportunities(oppData);
      } catch (err) {
        if (isMounted) setError('Failed to load student workspace data.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    bootstrapApp();
    return () => {
      isMounted = false;
    };
  }, []);

  const gpaMetrics = useMemo(() => {
    if (!student) {
      return {
        currentIPK: 0,
        latestIPS: 0,
        totalCompletedCredits: 0,
        totalPlannedCredits: 0,
        remainingCredits: 144,
        requiredFutureGPA: 0,
        history: [],
        remainingSemesters: 8,
      };
    }
    return gpaService.calculateGPAMetrics(courses, student.maxSemesters, student.targetGPA);
  }, [courses, student]);

  // State mutation handlers
  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    const created: Course = {
      ...newCourse,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [...prev, created]);
  };

  const handleUpdateCourse = (updated: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleBookmark = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, isBookmarked: !opp.isBookmarked } : opp))
    );
  };

  const handleSaveProfile = async (updated: Student) => {
    const saved = await studentService.updateStudentProfile(updated);
    setStudent(saved);
  };

  const navItems: { id: NavRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'gpa', label: 'GPA & Simulator', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Academic Roadmap', icon: <Map className="w-4 h-4" /> },
    { id: 'career', label: 'Career & Skills', icon: <Compass className="w-4 h-4" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Award className="w-4 h-4" /> },
    { id: 'ai-eval', label: 'AI Evaluation', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'profile', label: 'Student Profile', icon: <User className="w-4 h-4" /> },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-4 animate-bounce">
          <Compass className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Kompas Kampus</h2>
        <p className="text-sm text-slate-500 mt-1">Loading your academic workspace...</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <Card className="p-8 max-w-md text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Unable to Load Workspace</h2>
          <p className="text-sm text-slate-500 mt-1">{error || 'Unexpected error occurred.'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 px-4 py-6 justify-between">
        <div>
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block leading-none">
                Kompas Kampus
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Student Navigator</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRoute(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mini Student Footer Card */}
        <div
          onClick={() => setActiveRoute('profile')}
          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 flex items-center gap-3 cursor-pointer hover:border-indigo-300 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
            {student.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{student.name}</p>
            <p className="text-[11px] text-slate-500 truncate">
              Sem {student.semester} • IPK {gpaMetrics.currentIPK.toFixed(2)}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-base">Kompas Kampus</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-20 pt-16 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveRoute(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeRoute === 'dashboard' && (
            <DashboardPage
              student={student}
              courses={courses}
              careers={careers}
              opportunities={opportunities}
              gpaMetrics={gpaMetrics}
              onNavigate={setActiveRoute}
            />
          )}
          {activeRoute === 'gpa' && (
            <GPATrackerPage
              student={student}
              courses={courses}
              gpaMetrics={gpaMetrics}
              onUpdateTargetGPA={(newTarget) => handleSaveProfile({ ...student, targetGPA: newTarget })}
            />
          )}
          {activeRoute === 'roadmap' && (
            <AcademicRoadmapPage
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          )}
          {activeRoute === 'career' && (
            <CareerPage
              careers={careers}
              student={student}
              onUpdateStudent={handleSaveProfile}
            />
          )}
          {activeRoute === 'opportunities' && (
            <OpportunitiesPage
              opportunities={opportunities}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
          {activeRoute === 'ai-eval' && (
            <AIEvaluationPage
              student={student}
              courses={courses}
              gpaMetrics={gpaMetrics}
            />
          )}
          {activeRoute === 'profile' && (
            <ProfilePage student={student} onSaveProfile={handleSaveProfile} />
          )}
        </div>
      </main>
    </div>
  );
}
