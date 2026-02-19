

'use client';
// FIX: Add PropsWithChildren to imports
import React, { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/types';

interface UserContextType {
  profile: Profile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// FIX: Change prop typing to use React.PropsWithChildren to resolve type error in layout.tsx.
export const UserProvider = ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            fetchProfile();
        } else if (event === 'SIGNED_OUT') {
            setProfile(null);
        }
    });

    return () => {
        subscription.unsubscribe();
    };

  }, [supabase]);

  const value = { profile, loading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};