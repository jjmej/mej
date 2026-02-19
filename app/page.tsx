
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('rol')
    .eq('id', user.id) // FIX: Correctly query for the logged-in user's profile
    .single();
  
  // If there's an error fetching the profile or it simply doesn't exist, send to onboarding
  if (error || !profile) {
    redirect('/onboarding');
    return null; // Ensure redirect is followed
  }
  
  if (profile.rol === 'jugador') {
    redirect('/dashboard');
  } else if (profile.rol === 'entrenador') {
    redirect('/admin/dashboard');
  } else {
    // This is a fallback for if the profile exists but somehow has no role.
    redirect('/onboarding');
  }

  return null; // This page never renders UI
}
