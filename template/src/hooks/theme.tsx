import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface ThemeState {
  theme: 'dark' | 'light';
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface ThemeContextTheme {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextTheme>({} as ThemeContextTheme);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>({} as ThemeState);

  useEffect(() => {
    async function loadStorageTheme(): Promise<void> {
      const storageTheme = await AsyncStorage.getItem('@HelloWorld:theme');

      if (storageTheme) {
        setTheme(JSON.parse(storageTheme));
      }
    }

    loadStorageTheme();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.theme;

    await AsyncStorage.multiSet([
      ['@HelloWorld:token', token],
      ['@HelloWorld:user', JSON.stringify(user)],
    ]);

    setTheme({ token, user });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ user: theme.user, signIn, signOut, loading }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextTheme {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within as ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
