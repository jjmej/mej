
'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'No autenticado' };

    const { error } = await supabase
        .from('profiles')
        .update({
            nombre: formData.get('nombre') as string,
            deporte: formData.get('deporte') as string,
            club: formData.get('club') as string,
        })
        .eq('id', user.id);
    
    if (error) return { error: 'Error al actualizar el perfil.' };
    
    revalidatePath('/configuracion');
    return { error: null };
}

export async function linkCoach(formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'No autenticado' };

    const coachCode = formData.get('codigo_entrenador') as string;
    
    const { data: coach, error: coachError } = await supabase
        .from('profiles')
        .select('id')
        .eq('codigo_entrenador', coachCode)
        .eq('rol', 'entrenador')
        .single();
    
    if (coachError || !coach) return { error: 'Código de entrenador no válido.' };

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ entrenador_id: coach.id })
        .eq('id', user.id);

    if (updateError) return { error: 'Error al vincular el entrenador.' };

    revalidatePath('/configuracion');
    return { error: null };
}

export async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/auth/login');
}
