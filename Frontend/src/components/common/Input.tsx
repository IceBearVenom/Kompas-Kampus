import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div>
    {label && (
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${className}`}
      {...props}
    />
  </div>
);
