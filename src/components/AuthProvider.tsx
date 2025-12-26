'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { type User } from 'firebase/auth';
import {
  auth,
  onAuthChange,
  getUserData,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut as firebaseSignOut,
  isFirebaseAvailable,
  type AppUser,
  type UserRole,
} from '@/lib/firebase';

// Auth context state
interface AuthContextType {
  // User state
  user: User | null;
  appUser: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isFirebaseConfigured: boolean;

  // Auth methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  signInGoogle: (role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;

  // Error handling
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFirebaseConfigured] = useState(() => isFirebaseAvailable());

  // Initialize auth listener
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          setAppUser(userData);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setAppUser(null);
        }
      } else {
        setAppUser(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, [isFirebaseConfigured]);

  // Sign in with email/password
  const signIn = useCallback(async (email: string, password: string) => {
    if (!isFirebaseConfigured) {
      setError('Firebase is not configured');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const userData = await signInWithEmail(email, password);
      setAppUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isFirebaseConfigured]);

  // Sign up with email/password
  const signUp = useCallback(async (
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ) => {
    if (!isFirebaseConfigured) {
      setError('Firebase is not configured');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const userData = await signUpWithEmail(email, password, displayName, role);
      setAppUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isFirebaseConfigured]);

  // Sign in with Google
  const signInGoogle = useCallback(async (role?: UserRole) => {
    if (!isFirebaseConfigured) {
      setError('Firebase is not configured');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const userData = await signInWithGoogle(role);
      setAppUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign in failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isFirebaseConfigured]);

  // Sign out
  const signOut = useCallback(async () => {
    if (!isFirebaseConfigured) return;

    setError(null);
    try {
      await firebaseSignOut();
      setAppUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
    }
  }, [isFirebaseConfigured]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    appUser,
    isLoading,
    isAuthenticated: !!user,
    isFirebaseConfigured,
    signIn,
    signUp,
    signInGoogle,
    signOut,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
