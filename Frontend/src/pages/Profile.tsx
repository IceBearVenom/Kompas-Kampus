import React, { useState } from 'react';
import {
  X,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { StudentProfileCard } from '../components/dashboard/StudentProfileCard';
import type { Student } from '../types/student';

export const ProfilePage: React.FC<{
  student: Student;
  onSaveProfile: (updated: Student) => void;
}> = ({ student, onSaveProfile }) => {
  const [form, setForm] = useState<Student>(student);
  const [newInterest, setNewInterest] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const addTag = (field: 'interests' | 'careerGoals', value: string, clearFn: (v: string) => void) => {
    const trimmed = value.trim();
    if (trimmed && !form[field].includes(trimmed)) {
      setForm({ ...form, [field]: [...form[field], trimmed] });
      clearFn('');
    }
  };

  const removeTag = (field: 'interests' | 'careerGoals', value: string) => {
    setForm({ ...form, [field]: form[field].filter((item) => item !== value) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Student Profile & Academic Setup
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure your university details, current semester, interests, and career goals.
        </p>
      </div>

      <StudentProfileCard student={form} />

      {savedBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4" /> Student profile saved successfully. All modules updated.
        </div>
      )}

      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                University
              </label>
              <select
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Universitas Gadjah Mada (UGM)">Universitas Gadjah Mada (UGM)</option>
                <option value="Universitas Indonesia (UI)">Universitas Indonesia (UI)</option>
                <option value="Institut Teknologi Bandung (ITB)">Institut Teknologi Bandung (ITB)</option>
                <option value="Institut Teknologi Sepuluh Nopember (ITS)">Institut Teknologi Sepuluh Nopember (ITS)</option>
                <option value="Universitas Brawijaya (UB)">Universitas Brawijaya (UB)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Major / Study Program
              </label>
              <input
                type="text"
                required
                value={form.major}
                onChange={(e) => setForm({ ...form, major: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Current Semester
              </label>
              <input
                type="number"
                min={1}
                max={14}
                required
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Target Graduation GPA
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={4.0}
                required
                value={form.targetGPA}
                onChange={(e) => setForm({ ...form, targetGPA: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Interests Tag Editor */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Interests & Strengths
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add an interest (e.g., Cloud Engineering)"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('interests', newInterest, setNewInterest);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addTag('interests', newInterest, setNewInterest)}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.interests.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag('interests', tag)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Career Goals Tag Editor */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Career Goals
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add a career goal (e.g., Data Scientist)"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('careerGoals', newGoal, setNewGoal);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addTag('careerGoals', newGoal, setNewGoal)}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.careerGoals.map((goal) => (
                <span
                  key={goal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                >
                  {goal}
                  <button
                    type="button"
                    onClick={() => removeTag('careerGoals', goal)}
                    className="text-emerald-500 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit">Save Profile Settings</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
