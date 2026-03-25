import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'creaditn_auth';

interface AuthState {
  userId: number | null;
  email: string | null;
  firstName?: string;
  lastName?: string;
  kycStatus?: 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  setUser: (userId: number, email: string, firstName?: string, lastName?: string) => void;
  logout: () => void;
  loading: boolean;
  updateKycStatus: (status: string) => void;
}

const defaultState: AuthState = { userId: null, email: null };

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Load saved auth state
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw) as AuthState;
          if (typeof data.userId === 'number' && typeof data.email === 'string') {
            setState(data);
          }
        }
      } catch (error) {
        console.error('AuthProvider initialization error:', error);
      } finally {
        // Show splash screen for at least 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    })();
  }, []);

  const setUser = useCallback(
    async (userId: number, email: string, firstName?: string, lastName?: string) => {
      console.log('[AuthContext] setUser called with:', { userId, email, firstName, lastName });
      const next: AuthState = { userId, email, firstName, lastName };
      setState(next);
      console.log('[AuthContext] State updated, saving to storage...');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      console.log('[AuthContext] User saved to AsyncStorage');
    },
    []
  );

  const logout = useCallback(async () => {
    setState(defaultState);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateKycStatus = useCallback((status: string) => {
    setState((prev) => ({ ...prev, kycStatus: status as any }));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: state.userId != null && state.email != null,
      setUser,
      logout,
      loading,
      updateKycStatus,
    }),
    [state, setUser, logout, loading, updateKycStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
