
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('rol')
    .single();
  
  if (profile?.rol === 'jugador') {
    redirect('/dashboard'); // Se resolverá a /(jugador)/dashboard
  } else if (profile?.rol === 'entrenador') {
    redirect('/dashboard'); // Se resolverá a /(entrenador)/dashboard
  } else {
    // Caso improbable, perfil no encontrado o sin rol
    redirect('/auth/login');
  }

  return null; // Esta página nunca renderiza UI
}
