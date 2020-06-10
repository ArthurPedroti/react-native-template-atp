import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface ThemeState {
  theme: 'dark' | 'light';
}

interface ThemeContextData {
  theme: object;
  toggleTheme(): Promise<void>;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(dark);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const response = await AsyncStorage.getItem('@Template:theme');
      if (response) {
        setTheme(JSON.parse(response));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const toggleTheme = useCallback(async () => {
    setTheme(theme.title === 'light' ? dark : light);
    await AsyncStorage.setItem('@Template:theme', JSON.stringify(theme));
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme, loading }), [
    theme,
    toggleTheme,
    loading,
  ]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within as ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
