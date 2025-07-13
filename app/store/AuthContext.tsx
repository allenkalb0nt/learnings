'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';
export enum AuthStatus {
  success,
  error,
  loading,
}

type AuthContextType = {
  tite: string;
  userId: string | null;
  status: AuthStatus | null;
  errorMessage: string | null;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const tite = 'toite';
  let errorMessage = null;

  //*login
  const onLogin = async (email: string, password: string) => {
    setStatus(AuthStatus.loading);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log(error.message);
      errorMessage = error.message;
      setStatus(AuthStatus.error);
    } else {
      console.log(userId);
      setStatus(AuthStatus.success);
    }
  };
  //*login
  //*logout
  const onLogout = async () => {
    console.log(userId);
    await supabase.auth.signOut();
  };
  //*logout
  //!listener
  const authChanges = () => {
    console.log('calling auth changes');
    supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user.id ?? null);
    });
  };
  //!listener
  //!fetch session
  useEffect(() => {
    authChanges();
  }, [userId]);
  //!fetch session
  return (
    <AuthContext.Provider value={{ tite, userId, status, errorMessage, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('tanginamo');
  return context;
};
