import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, userData: { 
    full_name: string;
    phone: string;
    role: 'rider' | 'driver';
  }) => {
    const { error: authError, data } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: userData
      }
    });
    if (authError) throw authError;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          ...userData,
          email
        }]);
      if (profileError) throw profileError;
    }
  };

  const signOut = () => supabase.auth.signOut();

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
}