
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signup(formData: FormData) {
  const origin = headers().get('origin')
  const supabase = createClient()

  const data = Object.fromEntries(formData.entries());
  
  const email = data.email as string;
  const password = data.password as string;
  const rol = data.rol as 'jugador' | 'entrenador';
  const nombre = data.nombre as string;
  const deporte = data.deporte as string;
  const club = data.club as string;

  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (signUpError || !user) {
    console.error("Sign up error:", signUpError)
    return redirect(`/auth/register?message=${signUpError?.message || 'Could not authenticate user'}`)
  }

  let profileData: any = {
    id: user.id,
    email: user.email,
    rol,
    nombre,
    deporte,
    club
  };

  if (rol === 'jugador') {
    const edad = parseInt(data.edad as string, 10);
    profileData.edad = edad;
    let age_range = '15-18';
    if (edad >= 8 && edad <= 11) age_range = '8-11';
    if (edad >= 12 && edad <= 14) age_range = '12-14';
    profileData.age_range = age_range;

    const codigo_entrenador = data.codigo_entrenador as string;
    if (codigo_entrenador) {
        const { data: coachProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('codigo_entrenador', codigo_entrenador)
            .eq('rol', 'entrenador')
            .single();
        
        if (coachProfile) {
            profileData.entrenador_id = coachProfile.id;
        }
    }

  } else { // entrenador
    profileData.codigo_entrenador = data.codigo_entrenador as string;
  }
  
  const { error: profileError } = await supabase
    .from('profiles')
    .insert(profileData);

  if (profileError) {
    console.error("Profile creation error:", profileError)
    // Deberíamos manejar el borrado del usuario de auth si el perfil falla
    return redirect(`/auth/register?message=${profileError.message || 'Could not create profile'}`)
  }

  // Por ahora, solo mensaje de confirmación, luego el usuario debe verificar email
  return redirect('/auth/login?message=Revisa tu email para confirmar tu cuenta')
}
