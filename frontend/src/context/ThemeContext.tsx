// ThemeContext - Theme state provider for light/dark mode
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { ThemeContextType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('mediflow_theme', {
    initialValue: defaultTheme === 'system' ? getSystemTheme() : (defaultTheme as any),
  });
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    const isDarkMode = theme === 'dark';
    setIsDark(isDarkMode);

    // Update document element
    if (typeof document !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value: ThemeContextType = {
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default ThemeContext;
