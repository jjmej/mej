
'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveCheckin(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Debes iniciar sesión para hacer un check-in.' };
  }

  const checkinData = {
    user_id: user.id,
    fecha: new Date().toISOString().split('T')[0], // Asegura el formato YYYY-MM-DD
    estado_emoji: Number(formData.get('estado_emoji')),
    nivel_estres: Number(formData.get('nivel_estres')),
    nivel_energia: Number(formData.get('nivel_energia')),
    ganas_entrenar: Number(formData.get('ganas_entrenar')),
    nota_libre: formData.get('nota_libre') as string,
  };

  const { error } = await supabase.from('checkins').upsert(checkinData, { onConflict: 'user_id, fecha' });

  if (error) {
    console.error('Supabase error:', error);
    return { error: 'No se pudo guardar el check-in. ¿Quizás ya hiciste uno hoy?' };
  }

  revalidatePath('/dashboard');
  // No redirigimos aquí para que la página cliente pueda hacerlo
  return { error: null };
}
