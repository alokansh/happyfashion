'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface User {
  id: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session in localStorage
    const stored = localStorage.getItem('hf-admin-session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (session.email === ADMIN_EMAIL) {
          setUser({ id: 'admin', email: session.email });
        }
      } catch {}
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simple client-side admin auth
    // In production, use Supabase Auth with email/password
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { id: 'admin', email };
      const session = { email, timestamp: Date.now() };
      localStorage.setItem('hf-admin-session', JSON.stringify(session));
      setUser(adminUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = async () => {
    localStorage.removeItem('hf-admin-session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
