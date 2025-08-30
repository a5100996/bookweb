import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  isQuietMode: boolean;
  language: 'zh' | 'en';
  toggleTheme: () => void;
  toggleQuietMode: () => void;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isQuietMode, setIsQuietMode] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  useEffect(() => {
    const savedTheme = localStorage.getItem('mingyue-theme');
    const savedQuietMode = localStorage.getItem('mingyue-quiet-mode');
    const savedLanguage = localStorage.getItem('mingyue-language');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    if (savedQuietMode) {
      setIsQuietMode(savedQuietMode === 'true');
    }
    if (savedLanguage) {
      setLanguage(savedLanguage as 'zh' | 'en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('quiet-mode', isQuietMode);
    localStorage.setItem('mingyue-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('mingyue-quiet-mode', isQuietMode.toString());
  }, [isQuietMode]);

  useEffect(() => {
    localStorage.setItem('mingyue-language', language);
  }, [language]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleQuietMode = () => setIsQuietMode(!isQuietMode);
  const toggleLanguage = () => setLanguage(language === 'zh' ? 'en' : 'zh');

  return (
    <ThemeContext.Provider value={{
      isDark,
      isQuietMode,
      language,
      toggleTheme,
      toggleQuietMode,
      toggleLanguage,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};