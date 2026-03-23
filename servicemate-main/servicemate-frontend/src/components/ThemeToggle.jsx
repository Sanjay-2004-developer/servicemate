import React from 'react';
import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:top-6"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  );
};

export default ThemeToggle;
