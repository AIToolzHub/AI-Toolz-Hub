import React from 'react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="relative overflow-hidden w-10 h-10 flex items-center justify-center"
    >
      <div className={`absolute transition-all duration-300 ease-in-out transform ${theme === 'light' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
        <Sun className="h-5 w-5" />
      </div>
      <div className={`absolute transition-all duration-300 ease-in-out transform ${theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
        <Moon className="h-5 w-5" />
      </div>
    </Button>
  );
};

export default ThemeToggle;