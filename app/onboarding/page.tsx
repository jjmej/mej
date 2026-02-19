
// Esta página sirve como fallback si un usuario está logueado pero su perfil no tiene rol.
// Esto podría ocurrir si el proceso de registro se interrumpe.
import React from 'react';
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ConfiguracionForm from "@/components/jugador/ConfiguracionForm";

export default async function OnboardingPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id) // FIX: Correctly query for the logged-in user's profile
        .single();
    
    // Safeguard: If the user lands here but their profile is actually complete, redirect them properly.
    if (profile?.rol) {
        if (profile.rol === 'jugador') redirect('/dashboard');
        if (profile.rol === 'entrenador') redirect('/admin/dashboard');
    }
    
    // In an edge case, the profile might not exist at all if signup failed.
    // Forcing a sign-out lets them restart the registration process cleanly.
    if (!profile) {
        await supabase.auth.signOut();
        redirect('/auth/register?message=Error en el perfil, por favor regístrate de nuevo.');
    }

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">¡Casi hemos terminado!</h1>
                    <p className="text-slate-300 mt-2">Por favor, completa tus datos para finalizar la configuración de tu cuenta.</p>
                </div>
                <ConfiguracionForm profile={profile} />
            </div>
        </div>
    );
}
