import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  BookOpen
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { SubjectCard } from '../components/academic/SubjectCard';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import type { Course, CourseStatus, GradeLetter } from '../types/academic';
import { GRADE_POINT_MAP } from '../utils/grade';

export const AcademicRoadmapPage: React.FC<{
  courses: Course[];
  onAddCourse: (course: Omit<Course, 'id'>) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
}> = ({ courses, onAddCourse, onUpdateCourse, onDeleteCourse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CourseStatus>('all');
  const [semesterFilter, setSemesterFilter] = useState<number | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form state
  const [formState, setFormState] = useState<Omit<Course, 'id'>>({
    code: '',
    name: '',
    credits: 3,
    semester: 5,
    status: 'planned',
    grade: 'TBD',
    gradePoint: 0,
    category: 'Core',
    prerequisites: [],
  });

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormState({
      code: '',
      name: '',
      credits: 3,
      semester: 5,
      status: 'planned',
      grade: 'TBD',
      gradePoint: 0,
      category: 'Elective',
      prerequisites: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormState({
      code: course.code,
      name: course.name,
      credits: course.credits,
      semester: course.semester,
      status: course.status,
      grade: course.grade,
      gradePoint: course.gradePoint,
      category: course.category,
      prerequisites: course.prerequisites,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const computedGradePoint =
      formState.status === 'completed' ? GRADE_POINT_MAP[formState.grade] : 0;

    if (editingCourse) {
      onUpdateCourse({
        ...formState,
        id: editingCourse.id,
        gradePoint: computedGradePoint,
      });
    } else {
      onAddCourse({
        ...formState,
        gradePoint: computedGradePoint,
      });
    }
    setIsModalOpen(false);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesSem = semesterFilter === 'all' || c.semester === semesterFilter;
      return matchesSearch && matchesStatus && matchesSem;
    });
  }, [courses, searchQuery, statusFilter, semesterFilter]);

  // Semester workload data for visualization
  const workloadData = useMemo(() => {
    const map = new Map<number, number>();
    courses.forEach((c) => {
      map.set(c.semester, (map.get(c.semester) || 0) + c.credits);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([sem, sks]) => ({ semester: `Sem ${sem}`, sks }));
  }, [courses]);

  const semesters = Array.from(new Set(courses.map((c) => c.semester))).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Academic Roadmap & Course Planner
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Plan your SKS distribution, track prerequisites, and manage semester courses.
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4" /> Add Subject
        </Button>
      </div>

      {/* Workload Chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Semester Credit (SKS) Workload Distribution
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recommended range: 18–22 SKS per regular semester
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Total Planned: {courses.reduce((a, b) => a + b.credits, 0)} SKS
          </span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="semester" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sks" name="Total SKS" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Search & Filters */}
      <Card className="p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by course name or code (e.g., MII2201)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | CourseStatus)}
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planned">Planned</option>
          </select>

          <select
            value={semesterFilter}
            onChange={(e) =>
              setSemesterFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            <option value="all">All Semesters</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No courses found</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your filters or add a new subject to your academic roadmap.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <SubjectCard
              key={course.id}
              course={course}
              onEdit={openEditModal}
              onDelete={onDeleteCourse}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Subject Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Subject' : 'Add Subject to Roadmap'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Course Code
              </label>
              <input
                required
                type="text"
                placeholder="e.g., MII3105"
                value={formState.code}
                onChange={(e) => setFormState({ ...formState, code: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Credits (SKS)
              </label>
              <input
                required
                type="number"
                min={1}
                max={6}
                value={formState.credits}
                onChange={(e) => setFormState({ ...formState, credits: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Subject Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g., Cloud Computing & Distributed Systems"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Semester
              </label>
              <input
                required
                type="number"
                min={1}
                max={14}
                value={formState.semester}
                onChange={(e) => setFormState({ ...formState, semester: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formState.category}
                onChange={(e) =>
                  setFormState({ ...formState, category: e.target.value as Course['category'] })
                }
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Core">Core</option>
                <option value="Elective">Elective</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={formState.status}
                onChange={(e) =>
                  setFormState({ ...formState, status: e.target.value as CourseStatus })
                }
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="planned">Planned</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {formState.status === 'completed' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Final Grade
              </label>
              <select
                value={formState.grade}
                onChange={(e) =>
                  setFormState({ ...formState, grade: e.target.value as GradeLetter })
                }
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {(['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'] as GradeLetter[]).map((g) => (
                  <option key={g} value={g}>
                    {g} ({GRADE_POINT_MAP[g].toFixed(1)})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingCourse ? 'Save Changes' : 'Add Subject'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
